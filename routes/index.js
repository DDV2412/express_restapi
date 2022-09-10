const router = require("express").Router();

/**
 * Product controller
 */
router.get("/products", require("../controller/productController").FindAll);
router.get(
  "/product/:product_id",
  require("../controller/productController").FindOne
);
router.post("/product", require("../controller/productController").Create);
router.put(
  "/product/:product_id",
  require("../controller/productController").Update
);
router.delete(
  "/product/:product_id",
  require("../controller/productController").Delete
);

/**
 * Category controller
 */
router.get("/categories", require("../controller/categoryController").FindAll);
router.get(
  "/category/:category_id",
  require("../controller/categoryController").FindOne
);
router.post("/category", require("../controller/categoryController").Create);
router.put(
  "/category/:category_id",
  require("../controller/categoryController").Update
);
router.delete(
  "/category/:category_id",
  require("../controller/categoryController").Delete
);

/**
 * Sub category controller
 */
router.get(
  "/sub-categories",
  require("../controller/subCategoryController").FindAll
);
router.get(
  "/sub-category/:subCategory_id",
  require("../controller/subCategoryController").FindOne
);
router.post(
  "/sub-category",
  require("../controller/subCategoryController").Create
);
router.put(
  "/sub-category/:subCategory_id",
  require("../controller/subCategoryController").Update
);
router.delete(
  "/sub-category/:subCategory_id",
  require("../controller/subCategoryController").Delete
);
module.exports = router;
