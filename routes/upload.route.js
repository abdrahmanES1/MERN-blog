const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join("public/uploads"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "." + file.mimetype.split("/")[1].toString());
   },
});

const upload = multer({ storage: storage });

router.post("", upload.single("image"), uploadController.postFile);

module.exports = router;
