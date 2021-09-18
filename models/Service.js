const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");

const Service = sequelize.define("service", {
  name: {
    type: Sequelize.STRING,
    allowNull:false,
  },
});

module.exports = Service;