'use strict';
const uuid = require('uuid');
const {hash} = require('../helper/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     *         autoIncrement: true,This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    noPhone: DataTypes.BIGINT,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  
  users.addHook('beforeCreate', (user, options) => {
    try {
      user.id = uuid.v4();
      user.password = hash(user.password);
    } catch (err) {
      console.log('masuk');
      throw err;
    }
  });

  return users;
};