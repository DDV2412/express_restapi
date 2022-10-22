const costomerAddController = require("../controller/custAddressControllers");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  Create,
  FindAll,
  FindById,
  Delete,
  Update,
} = require("../mocks/customerMock");

const mockCustomerUC = {
  Create: jest.fn().mockReturnValue(Create),
  FindAll: jest.fn().mockReturnValue(FindAll),
  FindById: jest.fn().mockReturnValue(FindById),
  Delete: jest.fn().mockReturnValue(Delete),
  Update: jest.fn().mockReturnValue(Update),
};

describe("Customer Address Testing", () => {
  test("Get All", async () => {
    let req = mockRequest({}, {}, {}, { custAddressUC: mockCustomerUC });

    let res = mockResponse();

    await costomerAddController.FindAll(req, res, jest.fn());

    expect(mockCustomerUC.FindAll).toBeCalledWith(req.Customer["id"]);
    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil mendapatkan semua address dengan id Customer ${req.Customer["firstName"]}.`,
      data: [
        {
          id: "69fb126c-fb32-4f39-aa29-965b5c424583",
          cust_id: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
          city: "Bantul",
          province: "Yogyakarta",
          line: "Banguntapan",
          zip_code: 55198,
          createdAt: "2022-10-21T08:11:18.764Z",
          updatedAt: "2022-10-21T08:11:18.764Z",
        },
      ],
    });
  });

  test("Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { addressId: "69fb126c-fb32-4f39-aa29-965b5c424583" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.FindById(req, res, jest.fn());

    expect(mockCustomerUC.FindById).toBeCalledWith(req.params["addressId"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil mendapatkan address dengan id:${req.params["addressId"]} .`,
      data: {
        id: "69fb126c-fb32-4f39-aa29-965b5c424583",
        cust_id: "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
        city: "Bantul",
        province: "Yogyakarta",
        line: "Banguntapan",
        zip_code: 55198,
        createdAt: "2022-10-21T08:11:18.764Z",
        updatedAt: "2022-10-21T08:11:18.764Z",
      },
    });
  });

  test("Create Addres", async () => {
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

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil menambahkan alamat baru.",
    });
  });

  test("Update By ID", async () => {
    let req = mockRequest(
      {
        city: "Bantul",
        province: "Yogyakarta",
        line: "Banguntapan",
        zip_code: "55198",
      },
      {},
      { addressId: "69fb126c-fb32-4f39-aa29-965b5c424583" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.Update(req, res, jest.fn());

    expect(mockCustomerUC.Update).toBeCalledWith(
      req.body,
      req.params["addressId"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil memperbaharui address id : ${req.params["addressId"]}`,
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { addressId: "69fb126c-fb32-4f39-aa29-965b5c424583" },
      { custAddressUC: mockCustomerUC }
    );

    let res = mockResponse();

    await costomerAddController.Delete(req, res, jest.fn());

    expect(mockCustomerUC.Delete).toBeCalledWith(req.params["addressId"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil menghapus address",
    });
  });
});
