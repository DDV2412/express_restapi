const productController = require("../controller/product");

let mockProductUCnull = {
  allProducts: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
};

let mockProductUC = {
  allProducts: jest.fn().mockReturnValue({
    total: 1,
    product: [
      {
        id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        subCatId: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
        name: "Test Product 1",
        description: "Test",
        stock: 1,
        price: "1000",
        weight: "1",
        variation: null,
        createdAt: "2022-09-29T05:28:59.422Z",
        updatedAt: "2022-09-29T05:28:59.422Z",
        sub_category: {
          id: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
          catId: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
          name: "Computer and Laptop",
          createdAt: "2022-09-29T02:54:01.657Z",
          updatedAt: "2022-09-29T02:54:01.657Z",
          category: {
            id: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
            name: "Computer and Laptop",
            createdAt: "2022-09-29T02:32:50.271Z",
            updatedAt: "2022-09-29T02:32:50.271Z",
          },
        },
        image_product: [
          {
            id: "1b63e468-e9cd-46c3-bda5-b9baecb4d52f",
            productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
            name: "01 Cover Journal IJEECS 2021.jpg",
            url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
            createdAt: "2022-09-29T05:28:59.456Z",
            updatedAt: "2022-09-29T05:28:59.456Z",
          },
          {
            id: "8c465e93-54ca-4a4a-b887-b864791f9778",
            productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
            name: "01 Cover Journal IJEECS 2021.jpg",
            url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
            createdAt: "2022-09-29T05:28:59.456Z",
            updatedAt: "2022-09-29T05:28:59.456Z",
          },
        ],
      },
    ],
    currentPage: 0,
    countPage: 1,
  }),
  getByID: jest.fn().mockReturnValue({
    id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
    subCatId: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
    name: "Test Product 1",
    description: "Test",
    stock: 1,
    price: "1000",
    weight: "1",
    variation: null,
    createdAt: "2022-09-29T05:28:59.422Z",
    updatedAt: "2022-09-29T05:28:59.422Z",
    sub_category: {
      id: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
      catId: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
      name: "Computer and Laptop",
      createdAt: "2022-09-29T02:54:01.657Z",
      updatedAt: "2022-09-29T02:54:01.657Z",
      category: {
        id: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
        name: "Computer and Laptop",
        createdAt: "2022-09-29T02:32:50.271Z",
        updatedAt: "2022-09-29T02:32:50.271Z",
      },
    },
    image_product: [
      {
        id: "8c465e93-54ca-4a4a-b887-b864791f9778",
        productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        name: "01 Cover Journal IJEECS 2021.jpg",
        url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
        createdAt: "2022-09-29T05:28:59.456Z",
        updatedAt: "2022-09-29T05:28:59.456Z",
      },
      {
        id: "1b63e468-e9cd-46c3-bda5-b9baecb4d52f",
        productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        name: "01 Cover Journal IJEECS 2021.jpg",
        url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
        createdAt: "2022-09-29T05:28:59.456Z",
        updatedAt: "2022-09-29T05:28:59.456Z",
      },
    ],
  }),
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
  /**
   * Testing get all product list
   * @return null
   */
  test("Get all product lists with return null", async () => {
    let req = mockRequest({}, {}, {}, { productUC: mockProductUCnull });

    let res = mockResponse();

    await productController.allProducts(req, res, jest.fn());

    expect(mockProductUCnull.allProducts).toBeCalledWith(
      undefined,
      undefined,
      undefined
    );
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });

  /**
   * @return product list
   */

  test("Get all product lists", async () => {
    let req = mockRequest(
      {},
      {
        page: 1,
        size: 2,
        filters: "Test",
      },
      {},
      { productUC: mockProductUC }
    );

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
          subCatId: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
          name: "Test Product 1",
          description: "Test",
          stock: 1,
          price: "1000",
          weight: "1",
          variation: null,
          createdAt: "2022-09-29T05:28:59.422Z",
          updatedAt: "2022-09-29T05:28:59.422Z",
          sub_category: {
            id: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
            catId: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
            name: "Computer and Laptop",
            createdAt: "2022-09-29T02:54:01.657Z",
            updatedAt: "2022-09-29T02:54:01.657Z",
            category: {
              id: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
              name: "Computer and Laptop",
              createdAt: "2022-09-29T02:32:50.271Z",
              updatedAt: "2022-09-29T02:32:50.271Z",
            },
          },
          image_product: [
            {
              id: "1b63e468-e9cd-46c3-bda5-b9baecb4d52f",
              productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
              name: "01 Cover Journal IJEECS 2021.jpg",
              url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
              createdAt: "2022-09-29T05:28:59.456Z",
              updatedAt: "2022-09-29T05:28:59.456Z",
            },
            {
              id: "8c465e93-54ca-4a4a-b887-b864791f9778",
              productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
              name: "01 Cover Journal IJEECS 2021.jpg",
              url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
              createdAt: "2022-09-29T05:28:59.456Z",
              updatedAt: "2022-09-29T05:28:59.456Z",
            },
          ],
        },
      ],
      currentPage: 0,
      countPage: 1,
    });
  });

  /**
   * Testing product by id
   * @return null
   */

  test("Product by id with return null", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "0597cb5c-ff53-44ca-93ae-6b0e36c54933" },
      { productUC: mockProductUCnull }
    );

    let res = mockResponse();

    await productController.getByID(req, res, jest.fn());

    expect(mockProductUCnull.getByID).toBeCalledWith(req.params["product_id"]);
  });

  /**
   * @return product
   */
  test("Product by id", async () => {
    let req = mockRequest(
      {},
      {},
      { product_id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936" },
      { productUC: mockProductUC }
    );

    let res = mockResponse();

    await productController.getByID(req, res, jest.fn());

    expect(mockProductUC.getByID).toBeCalledWith(req.params["product_id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      product: {
        id: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
        subCatId: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
        name: "Test Product 1",
        description: "Test",
        stock: 1,
        price: "1000",
        weight: "1",
        variation: null,
        createdAt: "2022-09-29T05:28:59.422Z",
        updatedAt: "2022-09-29T05:28:59.422Z",
        sub_category: {
          id: "d905eaaa-ed35-4b39-920f-b36adc1e46cd",
          catId: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
          name: "Computer and Laptop",
          createdAt: "2022-09-29T02:54:01.657Z",
          updatedAt: "2022-09-29T02:54:01.657Z",
          category: {
            id: "46efafa9-053a-4063-9ca4-2cffc59e8aba",
            name: "Computer and Laptop",
            createdAt: "2022-09-29T02:32:50.271Z",
            updatedAt: "2022-09-29T02:32:50.271Z",
          },
        },
        image_product: [
          {
            id: "8c465e93-54ca-4a4a-b887-b864791f9778",
            productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
            name: "01 Cover Journal IJEECS 2021.jpg",
            url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
            createdAt: "2022-09-29T05:28:59.456Z",
            updatedAt: "2022-09-29T05:28:59.456Z",
          },
          {
            id: "1b63e468-e9cd-46c3-bda5-b9baecb4d52f",
            productId: "cad3b507-9e71-4d8b-b3c7-e5084d23f936",
            name: "01 Cover Journal IJEECS 2021.jpg",
            url: "http://localhost:5000\\product\\166442210054201 Cover Journal IJEECS 2021.jpg",
            createdAt: "2022-09-29T05:28:59.456Z",
            updatedAt: "2022-09-29T05:28:59.456Z",
          },
        ],
      },
    });
  });
});
