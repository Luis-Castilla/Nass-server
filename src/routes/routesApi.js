const express = require("express");
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const userCtrl = require("../controllers/auth");
const filesCtrl = require("../controllers/FilesController");
const auth = require("../middleware/auth");


// User routes
router.post("/user/login", userCtrl.logIn);
router.post("/user/signUp", userCtrl.signUp);
router.get("/user/detail/", auth, userCtrl.getUser);
router.post("/user/update/:userId", auth, userCtrl.updateUser);

// Calendar routes
router.post("/files/upload", auth, filesCtrl.createFiles);
router.get("/files/", auth, filesCtrl.getFiles);
router.get("/files/detail/:filesId", auth, filesCtrl.getFilesById);
router.put("/files/update/:filesId", auth, filesCtrl.updateFilesById);
router.delete("/files/delete/:filesId", auth, filesCtrl.deleteFilesById);
router.get("/files/download/:filesId", auth, filesCtrl.downloadFileById);

module.exports = router;
