class orderUseCase {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  allOrder = async (page, size) => {
    return await this.orderRepo.allOrder(page, size);
  };

  getOrders = async (page, size, customerId) => {
    return await this.orderRepo.getOrders(page, size, customerId);
  };

  getOrderDetail = async (orderId, customerId) => {
    return await this.orderRepo.getOrderDetail(orderId, customerId);
  };

  getByID = async (orderId) => {
    return await this.orderRepo.getByID(orderId);
  };

  createOrder = async (createOrder) => {
    return await this.orderRepo.createOrder(createOrder);
  };

  updateStatus = async (orderId) => {
    return await this.orderRepo.updateStatus(orderId);
  };

  cancelOrder = async (orderId, customerId) => {
    return await this.orderRepo.cancelOrder(orderId, customerId);
  };
}

module.exports = orderUseCase;
