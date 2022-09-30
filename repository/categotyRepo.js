const { Category, SubCategory } = require("../models");
const loggerWinston = require("../helper/logs-winston");

class categotyRepo {
  constructor() {
    this.Category = Category;
    this.SubCategory = SubCategory;
  }

  allCategories = async (filters) => {
    try {
      const category = await this.Category.findAndCountAll({
        where: filters
          ? {
              name: filters,
            }
          : {},
        include: [{ model: this.SubCategory, as: "sub_categories" }],
      });

      return {
        category: category.rows,
        total: category.count,
      };
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  getByID = async (id) => {
    try {
      return await this.Category.findOne({
        where: {
          id: id,
        },
        include: [{ model: this.SubCategory, as: "sub_categories" }],
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  createCategory = async (createData) => {
    try {
      return await this.Category.create(createData);
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  updateCategory = async (categoryId, categoryUpdate) => {
    try {
      return await this.Category.update(categoryUpdate, {
        where: {
          id: categoryId,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  deleteCategory = async (categoryId) => {
    try {
      return await this.Category.destroy(categoryUpdate, {
        where: {
          id: categoryId,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };
}

module.exports = categotyRepo;
