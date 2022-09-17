class subCategoryUseCase {
  constructor(subCategoryRepo) {
    this.subCategoryRepo = subCategoryRepo;
  }

  FindAll = async (filters) => {
    return await this.subCategoryRepo.FindAll(filters);
  };

  FindOne = async (id) => {
    return await this.subCategoryRepo.FindOne(id);
  };

  Create = async (createData) => {
    return await this.subCategoryRepo.Create(createData);
  };

  Update = async (subCategory, subCategoryUpdate) => {
    return await this.subCategoryRepo.Update(subCategory, subCategoryUpdate);
  };

  Delete = async (subCategory) => {
    return await this.subCategoryRepo.Delete(subCategory);
  };
}

module.exports = subCategoryUseCase;
