const orderController = require("../controller/orderController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockOrderUC = {
  allOrder: jest.fn().mockReturnValue(null),
  getByID: jest.fn().mockReturnValue(null),
  getOrders: jest.fn().mockReturnValue(null),
  getOrderDetail: jest.fn().mockReturnValue(null),
  createOrder: jest.fn().mockReturnValue(null),
  updateStatus: jest.fn().mockReturnValue(null),
  cancelOrder: jest.fn().mockReturnValue(null),
};

const mockCartUC = {
  getByID: jest.fn().mockReturnValue(null),
};

describe("Order Testing", () => {
  test("Error Admin Get All", async () => {
    let req = mockRequest({}, {}, {}, { orderUC: mockOrderUC });

    let res = mockResponse();

    await orderController.allOrder(req, res, jest.fn());

    expect(mockOrderUC.allOrder).toBeCalledWith(req.query.page, req.query.size);
    expect(res.json).toBeCalledWith({
      success: true,
      total: undefined,
      order: undefined,
      currentPage: undefined,
      countPage: undefined,
    });
  });

  test("Error Admin Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.getByID(req, res, jest.fn());

    expect(mockOrderUC.getByID).toBeCalledWith(req.params["orderId"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Order not found");
      })
    );
  });

  test("Error Customer Get All", async () => {
    let req = mockRequest({}, {}, {}, { orderUC: mockOrderUC });

    let res = mockResponse();

    await orderController.getOrders(req, res, jest.fn());

    expect(mockOrderUC.getOrders).toBeCalledWith(
      req.query.page,
      req.query.size,
      req.Customer.id
    );
    expect(res.json).toBeCalledWith({
      success: true,
      total: undefined,
      order: undefined,
      currentPage: undefined,
      countPage: undefined,
    });
  });

  test("Error Customer Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "89ea3f85-6a3a-4439-9175-27f1cf19bf1e" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.getOrderDetail(req, res, jest.fn());

    expect(mockOrderUC.getOrderDetail).toBeCalledWith(
      req.params["orderId"],
      req.Customer.id
    );

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Order not found");
      })
    );
  });

  test("Error Customer Create Order Cart not Found", async () => {
    let req = mockRequest(
      {
        cartId: "35c9c2b5-98ce-4581-aa35-578bec338324",
        payment_method: "Cash",
      },
      {},
      {},
      { orderUC: mockOrderUC, cartUC: mockCartUC }
    );

    let res = mockResponse();

    await orderController.createOrder(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Cart not found");
      })
    );
  });

  test("Error Admin Update Status Order By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.updateStatus(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Order not found");
      })
    );
  });
  test("Error Customer Cancel Order By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.cancelOrder(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Order not found");
      })
    );
  });
});
