const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Jadwal_karyawan = sequelize.define(
  "jadwal_karyawan",
  {
    data_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    jadwal_id: { type: DataTypes.STRING, allowNull: false },
    shift_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    data_status: { type: DataTypes.ENUM("yes", "no"), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "jadwal_karyawan",
    timestamps: true, // Sequelize otomatis menangani createdAt & updatedAt
  }
);

module.exports = Jadwal_karyawan;
