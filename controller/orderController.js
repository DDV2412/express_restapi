const errorHandler = require("../helpers/Error-Handler");

module.exports = {
  allOrder: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Order List --Admin'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Order List --Admin'
      #swagger.parameters["page"] = {in: 'query'},
      #swagger.parameters["size"] = {in: 'query'},
      #swagger.responses[200] = {
            description: 'Order List',
            schema: {
                    success: true,
                    total: 0,
                    order: [],
                    currentPage: 0,
                    countPage: 0,             
            }
      }
      */
    const { page, size } = req.query;

    let order = await req.orderUC.allOrder(page, size);

    if (!order) {
      order = [];
    }

    res.json({
      success: true,
      total: order.total,
      order: order.order,
      currentPage: order.currentPage,
      countPage: order.countPage,
    });
  },
  getByID: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.security = [{ "Bearer": [] }]
      #swagger.summary = 'Order By ID --Admin'
      #swagger.description = 'Order By ID --Admin'
      #swagger.responses[200] = {
            description: 'Order By ID',
            schema: {
                    success: true,
                    order: {}           
            }
      }
      #swagger.responses[404] = {
            description: 'Order By ID',
            schema: {
                    success: false,
                    message: "Order not found"         
            }
      }
      */
    const { orderId } = req.params;

    const order = await req.orderUC.getByID(orderId);

    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    res.json({
      success: true,
      order: order,
    });
  },
  getOrders: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Order List --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Order List --Customer'
      #swagger.parameters["page"] = {in: 'query'},
      #swagger.parameters["size"] = {in: 'query'},
      #swagger.responses[200] = {
            description: 'Order List',
            schema: {
                    success: true,
                    total: 0,
                    order: [],
                    currentPage: 0,
                    countPage: 0,             
            }
      }
      */
    const { id } = req.Customer;
    const { page, size } = req.query;

    let order = await req.orderUC.getOrders(page, size, id);

    if (!order) {
      order = [];
    }
    res.json({
      success: true,
      total: order.total,
      order: order.order,
      currentPage: order.currentPage,
      countPage: order.countPage,
    });
  },
  getOrderDetail: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Order By ID --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Order By ID --Customer'
      #swagger.responses[200] = {
            description: 'Order By ID',
            schema: {
                    success: true,
                    order: {}           
            }
      }
      #swagger.responses[404] = {
            description: 'Order By ID',
            schema: {
                    success: false,
                    message: "Order not found"         
            }
      }
      */
    const { orderId } = req.params;
    const { id } = req.Customer;

    const order = await req.orderUC.getOrderDetail(orderId, id);

    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    res.json({
      success: true,
      order: order,
    });
  },
  createOrder: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Create Order --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Order --Customer'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Order',
            required: true,
            schema: {
              "cartId": "0881dffb-d31e-444a-9cd2-59beb453d7f2",
              "payment_method": "Cash"
            }
          },
      #swagger.responses[200] = {
            description: 'Create Order',
            schema: {
                    success: true,
                    order: {}           
            }
      }
      #swagger.responses[404] = {
            description: 'Create Order',
            schema: {
                    success: false,
                    message: "Cart not found"         
            }
      }
      #swagger.responses[403] = {
            description: 'Create Order',
            schema: {
                    success: false,
                    message: "Cannot order this product now, try again later"         
            }
      }
      */
    const { cartId } = req.body;

    const cart = await req.cartUC.getByID(cartId);

    if (!cart) return next(new errorHandler("Cart not found", 404));

    if (cart["customerId"] !== req.Customer["id"]) {
      return next(
        new errorHandler("Cannot order this product now, try again later", 403)
      );
    }

    const product = await req.productUC.getByID(cart["productId"]);

    if (!product) {
      return next(
        new errorHandler("Cannot order this product now, try again later", 403)
      );
    }

    if (product["stock"] == 0) {
      return next(new errorHandler("This product has been sold", 403));
    }

    req.body["amount"] = cart["qty"] * product["price"];

    const order = await req.orderUC.createOrder(req.body);

    if (!order) {
      return next(
        new errorHandler("Cannot order this product now, try again later", 403)
      );
    }

    res.json({
      success: true,
      order,
    });
  },
  updateStatus: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Update Status Order --Admin'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Status Order --Admin'
      #swagger.responses[200] = {
            description: 'Update Status Order',
            schema: {
                    success: true,
                    message: "Successfully approved order by ID"         
            }
      }
      */

    const { orderId } = req.params;

    const order = await req.orderUC.getByID(orderId);

    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    await req.orderUC.updateStatus(orderId);

    res.json({
      success: true,
      message: "Successfully approved order by ID " + orderId,
    });
  },
  cancelOrder: async (req, res, next) => {
    /**
      #swagger.tags = ['Order']
      #swagger.summary = 'Cancel Status Order --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Cancel Status Order --Customer'
      #swagger.responses[200] = {
            description: 'Cancel Status Order',
            schema: {
                    success: true,
                    message: "Successfully canceled order by ID"         
            }
      }
      */
    const { orderId } = req.params;

    const order = await req.orderUC.getByID(orderId);

    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    await req.orderUC.cancelOrder(orderId, req.Customer["id"]);

    res.json({
      success: true,
      message: "Successfully canceled order by ID " + orderId,
    });
  },
};
