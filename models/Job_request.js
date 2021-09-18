const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");

const Job_request = sequelize.define("job_request", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status:{
      type: Sequelize.ENUM("PENDING","DECLINE","DONE"),
      defaultValue: "PENDING"
  }
});

User.hasOne(Job_request);
Job_request.belongsTo(User);

module.exports = Job_request;
