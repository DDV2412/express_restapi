const orderController = require("../controller/OrderController");

let mockOrderUC = {
  allOrder: jest.fn().mockReturnValue({
    order: [
      {
        id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
      },
    ],
    total: 1,
  }),
  getOrder: jest.fn().mockReturnValue({
    id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
  }),
  createOrder: jest.fn().mockReturnValue({
    id: "83641605-ba8d-4223-8365-55bb92398d9f",
  }),
  updateOrder: jest.fn().mockReturnValue({
    id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
  }),
  deleteOrder: jest.fn().mockReturnValue(1),
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

describe("Testing order controller", () => {
  test("Get All order", async () => {
    let req = mockRequest({}, {}, {}, { orderUC: mockOrderUC });

    let res = mockResponse();

    await orderController.allOrder(req, res, jest.fn());

    expect(mockOrderUC.allOrder).toBeCalledWith(req.query["filters"]);
    expect(res.json).toBeCalledWith({
      success: true,
      total: 1,
      order: [
        {
          id: "83641605-ba8d-4223-8365-55bb92398d9f",
        },
      ],
    });
  });
  test("order By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { id: "83641605-ba8d-4223-8365-55bb92398d9f" },
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.getOrder(req, res, jest.fn());

    expect(mockOrderUC.getOrder).toBeCalledWith(req.params["id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      order: {
        id: "83641605-ba8d-4223-8365-55bb92398d9f",
      },
    });
  });
  test("Create order", async () => {
    let req = mockRequest(
      {
        catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
      },
      {},
      {},
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.createOrder(req, res, jest.fn());

    expect(mockOrderUC.createOrder).toBeCalledWith(req.body);
    expect(res.json).toBeCalledWith({
      success: true,
      order: {
        id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
      },
    });
  });
  test("Update order", async () => {
    let req = mockRequest(
      {
        id: "7d1d4aaf-8d0b-495d-a474-d4a9e546e07f",
      },
      {},
      {},
      { orderUC: mockOrderUC }
    );

    let res = mockResponse();

    await orderController.updateOrder(req, res, jest.fn());

    expect(mockOrderUC.updateOrder).toBeCalledWith(req.params["id"], req.body);
    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully updated order",
    });
  });
  test("Delete order", async () => {
    let req = mockRequest({}, {}, {}, { orderUC: mockOrderUC });

    let res = mockResponse();

    await orderController.deleteOrder(req, res, jest.fn());

    expect(mockOrderUC.deleteOrder).toBeCalledWith(req.params["id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      message: "Successfully deleted order",
    });
  });
});
