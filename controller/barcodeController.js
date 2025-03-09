const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Absen = require("../models/absen");
const dayjs = require("dayjs");

exports.createBarcode = async (req, res) => {
  // res.status(200).json([{ message: "Oke" }]);
  try {
    const user_id = req.user.user_id;
    const today = dayjs().format("YYYY-MM-DD");
    // check data absen
    const response = await Absen.findOne({
      where: { user_id: user_id, absen_date: today },
    });
    //
    let absen_st = "masuk";
    if (response === null) {
      absen_st = "masuk";
    } else {
      absen_st = "pulang";
      if (response.absen_masuk === "yes" && response.absen_pulang === "yes") {
        return res.status(200).json({
          success: false,
          message: "Maaf, anda sudah absen masuk dan pulang",
        });
      }
    }
    const kodeAbsensi = `ABS-${Date.now()}-${user_id}-${absen_st}`; // Kode unik
    const qrImage = await QRCode.toDataURL(kodeAbsensi);

    // res.json({ kodeAbsensi, qrImage });
    res.json({ success: true, qrImage, status: absen_st });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat QR Code", error });
  }
  // image
  // try {
  //   const kodeAbsensi = `ABS-${Date.now()}`; // Kode unik
  //   QRCode.toBuffer(kodeAbsensi, { type: "png" }, (err, buffer) => {
  //     if (err) {
  //       return res.status(500).send("Gagal membuat QR Code");
  //     }
  //     res.setHeader("Content-Type", "image/png");
  //     res.send(buffer);
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: "Server error", error });
  // }
};
