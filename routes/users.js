const express = require("express");
const router = express.Router();

// Daftar semua user
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
});

// Tambah user baru
router.post("/", (req, res) => {
  res.json({ message: "User berhasil ditambahkan" });
});

module.exports = router;
