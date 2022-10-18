const router = require("express").Router();
const { fileFilter, fileStrore } = require("../libs/multer");
const multer = require("multer");
const product = require("../controller/product");
const category = require("../controller/category");
const subCategory = require("../controller/subCategory");
const upload = require("../controller/fileUpload");
const custumer = require("../controller/customerControllers");
const auth = require("../controller/authController");
const { authentication, authorization } = require("../middleware/auth");
const custAddres = require("../controller/custAddressControllers");
const cart = require("../controller/cartController");

/**
 * File Upload
 */

router.post(
  "/upload-files/:path",
  authentication,
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
router.post("/product", authentication, authorization, product.createProduct);
router.put(
  "/product/:product_id",
  authentication,
  authorization,
  product.updateProduct
);
router.delete(
  "/product/:product_id",
  authentication,
  authorization,
  product.deleteProduct
);
router.delete(
  "/product-image/:product_imageId",
  authentication,
  authorization,
  product.removeProductImage
);

/**
 * Category controller
 */
router.get("/categories", category.allCategories);
router.get("/category/:category_id", category.getByID);
router.post(
  "/category",
  authentication,
  authorization,
  category.createCategory
);
router.put(
  "/category/:category_id",
  authentication,
  authorization,
  category.updateCategory
);
router.delete(
  "/category/:category_id",
  authentication,
  authorization,
  category.deleteCategory
);

/**
 * Sub category controller
 */
router.get("/sub-categories", subCategory.allSubCats);
router.get("/sub-category/:subCategory_id", subCategory.getByID);
router.post(
  "/sub-category",
  authentication,
  authorization,
  subCategory.createSubCat
);
router.put(
  "/sub-category/:subCategory_id",
  authentication,
  authorization,
  subCategory.updateSubCat
);
router.delete(
  "/sub-category/:subCategory_id",
  authentication,
  authorization,
  subCategory.deleteSubCat
);

/**
 * Customer
 */

/**
 * Admin Akses
 */
router.get("/customers", authentication, authorization, custumer.getAll);
router.get(
  "/customer/:customerId",
  authentication,
  authorization,
  custumer.getById
);

/**
 * Customer Akses
 */

router.get("/profile", authentication, custumer.profile);
router.put("/profile/password", authentication, custumer.updatePass);
router.put("/profile", authentication, custumer.updateProfile);
router.delete("/profile", authentication, custumer.delById);

/**
 * Customer Address
 */

router.get("/profile/address", authentication, custAddres.findAll);
router.get("/profile/address/:addressId", authentication, custAddres.findOne);
router.post("/profile/address", authentication, custAddres.create);
router.put("/profile/address/:addressId", authentication, custAddres.update);
router.delete(
  "/profile/address/:addressId",
  authentication,
  custAddres.delById
);

/**
 * Authentication
 */
router.post("/login", auth.Login);
router.post("/register", auth.Register);

/**
 * Cart
 */
router.get("/carts", authentication, cart.allCarts);
router.get("/cart/:cart_id", authentication, cart.getByID);
router.post("/cart", authentication, cart.createCart);
router.put("/cart/:cart_id", authentication, cart.updateCart);
router.delete("/cart/:cart_id", authentication, cart.deleteCart);

module.exports = router;
