const express = require("express");
const router = express.Router();
const AbsenController = require("../controller/absenController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateStoreAbsen } = require("../middleware/validation/validation");
// middleware
router.use(authMiddleware);
// route list
router.post("/", validateStoreAbsen, AbsenController.storeAbsen);

module.exports = router;
