"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: "subCatId",
        as: "products",
      });
      this.belongsTo(models.Category, {
        foreignKey: "catId",
        as: "category",
      });
    }
  }
  SubCategory.init(
    {
      catId: DataTypes.UUID,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubCategory",
      tableName: "sub_categories",
    }
  );
  SubCategory.beforeCreate((subCategory) => {
    subCategory["id"] = uuidv4();
  });
  return SubCategory;
};
