const cartController = require("../controller/cartController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  allCarts,
  getByID,
  createCart,
  updateCart,
  deleteCart,
} = require("../mocks/cartMock");

const mockCartUC = {
  allCarts: jest.fn().mockReturnValue(allCarts),
  getByID: jest.fn().mockReturnValue(getByID),
  createCart: jest.fn().mockReturnValue(createCart),
  updateCart: jest.fn().mockReturnValue(updateCart),
  deleteCart: jest.fn().mockReturnValue(deleteCart),
};

describe("Cart Testing", () => {
  test("Get All", async () => {
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
      total: 0,
      currentPage: 0,
      countPage: 1,
      cart: [
        {
          id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
          customerId: "21b2f1f0-1553-4598-aa2d-8904a509f755",
          productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
          qty: 1,
          variation: null,
          createdAt: "2022-10-21T06:41:30.486Z",
          updatedAt: "2022-10-21T06:41:30.486Z",
        },
      ],
    });
  });

  test("Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { cart_id: "d1ca87f7-6882-47d7-a4b0-62132034024a" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.getByID(req, res, jest.fn());

    expect(mockCartUC.getByID).toBeCalledWith(req.params["cart_id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      cart: {
        id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        customerId: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
        qty: 1,
        variation: null,
        createdAt: "2022-10-21T06:41:30.486Z",
        updatedAt: "2022-10-21T06:41:30.486Z",
      },
    });
  });

  test("Create Cart", async () => {
    let req = mockRequest(
      { productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59", qty: 1 },
      {},
      {},
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.createCart(req, res, jest.fn());

    expect(mockCartUC.createCart).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      success: true,
      createCart: {
        id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        customerId: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        productId: "57b91278-b2d7-4c07-ad34-0b2c6be23b59",
        qty: 1,
        variation: null,
        createdAt: "2022-10-21T06:41:30.486Z",
        updatedAt: "2022-10-21T06:41:30.486Z",
      },
    });
  });

  test("Update By ID", async () => {
    let req = mockRequest(
      { qty: 1 },
      {},
      { cart_id: "d1ca87f7-6882-47d7-a4b0-62132034024a" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.updateCart(req, res, jest.fn());

    expect(mockCartUC.updateCart).toBeCalledWith(
      req.body,
      req.params["cart_id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Cart updated successfully",
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { cart_id: "d1ca87f7-6882-47d7-a4b0-62132034024a" },
      { cartUC: mockCartUC }
    );

    let res = mockResponse();

    await cartController.deleteCart(req, res, jest.fn());

    expect(mockCartUC.deleteCart).toBeCalledWith(req.params["cart_id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Cart deleted successfully",
    });
  });
});
