const router = require("express").Router();
const { fileFilter, fileStrore } = require("../lib/multer");
const multer = require("multer");
const product = require("../controller/productController");
const category = require("../controller/categoryController");
const subCategory = require("../controller/subCategoryController");
/**
 * Product controller
 */
router.get("/products", product.FindAll);
router.get("/product/:product_id", product.FindOne);
router.post(
  "/product",
  multer({ storage: fileStrore, fileFilter: fileFilter }).array(
    "product_image",
    10
  ),
  product.Create
);

router.put(
  "/product/:product_id",
  multer({ storage: fileStrore, fileFilter: fileFilter }).array(
    "product_image",
    10
  ),
  product.Update
);
router.delete("/product/:product_id", product.Delete);
router.delete("/product-image/:product_imageId", product.RemoveProductImage);

/**
 * Category controller
 */
router.get("/categories", category.FindAll);
router.get("/category/:category_id", category.FindOne);
router.post("/category", category.Create);
router.put("/category/:category_id", category.Update);
router.delete("/category/:category_id", category.Delete);

/**
 * Sub category controller
 */
router.get("/sub-categories", subCategory.FindAll);
router.get("/sub-category/:subCategory_id", subCategory.FindOne);
router.post("/sub-category", subCategory.Create);
router.put("/sub-category/:subCategory_id", subCategory.Update);
router.delete("/sub-category/:subCategory_id", subCategory.Delete);
module.exports = router;
