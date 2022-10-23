"use strict";
const { v4: uuidv4 } = require("uuid");
const { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CustAddress, {
        foreignKey: "cust_id",
      });
      this.hasMany(models.ShoppingCart, {
        foreignKey: "customerId",
      });
    }
  }
  users.init(
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      photoProfile: DataTypes.STRING,
      verified: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  users.addHook("beforeCreate", async (user, options) => {
    user.id = uuidv4();
    user.password = hash(user.password);
  });

  return users;
};
