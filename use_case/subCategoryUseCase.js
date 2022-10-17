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

  updateSubCat = async (subCategoryId, subCategoryUpdate) => {
    return await this.subCategoryRepo.updateSubCat(
      subCategoryId,
      subCategoryUpdate
    );
  };

  deleteSubCat = async (subCategoryId) => {
    return await this.subCategoryRepo.deleteSubCat(subCategoryId);
  };
}

module.exports = subCategoryUseCase;
