class productUseCase {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  allProducts = async (page, size, filters) => {
    return await this.productRepo.allProducts(page, size, filters);
  };

  getByID = async (id) => {
    return await this.productRepo.getByID(id);
  };

  createProduct = async (createData) => {
    return await this.productRepo.createProduct(createData);
  };

  updateProduct = async (productId, productUpdate) => {
    return await this.productRepo.updateProduct(productId, productUpdate);
  };

  deleteProduct = async (productId) => {
    return await this.productRepo.deleteProduct(productId);
  };

  removeProductImage = async (productImage_id) => {
    return await this.productRepo.removeProductImage(productImage_id);
  };
}

module.exports = productUseCase;
