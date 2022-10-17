const {
  Category,
  SubCategory,
  Product,
  Sequelize,
  ProductImage,
} = require("../models");
const fs = require("fs");
const Pagination = require("../helpers/Requestpagination");
const loggerWinston = require("../helpers/logs-winston");
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
          {
            model: this.SubCategory,
            as: "sub_category",
            include: [
              {
                model: this.Category,
                as: "category",
              },
            ],
          },
          {
            model: this.ProductImage,
            as: "image_product",
          },
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
          {
            model: this.SubCategory,
            as: "sub_category",
            include: [
              {
                model: this.Category,
                as: "category",
              },
            ],
          },
          {
            model: this.ProductImage,
            as: "image_product",
          },
        ],
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  createProduct = async (createData) => {
    try {
      let product = await this.Product.create(createData);

      createData["image_product"].map(async (image) => {
        await this.ProductImage.create({
          productId: product["id"],
          name: image["image_name"],
          url: image["image_url"],
        });
      });

      return product;
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  updateProduct = async (productId, productUpdate) => {
    try {
      let product = await this.Product.update(productUpdate, {
        where: {
          id: productId,
        },
      });

      productUpdate["image_product"].map(async (image) => {
        const checking = await this.productImage.findOne({
          productId: product["id"],
          name: image["image_name"],
          url: image["image_url"],
        });

        if (!checking) {
          await this.ProductImage.create({
            productId: product["id"],
            name: image["image_name"],
            url: image["image_url"],
          });
        }
      });
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };

  deleteProduct = async (productId) => {
    try {
      return await this.Product.destroy({
        where: {
          id: productId,
        },
      });
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

      const dir = productImage["url"].replace(
        `${process.env.PROXY}:${process.env.PORT}`,
        path.join(__dirname + "/../static")
      );

      if (fs.existsSync(dir)) {
        fs.unlinkSync(dir);
      }

      return await productImage.destroy();
    } catch (error) {
      loggerWinston.error(error.message);
      return null;
    }
  };
}

module.exports = productRepo;
