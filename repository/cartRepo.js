const { ShoppingCart, Product, users } = require("../models");
const loggerWinston = require("../helper/logs-winston");

class CartRepository {
  constructor() {
    this.ShoppingCart = ShoppingCart;
    this.Product = Product;
    this.users = users;

  }

  allCarts = async (filters) => {
    try {
      const cart = await this.ShoppingCart.findAndCountAll({
        where: filters
          ? {
              name: filters,
            }
          : {},
        include: [
            {
              model: this.Product,
              as: "productId",
            },
            {
              model: this.users,
              as: "customerId",
            },
        ],
      });

      return {
        cart: cart.rows,
        total: cart.count
      };
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  getByID = async (id) => {
    try {
      return await this.ShoppingCart.findOne({
        where: {
          id: id,
        },
        include: [{ model: this.Product, as: "products" }],
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  createSubCat = async (createData) => {
    try {
      return await this.ShoppingCart.create(createData);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
}

module.exports = CartRepository;
