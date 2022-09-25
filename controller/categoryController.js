const errorHandler = require("../helper/Error-Handler");

module.exports = {
  FindAll: async (req, res, next) => {
    try {
      const { page, size } = req.query;

      const { filters } = req.params;

      const { category, total } = await req.uC.categoryUC.FindAll(
        page,
        size,
        filters
      );

      res.status(200).json({
        success: true,
        status: 200,
        total,
        category,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  FindOne: async (req, res, next) => {
    try {
      const { category_id } = req.params;

      const category = await req.uC.categoryUC.FindOne(category_id);

      if (!category) return next(new errorHandler("Category not found", 404));

      res.status(200).json({
        success: true,
        status: 200,
        category,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Create: async (req, res, next) => {
    try {
      const category = await req.uC.categoryUC.Create(req.body);

      res.status(201).json({
        success: true,
        status: 201,
        category,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Update: async (req, res, next) => {
    try {
      const { category_id } = req.params;

      const categoryCheck = await req.uC.categoryUC.FindOne(category_id);

      if (!categoryCheck)
        return next(new errorHandler("Category not found", 404));

      const category = await req.uC.categoryUC.Update(categoryCheck, req.body);

      res.status(200).json({
        success: true,
        status: 200,
        category,
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },

  Delete: async (req, res, next) => {
    try {
      const { category_id } = req.params;

      const categoryCheck = await req.uC.categoryUC.FindOne(category_id);

      if (!categoryCheck)
        return next(new errorHandler("Category not found", 404));

      await req.uC.categoryUC.Delete(categoryCheck);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully delete category",
      });
    } catch (error) {
      return next(new errorHandler(error["errors"][0].message, 500));
    }
  },
};
