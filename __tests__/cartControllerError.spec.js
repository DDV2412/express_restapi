const cartController = require("../controller/cartController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockCartUC = {
  allCarts: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
  createCart: jest.fn().mockReturnValue(null),
  updateCart: jest.fn().mockReturnValue(null),
  deleteCart: jest.fn().mockReturnValue(null),
};

describe("Cart Testing", () => {
  test("Error Get All", async () => {
    let req = mockRequest({}, {}, {}, { cartUC: mockCartUC });

    let res = mockResponse();

    await cartController.allCarts(req, res, jest.fn());

    expect(mockCartUC.allCarts).toBeCalledWith(
      req.Customer["id"],
      req.query.page,
      req.query.size
    );
    expect(res.json).toBeCalledWith({
      success: true,
      total: undefined,
      currentPage: undefined,
      countPage: undefined,
      cart: undefined,
    });
  });

  test("Error Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { cart_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.getByID(req, res, jest.fn());

    expect(mockCartUC.getByID).toBeCalledWith(req.params["cart_id"]);

    jest.fn().mockImplementation(() => {
      throw Error("Cart not found");
    });
  });

  test("Error Create Cart", async () => {
    let req = mockRequest(
      { productId: "11459b5e-bb4c-467f-b8b8-24f62bef6b35", qty: 1 },
      {},
      {},
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.createCart(req, res, jest.fn());

    expect(mockCartUC.createCart).toBeCalledWith(req.body);

    jest.fn().mockImplementation(() => {
      throw Error("Cannot insert new cart now, try again later");
    });
  });

  test("Error Update By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { cart_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.updateCart(req, res, jest.fn());

    jest.fn().mockImplementation(() => {
      throw Error("Cart not found");
    });
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { cart_id: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.deleteCart(req, res, jest.fn());

    jest.fn().mockImplementation(() => {
      throw Error("Cart not found");
    });
  });
});
