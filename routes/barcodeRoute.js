const express = require("express");
const router = express.Router();
const BarcodeController = require("../controller/barcodeController");
const authMiddleware = require("../middleware/authMiddleware");
// middleware
router.use(authMiddleware);
// route list
router.get("/", BarcodeController.createBarcode);

module.exports = router;
