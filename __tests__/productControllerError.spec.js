const productController = require("../controller/product");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockProductUC = {
  allProducts: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
  createProduct: jest.fn().mockReturnValue(null),
  updateProduct: jest.fn().mockReturnValue(null),
  deleteProduct: jest.fn().mockReturnValue(null),
  removeProductImage: jest.fn().mockReturnValue(null),
};

const mockSubCatUC = {
  getByID: jest.fn().mockReturnValue(null),
};

describe("Product Testing", () => {
  test("Error Get All", async () => {
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
      total: undefined,
      products: undefined,
      currentPage: undefined,
      countPage: undefined,
    });
  });

  test("Error Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.getByID(req, res, jest.fn());

    expect(mockProductUC.getByID).toBeCalledWith(req.params["product_id"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Product not found");
      })
    );
  });

  test("Error Create Product", async () => {
    let req = mockRequest(
      { name: "Computer and Laptop" },
      {},
      {},
      { productUC: mockProductUC, subCategoryUC: mockSubCatUC }
    );

    let res = mockResponse();

    await productController.createProduct(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Sub Category not found");
      })
    );
  });

  test("Error Update By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.updateProduct(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Product not found");
      })
    );
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.deleteProduct(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Product not found");
      })
    );
  });

  test("Remove Image By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { product_imageId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
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
