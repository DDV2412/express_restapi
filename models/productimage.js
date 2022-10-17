"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  ProductImage.init(
    {
      productId: DataTypes.UUID,
      name: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "product_images",
    }
  );
  ProductImage.beforeCreate(async (productImage) => {
    productImage["id"] = uuidv4();
  });
  return ProductImage;
};
