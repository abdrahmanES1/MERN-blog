const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");



const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join("public/uploads"));
   },
   filename: function (req, file, cb) {
      req.file = file;
      cb(
         null,
         new Date().toISOString() + "." + file.mimetype.split("/")[1].toString()
      );
   },
});

const upload = multer({ storage: storage });
router.post("", upload.single("image"), (req, res) => {
   if (req.file) {
      res.send({ success: true, imageUrl: req?.file?.path });
   } else {
      res.status(403).send({ success: false, error: "" });
   }
});

module.exports = router;
