const FilesService = require("../services/filesServices.js");

// Create Files
exports.createFiles = async (req, res) => {
    await FilesService.createFiles(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Get Files
exports.getFiles = async (req, res) => {
    await FilesService.getFiles(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Get Files by ID
exports.getFilesById = async (req, res) => {
    await FilesService.getFilesById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: 'Categoria Principal does not exists'
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Update Files by id
exports.updateFilesById = async (req, res) => {
    await FilesService.updateFilesById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Delete Files by id
exports.deleteFilesById = async (req, res) => {
    await FilesService.deleteFilesById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Download Files by id
exports.downloadFileById = async (req, res) => {
    await FilesService.downloadFileById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        res.setHeader('Content-Disposition', `attachment; filename=${result.file}`);
        res.setHeader('Content-Type', result.mimetype);
        res.download(result.file);
    });
};