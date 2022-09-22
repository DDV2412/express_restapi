class subCategoryUseCase {
  constructor(subCategoryRepo) {
    this.subCategoryRepo = subCategoryRepo;
  }

  allSubCats = async (filters) => {
    return await this.subCategoryRepo.allSubCats(filters);
  };

  getByID = async (id) => {
    return await this.subCategoryRepo.getByID(id);
  };

  createSubCat = async (createData) => {
    return await this.subCategoryRepo.createSubCat(createData);
  };

  updateSubCat = async (subCategory, subCategoryUpdate) => {
    return await this.subCategoryRepo.updateSubCat(
      subCategory,
      subCategoryUpdate
    );
  };

  deleteSubCat = async (subCategory) => {
    return await this.subCategoryRepo.deleteSubCat(subCategory);
  };
}

module.exports = subCategoryUseCase;
