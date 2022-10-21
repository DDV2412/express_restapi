const { Orders } = require("../models");
const Pagination = require("../helpers/Requestpagination");
const loggerWinston = require("../helpers/logs-winston");

class orderRepo {
  constructor() {
    this.Orders = Orders;
  }

  allOrder = async (page, size) => {
    try {
      const { limit, offset } = new Pagination(page, size);

      const order = await this.Orders.findAndCountAll({
        offset,
        limit,
      });

      return {
        total: order.count,
        order: order.rows,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(order.count / limit),
      };
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
  getByID = async () => {};
  createOrder = async () => {};
  updateOrder = async () => {};
  updateStatus = async () => {};
  cancelOrder = async () => {};
}

module.exports = orderRepo;
