const mockRequest = (
  body = {},
  query = {},
  params = {},
  useCases = {},
  files = [],
  protocol = {},
  get = {},
  Customer = {}
) => {
  Customer = {
    id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
    userName: "Admin",
    firstName: "Admin",
    lastName: "Binar",
    isAdmin: true,
    photoProfile: "-",
    verified: null,
  };

  protocol = "http";

  get = host = () => "localhost:5000";
  return {
    body,
    query,
    params,
    ...useCases,
    protocol,
    files,
    get,
    Customer,
  };
};
module.exports = mockRequest;
