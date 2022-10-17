const customerController = require("../controller/customerControllers");

let mockCustomerUC = {
  GetAll: jest.fn().mockReturnValue({
    total: 0,
    currentPage: 0,
    countPage: 1,
    customer: [
      {
        id: "123",
        userName: "Rangga",
        firstName: "Rangga",
        lastName: "Rangga",
        email: "Rangga@mail.com",
        noPhone: "Rangga",
        password: "Rangga",
        isAdmin: "false",
        photoProfile: "null",
      },
    ],
  }),
};

const mockRequest = (body = {}, query = {}, params = {}, use_case = {}) => {
  return {
    body: body,
    query: query,
    params: params,
    ...use_case,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("Test Customer Controller", function () {
  test("get All Customer", async () => {
    let req = mockRequest(
      {},
      {},
      {},
      {
        customerUC: mockCustomerUC,
      }
    );
    let res = mockResponse();
    await customerController.getAll(req, res, jest.fn());

    expect(mockCustomerUC.GetAll).toBeCalledWith(
      req.params["page"],
      req.params["size"],
      req.params["filters"]
    );
    expect(res.json).toBeCalledWith({
      message: "Berhasil mendapatkan semua customer.",
      total: 0,
      currentPage: 0,
      countPage: 1,
      data: [
        {
          id: "123",
          userName: "Rangga",
          firstName: "Rangga",
          lastName: "Rangga",
          email: "Rangga@mail.com",
          noPhone: "Rangga",
          password: "Rangga",
          isAdmin: "false",
          photoProfile: "null",
        },
      ],
    });
  });
});
