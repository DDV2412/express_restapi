class cartUseCase {
  constructor(cartRepo) {
    this.cartRepo = cartRepo;
  }

  allCarts = async (customerId, page, size) => {
    return await this.cartRepo.allCarts(customerId, page, size);
  };

  getByID = async (id) => {
    return await this.cartRepo.getByID(id);
  };

  createCart = async (createData) => {
    return await this.cartRepo.createCart(createData);
  };

  updateCart = async (createData, id) => {
    return await this.cartRepo.updateCart(createData, id);
  };

  deleteCart = async (id) => {
    return await this.cartRepo.deleteCart(id);
  };
}

module.exports = cartUseCase;
