const { Product } = require("../models");

class productRepo {
  constructor() {
    this.Product = Product;
  }

  FindAll = async (page, size, filters) => {
    const product = await this.Product.findAndCountAll();

    return {
      product: product.rows,
      total: product.count,
    };
  };

  FindOne = async (id) => {
    return await this.Product.findOne({
      where: {
        id: id,
      },
    });
  };

  Create = async (createData) => {
    return await this.Product.create(createData);
  };

  Update = async (product, productUpdate) => {
    return await product.update(productUpdate);
  };

  Delete = async (product) => {
    return await product.destroy();
  };
}

module.exports = productRepo;
