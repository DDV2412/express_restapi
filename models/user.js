'use strict';
const uuid = require('uuid');
const hash = require('../helper/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    noPhone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.addHook('beforeCreate', (user) => {
    try {
      user.id = uuid.v4();
      user.password = hash(user.password);
    } catch (err) {
      throw err;
    }
  });
  return User;
};