const fileUploadController = require("../controller/fileUpload");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

describe("Testing File Upload controller", () => {
  test("No Upload File ", async () => {
    let req = mockRequest({}, {}, {}, {}, []);

    let res = mockResponse();

    await fileUploadController.uploadFile(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw Error("No file uploaded");
      })
    );
  });

  test("Upload File", async () => {
    let req = mockRequest({}, {}, {}, {}, [
      {
        fieldname: "product_image",
        originalname: "Test Upload File",
        encoding: "base64",
        mimetype: "image/png",
        destination: "static",
        filename: "Test Upload File",
        path: "statis",
        size: "7643",
      },
    ]);

    let res = mockResponse();

    await fileUploadController.uploadFile(req, res, jest.fn());

    expect(res.json).toBeCalledWith({
      success: true,
      files: [
        {
          fieldname: "product_image",
          name: "Test Upload File",
          encoding: "base64",
          mimetype: "image/png",
          destination: "static",
          filename: "Test Upload File",
          url: "statis",
          size: "7643",
        },
      ],
    });
  });
});
