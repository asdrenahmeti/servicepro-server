const Sequelize = require("sequelize");
const sequelize = require("./../db/db_connection");
const Service = require("./Service");
const User = require("./User");

const User_service = sequelize.define("user_service", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasMany(User_service)
User_service.belongsTo(User)
Service.hasMany(User_service);
User_service.belongsTo(Service);

User.belongsToMany(Service,{
    through:{
        model: User_service,
        unique: false
    }
})
Service.belongsToMany(User, {
  through: {
    model: User_service,
    unique: false,
  },
});


module.exports = User_service;
