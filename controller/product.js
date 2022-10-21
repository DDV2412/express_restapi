const errorHandler = require("../helpers/Error-Handler");
const { productValidation } = require("../validation");

module.exports = {
  allProducts: async (req, res, next) => {
    /**
      #swagger.tags = ['Product']
      #swagger.summary = 'Product List'
      #swagger.description = 'Product List'
      #swagger.parameters["page"] = {in: 'query'},
      #swagger.parameters["size"] = {in: 'query'},
      #swagger.parameters["filters"] = {in: 'query'},
      #swagger.responses[200] = {
            description: 'Product List',
            schema: {
                    "success": true,
    "total": 0,
    "product": [
        
    ], 
    currentPage: 0,
    countPage: 0,        
            }
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
      #swagger.summary = 'Product By ID'
      #swagger.description = 'Product By ID'
      #swagger.responses[200] = {
            description: 'Product By ID',
            schema: {
                    "success": true,
                    "product": {}      
            }
      }
      #swagger.responses[404] = {
            description: 'Product By ID Error',
            schema: {
                    "success": false,
                    "message": "Product not found"      
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
      #swagger.summary = 'Create Product'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Product'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Category',
            required: true,
            schema: {
              "subCatId": "8c6bec07-185d-4a25-abc9-7020b5b9a125",
    "name": "Asus ROG Ram 12GB SSD 512",
    "description": "Laptop Gaming",
    "stock": "10",
    "price": "12500000",
    "weight": "2.5",
    "image_product": [
        {
        "image_name": "01 Cover Journal IJEECS 2021.jpg",
        "image_url": "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg"
    }
    ]
            }
          },
      #swagger.responses[200] = {
            description: 'Create Product',
            schema: {
                    "success": true,
    "product": {
        "id": "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
        "subCatId": "8c6bec07-185d-4a25-abc9-7020b5b9a125",
        "name": "Asus ROG Ram 12GB SSD 512",
        "description": "Laptop Gaming",
        "stock": 10,
        "price": "12500000",
        "weight": "2.5",
        "variation": null,
        "createdAt": "2022-10-21T05:30:06.185Z",
        "updatedAt": "2022-10-21T05:30:06.185Z",
        },    
            }
      }
       #swagger.responses[403] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Cannot insert new product now, try again later",             
            }
      }
      #swagger.responses[404] = {
            description: 'Create Product Error',
            schema: {
                    "success": false,
                    "message": "Sub Category not found"      
            }
      }
      */
    const subCategory = await req.subCategoryUC.getByID(req.body.subCatId);

    if (!subCategory)
      return next(new errorHandler("Sub Category not found", 404));

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
      #swagger.summary = 'Update Product By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Product By ID'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Category',
            required: true,
            schema: {
              "name": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Update Product By ID',
            schema: {
                    "success": true,
                    "message": "Successfully updated product",  
            }
      }
      #swagger.responses[404] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Sub Category not found",             
            }
      }
      */
    const { product_id } = req.params;

    const productCheck = await req.productUC.getByID(product_id);

    if (!productCheck) return next(new errorHandler("Product not found", 404));

    const subCategory = await req.subCategoryUC.getByID(req.body.subCatId);

    if (!subCategory)
      return next(new errorHandler("subCategory not found", 404));

    await req.productUC.updateProduct(product_id, req.body);

    res.json({
      success: true,
      message: "Successfully updated product",
    });
  },

  deleteProduct: async (req, res, next) => {
    /**
      #swagger.tags = ['Product']
      #swagger.summary = 'Delete Product By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Product By ID'
      #swagger.responses[200] = {
            description: 'Delete Product By ID',
            schema: {
                    "success": true,
                    "message": "Successfully deleted product",
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
      #swagger.summary = 'Delete Image Product By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Image Product By ID'
      #swagger.responses[200] = {
            description: 'Delete Image Product By ID',
            schema: {
                    "success": true,
                    "message": "Successfully deleted image product",
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
