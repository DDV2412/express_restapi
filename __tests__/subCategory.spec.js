const subCategoryController = require("../controller/subCategory");

let mockCategoryUC = {
  allCategories: jest.fn().mockReturnValue({
    category: [
      {
        id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
        name: "Computer and Laptop",
      },
    ],
    total: 1,
  }),
  getByID: jest.fn().mockReturnValue({
    id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
    name: "Computer and Laptop",
  }),
  createCategory: jest.fn().mockReturnValue({
    id: "83641605-ba8d-4223-8365-55bb92398d9f",
    name: "Computer and Laptop",
  }),
  updateCategory: jest.fn().mockReturnValue({
    id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
    name: "Electronik",
  }),
  deleteCategory: jest.fn().mockReturnValue(1),
};

let mockSubCategoryUC = {
  allSubCats: jest.fn().mockReturnValue({
    subCategory: [
      {
        id: "83641605-ba8d-4223-8365-55bb92398d9f",
        catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
        name: "Laptop",
      },
    ],
    total: 1,
  }),
  getByID: jest.fn().mockReturnValue({
    id: "83641605-ba8d-4223-8365-55bb92398d9f",
    catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
    name: "Laptop",
  }),
  createSubCat: jest.fn().mockReturnValue({
    id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
    catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
    name: "Laptop",
  }),
  updateSubCat: jest.fn().mockReturnValue({
    id: "83641605-ba8d-4223-8365-55bb92398d9f",
    catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
    name: "Laptop Update",
  }),
  deleteSubCat: jest.fn().mockReturnValue(1),
};

const mockRequest = (body = {}, query = {}, params = {}, useCases = {}) => {
  return {
    body,
    query,
    params,
    ...useCases,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("Testing sub category controller", () => {
  test("Get All Sub Category", async () => {
    let req = mockRequest(
      {},
      {},
      {},
      { categoryUC: mockCategoryUC, subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.allSubCats(req, res, jest.fn());

    expect(mockSubCategoryUC.allSubCats).toBeCalledWith(req.query["filters"]);
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      subCategory: [
        {
          id: "83641605-ba8d-4223-8365-55bb92398d9f",
          catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
          name: "Laptop",
        },
      ],
    });
  });
  test("Sub Category By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { subCategory_id: "83641605-ba8d-4223-8365-55bb92398d9f" },
      { categoryUC: mockCategoryUC, subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.getByID(req, res, jest.fn());

    expect(mockSubCategoryUC.getByID).toBeCalledWith(
      req.params["subCategory_id"]
    );
    expect(res.json).toBeCalledWith({
      success: true,
      subCategory: {
        id: "83641605-ba8d-4223-8365-55bb92398d9f",
        catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
        name: "Laptop",
      },
    });
  });
  test("Create Sub Category", async () => {
    let req = mockRequest(
      {
        catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
        name: "Laptop",
      },
      {},
      {},
      { categoryUC: mockCategoryUC, subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await subCategoryController.createSubCat(req, res, jest.fn());

    expect(mockSubCategoryUC.createSubCat).toBeCalledWith(req.body);
    expect(res.json).toBeCalledWith({
      success: true,
      subCategory: {
        id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
        catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
        name: "Laptop",
      },
    });
  });
  test("Update Sub Category", async () => {
    let req = mockRequest(
      {
        name: "Laptop Update",
      },
      {},
      { subCategory_id: "83641605-ba8d-4223-8365-55bb92398d9f" },
      { categoryUC: mockCategoryUC, subCategoryUC: mockSubCategoryUC }
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
  test("Delete Sub Category", async () => {
    let req = mockRequest(
      {},
      {},
      { subCategory_id: "83641605-ba8d-4223-8365-55bb92398d9f" },
      { categoryUC: mockCategoryUC, subCategoryUC: mockSubCategoryUC }
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
