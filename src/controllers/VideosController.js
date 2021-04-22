const VideosService = require("../services/VideosServices.js");
const fs = require("fs");

// Create Videos
exports.createVideos = async (req, res) => {
    await VideosService.createVideos(req, function (err, result) {
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

// Get Videos
exports.getVideos = async (req, res) => {
    await VideosService.getVideos(req, function (err, result) {
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

// Get Videos by ID
exports.getVideosById = async (req, res) => {
    await VideosService.getVideosById(req, function (err, result) {
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

// Update Videos by id
exports.updateVideosById = async (req, res) => {
    await VideosService.updateVideosById(req, function (err, result) {
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

// Delete Videos by id
exports.deleteVideosById = async (req, res) => {
    await VideosService.deleteVideosById(req, function (err, result) {
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

// Download Videos by id
exports.downloadVideoById = async (req, res) => {
    await VideosService.downloadVideoById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        res.setHeader('Content-Disposition', `attachment; Videoname=${result.Video}`);
        res.setHeader('Content-Type', result.mimetype);
        res.download(result.Video);
    });
};

// Download Videos by id
exports.StreamVideo = async (req, res) => {
    await VideosService.StreamVideo(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }

        if (result.status === 206) {
            res.writeHead(206, result.head);
            const start = result.start;
            const end = result.end;
            fs.createReadStream(result.path, { start, end }).pipe(res);
        }
        res.writeHead(200, result.head);
        fs.createReadStream(result.path).pipe(res);
    });
};