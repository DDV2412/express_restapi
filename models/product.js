"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.SubCategory, {
        foreignKey: "subCatId",
        as: "sub_category",
      });

      this.hasMany(models.ProductImage, {
        foreignKey: "productId",
        as: "image_product",
      });
    }
  }
  Product.init(
    {
      subCatId: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      price: DataTypes.STRING,
      weight: DataTypes.STRING,
      variation: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  Product.beforeCreate(async (product) => {
    product["id"] = uuidv4();
  });
  return Product;
};
