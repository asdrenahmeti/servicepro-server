const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");
const errMessages = require("./../validators/messages");

const Job_request = sequelize.define("job_request", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: errMessages.en.user.email_format,
      },
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: errMessages.en.job_request.title,
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: errMessages.en.job_request.description,
      },
    },
  },
  status: {
    type: Sequelize.ENUM("PENDING", "DECLINE", "DONE"),
    defaultValue: "PENDING",
  },
});

User.hasOne(Job_request, {
  foreignKey: {
    allowNull: false,
  },
});
Job_request.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Job_request;
