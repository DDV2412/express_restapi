const categoryController = require("../controller/category");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  allCategories,
  getByID,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../mocks/categoryMock");

const mockCategoryUC = {
  allCategories: jest.fn().mockReturnValue(allCategories),
  getByID: jest.fn().mockReturnValue(getByID),
  createCategory: jest.fn().mockReturnValue(createCategory),
  updateCategory: jest.fn().mockReturnValue(updateCategory),
  deleteCategory: jest.fn().mockReturnValue(deleteCategory),
};

describe("Category Testing", () => {
  test("Get All", async () => {
    let req = mockRequest({}, {}, {}, { categoryUC: mockCategoryUC });

    let res = mockResponse();

    await categoryController.allCategories(req, res, jest.fn());

    expect(mockCategoryUC.allCategories).toBeCalledWith(req.query.filters);
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      category: [
        {
          id: "ed306697-d189-47be-a0a7-3039660ee3e5",
          name: "Computer and Laptop",
          createdAt: "2022-10-21T05:29:40.304Z",
          updatedAt: "2022-10-21T05:29:40.304Z",
          sub_categories: [
            {
              id: "8c6bec07-185d-4a25-abc9-7020b5b9a125",
              catId: "ed306697-d189-47be-a0a7-3039660ee3e5",
              name: "Laptop",
              createdAt: "2022-10-21T05:29:50.550Z",
              updatedAt: "2022-10-21T05:29:50.550Z",
            },
          ],
        },
      ],
    });
  });

  test("Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { category_id: "ed306697-d189-47be-a0a7-3039660ee3e5" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.getByID(req, res, jest.fn());

    expect(mockCategoryUC.getByID).toBeCalledWith(req.params["category_id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      category: {
        id: "ed306697-d189-47be-a0a7-3039660ee3e5",
        name: "Computer and Laptop",
        createdAt: "2022-10-21T05:29:40.304Z",
        updatedAt: "2022-10-21T05:29:40.304Z",
        sub_categories: [
          {
            id: "8c6bec07-185d-4a25-abc9-7020b5b9a125",
            catId: "ed306697-d189-47be-a0a7-3039660ee3e5",
            name: "Laptop",
            createdAt: "2022-10-21T05:29:50.550Z",
            updatedAt: "2022-10-21T05:29:50.550Z",
          },
        ],
      },
    });
  });

  test("Create Category", async () => {
    let req = mockRequest(
      { name: "Computer and Laptop" },
      {},
      {},
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.createCategory(req, res, jest.fn());

    expect(mockCategoryUC.createCategory).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      success: true,
      category: {
        id: "ed306697-d189-47be-a0a7-3039660ee3e5",
        name: "Computer and Laptop",
        createdAt: "2022-10-21T05:29:40.304Z",
        updatedAt: "2022-10-21T05:29:40.304Z",
      },
    });
  });

  test("Update By ID", async () => {
    let req = mockRequest(
      { name: "Computer and Laptop" },
      {},
      { category_id: "ed306697-d189-47be-a0a7-3039660ee3e5" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.updateCategory(req, res, jest.fn());

    expect(mockCategoryUC.updateCategory).toBeCalledWith(
      req.params["category_id"],
      req.body
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully updated category",
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { category_id: "ed306697-d189-47be-a0a7-3039660ee3e5" },
      { categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await categoryController.deleteCategory(req, res, jest.fn());

    expect(mockCategoryUC.deleteCategory).toBeCalledWith(
      req.params["category_id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully deleted category",
    });
  });
});
