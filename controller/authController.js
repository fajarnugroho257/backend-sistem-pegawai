const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addNewUser = async (req, res) => {
  try {
    // return req.body;
    // const requestData = req.body; // Tangkap data dari body request
    // res.json({ success: true, receivedData: requestData }); // Kembalikan data ke Postman
    const { username, password, nama } = req.body;
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ message: "Username sudah tersedia" });
    }
    const user_id = await newUserID();
    try {
      const newUser = await User.create({ username, password, nama, user_id });
      res
        .status(201)
        .json({ message: "User berhasil didaftarkan", user: newUser });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          message: error.errors.map((err) => err.message),
        });
      } else {
        res.status(400).json({ message: "Error lain:", error });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Password salah" });
    }

    // 🔹 Buat token JWT
    const token = jwt.sign(
      { user_id: user.user_id, nama: user.nama },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.json({ success: true, message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const newUserID = async () => {
  const lastUser = await User.findOne({ order: [["user_id", "DESC"]] });
  let newId;
  const datePrefix = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // Format YYMMDD

  if (!lastUser) {
    newId = `U${datePrefix}0001`;
  } else {
    const lastIdNumber = parseInt(lastUser.user_id.slice(-4), 10);
    newId = `U${datePrefix}${String(lastIdNumber + 1).padStart(4, "0")}`;
  }
  return newId;
};
