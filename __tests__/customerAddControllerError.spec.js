const costomerAddController = require("../controller/custAddressControllers");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockCustomerUC = {
  Create: jest.fn().mockReturnValue(null),
  FindAll: jest.fn().mockReturnValue(null),
  FindById: jest.fn().mockReturnValue(null),
  Delete: jest.fn().mockReturnValue(null),
  Update: jest.fn().mockReturnValue(null),
};

describe("Customer Address Testing", () => {
  test("Error Get All", async () => {
    let req = mockRequest({}, {}, {}, { custAddressUC: mockCustomerUC });

    let res = mockResponse();

    await costomerAddController.FindAll(req, res, jest.fn());

    expect(mockCustomerUC.FindAll).toBeCalledWith(req.Customer["id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil mendapatkan semua address dengan id Customer ${req.Customer["firstName"]}.`,
      data: [],
    });
  });

  test("Error Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { addressId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.FindById(req, res, jest.fn());

    expect(mockCustomerUC.FindById).toBeCalledWith(req.params["addressId"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Address not found");
      })
    );
  });

  test("Error Create Addres", async () => {
    let req = mockRequest(
      {
        city: "Bantul",
        province: "Yogyakarta",
        line: "Banguntapan",
        zip_code: "55198",
      },
      {},
      {},
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.Create(req, res, jest.fn());

    expect(mockCustomerUC.Create).toBeCalledWith({
      cust_id: req.Customer["id"],
      city: "Bantul",
      province: "Yogyakarta",
      line: "Banguntapan",
      zip_code: "55198",
    });

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Cannot insert new address now, try again later");
      })
    );
  });

  test("Error Update By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { addressId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.Update(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Address not found");
      })
    );
  });
  test("Error Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { addressId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.Delete(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Address not found");
      })
    );
  });
});
