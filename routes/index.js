const router = require("express").Router();
const { fileFilter, fileStrore } = require("../lib/multer");
const multer = require("multer");
const product = require("../controller/product");
const category = require("../controller/category");
const subCategory = require("../controller/subCategory");
const upload = require("../controller/fileUpload");
const authorize = require('../middleware/jwt')
/**
 * File Upload
 */

router.post(
  "/upload-files/:path",
  multer({
    storage: fileStrore,
    fileFilter: fileFilter,
    limits: { fieldSize: 1 * 512 * 512 },
  }).any(),
  upload.uploadFile
);

/**
 * Product controller
 */
router.get("/products", product.allProducts);
router.get("/product/:product_id", product.getByID);
router.post("/product", authorize, product.createProduct);
router.put("/product/:product_id", authorize, product.updateProduct);
router.delete("/product/:product_id", authorize, product.deleteProduct);
router.delete("/product-image/:product_imageId", authorize, product.removeProductImage);

/**
 * Category controller
 */
router.get("/categories", category.allCategories);
router.get("/category/:category_id", category.getByID);
router.post("/category",  authorize, category.createCategory);
router.put("/category/:category_id",  authorize, category.updateCategory);
router.delete("/category/:category_id",  authorize, category.deleteCategory);

/**
 * Sub category controller
 */
router.get("/sub-categories", subCategory.allSubCats);
router.get("/sub-category/:subCategory_id", subCategory.getByID);
router.post("/sub-category",  authorize, subCategory.createSubCat);
router.put("/sub-category/:subCategory_id",  authorize, subCategory.updateSubCat);
router.delete("/sub-category/:subCategory_id",  authorize, subCategory.deleteSubCat);

module.exports = router;
