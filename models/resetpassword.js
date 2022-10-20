'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resetPassword.init({
    email: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'resetPassword',
  });
  return resetPassword;
};