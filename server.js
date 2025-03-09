const express = require("express");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const barcodeRoute = require("./routes/barcodeRoute");
const absenRoute = require("./routes/absenRoute");
const generatejadwalRoute = require("./routes/generatejadwal");
require("dotenv").config();
const cors = require("cors");

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://192.168.1.105:3000", "http://127.0.0.1:3000"], // Sesuaikan dengan alamat frontend React
    credentials: true, // Izinkan cookie atau token dikirim
  })
);

app.use(express.urlencoded({ extended: true }));

const port = 8000;

connectDB();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/barcode", barcodeRoute);
app.use("/absen", absenRoute);
app.use("/generate-jadwal", generatejadwalRoute);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
