const orderController = require("../controller/orderController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  allOrder,
  getByID,
  getOrders,
  getOrderDetail,
  createOrder,
  updateStatus,
  cancelOrder,
} = require("../mocks/orderMock");
const { getByID: cartId } = require("../mocks/cartMock");
const { getByID: productId } = require("../mocks/productMock");

const mockOrderUC = {
  allOrder: jest.fn().mockReturnValue(allOrder),
  getByID: jest.fn().mockReturnValue(getByID),
  getOrders: jest.fn().mockReturnValue(getOrders),
  getOrderDetail: jest.fn().mockReturnValue(getOrderDetail),
  createOrder: jest.fn().mockReturnValue(createOrder),
  updateStatus: jest.fn().mockReturnValue(updateStatus),
  cancelOrder: jest.fn().mockReturnValue(cancelOrder),
};

const mockCartUC = {
  getByID: jest.fn().mockReturnValue(cartId),
};

const mockProductUC = {
  getByID: jest.fn().mockReturnValue(productId),
};

describe("Order Testing", () => {
  test("Admin Get All", async () => {
    let req = mockRequest({}, {}, {}, { orderUC: mockOrderUC });

    let res = mockResponse();

    await orderController.allOrder(req, res, jest.fn());

    expect(mockOrderUC.allOrder).toBeCalledWith(req.query.page, req.query.size);
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      order: [
        {
          id: "9369e217-0c0e-4300-973f-d316154d9710",
          status: "Pending",
          amount: "12500000",
          cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
          payment_method: "Cash",
          confirm_payment: "Waiting Payment",
          createdAt: "2022-10-21T14:25:26.675Z",
          updatedAt: "2022-10-21T14:25:26.675Z",
          ShoppingCart: {
            id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
            customerId: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
            productId: "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
            qty: 1,
            variation: null,
            createdAt: "2022-10-21T06:41:30.486Z",
            updatedAt: "2022-10-21T06:41:30.486Z",
          },
        },
      ],
      currentPage: 0,
      countPage: 1,
    });
  });

  test("Admin Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "9369e217-0c0e-4300-973f-d316154d9710" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.getByID(req, res, jest.fn());

    expect(mockOrderUC.getByID).toBeCalledWith(req.params["orderId"]);

    expect(res.json).toBeCalledWith({
      success: true,
      order: {
        id: "9369e217-0c0e-4300-973f-d316154d9710",
        status: "Pending",
        amount: "12500000",
        cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        payment_method: "Cash",
        confirm_payment: "Waiting Payment",
        createdAt: "2022-10-21T14:25:26.675Z",
        updatedAt: "2022-10-21T14:25:26.675Z",
        ShoppingCart: {
          id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
          customerId: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
          productId: "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
          qty: 1,
          variation: null,
          createdAt: "2022-10-21T06:41:30.486Z",
          updatedAt: "2022-10-21T06:41:30.486Z",
        },
      },
    });
  });

  test("Customer Get All", async () => {
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
      total: 1,
      order: [
        {
          id: "9369e217-0c0e-4300-973f-d316154d9710",
          status: "Pending",
          amount: "12500000",
          cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
          payment_method: "Cash",
          confirm_payment: "Waiting Payment",
          createdAt: "2022-10-21T14:25:26.675Z",
          updatedAt: "2022-10-21T14:25:26.675Z",
          ShoppingCart: {
            id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
            customerId: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
            productId: "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
            qty: 1,
            variation: null,
            createdAt: "2022-10-21T06:41:30.486Z",
            updatedAt: "2022-10-21T06:41:30.486Z",
          },
        },
      ],
      currentPage: 0,
      countPage: 1,
    });
  });

  test("Customer Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "9369e217-0c0e-4300-973f-d316154d9710" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.getOrderDetail(req, res, jest.fn());

    expect(mockOrderUC.getOrderDetail).toBeCalledWith(
      req.params["orderId"],
      req.Customer.id
    );

    expect(res.json).toBeCalledWith({
      success: true,
      order: {
        id: "9369e217-0c0e-4300-973f-d316154d9710",
        status: "Pending",
        amount: "12500000",
        cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        payment_method: "Cash",
        confirm_payment: "Waiting Payment",
        createdAt: "2022-10-21T14:25:26.675Z",
        updatedAt: "2022-10-21T14:25:26.675Z",
        ShoppingCart: {
          id: "d1ca87f7-6882-47d7-a4b0-62132034024a",
          customerId: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
          productId: "43f3bb5b-af1a-4ed8-bce6-862cab09c4a4",
          qty: 1,
          variation: null,
          createdAt: "2022-10-21T06:41:30.486Z",
          updatedAt: "2022-10-21T06:41:30.486Z",
        },
      },
    });
  });

  test("Customer Create Order", async () => {
    let req = mockRequest(
      {
        cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        payment_method: "Cash",
      },
      {},
      {},
      { orderUC: mockOrderUC, cartUC: mockCartUC, productUC: mockProductUC }
    );

    let res = mockResponse();

    await orderController.createOrder(req, res, jest.fn());

    expect(mockOrderUC.createOrder).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      success: true,
      order: {
        id: "9369e217-0c0e-4300-973f-d316154d9710",
        cartId: "d1ca87f7-6882-47d7-a4b0-62132034024a",
        payment_method: "Cash",
        amount: "12500000",
        updatedAt: "2022-10-21T14:25:26.675Z",
        createdAt: "2022-10-21T14:25:26.675Z",
        status: "Pending",
        confirm_payment: "Waiting Payment",
      },
    });
  });

  test("Admin Update Status Order By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "9369e217-0c0e-4300-973f-d316154d9710" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.updateStatus(req, res, jest.fn());

    expect(mockOrderUC.updateStatus).toBeCalledWith(req.params["orderId"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully approved order by ID " + req.params["orderId"],
    });
  });
  test("Customer Cancel Order By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { orderId: "9369e217-0c0e-4300-973f-d316154d9710" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.cancelOrder(req, res, jest.fn());

    expect(mockOrderUC.cancelOrder).toBeCalledWith(
      req.params["orderId"],
      req.Customer["id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully canceled order by ID " + req.params["orderId"],
    });
  });
});
