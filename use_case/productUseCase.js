class productUseCase {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  FindAll = async (page, size, filters) => {
    return await this.productRepo.FindAll(page, size, filters);
  };

  FindOne = async (id) => {
    return await this.productRepo.FindOne(id);
  };

  Create = async (createData) => {
    return await this.productRepo.Create(createData);
  };

  Update = async (product, productUpdate) => {
    return await this.productRepo.Update(product, productUpdate);
  };

  Delete = async (product) => {
    return await this.productRepo.Delete(product);
  };

  AddProductImage = async (productData) => {
    return await this.productRepo.AddProductImage(productData);
  };
  RemoveProductImage = async (productImage_id) => {
    return await this.productRepo.RemoveProductImage(productImage_id);
  };
}

module.exports = productUseCase;
