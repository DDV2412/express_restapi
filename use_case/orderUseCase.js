class orderUseCase {
    constructor(orderRepo) {
      this.orderRepo = orderRepo;
    }
  
    allOrder = async (page, size, filters) => {
      return await this.orderRepo.allOrder(page, size, filters);
    };
  
    getByID = async (id) => {
      return await this.orderRepo.getByID(id);
    };
  
    createOrder = async (createOrder) => {
      return await this.orderRepo.createOrder(createOrder);
    };
  
    updateOrder = async (orderId, updateOrder) => {
      return await this.orderRepo.updateOrder(orderId, updateOrder);
    };
  
    deleteOrder = async (orderId) => {
      return await this.orderRepo.deleteOrder(orderId);
    };
  }
  
  module.exports = orderUseCase;