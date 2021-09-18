const Sequelize = require("sequelize");
const sequelize = require("../db/db_connection");
const User = require("./User");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});


User.hasMany(Comment, {
  foreignKey: {
    name: "masterId",
  },
});
Comment.belongsTo(User, {
  foreignKey: {
    name: "masterId",
  },
});

User.hasMany(Comment, {
  foreignKey: {
    name: "guestId",
  },
});
Comment.belongsTo(User, {
  foreignKey: {
    name: "guestId",
  },
});

module.exports = Comment
