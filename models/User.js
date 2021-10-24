const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const guestData = "Guest Data";
const errMessages = require("./../validators/messages");
const AppError = require("./../utils/appError")
const validator = require("validator");


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
    allowNull: false,
    defaultValue: guestData,
    validate: {
      ifIsNull(value) {
        if (value === "Guest Data" && this.role !== "GUEST") {
          throw new AppError(errMessages.en.user.city, 401);
        }
      },
    },
  },
  zip_code: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
    validate: {
      ifIsNull(value) {
        if (value === "Guest Data" && this.role !== "GUEST") {
          throw new AppError(errMessages.en.user.zip_code, 401);
        }
      },
    },
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
    validate: {
      ifIsNull(value) {
        if (value === "Guest Data" && this.role !== "GUEST") {
          throw new AppError(errMessages.en.user.country, 401);
        }
      },
    },
  },
  adress: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: guestData,
    validate: {
      ifIsNull(value) {
        if (value === "Guest Data" && this.role !== "GUEST") {
          throw new AppError(errMessages.en.user.adress, 401);
        }
      },
    },
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
