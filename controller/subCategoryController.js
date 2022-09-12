const errorHandler = require("../helper/error-handler");

module.exports = {
  FindAll: async (req, res, next) => {
    try {
      const { page, size } = req.query;

      const { filters } = req.params;

      const { subCategory, total } = await req.uC.subCategoryUC.FindAll(
        page,
        size,
        filters
      );

      res.status(200).json({
        success: true,
        status: 200,
        total,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  FindOne: async (req, res, next) => {
    try {
      const { subCategory_id } = req.params;

      const subCategory = await req.uC.subCategoryUC.FindOne(subCategory_id);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      res.status(200).json({
        success: true,
        status: 200,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Create: async (req, res, next) => {
    try {
      const subCategory = await req.uC.subCategoryUC.Create(req.body);

      res.status(201).json({
        success: true,
        status: 201,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Update: async (req, res, next) => {
    try {
      const { subCategory_id } = req.params;

      const subCategoryCheck = await req.uC.subCategoryUC.FindOne(
        subCategory_id
      );

      if (!subCategoryCheck)
        return next(new errorHandler("subCategory not found", 404));

      const subCategory = await req.uC.subCategoryUC.Update(
        subCategoryCheck,
        req.body
      );

      res.status(200).json({
        success: true,
        status: 200,
        subCategory,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Delete: async (req, res, next) => {
    try {
      const { subCategory_id } = req.params;

      const subCategoryCheck = await req.uC.subCategoryUC.FindOne(
        subCategory_id
      );

      if (!subCategoryCheck)
        return next(new errorHandler("subCategory not found", 404));

      await req.uC.subCategoryUC.Delete(subCategoryCheck);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete sub category",
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },
};
