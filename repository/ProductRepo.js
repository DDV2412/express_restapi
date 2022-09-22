const {
  Category,
  SubCategory,
  Product,
  Sequelize,
  ProductImage,
} = require("../models");
const fs = require("fs");
const Pagination = require("../helper/pagination-option");
const loggerWinston = require("../helper/logs-winston");
const path = require("path");

class productRepo {
  constructor() {
    this.Product = Product;
    this.Sequelize = Sequelize;
    this.Category = Category;
    this.SubCategory = SubCategory;
    this.ProductImage = ProductImage;
  }

  allProducts = async (page, size, filters) => {
    try {
      const { limit, offset } = new Pagination(page, size);

      let _where = filters
        ? {
            [this.Sequelize.Op.or]: {
              name: { [this.Sequelize.Op.iLike]: `%${filters}%` },
              description: { [this.Sequelize.Op.iLike]: `%${filters}%` },
            },
          }
        : {};
      const product = await this.Product.findAndCountAll({
        where: _where,
        include: [
          { model: this.SubCategory, include: [this.Category] },
          this.ProductImage,
        ],
        limit,
        offset,
        distinct: true,
      });

      return {
        product: product.rows,
        total: product.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(product.count / limit),
      };
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  getByID = async (id) => {
    try {
      return await this.Product.findOne({
        where: {
          id: id,
        },
        include: [
          { model: this.SubCategory, include: [this.Category] },
          this.ProductImage,
        ],
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  createProduct = async (createData) => {
    try {
      return await this.Product.create(createData);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  updateProduct = async (product, productUpdate) => {
    try {
      return await product.update(productUpdate);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  deleteProduct = async (product) => {
    try {
      return await product.destroy();
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  addProductImage = async (productData) => {
    try {
      return await this.ProductImage.create(productData);
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  removeProductImage = async (productImage_id) => {
    try {
      const productImage = await this.ProductImage.findOne({
        where: {
          id: productImage_id,
        },
      });

      fs.unlink(
        productImage["url"].replace(
          `http://localhost:5000/api/product-image`,
          path.join(__dirname + "/../static/products")
        ),
        (err) => {
          if (err) {
            return;
          }
        }
      );

      return await productImage.destroy();
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
}

module.exports = productRepo;
