const categoryController = require("../controller/category");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockCategoryUC = {
  allCategories: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
  createCategory: jest.fn().mockReturnValue(null),
  updateCategory: jest.fn().mockReturnValue(null),
  deleteCategory: jest.fn().mockReturnValue(null),
};

describe("Cart Testing", () => {
  test("Error Get All", async () => {
    let req = mockRequest({}, {}, {}, { categoryUC: mockCategoryUC });

    let res = mockResponse();

    await categoryController.allCategories(req, res, jest.fn());

    expect(mockCategoryUC.allCategories).toBeCalledWith(req.query.filters);
    expect(res.json).toBeCalledWith({
      success: true,
      total: undefined,
      category: undefined,
    });
  });

  test("Error Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { category_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.getByID(req, res, jest.fn());

    expect(mockCategoryUC.getByID).toBeCalledWith(req.params["category_id"]);

    jest.fn().mockImplementation(() => {
      throw Error("Category not found");
    });
  });

  test("Error Create Category", async () => {
    let req = mockRequest(
      { name: "Computer and Laptop" },
      {},
      {},
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.createCategory(req, res, jest.fn());

    expect(mockCategoryUC.createCategory).toBeCalledWith(req.body);

    jest.fn().mockImplementation(() => {
      throw Error("Cannot insert new category now, try again later");
    });
  });

  test("Error Update By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { category_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.updateCategory(req, res, jest.fn());

    jest.fn().mockImplementation(() => {
      throw Error("Category not found");
    });
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { category_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.deleteCategory(req, res, jest.fn());

    jest.fn().mockImplementation(() => {
      throw Error("Category not found");
    });
  });
});
