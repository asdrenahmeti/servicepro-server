const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");

const Job = sequelize.define("job", {
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
});

User.hasOne(Job);
Job.belongsTo(User);

module.exports = Job;
