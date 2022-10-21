const errorHandler = require("../helpers/Error-Handler");
const { subCategoryValidation } = require("../validation");

module.exports = {
  allSubCats: async (req, res, next) => {
    /**
      #swagger.tags = ['Sub Category']
      #swagger.summary = 'Sub Category List'
      #swagger.description = 'Sub Category List'
      #swagger.parameters["filters"] = {in: 'query'},
      #swagger.responses[200] = {
            description: 'Sub Category List',
            schema: {
                    "success": true,
    "total": 1,
    "subCategory": [
        
    ]              
            }
      }
      */
    const { filters } = req.query;

    let subCategory = await req.subCategoryUC.allSubCats(filters);

    if (subCategory == null) {
      subCategory = [];
    }

    res.json({
      success: true,
      total: subCategory.total,
      subCategory: subCategory.subCategory,
    });
  },

  getByID: async (req, res, next) => {
    /**
      #swagger.tags = ['Sub Category']
      #swagger.summary = 'Sub Category By ID'
      #swagger.description = 'Sub Category By ID'
      #swagger.responses[200] = {
            description: 'Sub Category By ID',
            schema: {
                    success: true,
                    subCategory: {},              
            }
      }
      #swagger.responses[404] = {
            description: 'Category By ID Error',
            schema: {
                    success: false,
                    message: "Sub Category not found",             
            }
      }
      */
    const { subCategory_id } = req.params;

    const subCategory = await req.subCategoryUC.getByID(subCategory_id);

    if (!subCategory)
      return next(new errorHandler("Sub Category not found", 404));

    res.json({
      success: true,
      subCategory,
    });
  },

  createSubCat: async (req, res, next) => {
    /**
      #swagger.tags = ['Sub Category']
      #swagger.summary = 'Create Sub Category'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Sub Category'
       #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Sub Category',
            required: true,
            schema: {
              "name": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Create Sub Category',
            schema: {
                    "success": true,
                    "category": {
                       "id": "d1ca87f7-6882-47d7-a4b0-62132034024a",
                       "catId": "d1ca87f7-6882-47d7-a4b0-62132034024a",
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
                    message: "Cannot insert new sub category now, try again later",             
            }
      }
      #swagger.responses[404] = {
            description: 'Cart Error',
            schema: {
                    success: false,
                    message: "Category id not found",             
            }
      }
      */
    let catId = req.body["catId"];

    if (!catId) {
      return next(
        new errorHandler("Category id cannot be an empty field", 400)
      );
    }

    const category = await req.categoryUC.getByID(catId);

    if (!category) {
      return next(new errorHandler("Category id not found", 404));
    }

    const { error } = subCategoryValidation({
      name: req.body.name,
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const subCategory = await req.subCategoryUC.createSubCat(req.body);

    if (subCategory == null) {
      return next(
        new errorHandler(
          "Cannot insert new sub category now, try again later",
          403
        )
      );
    }

    res.json({
      success: true,
      subCategory,
    });
  },

  updateSubCat: async (req, res, next) => {
    /**
      #swagger.tags = ['Sub Category']
      #swagger.summary = 'Update Sub Category By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Sub Category By ID'
       #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Sub Category By ID',
            required: true,
            schema: {
              "name": ""
            }
          },
      #swagger.responses[200] = {
            description: 'Update Sub Category',
            schema: {
                      success: true,
                     message: "Successfully updated sub category",
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
    const { subCategory_id } = req.params;

    const subCategoryCheck = await req.subCategoryUC.getByID(subCategory_id);

    if (!subCategoryCheck)
      return next(new errorHandler("subCategory not found", 404));

    const { error } = subCategoryValidation({
      name: req.body["name"],
    });

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    await req.subCategoryUC.updateSubCat(subCategory_id, req.body);

    res.json({
      success: true,
      message: "Successfully updated sub category",
    });
  },

  deleteSubCat: async (req, res, next) => {
    /**
      #swagger.tags = ['Sub Category']
      #swagger.summary = 'Delete Sub Category By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Sub Category By ID'
      #swagger.responses[200] = {
            description: 'Delete Sub Category By ID',
            schema: {
                    success: true,
                    message: "Sub Category deleted successfully",       
            }
      }
      #swagger.responses[404] = {
            description: 'Sub Category Error',
            schema: {
                    success: false,
                    message: "Sub Category not found",             
            }
      }
      */
    const { subCategory_id } = req.params;

    const subCategoryCheck = await req.subCategoryUC.getByID(subCategory_id);

    if (!subCategoryCheck)
      return next(new errorHandler("subCategory not found", 404));

    await req.subCategoryUC.deleteSubCat(subCategory_id);

    res.json({
      success: true,
      message: "Successfully deleted sub category",
    });
  },
};
