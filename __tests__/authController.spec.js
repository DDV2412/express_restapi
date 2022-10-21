const authController = require("../controller/authController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const crypto = require("crypto");
const { Register, Login } = require("../mocks/authMock");
const { getById } = require("../mocks/customerMock");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mockAuthUC = {
  Register: jest.fn().mockReturnValue(Register),
  Login: jest.fn().mockReturnValue(Login),
  ForgotPassword: jest
    .fn()
    .mockReturnValue(crypto.randomBytes(64).toString("base64")),
  ResetPass: jest.fn().mockReturnValue([1]),
  VerifyEmail: jest.fn().mockReturnValue([1]),
};

const token = jwt.sign(
  {
    id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
    userName: "Admin",
    firstName: "Admin",
    lastName: "Binar",
    email: "admin@mail.com",
    photoProfile: "-",
    isAdmin: true,
    verified: null,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

const decode = jwt.verify(token, process.env.JWT_SECRET);

const mockCustomerUC = {
  GetByEmail: jest.fn().mockReturnValue(getById),
};

describe("Authentication Testing", () => {
  test("Login", async () => {
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

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil Login.",
      customer: {
        id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        userName: "Admin",
        firstName: "Admin",
        lastName: "Binar",
        email: "admin@mail.com",
        photoProfile: "-",
        isAdmin: true,
        verified: null,
      },
      token: token,
    });
  });
  test("Register", async () => {
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

    expect(res.json).toBeCalledWith({
      success: true,
      message: "Berhasil mendaftarkan customer baru.",
      customer: {
        id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
        userName: "Admin",
        firstName: "Admin",
        lastName: "Binar",
        email: "admin@mail.com",
        photoProfile: "-",
        isAdmin: true,
        verified: null,
      },
      token: token,
    });
  });
  test("Forgot Password", async () => {
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

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Email sent to ${req.body.email} successfully`,
    });
  });
  test("Request Verify", async () => {
    let req = mockRequest(
      {
        email: "admin@mail.com",
      },
      {},
      {},
      { authUC: mockAuthUC, customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await authController.RequestVerify(req, res, jest.fn());

    expect(res.json).toBeCalledWith({
      success: true,
      message: `Email sent to ${req.body.email} successfully`,
    });
  });
  test("Verify Email", async () => {
    let req = mockRequest(
      {},
      { token: token },
      {},
      { authUC: mockAuthUC, customerUC: mockCustomerUC }
    );

    let res = mockResponse();

    await authController.VerifyEmail(req, res, jest.fn());

    expect(mockAuthUC.VerifyEmail).toBeCalledWith(decode.email);

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("Cannot verify this email, try again");
      })
    );
  });
});
