const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const PostsContoller = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join("public" + "/uploads"));
   },
   filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
   },
});
const upload = multer({ storage: storage });

router.get("", PostsContoller.getPosts);
router.get("/:id", PostsContoller.getPost);
router.post(
   "",
   upload.single("PostImage"),
   auth.authenticateToken,
   PostsContoller.postPost
);
router.delete("/:id", auth.authenticateToken, PostsContoller.deletePost);
router.put("/:id", auth.authenticateToken, PostsContoller.updatedPost);
module.exports = router;
