const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const guestData = "Guest Data"
const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: guestData,
    },
    zip_code: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: guestData,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: guestData,
    },
    adress: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: guestData,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img_url: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM("INDIVID", "COMPANY", "GUEST", "ADMIN"),
      defaultValue: "GUEST",
    },
    membership: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    passwordResetToken:{
      type: Sequelize.STRING
    },
    passwordResetExpires: {
      type: Sequelize.DATE
    }
  }
);

module.exports = User;
