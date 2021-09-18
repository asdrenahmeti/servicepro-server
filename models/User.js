const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
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
  },
  zip_code: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  adress: {
    type: Sequelize.STRING,
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
  },
});

module.exports = User;
