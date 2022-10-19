const loggerWinston = require("../helpers/logs-winston");
const errorHandler = require("../helpers/error-handler");
const { orderValidation } = require("../validation");
const path = require("path");
const fs = require("fs");

module.exports = {
  allOrder: async (req, res, next) => {
    /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Product list'
        #swagger.description = 'Product list'
        #swagger.responses[200] = {
          description: 'Product successfully.',
          schema: [{ $ref: '#/definitions/Products' }]
        }
       
       */

    const { page, size, filters } = req.query;

    let order = await req.orderUC.allOrder(page, size, filters);

    if (order == null) {
      order = [];
    }

    res.json({
      success: true,
      total: products.total,
      products: products.product,
      currentPage: products.currentPage,
      countPage: products.countPage,
    });
  },

  getByID: async (req, res, next) => {
    /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Product by ID'
        #swagger.description = 'Product by ID'
        #swagger.responses[200] = {
          description: 'Product successfully.',
          schema: [{ $ref: '#/definitions/Products' }]
        }
        #swagger.responses[404] = {
          description: 'Product not found.',
          schema: {
            success: false,
            
            message: "Product not found"
          }
        }
       
       */
    const { product_id } = req.params;

    const product = await req.orderUC.getByID(product_id);
お
    if (!product) return next(new errorHandler("order not found", 404));

    res.json({
      success: true,
      product,
    });
  },

  createOrder: async (req, res, next) => {
    /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Create product '
        #swagger.description = 'Create product '
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add product',
            required: true,
            schema: {
              $ref: '#/definitions/CreateProduct'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully added new product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Sub category by ID not found',
          schema: {
            success: false,
            
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
       
       */
    const order = await req.orderUC.getByID(req.body.subCatId);

    if (!order)
      return next(new errorHandler("order not found", 404));

    const { error } = orderValidation({
      status: req.body["status"],
      amount: req.body["amount"],
      payment_method: req.body["payment_method"],
      cartId: req.body["cartId"],
      confirm_payment: req.body["confirm_payment"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const product = await req.productUC.createOrder(req.body);

    if (product == null) {
      return next(
        new errorHandler("Cannot insert new product now, try again later", 403)
      );
    }

    res.json({
      success: true,
      product,
    });
  },

  updateOrder: async (req, res, next) => {
    /**
       #swagger.tags = ['Product']
        #swagger.summary = 'Update product by ID'
        #swagger.description = 'Update product by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add product',
            required: true,
            schema: {
              $ref: '#/definitions/CreateProduct'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully updated product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Sub category by ID not found',
          schema: {
            success: false,
            
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
       
       */
    const { orders } = req.params;

    const orderCheck = await req.orderUC.getByID(orders);

    if (!orderCheck) return next(new errorHandler("Order not found", 404));

    if (!subCategory)
      return next(new errorHandler("subCategory not found", 404));

      const { error } = orderValidation({
        cartID: req.body["cartID"],
      });
  
      if (error) return next(new errorHandler(error["details"][0].message, 400));
  
      await req.subCategoryUC.updateOrder(cartID, req.body);
  
      res.json({
        success: true,
        message: "Successfully updated order",
      });
    },
  

  deleteOrder: async (req, res, next) => {
    /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Delete product by ID'
        #swagger.description = 'Delete  product by ID'
        #swagger.responses[200] = {
          description: 'Successfully deleted product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Product not found,
          schema: {
            success: false,
            
            message: "Product not found"
          }
        }
       
       */
    const { orders } = req.params;

    const order = await req.productUC.getByID(orders);

    if (!order) return next(new errorHandler("order not found", 404));

    await req.orderUC.deleteOrder(orders);

    res.json({
      success: true,
      message: "Successfully deleted order",
    });
  },
}
