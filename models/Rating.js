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
  },
});
Rating.belongsTo(User, {
  foreignKey: {
    name: "masterId",
  },
});

User.hasMany(Rating, {
  foreignKey: {
    name: "guestId",
  },
});
Rating.belongsTo(User, {
  foreignKey: {
    name: "guestId",
  },
});

module.exports = Rating;
