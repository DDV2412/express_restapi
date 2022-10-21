const { Orders, ShoppingCart } = require("../models");
const Pagination = require("../helpers/Requestpagination");
const loggerWinston = require("../helpers/logs-winston");

class orderRepo {
  constructor() {
    this.Orders = Orders;
    this.ShoppingCart = ShoppingCart;
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
  getByID = async (orderId) => {
    try {
      return await this.Orders.findOne({
        where: {
          id: orderId,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  getOrders = async (page, size, customerId) => {
    try {
      const { limit, offset } = new Pagination(page, size);

      const order = await this.Orders.findAndCountAll({
        include: [
          {
            model: this.ShoppingCart,
            where: {
              customerId: customerId,
            },
          },
        ],
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

  getOrderDetail = async (orderId, customerId) => {
    try {
      return await this.Orders.findOne({
        where: {
          id: orderId,
        },
        include: [
          {
            model: this.ShoppingCart,
            where: {
              customerId: customerId,
            },
          },
        ],
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
  createOrder = async (createOrder) => {
    return await this.Orders.create(createOrder);
  };
  updateStatus = async (orderId) => {
    return await this.Orders.update(
      {
        status: "approved",
      },
      {
        where: {
          id: orderId,
        },
      }
    );
  };
  cancelOrder = async (orderId, customerId) => {
    return await this.Orders.update(
      {
        status: "cancel",
      },
      {
        where: {
          id: orderId,
        },
        include: [
          {
            model: this.ShoppingCart,
            where: {
              customerId: customerId,
            },
          },
        ],
      }
    );
  };
}

module.exports = orderRepo;
