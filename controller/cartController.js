const errorHandler = require("../helpers/Error-Handler");

module.exports = {
  allCarts: async (req, res, next) => {
    /**
      #swagger.tags = ['Cart']
      #swagger.summary = 'Cart List'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.parameters["page"] = {in: 'query'},
      #swagger.parameters["size"] = {in: 'query'},
      #swagger.description = 'Cart List'
      #swagger.responses[200] = {
            description: 'Cart List',
            schema: {
                    success: true,
                    total: 0,
                    currentPage: 0,
                    countPage: 1,
                    cart: [],              
            }
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
      #swagger.summary = 'Cart By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Cart By ID'
      #swagger.responses[200] = {
            description: 'Cart By ID',
            schema: {
                    success: true,
                    cart: {},              
            }
      }
      #swagger.responses[404] = {
            description: 'Cart By ID Error',
            schema: {
                    success: false,
                    message: "Cart not found",             
            }
      }
      */
    let { cart_id } = req.params;
    let cart = await req.cartUC.getByID(cart_id);
    if (!cart) return next(new errorHandler("Cart not found", 404));

    res.json({
      success: true,
      cart,
    });
  },

  createCart: async (req, res, next) => {
    /**
      #swagger.tags = ['Cart']
      #swagger.summary = 'Create Cart'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Cart'
       #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Cart',
            required: true,
            schema: {
              "productId": "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
              "qty": 1
            }
          },
      #swagger.responses[200] = {
            description: 'Create Cart',
            schema: {
                    "success": true,
                    "createCart": {
                       "id": "d1ca87f7-6882-47d7-a4b0-62132034024a",
                       "productId": "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
                       "qty": 1,
                       "customerId": "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
                       "updatedAt": "2022-10-21T06:41:30.486Z",
                       "createdAt": "2022-10-21T06:41:30.486Z",
                       "variation": null
                    }                            
            }
      }
      #swagger.responses[403] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Cannot insert new cart now, try again later",             
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
      #swagger.summary = 'Update Cart By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Cart By ID'
       #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Cart By ID',
            required: true,
            schema: {
              "qty": 1,
              "variation": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Update Cart',
            schema: {
                    "success": true,
                    "createCart": {
                       "id": "d1ca87f7-6882-47d7-a4b0-62132034024a",
                       "productId": "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
                       "qty": 1,
                       "customerId": "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
                       "updatedAt": "2022-10-21T06:41:30.486Z",
                       "createdAt": "2022-10-21T06:41:30.486Z",
                       "variation": null
                    }                            
            }
      }
      #swagger.responses[404] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Cart not found",             
            }
      }
      */
    const { cart_id } = req.params;

    let cart = await req.cartUC.getByID(cart_id);

    if (!cart) return next(new errorHandler("Cart not found", 404));

    await req.cartUC.updateCart(req.body, cart_id);

    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  },

  deleteCart: async (req, res, next) => {
    /**
      #swagger.tags = ['Cart']
      #swagger.summary = 'Delete Cart By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Cart By ID'
      #swagger.responses[200] = {
            description: 'Delete Cart By ID',
            schema: {
                    success: true,
                    message: "Cart deleted successfully",       
            }
      }
      #swagger.responses[404] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Cart not found",             
            }
      }
      */
    const { cart_id } = req.params;

    let cart = await req.cartUC.getByID(cart_id);

    if (!cart) return next(new errorHandler("Cart not found", 404));

    await req.cartUC.deleteCart(cart_id);

    res.json({
      success: true,
      message: "Cart deleted successfully",
    });
  },
};
