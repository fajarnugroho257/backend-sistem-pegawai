const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sistem_layanan", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Mengurangi log query di terminal
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
  }
};

module.exports = { sequelize, connectDB };
