const errorHandler = require("../helpers/Error-Handler");
const { categoryValidation } = require("../validation");

module.exports = {
  allCategories: async (req, res, next) => {
    /**
      #swagger.tags = ['Category']
      #swagger.summary = 'Category List'
      #swagger.description = 'Category List'
      #swagger.parameters["filters"] = {in: 'query'},
      #swagger.responses[200] = {
            description: 'Category List',
            schema: {
                    "success": true,
    "total": 0,
    "category": [
        
    ]              
            }
      }
      */
    const { filters } = req.query;

    let category = await req.categoryUC.allCategories(filters);

    if (category == null) {
      category = [];
    }

    res.json({
      success: true,
      total: category.total,
      category: category.category,
    });
  },

  getByID: async (req, res, next) => {
    /**
      #swagger.tags = ['Category']
      #swagger.summary = 'Category By ID'
      #swagger.description = 'Category By ID'
      #swagger.responses[200] = {
            description: 'Category By ID',
            schema: {
                    success: true,
                    category: {},              
            }
      }
      #swagger.responses[404] = {
            description: 'Category By ID Error',
            schema: {
                    success: false,
                    message: "Category not found",             
            }
      }
      */
    const { category_id } = req.params;

    const category = await req.categoryUC.getByID(category_id);

    if (!category) return next(new errorHandler("Category not found", 404));

    res.json({
      success: true,
      category,
    });
  },

  createCategory: async (req, res, next) => {
    /**
      #swagger.tags = ['Category']
      #swagger.summary = 'Create Category'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Category'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Category',
            required: true,
            schema: {
              "name": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Create Category',
            schema: {
                    "success": true,
                    "category": {
                       "id": "d1ca87f7-6882-47d7-a4b0-62132034024a",
                       "name": "Computer and Laptop",
                       "updatedAt": "2022-10-21T06:41:30.486Z",
                       "createdAt": "2022-10-21T06:41:30.486Z",
                    }                            
            }
      }
      #swagger.responses[403] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Cannot insert new category now, try again later",             
            }
      }
      */
    const { error } = categoryValidation({
      name: req.body["name"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const category = await req.categoryUC.createCategory(req.body);

    if (category == null) {
      return next(
        new errorHandler("Cannot insert new category now, try again later", 403)
      );
    }

    res.json({
      success: true,
      category,
    });
  },

  updateCategory: async (req, res, next) => {
    /**
      #swagger.tags = ['Category']
      #swagger.summary = 'Update Category By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Category By ID'
       #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Category By ID',
            required: true,
            schema: {
              "name": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Update Category',
            schema: {
                    "success": true,
                    "category": {
                       "id": "d1ca87f7-6882-47d7-a4b0-62132034024a",
                       "name": "Computer and Laptop",
                       "updatedAt": "2022-10-21T06:41:30.486Z",
                       "createdAt": "2022-10-21T06:41:30.486Z",
                    }                            
            }
      }
      #swagger.responses[403] = {
            description: 'Category Error',
            schema: {
                    success: false,
                    message: "Cannot insert new category now, try again later",             
            }
      }
      #swagger.responses[400] = {
            description: 'Category Error',
            schema: {
                    success: false,
                    message: "Category not found",             
            }
      }
      */

    const { category_id } = req.params;

    const categoryCheck = await req.categoryUC.getByID(category_id);

    if (!categoryCheck)
      return next(new errorHandler("Category not found", 404));

    const { error } = categoryValidation({
      name: req.body["name"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    await req.categoryUC.updateCategory(category_id, req.body);

    res.json({
      success: true,
      message: "Successfully updated category",
    });
  },

  deleteCategory: async (req, res, next) => {
    /**
      #swagger.tags = ['Category']
      #swagger.summary = 'Delete Category By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Category By ID'
      #swagger.responses[200] = {
            description: 'Delete Category By ID',
            schema: {
                    success: true,
                    message: "Category deleted successfully",       
            }
      }
      #swagger.responses[404] = {
            description: 'Category Error',
            schema: {
                    success: false,
                    message: "Category not found",             
            }
      }
      */
    const { category_id } = req.params;

    const categoryCheck = await req.categoryUC.getByID(category_id);

    if (!categoryCheck)
      return next(new errorHandler("Category not found", 404));

    await req.categoryUC.deleteCategory(category_id);

    res.json({
      success: true,
      message: "Successfully deleted category",
    });
  },
};
