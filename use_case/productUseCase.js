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

  updateProduct = async (product, productUpdate) => {
    return await this.productRepo.updateProduct(product, productUpdate);
  };

  deleteProduct = async (product) => {
    return await this.productRepo.deleteProduct(product);
  };

  addProductImage = async (productData) => {
    return await this.productRepo.addProductImage(productData);
  };

  removeProductImage = async (productImage_id) => {
    return await this.productRepo.removeProductImage(productImage_id);
  };
}

module.exports = productUseCase;
