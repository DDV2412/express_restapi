"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ShoppingCart, {
        foreignKey: "cartId",
      });
    }
  }
  Orders.init(
    {
      status: DataTypes.ENUM("pending", "approved", "rejected"),
      amount: DataTypes.BIGINT,
      cartId: DataTypes.UUID,
      payment_method: DataTypes.ENUM("cash", "credit"),
      confirm_payment: DataTypes.ENUM("Confirm Payment", "Cancel"),
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders",
    }
  );

  Orders.beforeCreate(async (order) => {
    order["id"] = uuidv4();
  });
  return Orders;
};
