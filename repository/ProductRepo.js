const {
  Category,
  SubCategory,
  Product,
  Sequelize,
  ProductImage,
} = require("../models");
const fs = require("fs");
const Pagination = require("../helper/pagination-option");

class productRepo {
  constructor() {
    this.Product = Product;
    this.Sequelize = Sequelize;
    this.Category = Category;
    this.SubCategory = SubCategory;
    this.ProductImage = ProductImage;
  }

  FindAll = async (page, size, filters) => {
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
    };
  };

  FindOne = async (id) => {
    return await this.Product.findOne({
      where: {
        id: id,
      },
      include: [
        { model: this.SubCategory, include: [this.Category] },
        this.ProductImage,
      ],
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

  AddProductImage = async (productData) => {
    return await this.ProductImage.create(productData);
  };

  RemoveProductImage = async (productImage_id) => {
    const productImage = await this.ProductImage.findOne({
      where: {
        id: productImage_id,
      },
    });

    fs.unlink(productImage["url"], (err) => {
      if (err) {
        return;
      }
    });

    return await productImage.destroy();
  };
}

module.exports = productRepo;
