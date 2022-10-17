class cartUseCase {
    constructor(cartRepo) {
      this.cartRepo = cartRepo;
    }
  
    allCarts = async (filters) => {
      return await this.cartRepo.allCarts(filters);
    };
  
    getByID = async (id) => {
      return await this.cartRepo.getByID(id);
    };
  
    createCart = async (createData) => {
      return await this.cartRepo.createcart(createData);
    };
  
  }
  
  module.exports = cartUseCase;
  