const { ShoppingCart, Product, users } = require("../models");
const loggerWinston = require("../helpers/logs-winston");
const Pagination = require("../helpers/Requestpagination");

class CartRepository {
  constructor() {
    this.ShoppingCart = ShoppingCart;
    this.Product = Product;
    this.users = users;
  }

  allCarts = async (customerId, page, size) => {
    try {
      const { limit, offset } = new Pagination(page, size);
      const cart = await this.ShoppingCart.findAndCountAll({
        where: {
          customerId: customerId,
        },
        limit,
        offset,
      });

      return {
        cart: cart.rows,
        total: cart.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(cart.count / limit),
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
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  createCart = async (createData) => {
    try {
      return await this.ShoppingCart.create(createData);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  updateCart = async (updateData, id) => {
    try {
      return await this.ShoppingCart.update(updateData, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  deleteCart = async (id) => {
    try {
      return await this.ShoppingCart.destroy({
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

module.exports = CartRepository;
