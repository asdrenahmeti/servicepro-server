const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");

const Subscribe = sequelize.define("subscribe", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  to: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.hasOne(Subscribe)
Subscribe.belongsTo(User);



module.exports = Subscribe;

