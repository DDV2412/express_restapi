const mockRequest = (
  body = {},
  query = {},
  params = {},
  useCases = {},
  protocol = {},
  get = {},
  Customer = {}
) => {
  return {
    body,
    query,
    params,
    ...useCases,
    protocol: "http",
    get: (host = () => {
      "localhost:500";
    }),
    Customer: {
      id: "21b2f1f0-1553-4598-aa2d-8904a509f755",
      userName: "Admin",
      firstName: "Admin",
      lastName: "Binar",
      noPhone: 90,
      isAdmin: true,
      photoProfile: "-",
      verified: null,
    },
  };
};
module.exports = mockRequest;
