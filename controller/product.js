const errorHandler = require("../helper/error-handler");
const { productValidation } = require("../validation");

module.exports = {
  allProducts: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Product list'
        #swagger.description = 'Product list'
        #swagger.responses[200] = {
          description: 'Product successfully.',
          schema: [{ $ref: '#/definitions/Products' }]
        }
       
       */

      const { page, size, filters } = req.query;

      let products = await req.uC.productUC.allProducts(page, size, filters);

      if (products == null) {
        products = [];
      }

      res.status(200).json({
        success: true,
        status: 200,
        total: products.total,
        products: products.product,
        currentPage: products.currentPage,
        countPage: products.countPage,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  getByID: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Product by ID'
        #swagger.description = 'Product by ID'
        #swagger.responses[200] = {
          description: 'Product successfully.',
          schema: [{ $ref: '#/definitions/Products' }]
        }
        #swagger.responses[404] = {
          description: 'Product not found.',
          schema: {
            success: false,
            status: 404,
            message: "Product not found"
          }
        }
       
       */
      const { product_id } = req.params;

      const product = await req.uC.productUC.getByID(product_id);

      if (!product) return next(new errorHandler("Product not found", 404));

      res.status(200).json({
        success: true,
        status: 200,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  createProduct: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Create product '
        #swagger.description = 'Create product '
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add product',
            required: true,
            schema: {
              $ref: '#/definitions/CreateProduct'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully added new product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Sub category by ID not found',
          schema: {
            success: false,
            status: 400,
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            status: 400,
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            status: 500,
            message: "____"
          }
        }
       
       */
      const subCategory = await req.uC.subCategoryUC.getByID(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      const { error } = productValidation({
        subCatId: req.body["subCatId"],
        name: req.body["name"],
        description: req.body["description"],
        stock: req.body["stock"],
        price: req.body["price"],
        weight: req.body["weight"],
      });

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      if (
        typeof req.body.imageProduct === "undefined" ||
        req.body.imageProduct.length == 0
      ) {
        return next(new errorHandler("No file upload", 500));
      }

      const product = await req.uC.productUC.createProduct(req.body);

      req.body.imageProduct.map(async (image) => {
        return await req.uC.productUC.addProductImage({
          productId: product["id"],
          name: image["filename"],
          url: image["path"],
        });
      });

      req.res.status(201).json({
        success: true,
        status: 201,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      /**
       #swagger.tags = ['Product']
        #swagger.summary = 'Update product by ID'
        #swagger.description = 'Update product by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add product',
            required: true,
            schema: {
              $ref: '#/definitions/CreateProduct'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully updated product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Sub category by ID not found',
          schema: {
            success: false,
            status: 400,
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            status: 400,
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            status: 500,
            message: "____"
          }
        }
       
       */
      const { product_id } = req.params;

      const productCheck = await req.uC.productUC.getByID(product_id);

      if (!productCheck)
        return next(new errorHandler("Product not found", 404));

      const subCategory = await req.uC.subCategoryUC.getByID(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      const { error } = productValidation({
        subCatId: req.body["subCatId"],
        name: req.body["name"],
        description: req.body["description"],
        stock: req.body["stock"],
        price: req.body["price"],
        weight: req.body["weight"],
      });

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      const product = await req.uC.productUC.updateProduct(
        productCheck,
        req.body
      );

      if (
        typeof req.body.imageProduct !== "undefined" &&
        req.body.imageProduct.length != 0
      ) {
        req.body.imageProduct.map(async (image) => {
          return await req.uC.productUC.addProductImage({
            productId: product["id"],
            name: image["filename"],
            url: image["path"],
          });
        });
      }

      res.status(200).json({
        success: true,
        status: 200,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Delete product by ID'
        #swagger.description = 'Delete  product by ID'
        #swagger.responses[200] = {
          description: 'Successfully deleted product.',
          schema: { $ref: '#/definitions/Products' }
        }
        #swagger.responses[404] = {
          description: 'Product not found,
          schema: {
            success: false,
            status: 404,
            message: "Product not found"
          }
        }
       
       */
      const { product_id } = req.params;

      const productCheck = await req.uC.productUC.getByID(product_id);

      if (!productCheck)
        return next(new errorHandler("Product not found", 404));

      if (productCheck["ProductImages"].length != 0) {
        productCheck["ProductImages"].map((file) => {
          fs.unlink(file["url"], (e) => {
            if (e) {
              return;
            }
          });
        });
      }
      await req.uC.productUC.Delete(productCheck);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete product",
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  removeProductImage: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Product images'
        #swagger.description = 'Product images'
        #swagger.responses[200] = {
          description: 'Successfully deleted product image',
          schema: [{ $ref: '#/definitions/ProductImage' }]
        }
        #swagger.responses[404] = {
          description: 'Product image by ID not found',
          schema: {
            success: false,
            status: 400,
            message: "Product image not found"
          }
        }
       
       */
      const { product_imageId } = req.params;

      await req.uC.productUC.removeProductImage(product_imageId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete image product",
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },
};
