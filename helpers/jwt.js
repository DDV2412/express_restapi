const jwt = require("jsonwebtoken");

const encode = (data) =>
  jwt.sign(
    data,
    process.env.JWT_SECRET ||
      "QWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2N",
    { expiresIn: "1h" }
  );

const decode = (token) =>
  jwt.verify(
    token,
    process.env.JWT_SECRET ||
      "QWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2N"
  );

module.exports = {
  encode,
  decode,
};
