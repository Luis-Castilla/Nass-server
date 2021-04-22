const express = require("express");
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const userCtrl = require("../controllers/auth");
const filesCtrl = require("../controllers/FilesController");
const videosCtrl = require("../controllers/VideosController");
const auth = require("../middleware/auth");


// User routes
router.post("/user/login", userCtrl.logIn);
router.post("/user/signUp", userCtrl.signUp);
router.get("/user/detail/", auth, userCtrl.getUser);
router.post("/user/update/:userId", auth, userCtrl.updateUser);

// Files routes
router.post("/files/upload", auth, filesCtrl.createFiles);
router.get("/files/", auth, filesCtrl.getFiles);
router.get("/files/detail/:filesId", auth, filesCtrl.getFilesById);
router.put("/files/update/:filesId", auth, filesCtrl.updateFilesById);
router.delete("/files/delete/:filesId", auth, filesCtrl.deleteFilesById);
router.get("/files/download/:filesId", auth, filesCtrl.downloadFileById);

// Video routes
router.post("/videos/upload", auth, videosCtrl.createVideos);
router.get("/videos/", auth, videosCtrl.getVideos);
router.get("/videos/detail/:videosId", auth, videosCtrl.getVideosById);
router.put("/videos/update/:videosId", auth, videosCtrl.updateVideosById);
router.delete("/videos/delete/:videosId", auth, videosCtrl.deleteVideosById);
router.get("/videos/download/:videosId", auth, videosCtrl.downloadVideoById);
router.get("/videos/stream/:videosId", auth, videosCtrl.StreamVideo);

module.exports = router;
