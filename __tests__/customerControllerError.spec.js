const customerControllers = require("../controller/customerControllers");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockCustomerUC = {
  GetById: jest.fn().mockReturnValue(null),
  GetByEmail: jest.fn().mockReturnValue(null),
  GetAll: jest.fn().mockReturnValue(null),
  DelById: jest.fn().mockReturnValue(null),
  UpdatePass: jest.fn().mockReturnValue(null),
  UpdateProfile: jest.fn().mockReturnValue(null),
};

describe("Customer Testing", () => {
  test("Error Get All", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.getAll(req, res, jest.fn());

    expect(mockCustomerUC.GetAll).toBeCalledWith(
      req.query.page,
      req.query.size,
      req.query.filters
    );
    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil mendapatkan semua customer.",
      total: undefined,
      currentPage: undefined,
      countPage: undefined,
      data: undefined,
    });
  });

  test("Error Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { customerId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await customerControllers.getById(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.params["customerId"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Customer not found");
      })
    );
  });

  test("Error Get Profile", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.profile(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.Customer["id"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Customer not found");
      })
    );
  });

  test("Error Update Pass", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.updatePass(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.Customer["id"]);

    jest.fn().mockImplementation(() => {
      throw Error("Customer not found");
    });
  });
  test("Error Update Profile", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.updatePass(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.Customer["id"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Customer not found");
      })
    );
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.delById(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.Customer["id"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Customer not found");
      })
    );
  });
});
