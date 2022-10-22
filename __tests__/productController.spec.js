const productController = require("../controller/product");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  allProducts,
  getByID,
  createProduct,
  updateProduct,
  deleteProduct,
  removeProductImage,
} = require("../mocks/productMock");
const { getByID: subId } = require("../mocks/subCategoryMock");

const mockProductUC = {
  allProducts: jest.fn().mockReturnValue(allProducts),
  getByID: jest.fn().mockReturnValue(getByID),
  createProduct: jest.fn().mockReturnValue(createProduct),
  updateProduct: jest.fn().mockReturnValue(updateProduct),
  deleteProduct: jest.fn().mockReturnValue(deleteProduct),
  removeProductImage: jest.fn().mockReturnValue(removeProductImage),
};

const mockSubCatUC = {
  getByID: jest.fn().mockReturnValue(subId),
};

describe("Product Testing", () => {
  test("Get All", async () => {
    let req = mockRequest({}, {}, {}, { productUC: mockProductUC });

    let res = mockResponse();

    await productController.allProducts(req, res, jest.fn());

    expect(mockProductUC.allProducts).toBeCalledWith(
      req.query.page,
      req.query.size,
      req.query.filters
    );
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      products: [
        {
          id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
          subCatId: "af54a78a-d125-4efd-9300-972b40f04a48",
          name: "Asus ROG Ram 12GB SSD 512",
          description: "Laptop Gaming",
          stock: 10,
          price: "12500000",
          weight: "2.5",
          variation: null,
          createdAt: "2022-10-22T00:32:30.862Z",
          updatedAt: "2022-10-22T00:32:30.862Z",
          sub_category: {
            id: "af54a78a-d125-4efd-9300-972b40f04a48",
            catId: "bae1886e-9f03-4e2e-a0c1-b88a5fce2257",
            name: "Laptop",
            createdAt: "2022-10-22T00:32:14.162Z",
            updatedAt: "2022-10-22T00:32:14.162Z",
            category: {
              id: "bae1886e-9f03-4e2e-a0c1-b88a5fce2257",
              name: "Computer and Laptop",
              createdAt: "2022-10-22T00:31:48.590Z",
              updatedAt: "2022-10-22T00:31:48.590Z",
            },
          },
          image_product: [
            {
              id: "9cbbac7a-d48c-4475-b72f-95bf6fdfefaf",
              productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
              name: "01 Cover Journal IJEECS 2021.jpg",
              url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
              createdAt: "2022-10-22T00:32:30.880Z",
              updatedAt: "2022-10-22T00:32:30.880Z",
            },
          ],
        },
      ],
      currentPage: 0,
      countPage: 1,
    });
  });

  test("Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.getByID(req, res, jest.fn());

    expect(mockProductUC.getByID).toBeCalledWith(req.params["product_id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      product: {
        id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
        subCatId: "af54a78a-d125-4efd-9300-972b40f04a48",
        name: "Asus ROG Ram 12GB SSD 512",
        description: "Laptop Gaming",
        stock: 10,
        price: "12500000",
        weight: "2.5",
        variation: null,
        createdAt: "2022-10-22T00:32:30.862Z",
        updatedAt: "2022-10-22T00:32:30.862Z",
        sub_category: {
          id: "af54a78a-d125-4efd-9300-972b40f04a48",
          catId: "bae1886e-9f03-4e2e-a0c1-b88a5fce2257",
          name: "Laptop",
          createdAt: "2022-10-22T00:32:14.162Z",
          updatedAt: "2022-10-22T00:32:14.162Z",
          category: {
            id: "bae1886e-9f03-4e2e-a0c1-b88a5fce2257",
            name: "Computer and Laptop",
            createdAt: "2022-10-22T00:31:48.590Z",
            updatedAt: "2022-10-22T00:31:48.590Z",
          },
        },
        image_product: [
          {
            id: "9cbbac7a-d48c-4475-b72f-95bf6fdfefaf",
            productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
            name: "01 Cover Journal IJEECS 2021.jpg",
            url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
            createdAt: "2022-10-22T00:32:30.880Z",
            updatedAt: "2022-10-22T00:32:30.880Z",
          },
        ],
      },
    });
  });

  test("Create Product", async () => {
    let req = mockRequest(
      {
        subCatId: "af54a78a-d125-4efd-9300-972b40f04a48",
        name: "Asus ROG Ram 12GB SSD 512",
        description: "Laptop Gaming",
        stock: "10",
        price: "12500000",
        weight: "2.5",
        image_product: [
          {
            image_name: "01 Cover Journal IJEECS 2021.jpg",
            image_url:
              "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
          },
        ],
      },
      {},
      {},
      { productUC: mockProductUC, subCategoryUC: mockSubCatUC }
    );

    let res = mockResponse();

    await productController.createProduct(req, res, jest.fn());

    expect(mockProductUC.createProduct).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      success: true,
      product: {
        id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
        subCatId: "af54a78a-d125-4efd-9300-972b40f04a48",
        name: "Asus ROG Ram 12GB SSD 512",
        description: "Laptop Gaming",
        stock: 10,
        price: "12500000",
        weight: "2.5",
        updatedAt: "2022-10-22T00:32:30.862Z",
        createdAt: "2022-10-22T00:32:30.862Z",
        variation: null,
      },
    });
  });

  test("Update By ID", async () => {
    let req = mockRequest(
      { name: "Asus ROG Ram 12GB SSD 512" },
      {},
      { product_id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59" },
      { productUC: mockProductUC, subCategoryUC: mockSubCatUC }
    );

    let res = mockResponse();

    await productController.updateProduct(req, res, jest.fn());

    expect(mockProductUC.updateProduct).toBeCalledWith(
      req.params["product_id"],
      req.body
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully updated product",
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "57b91278-b2d7-4c07-ad34-0b2c6be23b59" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.deleteProduct(req, res, jest.fn());

    expect(mockProductUC.deleteProduct).toBeCalledWith(
      req.params["product_id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully deleted product",
    });
  });

  test("Remove Image By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_imageId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.removeProductImage(req, res, jest.fn());

    expect(mockProductUC.removeProductImage).toBeCalledWith(
      req.params["product_imageId"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully deleted image product",
    });
  });
});
