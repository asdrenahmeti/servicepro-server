const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");
const errMessages = require("./../validators/messages");

const Job = sequelize.define("job", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: errMessages.en.job.title,
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: errMessages.en.job.description,
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: errMessages.en.job.price,
      },
    },
  },
});

User.hasMany(Job, {
  foreignKey: {
    allowNull: false,
  },
});
Job.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Job;
