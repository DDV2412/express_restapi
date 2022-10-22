"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
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
  resetPassword.init(
    {
      email: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      expired_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "resetPassword",
    }
  );
  resetPassword.beforeCreate(async (reset) => {
    reset["id"] = uuidv4();
  });
  return resetPassword;
};
