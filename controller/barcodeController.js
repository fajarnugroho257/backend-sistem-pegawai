const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

exports.createBarcode = async (req, res) => {
  //   res.status(200).json([{ message: "Oke" }]);
  //   try {
  //     const kodeAbsensi = `ABS-${Date.now()}`; // Kode unik
  //     const qrImage = await QRCode.toDataURL(kodeAbsensi);

  //     res.json({ kodeAbsensi, qrImage });
  //   } catch (error) {
  //     res.status(500).json({ message: "Gagal membuat QR Code", error });
  //   }
  // image
  try {
    const kodeAbsensi = `ABS-${Date.now()}`; // Kode unik
    QRCode.toBuffer(kodeAbsensi, { type: "png" }, (err, buffer) => {
      if (err) {
        return res.status(500).send("Gagal membuat QR Code");
      }
      res.setHeader("Content-Type", "image/png");
      res.send(buffer);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
