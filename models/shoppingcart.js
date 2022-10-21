"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "customerId",
      });
      this.hasOne(models.Orders, {
        foreignKey: "cartId",
      });
    }
  }
  ShoppingCart.init(
    {
      customerId: DataTypes.UUID,
      productId: DataTypes.UUID,
      qty: DataTypes.INTEGER,
      variation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShoppingCart",
      tableName: "shopping_carts",
    }
  );
  ShoppingCart.beforeCreate(async (shoppingcart) => {
    shoppingcart["id"] = uuidv4();
  });
  return ShoppingCart;
};
