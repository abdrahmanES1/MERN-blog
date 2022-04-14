const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const PostsContoller = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");

const uid = require("uid");
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join("public/uploads"));
   },
   filename: function (req, file, cb) {
      console.log(file);
      cb(
         null,
         new Date().toString() + "." + file.mimetype.split("/")[1].toString()
      );
   },
});
const upload = multer({ storage: storage });

router.get("", PostsContoller.getPosts);
router.get("/:id", PostsContoller.getPost);
router.post(
   "",
   upload.single("image"),
   // auth.authenticateToken,
   PostsContoller.postPost
);
router.delete(
   "/:id",
   // auth.authenticateToken,
   PostsContoller.deletePost
);
router.put(
   "/:id",
   // auth.authenticateToken,
   PostsContoller.updatedPost
);
module.exports = router;
