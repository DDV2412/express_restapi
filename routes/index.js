const router = require("express").Router();
const {
  fileFilter,
  fileStrore,
  fileStroreProduct,
  fileStroreAvatar,
} = require("../lib/multer");
const multer = require("multer");
const product = require("../controller/product");
const category = require("../controller/category");
const subCategory = require("../controller/subCategory");
const upload = require("../controller/fileUpload");

/**
 * File Upload
 */

router.post(
  "/upload-files/product",
  multer({ storage: fileStroreProduct, fileFilter: fileFilter }).array(
    "imageProduct",
    10
  ),
  upload.uploadFileArray
);

router.get("/product-image/:fileName", upload.getProductImage);

router.get("/avatar/:fileName", upload.getAvatar);

router.post(
  "/upload-file/avatar",
  multer({ storage: fileStroreAvatar, fileFilter: fileFilter }).single(
    "photoProfile"
  ),
  upload.uploadFile
);
/**
 * Product controller
 */
router.get("/products", product.allProducts);
router.get("/product/:product_id", product.getByID);
router.post("/product", product.createProduct);
router.put("/product/:product_id", product.updateProduct);
router.delete("/product/:product_id", product.deleteProduct);
router.delete("/product-image/:product_imageId", product.removeProductImage);

/**
 * Category controller
 */
router.get("/categories", category.allCategories);
router.get("/category/:category_id", category.getByID);
router.post("/category", category.createCategory);
router.put("/category/:category_id", category.updateCategory);
router.delete("/category/:category_id", category.deleteCategory);

/**
 * Sub category controller
 */
router.get("/sub-categories", subCategory.allSubCats);
router.get("/sub-category/:subCategory_id", subCategory.getByID);
router.post("/sub-category", subCategory.createSubCat);
router.put("/sub-category/:subCategory_id", subCategory.updateSubCat);
router.delete("/sub-category/:subCategory_id", subCategory.deleteSubCat);
module.exports = router;
