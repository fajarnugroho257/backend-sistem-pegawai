const express = require("express");
const router = express.Router();
const User = require("../models/users");

// all data
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// detail data
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.user_id },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // 🔹 Ambil Semua User (Hanya bisa diakses oleh user yang login)
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🔹 Ambil Data Diri Berdasarkan Token
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
