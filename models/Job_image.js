const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const Job = require("./Job");

const Job_image = sequelize.define("job_image", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Job.hasMany(Job_image);
Job_image.belongsTo(Job);

module.exports = Job_image;
