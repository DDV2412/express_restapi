const { Category, SubCategory } = require("../models");

class categotyRepo {
  constructor() {
    this.Category = Category;
    this.SubCategory = SubCategory;
  }

  FindAll = async (page, size, filters) => {
    const category = await this.Category.findAndCountAll();

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
