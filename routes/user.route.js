const express = require("express");

const router = express.Router();
const UsersContoller = require("../controllers/user.controller");
// router.get("", UsersContoller.getUsers);
router.put("/:id", UsersContoller.updateUser);
router.get("/:id", UsersContoller.getUser);

module.exports = router;
