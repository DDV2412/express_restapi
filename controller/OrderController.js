const loggerWinston = require("../helpers/logs-winston");
const errorHandler = require("../helpers/error-handler");
const { orderValidation } = require("../validation");
const path = require("path");
const fs = require("fs");

module.exports = {
  allOrder: async (req, res, next) => {
    const { page, size } = req.query;

    const order = await req.orderUC.allOrder(page, size);

    res.json({
      success: true,
      total: order.total,
      order: order.product,
      currentPage: order.currentPage,
      countPage: order.countPage,
    });
  },
  getOrder: async (req, res, next) => {},
  createOrder: async (req, res, next) => {},
  updateOrder: async (req, res, next) => {},
  updateStatus: async (req, res, next) => {},
  cancelOrder: async (req, res, next) => {},
};
