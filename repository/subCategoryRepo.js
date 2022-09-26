const { SubCategory } = require("../models");
const loggerWinston = require("../helper/logs-winston");

class subCategoryUseCase {
  constructor() {
    this.SubCategory = SubCategory;
  }

  allSubCats = async (filters) => {
    try {
      const subCategory = await this.SubCategory.findAndCountAll({
        where: filters
          ? {
              name: filters,
            }
          : {},
      });

      return {
        subCategory: subCategory.rows,
        total: subCategory.count,
      };
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  getByID = async (id) => {
    try {
      return await this.SubCategory.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  createSubCat = async (createData) => {
    try {
      return await this.SubCategory.create(createData);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  updateSubCat = async (subCategory, subCategoryUpdate) => {
    try {
      return await subCategory.update(subCategoryUpdate);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  deleteSubCat = async (subCategory) => {
    try {
      return await subCategory.destroy();
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
}

module.exports = subCategoryUseCase;
