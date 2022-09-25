const { Category } = require("../models");
const loggerWinston = require("../helper/logs-winston");

class categotyRepo {
  constructor() {
    this.Category = Category;
  }

  allCategories = async (filters) => {
    try {
      const category = await this.Category.findAndCountAll({
        where: filters
          ? {
              name: filters,
            }
          : {},
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

  updateCategory = async (category, categoryUpdate) => {
    try {
      return await category.update(categoryUpdate);
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  deleteCategory = async (category) => {
    try {
      return await category.destroy();
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };
}

module.exports = categotyRepo;
