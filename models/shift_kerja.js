const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Shift_kerja = sequelize.define(
  "shift_kerja",
  {
    shift_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    shift_name: { type: DataTypes.STRING, allowNull: false },
    shift_start: { type: DataTypes.STRING, allowNull: false },
    shift_end: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "shift_kerja",
    timestamps: false, // Sequelize otomatis menangani createdAt & updatedAt
  }
);

module.exports = Shift_kerja;
