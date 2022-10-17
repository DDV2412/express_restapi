const productController = require("../controller/product");

let mockProductUC = {
  allProducts: jest.fn().mockReturnValue({
    total: 1,
    product: [
      {
        id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
        name: "Test Product 1",
        description: "Test",
        stock: 1,
        price: "1000",
        weight: "1",
        variation: null,
      },
    ],
    currentPage: 0,
    countPage: 1,
  }),
  getByID: jest.fn().mockReturnValue({
    id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
    subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
    name: "Test Product 1",
    description: "Test",
    stock: 1,
    price: "1000",
    weight: "1",
    variation: null,
  }),
  createProduct: jest.fn().mockReturnValue({
    id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
    subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
    name: "Test Product 1",
    description: "Test",
    stock: 1,
    price: "1000",
    weight: "1",
    variation: null,
  }),
  updateProduct: jest.fn().mockReturnValue({
    id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
    subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
    name: "Test Product Update",
    description: "Test",
    stock: 1,
    price: "10000",
    weight: "1",
    variation: null,
  }),
  deleteProduct: jest.fn().mockReturnValue(1),
  removeProductImage: jest.fn().mockReturnValue(1),
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

describe("Testing product controller", () => {
  test("Get All Product", async () => {
    let req = mockRequest({}, {}, {}, { productUC: mockProductUC });

    let res = mockResponse();

    await productController.allProducts(req, res, jest.fn());

    expect(mockProductUC.allProducts).toBeCalledWith(
      req.query["page"],
      req.query["size"],
      req.query["filters"]
    );
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      products: [
        {
          id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
          subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
          name: "Test Product 1",
          description: "Test",
          stock: 1,
          price: "1000",
          weight: "1",
          variation: null,
        },
      ],
      currentPage: 0,
      countPage: 1,
    });
  });
  test("Product By ID", async () => {
    let req = mockRequest(
      {},
      {},
      {
        product_id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
      },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.getByID(req, res, jest.fn());

    expect(mockProductUC.getByID).toBeCalledWith(req.params["product_id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      product: {
        id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
        name: "Test Product 1",
        description: "Test",
        stock: 1,
        price: "1000",
        weight: "1",
        variation: null,
      },
    });
  });
  test("Create Product", async () => {
    let req = mockRequest(
      {
        subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
        name: "Test Product 1",
        description: "Test",
        stock: "1",
        price: "1000",
        weight: "1",
        image_product: [
          {
            image_name: "01 Cover Journal IJEECS 2021.jpg",
            image_url:
              "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
          },
          {
            image_name: "01 Cover Journal IJEECS 2021.jpg",
            image_url:
              "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
          },
        ],
      },
      {},
      {},
      { productUC: mockProductUC, subCategoryUC: mockSubCategoryUC }
    );

    let res = mockResponse();

    await productController.createProduct(req, res, jest.fn());

    expect(mockProductUC.createProduct).toBeCalledWith(req.body);
    expect(res.json).toBeCalledWith({
      success: true,
      product: {
        id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
        subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
        name: "Test Product 1",
        description: "Test",
        stock: 1,
        price: "1000",
        weight: "1",
        variation: null,
      },
    });
  });
  test("Update Product", async () => {
    let req = mockRequest(
      {
        subCatId: "83641605-ba8d-4223-8365-55bb92398d9f",
        name: "Test Product 1",
        description: "Test",
        stock: "1",
        price: "1000",
        weight: "1",
        image_product: [
          {
            image_name: "01 Cover Journal IJEECS 2021.jpg",
            image_url:
              "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
          },
          {
            image_name: "01 Cover Journal IJEECS 2021.jpg",
            image_url:
              "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
          },
        ],
      },
      {},
      { product_id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936" },
      { productUC: mockProductUC, subCategoryUC: mockSubCategoryUC }
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
  test("Delete Product", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936" },
      { productUC: mockProductUC, subCategoryUC: mockSubCategoryUC }
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

  test("Delete Image Product", async () => {
    let req = mockRequest(
      {},
      {},
      { product_imageId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936" },
      { productUC: mockProductUC, subCategoryUC: mockSubCategoryUC }
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
