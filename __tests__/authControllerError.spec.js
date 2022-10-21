const authController = require("../controller/authController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const { getById } = require("../mocks/customerMock");

const mockAuthUC = {
  Register: jest.fn().mockReturnValue(null),
  Login: jest.fn().mockReturnValue(null),
  ForgotPassword: jest.fn().mockReturnValue(null),
  ResetPass: jest.fn().mockReturnValue(null),
  RequestVerify: jest.fn().mockReturnValue(null),
  VerifyEmail: jest.fn().mockReturnValue(null),
};

const mockCustomerNullUC = {
  GetByEmail: jest.fn().mockReturnValue(null),
};

const mockCustomerUC = {
  GetByEmail: jest.fn().mockReturnValue(getById),
};

describe("Authentication Testing", () => {
  test("Error Login", async () => {
    let req = mockRequest(
      {
        userName: "Admin",
        password: "Admin#2412",
      },
      {},
      {},
      { authUC: mockAuthUC }
    );

    let res = mockResponse();

    await authController.Login(req, res, jest.fn());

    expect(mockAuthUC.Login).toBeCalledWith(
      req.body.userName,
      req.body.password
    );
    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Customer name atau password tidak sesuai.");
      })
    );
  });
  test("Error Register", async () => {
    let req = mockRequest(
      {
        userName: "Admin",
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@mail.com",
        password: "Admin#2412",
      },
      {},
      {},
      { authUC: mockAuthUC }
    );

    let res = mockResponse();

    await authController.Register(req, res, jest.fn());

    expect(mockAuthUC.Register).toBeCalledWith(req.body);
    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Email atau username tidak tersedia.");
      })
    );
  });
  test("Forgot Password", async () => {
    let req = mockRequest(
      {
        email: "admin@mail.com",
      },
      {},
      {},
      { authUC: mockAuthUC, customerUC: mockCustomerNullUC }
    );

    let res = mockResponse();

    await authController.ForgotPassword(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Email not available");
      })
    );
  });
  test("Forgot Password Error", async () => {
    let req = mockRequest(
      {
        email: "admin@mail.com",
      },
      {},
      {},
      { authUC: mockAuthUC, customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await authController.ForgotPassword(req, res, jest.fn());

    expect(mockAuthUC.ForgotPassword).toBeCalledWith(req.body["email"]);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Email not available");
      })
    );
  });
  test("Reset Password", async () => {
    let req = mockRequest(
      {
        password: "Ddv241297#",
        confirmPassword: "Ddv241297#",
      },
      {
        token: "",
        email: "dhyanputra24@gmail.com",
      },
      {},
      { authUC: mockAuthUC }
    );

    let res = mockResponse();

    await authController.ResetPassword(req, res, jest.fn());

    expect(mockAuthUC.ResetPass).toBeCalledWith(
      req.query.token,
      req.query.email,
      req.body["password"]
    );
    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Token has expired. Please try password reset again.");
      })
    );
  });
  test("Reset Password Error", async () => {
    let req = mockRequest(
      {
        password: "Ddv241297#",
        confirmPassword: "Ddv241297#1",
      },
      {
        token: "",
        email: "dhyanputra24@gmail.com",
      },
      {},
      { authUC: mockAuthUC }
    );

    let res = mockResponse();

    await authController.ResetPassword(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Password not match");
      })
    );
  });
  test("Request Verify", async () => {
    let req = mockRequest(
      {
        email: "admin@mail.com",
      },
      {},
      {},
      { authUC: mockAuthUC }
    );

    let res = mockResponse();

    await authController.Register(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Email not available");
      })
    );
  });
});
