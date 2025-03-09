const express = require("express");
const router = express.Router();
const User = require("../models/users");
const ShiftKerja = require("../models/shift_kerja");
const JadwalKerja = require("../models/jadwal_kerja");
const JadwalKaryawan = require("../models/jadwal_karyawan");

// all data
exports.getAllDataGenerate = async (req, res) => {
  try {
    const [users, shift_kerja] = await Promise.all([
      User.findAll(),
      ShiftKerja.findAll(),
    ]);
    res.status(200).json({
      success: true,
      karyawan: users,
      shift_kerja: shift_kerja,
    });
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
