const loggerWinston = require("../helper/logs-winston");
const errorHandler = require("../helper/error-handler");
const { productValidation } = require("../validation");
const path = require("path");
const fs = require("fs");

module.exports = {
  allProducts: async (req, res, next) => {
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

    let products = await req.productUC.allProducts(page, size, filters);

    if (products == null) {
      products = [];
    }

    res.json({
      success: true,
      total: products.total,
      products: products.product,
      currentPage: products.currentPage,
      countPage: products.countPage,
    });
  },

  getByID: async (req, res, next) => {
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
            
            message: "Product not found"
          }
        }
       
       */
    const { product_id } = req.params;

    const product = await req.productUC.getByID(product_id);

    if (!product) return next(new errorHandler("Product not found", 404));

    res.json({
      success: true,
      product,
    });
  },

  createProduct: async (req, res, next) => {
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
            
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
       
       */
    const subCategory = await req.subCategoryUC.getByID(req.body.subCatId);

    if (!subCategory)
      return next(new errorHandler("subCategory not found", 404));

    const { error } = productValidation({
      name: req.body["name"],
      description: req.body["description"],
      stock: req.body["stock"],
      price: req.body["price"],
      weight: req.body["weight"],
      image_product: req.body["image_product"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const product = await req.productUC.createProduct(req.body);

    if (product == null) {
      return next(
        new errorHandler("Cannot insert new product now, try again later", 403)
      );
    }

    res.json({
      success: true,
      product,
    });
  },

  updateProduct: async (req, res, next) => {
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
            
            message: "Sub category not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            success: false,
            
            message: "____"
          }
        }
       
       */
    const { product_id } = req.params;

    const productCheck = await req.productUC.getByID(product_id);

    if (!productCheck) return next(new errorHandler("Product not found", 404));

    const subCategory = await req.subCategoryUC.getByID(req.body.subCatId);

    if (!subCategory)
      return next(new errorHandler("subCategory not found", 404));

    const { error } = productValidation({
      name: req.body["name"],
      description: req.body["description"],
      stock: req.body["stock"],
      price: req.body["price"],
      weight: req.body["weight"],
      image_product: req.body["image_product"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    await req.productUC.updateProduct(product_id, req.body);

    res.json({
      success: true,
      message: "Successfully updated product",
    });
  },

  deleteProduct: async (req, res, next) => {
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
            
            message: "Product not found"
          }
        }
       
       */
    const { product_id } = req.params;

    const productCheck = await req.productUC.getByID(product_id);

    if (!productCheck) return next(new errorHandler("Product not found", 404));

    await req.productUC.deleteProduct(product_id);

    res.json({
      success: true,
      message: "Successfully deleted product",
    });
  },

  removeProductImage: async (req, res, next) => {
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
            
            message: "Product image not found"
          }
        }
       
       */
    const { product_imageId } = req.params;

    await req.productUC.removeProductImage(product_imageId);

    res.json({
      success: true,
      message: "Successfully deleted image product",
    });
  },
};
