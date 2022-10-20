const { Orders } = require("../models");
const fs = require("fs");
const Pagination = require("../helpers/Requestpagination");
const loggerWinston = require("../helpers/logs-winston");
const path = require("path");


class orderRepo {
  constructor() {
    this.Orders = Orders;
  }

  allOrder = async (filters) => {
    const dataOrders = req.query.dataOrders
    let condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  getOrder = async (id) => {
    try {
      return await this.Orders.findOne({
        where: {
          id: id,
        }
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  createOrder = async (createData) => {
    try {
      const { cartId, amount, status, payment_method,confirm_payment} = req.body;
        const orderItem = await Orders.findOne({
            where: {
                 id: req.body.id
            }
        });
          
        const order = {
            amount        : amount,
            status        : status,
            payment_method: payment_method,
            cartId : cartId,
            confirm_payment :confirm_payment
        }

        await Orders.create(order)
        .then(() => {
            res.status(201).send({
                status: "201",
                message: "Added order is successfully"
            })
        })
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  updateOrder = async () => {
    try {
      return await this.Orders.update(updateOrder, {
        where: {
          id: Id,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };

  deleteOrder = async () => {
    try {
      return await this.Orders.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);

      return null;
    }
  };
}

module.exports = orderRepo;