const express = require("express");
const router = express.Router();
const BarcodeController = require("../controller/barcodeController");

// route list
router.get("/", BarcodeController.createBarcode);

module.exports = router;
