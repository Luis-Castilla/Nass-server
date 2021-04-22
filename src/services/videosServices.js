const Videos = require("../models/Videos.js");
const path = require('path');
const mime = require('mime-types');
const processPath = require('../lib/path');
const { moveFile, deleteFile } = require('../lib/file');
const directorio = require('../lib/dir');
const { getVideoDurationInSeconds } = require("get-video-duration");

// Create Videos
exports.createVideos = async (req, callback) => {
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
                dirPath = processPath(`${user_id}/videos`);
                try {
                    if (directorio.checkDir(dirPath.absolutePath)) {
                        directorio.createDir(dirPath.absolutePath);
                    }
                    try {
                        var video = req.files.video;
                        await moveFile(video, dirPath.absolutePath);
                    } catch (err) {
                        // Sys error
                        callback(err);
                        return;
                    }
                    // Set model fields
                    const video_url = path.join(dirPath.absolutePath, video.name);
                    const { video_name } = req.body; //destructuracion del objeto
                    const video_owner = user_id;
                    const video_size = video.size;

                    // Create Object Videos
                    try {
                        const newVideo = new Videos({
                            video_name,
                            video_owner,
                            video_size,
                            video_url,
                        });
                        try {
                            // Save object Videos in BD
                            const VideoSave = await newVideo.save();
                            callback(null, VideoSave);
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
};

// Get Videos by user
exports.getVideos = async (req, callback) => {
    try {
        const userid = req.user;
        const query = { video_owner: userid }
        const videos = await Videos.find(query);
        callback(null, videos);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Get Video by ID
exports.getVideoById = async (req, callback) => {
    try {
        const { videoId } = req.params;
        const video = await Videos.findById(videoId);
        callback(null, video);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Update Video
exports.updateVideosById = async (req, callback) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.videoId,
            req.body,
            {
                new: true, // para que el metodo devuelva los datos nuevos.
            }
        );
        callback(null, updatedVideo);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Delete Video
exports.deleteVideosById = async (req, callback) => {
    const { videoId } = req.params;
    try {
        await Videos.findByIdAndDelete(videoId);
        callback(null, 'Video deleted');
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Download Video
exports.downloadVideoById = async (req, callback) => {
    try {
        try {
            const videoId = req.params.videoId;
            const video_bd = await Videos.findById(videoId);
            if (!video_bd) {
                callback('Not matching ID')
                return;
            }
            try {

                const video = processPath(video_bd.video_url);
                const mimetype = mime.lookup(video);
                callback(null, {
                    'video': video_bd.video_url,
                    'mimetype': mimetype
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

/***************************************************************************************
 *    Title: Video Streaming Application
 *    Author: Rathore, D
 *    Date: Wednesday, October 7, 2020
 *    Code version: 0.1
 *    Availability: https://www.linode.com/docs/guides/build-react-video-streaming-app/
 *
 ***************************************************************************************/
exports.StreamVideo = async (req, res) => {

    const userId = req.user;

    const video = await Video.findById(req.params.id);
    const path = `storage/${userId}/videos/${video.fileName}`;

    //Se obtiene el estado del video actual
    const stat = fs.statSync(path);

    //Se obtiene el peso del video actual en bytes
    const fileSize = stat.video_size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);

        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        callback(null, {
            status: 206,
            head: head,
            path: path,
            start: start,
            end: end
        });
        return;

    } else {

        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        callback(null, {
            status: 200,
            head: head,
            path: path
        });
        return;
    }
};
