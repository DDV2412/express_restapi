const errorHandler = require("../helper/error-handler");
const { productValidation } = require("../validation");

module.exports = {
  FindAll: async (req, res, next) => {
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

      const { product, total } = await req.uC.productUC.FindAll(
        page,
        size,
        filters
      );

      res.status(200).json({
        success: true,
        status: 200,
        total,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  FindOne: async (req, res, next) => {
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

      const product = await req.uC.productUC.FindOne(product_id);

      if (!product) return next(new errorHandler("Product not found", 404));

      res.status(200).json({
        success: true,
        status: 200,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Create: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['Product']
        #swagger.summary = 'Create product '
        #swagger.description = 'Create product '
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['product_image'] = {
          in: 'formData',
          type: 'array',
          description: 'Add product image',
          required: true,
          collectionFormat: 'multi',
          items: { type: 'file' }
        }
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add product',
          required: true,
          schema: {
              $ref: '#/definitions/CreateProduct'
          }
        }
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
      const subCategory = await req.uC.subCategoryUC.FindOne(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      const { error } = productValidation(req.body);

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      if (typeof req.files === "undefined" || req.files.length == 0) {
        return next(new errorHandler("No file upload", 500));
      }

      const product = await req.uC.productUC.Create(req.body);

      req.files.map(async (file) => {
        if (typeof file["originalname"] !== "undefined") {
          await req.uC.productUC.AddProductImage({
            productId: product["id"],
            name: file["originalname"],
            url: file["path"],
          });
        }
      });

      res.status(201).json({
        success: true,
        status: 201,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Update: async (req, res, next) => {
    try {
      /**
       #swagger.tags = ['Product']
        #swagger.summary = 'Update product by ID'
        #swagger.description = 'Update product by ID'
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['product_image'] = {
          in: 'formData',
          type: 'array',
          description: 'Add product image',
          required: true,
          collectionFormat: 'multi',
          items: { type: 'file' }
        }
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Update product',
          required: true,
          schema: {
              $ref: '#/definitions/CreateProduct'
          }
        }
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

      const productCheck = await req.uC.productUC.FindOne(product_id);

      if (!productCheck)
        return next(new errorHandler("Product not found", 404));

      const subCategory = await req.uC.subCategoryUC.FindOne(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      const { error } = productValidation(req.body);

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      if (typeof req.files !== "undefined" && req.files.length != 0) {
        req.files.map(async (file) => {
          if (typeof file["originalname"] !== "undefined") {
            await req.uC.productUC.AddProductImage({
              productId: productCheck["id"],
              name: file["originalname"],
              url: file["path"],
            });
          }
        });
      }

      const product = await req.uC.productUC.Update(productCheck, req.body);

      res.status(200).json({
        success: true,
        status: 200,
        product,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Delete: async (req, res, next) => {
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

      const productCheck = await req.uC.productUC.FindOne(product_id);

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
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  RemoveProductImage: async (req, res, next) => {
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

      await req.uC.productUC.RemoveProductImage(product_imageId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete image product",
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },
};
