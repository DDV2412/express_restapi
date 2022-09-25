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

  updateCategory = async (category, categoryUpdate) => {
    return await this.categoryRepo.updateCategory(category, categoryUpdate);
  };

  deleteCategory = async (category) => {
    return await this.categoryRepo.deleteCategory(category);
  };
}

module.exports = categoryUseCase;
