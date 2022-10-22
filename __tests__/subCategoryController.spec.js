const subCategoryController = require("../controller/subCategory");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  allSubCats,
  getByID,
  createSubCat,
  updateSubCat,
  deleteSubCat,
} = require("../mocks/subCategoryMock");

const { getByID: categoryId } = require("../mocks/categoryMock");

const mockSubCategoryUC = {
  allSubCats: jest.fn().mockReturnValue(allSubCats),
  getByID: jest.fn().mockReturnValue(getByID),
  createSubCat: jest.fn().mockReturnValue(createSubCat),
  updateSubCat: jest.fn().mockReturnValue(updateSubCat),
  deleteSubCat: jest.fn().mockReturnValue(deleteSubCat),
};

const mockCategoryUC = {
  getByID: jest.fn().mockReturnValue(categoryId),
};

describe("Sub Category Testing", () => {
  test("Get All", async () => {
    let req = mockRequest({}, {}, {}, { subCategoryUC: mockSubCategoryUC });

    let res = mockResponse();

    await subCategoryController.allSubCats(req, res, jest.fn());

    expect(mockSubCategoryUC.allSubCats).toBeCalledWith(req.query.filters);
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      subCategory: [
        {
          id: "af54a78a-d125-4efd-9300-972b40f04a48",
          catId: "ed306697-d189-47be-a0a7-3039660ee3e5",
          name: "Laptop",
          createdAt: "2022-10-22T00:32:14.162Z",
          updatedAt: "2022-10-22T00:32:14.162Z",
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
      { subCategory_id: "af54a78a-d125-4efd-9300-972b40f04a48" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.getByID(req, res, jest.fn());

    expect(mockSubCategoryUC.getByID).toBeCalledWith(
      req.params["subCategory_id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      subCategory: {
        id: "af54a78a-d125-4efd-9300-972b40f04a48",
        catId: "ed306697-d189-47be-a0a7-3039660ee3e5",
        name: "Laptop",
        createdAt: "2022-10-22T00:32:14.162Z",
        updatedAt: "2022-10-22T00:32:14.162Z",
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
          },
        ],
      },
    });
  });

  test("Create Category", async () => {
    let req = mockRequest(
      { catId: "ed306697-d189-47be-a0a7-3039660ee3e5", name: "Laptop" },
      {},
      {},
      { subCategoryUC: mockSubCategoryUC, categoryUC: mockCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.createSubCat(req, res, jest.fn());

    expect(mockSubCategoryUC.createSubCat).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      success: true,
      subCategory: {
        id: "af54a78a-d125-4efd-9300-972b40f04a48",
        catId: "ed306697-d189-47be-a0a7-3039660ee3e5",
        name: "Laptop",
        createdAt: "2022-10-22T00:32:14.162Z",
        updatedAt: "2022-10-22T00:32:14.162Z",
      },
    });
  });

  test("Update By ID", async () => {
    let req = mockRequest(
      {
        name: "Laptop",
      },
      {},
      { subCategory_id: "af54a78a-d125-4efd-9300-972b40f04a48" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.updateSubCat(req, res, jest.fn());

    expect(mockSubCategoryUC.updateSubCat).toBeCalledWith(
      req.params["subCategory_id"],
      req.body
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully updated sub category",
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { subCategory_id: "af54a78a-d125-4efd-9300-972b40f04a48" },
      { subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.deleteSubCat(req, res, jest.fn());

    expect(mockSubCategoryUC.deleteSubCat).toBeCalledWith(
      req.params["subCategory_id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully deleted sub category",
    });
  });
});
