const Files = require("../models/Files.js");
const path = require('path');
const mime = require('mime-types');
const processPath = require('../lib/path');
const { moveFile, deleteFile } = require('../lib/file');
const directorio = require('../lib/dir');

// Create Files
exports.createFiles = async (req, callback) => {
    try {
        if (!req.files) {
            callback('No files were uploaded');
            return;
        }
        const user_id = req.user;
        try {
            var dirPath = processPath(`${user_id}`);
            // Check and set directory
            try {
                if (directorio.checkDir(dirPath.absolutePath)) {
                    directorio.createDir(dirPath.absolutePath);
                }
                dirPath = processPath(`${user_id}/files`);
                try {
                    if (directorio.checkDir(dirPath.absolutePath)) {
                        directorio.createDir(dirPath.absolutePath);
                    }
                    try {
                        let file = req.files.image;
                        try {
                            await moveFile(file, dirPath.absolutePath);
                        } catch (err) {
                            // Sys error
                            callback(err);
                            return;
                        }

                        // Set model fields
                        const {
                            file_name,
                        } = req.body; //destructuracion del objeto
                        const file_owner = user_id;
                        const file_size = file.size;
                        const file_url = path.join(dirPath.absolutePath, file.name);

                        // Create Object Files
                        try {
                            const newFiles = new Files({
                                file_name,
                                file_url,
                                file_owner,
                                file_size,
                            });
                            try {
                                // Save object Files in BD
                                const FilesSave = await newFiles.save();
                                callback(null, FilesSave);
                                return;
                            } catch (error) {
                                callback(error);
                                return;
                            }
                        } catch (error) {
                            callback(error);
                            return;
                        }
                    } catch (error) {
                        callback(error);
                        return;
                    }
                } catch (error) {
                    callback(error);
                    return;
                }
            } catch (error) {
                callback(error);
                return;
            }
        } catch (error) {
            callback(error);
            return;
        }
    } catch (error) {
        callback(error);
        return;
    }
};

// Get Files
exports.getFiles = async (req, callback) => {
    try {
        const userid = req.user;
        const query = { file_owner: userid }
        const files = await Files.find(query);
        callback(null, files);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Get Files by ID
exports.getFilesById = async (req, callback) => {
    const { filesId } = req.params;

    try {
        const files = await Files.findById(filesId);
        callback(null, files);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Update Files
exports.updateFilesById = async (req, callback) => {
    try {
        const updatedFiles = await Files.findByIdAndUpdate(
            req.params.filesId,
            req.body,
            {
                new: true, // para que el metodo devuelva los datos nuevos.
            }
        );
        callback(null, updatedFiles);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Delete Files
exports.deleteFilesById = async (req, callback) => {
    const { filesId } = req.params;
    try {
        await Files.findByIdAndDelete(filesId);
        callback(null, 'File deleted');
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Download File
exports.downloadFileById = async (req, callback) => {
    try {
        try {
            const filesId = req.params.filesId;
            const file_bd = await Files.findById(filesId);
            if (!file_bd) {
                callback('Not matching ID')
                return;
            }
            try {

                const file = processPath(file_bd.file_url);
                const mimetype = mime.lookup(file);
                callback(null, {
                    file: file_bd.file_url,
                    mimetype: mimetype
                });
                return;
            } catch (err) {
                callback(err);
            }
        } catch (err) {
            callback(err);
        }
    } catch (err) {
        callback(err);
    }
}

