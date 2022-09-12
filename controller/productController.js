const errorHandler = require("../helper/error-handler");

module.exports = {
  FindAll: async (req, res, next) => {
    try {
      const { page, size } = req.query;

      const { filters } = req.params;

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
      const category = await req.uC.categoryUC.FindOne(req.body.catId);

      if (!category) return next(new errorHandler("Category not found", 404));

      const subCategory = await req.uC.subCategoryUC.FindOne(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

      const product = await req.uC.productUC.Create(req.body);

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
      const { product_id } = req.params;

      const productCheck = await req.uC.productUC.FindOne(product_id);

      if (!productCheck)
        return next(new errorHandler("Product not found", 404));

      const category = await req.uC.categoryUC.FindOne(req.body.catId);

      if (!category) return next(new errorHandler("Category not found", 404));

      const subCategory = await req.uC.subCategoryUC.FindOne(req.body.subCatId);

      if (!subCategory)
        return next(new errorHandler("subCategory not found", 404));

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
      const { product_id } = req.params;

      const productCheck = await req.uC.productUC.FindOne(product_id);

      if (!productCheck)
        return next(new errorHandler("Product not found", 404));

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
};
