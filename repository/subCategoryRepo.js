const { SubCategory, Product } = require("../models");
const loggerWinston = require("../helper/logs-winston");

class subCategoryUseCase {
  constructor() {
    this.SubCategory = SubCategory;
    this.Product = Product;
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
        include: [{ model: this.Product, as: "products" }],
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

  updateSubCat = async (subCategoryId, subCategoryUpdate) => {
    try {
      return await this.SubCategory.update(subCategoryUpdate, {
        where: {
          id: subCategoryId,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  deleteSubCat = async (subCategoryId) => {
    try {
      return await this.SubCategory.destroy({
        where: {
          id: subCategoryId,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
}

module.exports = subCategoryUseCase;
