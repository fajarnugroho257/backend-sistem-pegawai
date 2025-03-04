const express = require("express");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const barcodeRoute = require("./routes/barcodeRoute");
require("dotenv").config();
const cors = require("cors");

const app = express();

// CORS
app.use(
  cors({
    origin: "http://127.0.0.1:3000", // Sesuaikan dengan alamat frontend React
    credentials: true, // Izinkan cookie atau token dikirim
  })
);

app.use(express.urlencoded({ extended: true }));

const port = 8000;

connectDB();
app.use(express.json());

app.use("/auth", authRoutes); // Route untuk login & registrasi
app.use("/users", userRoutes); // Route untuk user (butuh login)
app.use("/barcode", barcodeRoute); // Route untuk user (butuh login)

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
