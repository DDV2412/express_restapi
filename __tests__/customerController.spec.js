const customerControllers = require("../controller/customerControllers");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const {
  GetById,
  GetByEmail,
  GetAll,
  DelById,
  UpdatePass,
  UpdateProfile,
} = require("../mocks/customerMock");

const mockCustomerUC = {
  GetById: jest.fn().mockReturnValue(GetById),
  GetByEmail: jest.fn().mockReturnValue(GetByEmail),
  GetAll: jest.fn().mockReturnValue(GetAll),
  DelById: jest.fn().mockReturnValue(DelById),
  UpdatePass: jest.fn().mockReturnValue(UpdatePass),
  UpdateProfile: jest.fn().mockReturnValue(UpdateProfile),
};

describe("Customer Testing", () => {
  test("Get All", async () => {
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
      data: [
        {
          id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
          userName: "Admin",
          firstName: "Admin",
          lastName: "Binar",
          email: "admin@mail.com",
          noPhone: 90,
          password:
            "$2b$10$Wauz.vada70K.Nv9kJ5v3uN0Kw3IhslLadQwxOOmHhZaK0YBZUwIe",
          isAdmin: true,
          photoProfile: "-",
          verified: null,
          createdAt: "2022-10-21T05:04:57.653Z",
          updatedAt: "2022-10-21T05:04:57.653Z",
        },
      ],
      total: 1,
      currentPage: 0,
      countPage: 1,
    });
  });

  test("Get By ID", async () => {
    let req = mockRequest(
      {},
      {},
      { customerId: "21b2f1f0-1553-4598-aa2d-8904a509f755" },
      { customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await customerControllers.getById(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.params["customerId"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil mendapatkan customer dengan Username: ${req.Customer.userName}`,
      data: {
        id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        userName: "Admin",
        firstName: "Admin",
        lastName: "Binar",
        email: "admin@mail.com",
        noPhone: 90,
        password:
          "$2b$10$Wauz.vada70K.Nv9kJ5v3uN0Kw3IhslLadQwxOOmHhZaK0YBZUwIe",
        isAdmin: true,
        photoProfile: "-",
        verified: null,
        createdAt: "2022-10-21T05:04:57.653Z",
        updatedAt: "2022-10-21T05:04:57.653Z",
      },
    });
  });

  test("Get Profile", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.profile(req, res, jest.fn());

    expect(mockCustomerUC.GetById).toBeCalledWith(req.Customer["id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Berhasil mendapatkan customer dengan Username: ${req.Customer.userName}`,
      data: {
        id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        userName: "Admin",
        firstName: "Admin",
        lastName: "Binar",
        email: "admin@mail.com",
        noPhone: 90,
        password:
          "$2b$10$Wauz.vada70K.Nv9kJ5v3uN0Kw3IhslLadQwxOOmHhZaK0YBZUwIe",
        isAdmin: true,
        photoProfile: "-",
        verified: null,
        createdAt: "2022-10-21T05:04:57.653Z",
        updatedAt: "2022-10-21T05:04:57.653Z",
      },
    });
  });

  test("Update Pass", async () => {
    let req = mockRequest(
      { password: "DDV24129&$", confirmPassword: "DDV24129&$" },
      {},
      {},
      { customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await customerControllers.updatePass(req, res, jest.fn());

    expect(mockCustomerUC.UpdatePass).toBeCalledWith(
      req.body.password,
      req.Customer["id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: `berhasil merubah password`,
    });
  });
  test("Update Profile", async () => {
    let req = mockRequest(
      {
        photoProfile:
          "http://localhost:5000\\profile\\1665840984530IJRES - Journal Cover web.png",
      },
      {},
      {},
      { customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await customerControllers.updateProfile(req, res, jest.fn());

    expect(mockCustomerUC.UpdateProfile).toBeCalledWith(
      req.body,
      req.Customer["id"]
    );

    expect(res.json).toBeCalledWith({
      success: true,
      message: `berhasil merubah profile`,
    });
  });
  test("Delete By ID", async () => {
    let req = mockRequest({}, {}, {}, { customerUC: mockCustomerUC });

    let res = mockResponse();

    await customerControllers.delById(req, res, jest.fn());

    expect(mockCustomerUC.DelById).toBeCalledWith(req.Customer["id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil menghapus customer dengan Username: .",
    });
  });
});
