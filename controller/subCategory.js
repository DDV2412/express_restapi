const errorHandler = require("../helpers/Error-Handler");
const { subCategoryValidation } = require("../validation");

module.exports = {
  allSubCats: async (req, res, next) => {
    /**
        #swagger.tags = ['Sub Category']
        #swagger.summary = 'Sub category product list'
        #swagger.description = 'Sub category product list'
        #swagger.responses[200] = {
          description: 'Sub category product successfully.',
          schema: [{ $ref: '#/definitions/SubCategory' }]
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
        #swagger.summary = 'Sub category product by ID'
        #swagger.description = 'Sub category product by ID'
        #swagger.responses[200] = {
          description: 'Sub category product successfully.',
          schema: [{ $ref: '#/definitions/SubCategory' }]
        }
        #swagger.responses[404] = {
          description: 'Sub category product not found.',
          schema: {
            success: false,
            
            message: "Sub category not found"
          }
        }
       */
    const { subCategory_id } = req.params;

    const subCategory = await req.subCategoryUC.getByID(subCategory_id);

    if (!subCategory)
      return next(new errorHandler("subCategory not found", 404));

    res.json({
      success: true,
      subCategory,
    });
  },

  createSubCat: async (req, res, next) => {
    /**
        #swagger.tags = ['Sub Category']
        #swagger.summary = 'Create sub category product '
        #swagger.description = 'Create sub category product '
         #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add new sub category',
                required: true,
                schema: {
                    $ref: '#/definitions/CreateSubCategory'
                }
            }
        #swagger.responses[201] = {
          description: 'Successfully added new sub category.',
          schema: { $ref: '#/definitions/SubCategory' }
        }
        #swagger.responses[404] = {
          description: 'Category by ID not found',
          schema: {
            success: false,
            
            message: "Category not found"
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
        #swagger.summary = 'Update sub category product by ID'
        #swagger.description = 'Update sub category product by ID'
        #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Update sub category',
                required: true,
                schema: {
                    $ref: '#/definitions/CreateSubCategory'
                }
            }
        #swagger.responses[200] = {
          description: 'Successfully updated sub category.',
          schema: { $ref: '#/definitions/SubCategory' }
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
        #swagger.summary = 'Delete sub category product by ID'
        #swagger.description = 'Delete sub category product by ID'
        #swagger.responses[200] = {
          description: 'Successfully deleted sub category.',
          schema: { $ref: '#/definitions/SubCategory' }
        }
        #swagger.responses[404] = {
          description: 'Sub category not found,
          schema: {
            success: false,
            
            message: "Sub category not found"
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
