const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const User = require("./User");

const Rating = sequelize.define("rating", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating_value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Rating, {
  foreignKey: {
    name: "masterId",
    allowNull: false,
  },
});
Rating.belongsTo(User, {
  foreignKey: {
    name: "masterId",
    allowNull: false,
  },
});

User.hasMany(Rating, {
  foreignKey: {
    name: "guestId",
    allowNull: false,
  },
});
Rating.belongsTo(User, {
  foreignKey: {
    name: "guestId",
    allowNull: false,
  },
});

module.exports = Rating;
