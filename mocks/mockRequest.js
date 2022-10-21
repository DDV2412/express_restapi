const mockRequest = (
  body = {},
  query = {},
  params = {},
  useCases = {},
  protocol = {},
  get = {}
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
  };
};
module.exports = mockRequest;
