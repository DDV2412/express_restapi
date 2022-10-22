const chatController = require("../controller/chat");
const { GetChat } = require("../mocks/chatMock");
const mockRequest = require("../mocks/mockRequest");
const mockResponse = require("../mocks/mockResponse");

const mockChatNullUC = {
  GetChat: jest.fn().mockReturnValue(null),
};

const mockChatUC = {
  GetChat: jest.fn().mockReturnValue(GetChat),
};

describe("Chat Testing", () => {
  test("Chat Null", async () => {
    let req = mockRequest({}, {}, {}, { chatUC: mockChatNullUC });

    let res = mockResponse();

    await chatController.GetChat(req, res, jest.fn());

    expect(mockChatNullUC.GetChat).toBeCalledWith(req.Customer["id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      messages: null,
    });
  });

  test("Chat Get All", async () => {
    let req = mockRequest({}, {}, {}, { chatUC: mockChatUC });

    let res = mockResponse();

    await chatController.GetChat(req, res, jest.fn());

    expect(mockChatUC.GetChat).toBeCalledWith(req.Customer["id"]);

    expect(res.json).toBeCalledWith({
      success: true,
      messages: GetChat,
    });
  });
});
