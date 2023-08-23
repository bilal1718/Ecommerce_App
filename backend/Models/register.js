import sq from "/Config/db"
import DataTypes from "sequelize"

const { sq } = require("/Config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    password:{
      type:DataTypes.INTEGER,
    },
    confirmpassword:{
        type:DataTypes.INTEGER,
      },
    
  });

  User.sync().then(() => {
    console.log("User Model synced");
  });

  module.exports = User;

  