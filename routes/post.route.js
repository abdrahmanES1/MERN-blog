const express = require("express");

const router = express.Router();
const PostsContoller = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");

router.get("", PostsContoller.getPosts);
router.get("/:id", PostsContoller.getPost);
router.post("", auth.authenticateToken, PostsContoller.postPost);
router.delete("/:id", auth.authenticateToken, PostsContoller.deletePost);
router.put("/:id", auth.authenticateToken, PostsContoller.updatedPost);
module.exports = router;
