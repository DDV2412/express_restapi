class categoryUseCase {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  FindAll = async (filters) => {
    return await this.categoryRepo.FindAll(filters);
  };

  FindOne = async (id) => {
    return await this.categoryRepo.FindOne(id);
  };

  Create = async (createData) => {
    return await this.categoryRepo.Create(createData);
  };

  Update = async (category, categoryUpdate) => {
    return await this.categoryRepo.Update(category, categoryUpdate);
  };

  Delete = async (category) => {
    return await this.categoryRepo.Delete(category);
  };
}

module.exports = categoryUseCase;
