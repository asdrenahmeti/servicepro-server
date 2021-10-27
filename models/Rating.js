const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const User = require("./User");
const errMessages = require("./../validators/messages");

const Rating = sequelize.define(
  "rating",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating_value: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: errMessages.en.rating.rating_value,
        },
        min: {
          args: 1,
          msg: errMessages.en.rating.rating_value_data,
        },
        max: {
          args: 5,
          msg: errMessages.en.rating.rating_value_data,
        },
      },
    },
    rating_quote: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: errMessages.en.rating.rating_quote,
        },
        len: {
          args: [20, 200],
          msg: errMessages.en.rating.rating_quote_length,
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        msg: "you have already add this service!",
        fields: ["masterId", "guestId"],
      },
    ],
  }
);

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

Rating.belongsTo(User, {
  as: "master",
});
Rating.belongsTo(User, {
  as: "guest",
});

module.exports = Rating;
