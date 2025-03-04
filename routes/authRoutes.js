const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");
const { validateRegister } = require("../middleware/validation/validation");

// route list
router.post("/", validateRegister, AuthController.addNewUser);
router.post("/login", AuthController.login);

module.exports = router;
