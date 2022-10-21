const authController = require("../controller/authController");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");
const crypto = require("crypto");
const { Register, Login } = require("../mocks/authMock");
const { getById } = require("../mocks/customerMock");
const jwt = require("jsonwebtoken");

const mockAuthUC = {
  Register: jest.fn().mockReturnValue(Register),
  Login: jest.fn().mockReturnValue(Login),
  ForgotPassword: jest
    .fn()
    .mockReturnValue(crypto.randomBytes(64).toString("base64")),
  ResetPass: jest.fn().mockReturnValue([1]),
  VerifyEmail: jest.fn().mockReturnValue([1]),
};

const Reqtoken = jwt.sign(
  {
    id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
    userName: "Admin",
    firstName: "Admin",
    lastName: "Binar",
    email: "admin@mail.com",
    photoProfile: "-",
    isAdmin: false,
    verified: null,
  },
  "QWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2N",
  { expiresIn: "1h" }
);

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
  "QWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2N",
  { expiresIn: "1h" }
);

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
        isAdmin: false,
        verified: null,
      },
      token: Reqtoken,
    });
  });
});
