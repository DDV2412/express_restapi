const errorHandler = require("../helpers/Error-Handler");

module.exports = {
  allCarts: async (req, res, next) => {
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
    let { cart_id } = req.params;
    let cart = await req.cartUC.getByID(cart_id);
    if (!cart) return next(new errorHandler("cart not found", 404));

    res.json({
      success: true,
      cart,
    });
  },

  createCart: async (req, res, next) => {
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
