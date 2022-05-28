const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const UsersContoller = require("../controllers/user.controller");

// router.get("", UsersContoller.getUsers);
router.put("/:id", auth.authenticateToken, UsersContoller.updateUser);
router.get("/:id", UsersContoller.getUser);

module.exports = router;
