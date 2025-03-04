const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
// middleware
router.use(authMiddleware);

// route list
router.get("/", UserController.getAllUsers);
router.get("/:user_id", UserController.getUserById);

module.exports = router;
