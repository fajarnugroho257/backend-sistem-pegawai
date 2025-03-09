const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Jadwal_kerja = sequelize.define(
  "jadwal_kerja",
  {
    jadwal_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    jadwal_date: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "jadwal_kerja",
    timestamps: true, // Sequelize otomatis menangani createdAt & updatedAt
  }
);

module.exports = Jadwal_kerja;
