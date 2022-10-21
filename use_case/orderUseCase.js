class orderUseCase {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  allOrder = async (page, size) => {
    return await this.orderRepo.allOrder(page, size);
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

  updateStatus = async (orderId) => {
    return await this.orderRepo.updateStatus(orderId);
  };

  cancelOrder = async (orderId) => {
    return await this.orderRepo.cancelOrder(orderId);
  };
}

module.exports = orderUseCase;
