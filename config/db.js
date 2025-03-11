const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("sistem_layanan", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false, // Mengurangi log query di terminal
// });

const sequelize = new Sequelize(
  "railway",
  "root",
  "wcIERygxhCkJFsWEzxxVPNlDWHnTZqNn",
  {
    host: "mainline.proxy.rlwy.net",
    port: 42371, // Tambahkan port di sini
    dialect: "mysql",
    logging: false, // Mengurangi log query di terminal
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
  }
};

module.exports = { sequelize, connectDB };
