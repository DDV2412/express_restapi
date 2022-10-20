const errorHandler = require("../helpers/Error-Handler");

module.exports = {
  allCarts: async (req, res, next) => {
    /**
        #swagger.tags = ['Cart']
        #swagger.summary = 'Cart list'
        #swagger.description = 'Cart list'
        #swagger.responses[200] = {
          description: 'cart successfully.',
          schema: [{ $ref: '#/definitions/Cart' }]
        }
       */

    const { page, size } = req.query;

    let cart = await req.cartUC.allCarts(req.Customer["id"], page, size);

    res.json({
      success: true,
      total: cart.total,
      currentPage: cart.currentPage,
      countPage: cart.countPage,
      cart: cart.cart,
    });
  },

  getByID: async (req, res, next) => {
    /**
        #swagger.tags = ['Cart']
        #swagger.summary = 'Cart by ID'
        #swagger.description = 'Cart by ID'
        #swagger.responses[200] = {
          description: 'Cart successfully.',
          schema: [{ $ref: '#/definitions/Cart' }]
        }
        #swagger.responses[404] = {
          description: 'Cart not found.',
          schema: {
            success: false,
            message: "Cart not found"
          }
        }
       
       */
    let { cart_id } = req.params;
    let cart = await req.cartUC.getByID(cart_id);
    if (!cart) return next(new errorHandler("cart not found", 404));

    res.json({
      success: true,
      cart,
    });
  },

  createCart: async (req, res, next) => {
    /**
        #swagger.tags = ['Cart']
        #swagger.summary = 'Create Cart '
        #swagger.description = 'Create Cart '
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add cart',
            required: true,
            schema: {
              $ref: '#/definitions/CreateCart'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully added new cart.',
          schema: { $ref: '#/definitions/Cart' }
        }
        #swagger.responses[404] = {
          description: 'Product id not found',
          schema: {
            success: false, 
            
            message: "Product not found"
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
    req.body["customerId"] = req.Customer["id"];

    let createCart = await req.cartUC.createCart(req.body);
    if (createCart == null) {
      return next(
        new errorHandler("Cannot insert new cart now, try again later", 403)
      );
    }
    res.json({
      success: true,
      createCart,
    });
  },

  updateCart: async (req, res, next) => {
     /**
       #swagger.tags = ['Cart']
        #swagger.summary = 'Update Cart by ID'
        #swagger.description = 'Update cart by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add cart',
            required: true,
            schema: {
              $ref: '#/definitions/CreateCart'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully updated product.',
          schema: { $ref: '#/definitions/Cart' }
        }
        #swagger.responses[404] = {
          description: 'Product by ID not found',
          schema: {
            success: false,
            
            message: "Product not found"
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
    const { cart_id } = req.params;

    let cart = await req.cartUC.getByID(cart_id);

    if (!cart) return next(new errorHandler("cart not found", 404));

    await req.cartUC.updateCart(req.body, cart_id);

    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  },

  deleteCart: async (req, res, next) => {
    /**
        #swagger.tags = ['Cart']
        #swagger.summary = 'Delete cart by ID'
        #swagger.description = 'Delete  cart by ID'
        #swagger.responses[200] = {
          description: 'Successfully deleted cart.',
          schema: { $ref: '#/definitions/Cart' }
        }
        #swagger.responses[404] = {
          description: 'Cart not found,
          schema: {
            success: false,
            
            message: "Cart not found"
          }
        }
       
       */
    const { cart_id } = req.params;

    let cart = await req.cartUC.getByID(cart_id);

    if (!cart) return next(new errorHandler("cart not found", 404));

    await req.cartUC.deleteCart(cart_id);

    res.json({
      success: true,
      message: "Cart deleted successfully",
    });
  },
};
