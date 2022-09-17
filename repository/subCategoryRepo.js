const { SubCategory, Category, Product } = require("../models");

class subCategoryUseCase {
  constructor() {
    this.SubCategory = SubCategory;
    this.Category = Category;
    this.Product = Product;
  }

  FindAll = async (filters) => {
    const subCategory = await this.SubCategory.findAndCountAll({
      where: filters
        ? {
            name: filters,
          }
        : {},
      include: [this.Category, this.Product],
    });

    return {
      subCategory: subCategory.rows,
      total: subCategory.count,
    };
  };

  FindOne = async (id) => {
    return await this.SubCategory.findOne({
      where: {
        id: id,
      },
      include: [this.Category, this.Product],
    });
  };

  Create = async (createData) => {
    return await this.SubCategory.create(createData);
  };

  Update = async (subCategory, subCategoryUpdate) => {
    return await subCategory.update(subCategoryUpdate);
  };

  Delete = async (subCategory) => {
    return await subCategory.destroy();
  };
}

module.exports = subCategoryUseCase;
