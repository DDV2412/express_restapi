const jwt = require("../helpers/jwt");
const bcrypt = require("../helpers/bcrypt");

describe("Bcrypt JS", () => {
  test("Bcrypt, invalid password as param. Bcrypt should return false.", () => {
    expect(
      bcrypt.validateText(
        "Invalid-password-for-negative-case",
        "$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom"
      )
    ).toBe(false);
  });

  test("Bcrypt, valid password as param. Bcrypt should return true.", () => {
    expect(
      bcrypt.validateText(
        "Password",
        "$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom"
      )
    ).toBe(true);
  });

  test("Bcrypt should return hashed text", () => {
    const hashedText = bcrypt.hash("Password");

    expect(hashedText).toBeTruthy();
  });
});

describe("Json Web Token", () => {
  test("Decode using invalid secret-key. Should throw Error.", () => {
    expect(() => jwt.decode("dsadabwhebfhb")).toThrow();
  });

  test("Decode using valid secret-key. Should return decoded object.", () => {
    expect(() => jwt.decode(process.env.SECRET_KEY)).toBeTruthy();
  });

  test("encode using invalid secret-key. Should throw Error.", () => {
    expect(() => jwt.encode("dsadabwhebfhb")).toThrow();
  });

  test("encode using valid secret-key. Should return encoded object.", () => {
    expect(() => jwt.encode(process.env.SECRET_KEY)).toBeTruthy();
  });
});
