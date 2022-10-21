class categoryUseCase {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  allCategories = async (filters) => {
    return await this.categoryRepo.allCategories(filters);
  };

  getByID = async (id) => {
    return await this.categoryRepo.getByID(id);
  };

  createCategory = async (createData) => {
    return await this.categoryRepo.createCategory(createData);
  };

  updateCategory = async (categoryId, categoryUpdate) => {
    return await this.categoryRepo.updateCategory(categoryId, categoryUpdate);
  };

  deleteCategory = async (categoryId) => {
    return await this.categoryRepo.deleteCategory(categoryId);
  };
}

module.exports = categoryUseCase;
