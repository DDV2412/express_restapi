const errorHandler = require("../helper/error-handler");

module.exports = {
  allCarts: async (req, res, next) => {
    
    let { filters } = req.query;
    let cart = await req.cartUC.allCarts(filters);
    if (cart == null) {
      cart = [];
    }

    res.json({
      success: true,
      total: cart.total || 0,
      cart: cart.cart,
    });
  },

  getByID: async (req, res, next) => {
   
    let cart_id  = req.params;
    let cart = await req.cartUC.getByID(cart_id);
    if (!cart) return next(new errorHandler("cart not found", 404));

    res.json({
      success: true,
      cart,
    });
  },

  createCart: async (req, res, next) => {
    
    let cart = req.body
    let createCart = await req.cartUC.createCart(cart);
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

//   todo update

// todo delete
  
};
