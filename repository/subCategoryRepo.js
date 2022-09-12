const { SubCategory } = require("../models");

class subCategoryUseCase {
  constructor() {
    this.SubCategory = SubCategory;
  }

  FindAll = async (page, size, filters) => {
    const subCategory = await this.SubCategory.findAndCountAll();

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
