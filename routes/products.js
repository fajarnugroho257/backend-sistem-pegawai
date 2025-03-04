const express = require("express");
const router = express.Router();

// Daftar produk
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
  ]);
});

// Tambah produk baru
router.post("/", (req, res) => {
  res.json({ message: "Produk berhasil ditambahkan" });
});

module.exports = router;
