const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const guestData = "Guest Data";
const errMessages = require("./../validators/messages");
const AppError = require("./../utils/appError")
const validator = require("validator");
let allowNullRes;

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: Sequelize.ENUM("INDIVID", "COMPANY", "GUEST", "ADMIN"),
    defaultValue: "GUEST",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: errMessages.en.user.name,
      },
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: errMessages.en.user.username,
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: errMessages.en.user.email_format,
      },
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull:true,
    validate:{
      isGuest(value){
        if(value === null && this.role !== "GUEST"){
          throw new AppError("City is required!", 400)
        }
      }
    }
  },
  zip_code: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
  },
  adress: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img_url: {
    type: Sequelize.STRING,
  },

  membership: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  passwordResetToken: {
    type: Sequelize.STRING,
  },
  passwordResetExpires: {
    type: Sequelize.DATE,
  },
});

module.exports = User;
