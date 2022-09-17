const { Category, SubCategory, Product } = require("../models");

class categotyRepo {
  constructor() {
    this.Category = Category;
    this.SubCategory = SubCategory;
    this.Product = Product;
  }

  FindAll = async (filters) => {
    const category = await this.Category.findAndCountAll({
      where: filters
        ? {
            name: filters,
          }
        : {},
      include: [{ model: this.SubCategory, include: [this.Product] }],
    });

    return {
      category: category.rows,
      total: category.count,
    };
  };

  FindOne = async (id) => {
    return await this.Category.findOne({
      where: {
        id: id,
      },
      include: [{ model: this.SubCategory, include: [this.Product] }],
    });
  };

  Create = async (createData) => {
    return await this.Category.create(createData);
  };

  Update = async (category, categoryUpdate) => {
    return await category.update(categoryUpdate);
  };

  Delete = async (category) => {
    return await category.destroy();
  };
}

module.exports = categotyRepo;
