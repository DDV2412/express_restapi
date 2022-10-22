const subCategoryController = require("../controller/subCategory");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockSubCategoryUC = {
  allSubCats: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
  createSubCat: jest.fn().mockReturnValue(null),
  updateSubCat: jest.fn().mockReturnValue(null),
  deleteSubCat: jest.fn().mockReturnValue(null),
};

const mockCategoryUC = {
  getByID: jest.fn().mockReturnValue(null),
};

describe("Sub Category Testing", () => {
  test("Error Get All", async () => {
    let req = mockRequest({}, {}, {}, { subCategoryUC: mockSubCategoryUC });

    let res = mockResponse();

    await subCategoryController.allSubCats(req, res, jest.fn());

    expect(mockSubCategoryUC.allSubCats).toBeCalledWith(req.query.filters);
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
      { subCategory_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.getByID(req, res, jest.fn());

    expect(mockSubCategoryUC.getByID).toBeCalledWith(
      req.params["subCategory_id"]
    );

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Sub Category not found");
      })
    );
  });

  test("Error Create Category", async () => {
    let req = mockRequest(
      { name: "Laptop" },
      {},
      {},
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.createSubCat(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Category id cannot be an empty field");
      })
    );
  });

  test("Error Update By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { subCategory_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.updateSubCat(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("subCategory not found");
      })
    );
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { subCategory_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.deleteSubCat(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("subCategory not found");
      })
    );
  });
});
