const express = require("express");
const router = express.Router();
const GenerateJadwalController = require("../controller/generateJadwalController");
const authMiddleware = require("../middleware/authMiddleware");
// middleware
// router.use(authMiddleware);
// route list
router.get("/", GenerateJadwalController.getAllDataGenerate);

module.exports = router;
