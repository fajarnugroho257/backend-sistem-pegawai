const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const absen = sequelize.define(
  "absen",
  {
    absen_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.STRING, allowNull: false },
    absen_date: { type: DataTypes.DATE, allowNull: false },
    absen_masuk: { type: DataTypes.STRING, allowNull: true },
    absen_masuk_time: { type: DataTypes.STRING, allowNull: true },
    absen_pulang: { type: DataTypes.STRING, allowNull: true },
    absen_pulang_time: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "absen",
    timestamps: true, // Sequelize otomatis menangani createdAt & updatedAt
  }
);

module.exports = absen;
