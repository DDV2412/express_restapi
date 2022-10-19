class categoryUseCase {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  allOrder = async (filters) => {
    return await this.categoryRepo.allOrder(filters);
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
