const express = require("express");
const router = express.Router();
const Absen = require("../models/absen");
const Users = require("../models/users");

exports.storeAbsen = async (req, res) => {
  const absen_id = await newAbsenID();
  const dayjs = require("dayjs");
  const today = dayjs().format("YYYY-MM-DD");
  const now = dayjs().format("HH:mm:ss");
  // user
  const dataBarcode = req.body.dataImage;
  const parts = dataBarcode.split("-");
  const barcodeUserId = parts[parts.length - 2];
  const barcodeStatus = parts[parts.length - 1];
  if (req.user.user_id !== barcodeUserId) {
    res.status(200).json({ message: "error" });
  }
  // params
  const params = {
    absen_id: absen_id,
    user_id: req.user.user_id,
    absen_date: today,
    absen_masuk: "yes",
    absen_masuk_time: now,
    absen_pulang: "no",
    absen_pulang_time: null,
  };
  //
  try {
    // get detail absen
    let absen = await Absen.findOne({
      where: { user_id: req.user.user_id, absen_date: today },
    });
    if (!absen) {
      // absen masuk
      absen = await Absen.create(params);
    } else {
      // check jika sudah absen masuk dan menggunakan barcode absen masuk maka error
      if (barcodeStatus === "masuk") {
        return res.status(200).json({
          success: false,
          message: "Barcode untuk absen masuk, silahkan untuk generate ulang",
        });
      }
      if (absen.absen_masuk === "yes" && absen.absen_pulang === "yes") {
        return res.status(200).json({
          success: false,
          message: "Anda sudah melakukan absen masuk dan pulang",
        });
      }
      // absen pulang
      absen.update({
        absen_pulang: "yes",
        absen_pulang_time: now,
      });
    }
    if (absen) {
      return res
        .status(200)
        .json({
          success: true,
          message: `Sukses, Melakukan absen ${barcodeStatus}`,
        });
    } else {
      return res.status(200).json({ success: false, message: "Error" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const newAbsenID = async () => {
  const lastAbsen = await Absen.findOne({
    order: [["absen_id", "DESC"]],
  });

  const datePrefix = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // Format YYMMDD
  let newId;

  if (!lastAbsen || !lastAbsen.absen_id.startsWith(datePrefix)) {
    newId = `${datePrefix}0001`;
  } else {
    const lastIdNumber = parseInt(lastAbsen.absen_id.slice(-4), 10);
    newId = `${datePrefix}${String(lastIdNumber + 1).padStart(4, "0")}`;
  }

  return newId;
};
