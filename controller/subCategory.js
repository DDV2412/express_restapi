const errorHandler = require("../helper/error-handler");
const { subCategoryValidation } = require("../validation");

module.exports = {
  allSubCats: async (req, res, next) => {
    try {
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

      let subCategory = await req.uC.subCategoryUC.allSubCats(filters);

      if (subCategory == null) {
        subCategory = [];
      }

      res.status(200).json({
        success: true,
        status: 200,
        total: subCategory.total,
        subCategory: subCategory.subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  getByID: async (req, res, next) => {
    try {
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
            status: 404,
            message: "Sub category not found"
          }
        }
       */
      const { subCategory_id } = req.params;

      const subCategory = await req.uC.subCategoryUC.getByID(subCategory_id);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      res.status(200).json({
        success: true,
        status: 200,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  createSubCat: async (req, res, next) => {
    try {
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
            status: 400,
            message: "Category not found"
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

      const { error } = subCategoryValidation({
        name: req.body.name,
      });

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      const subCategory = await req.uC.subCategoryUC.createSubCat(req.body);

      res.status(201).json({
        success: true,
        status: 201,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  updateSubCat: async (req, res, next) => {
    try {
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
      const { subCategory_id } = req.params;

      const subCategoryCheck = await req.uC.subCategoryUC.getByID(
        subCategory_id
      );

      if (!subCategoryCheck)
        return next(new errorHandler("subCategory not found", 404));

      const { error } = subCategoryValidation({
        name: req.body["name"],
      });

      if (error)
        return next(new errorHandler(error["details"][0].message, 400));

      const subCategory = await req.uC.subCategoryUC.updateSubCat(
        subCategoryCheck,
        req.body
      );

      res.status(200).json({
        success: true,
        status: 200,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  deleteSubCat: async (req, res, next) => {
    try {
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
            status: 404,
            message: "Sub category not found"
          }
        }
       */
      const { subCategory_id } = req.params;

      const subCategoryCheck = await req.uC.subCategoryUC.getByID(
        subCategory_id
      );

      if (!subCategoryCheck)
        return next(new errorHandler("subCategory not found", 404));

      await req.uC.subCategoryUC.deleteSubCat(subCategoryCheck);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete sub category",
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },
};
