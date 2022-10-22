const chatUseCase = require("../use_case/chat");
const chatRepo = require("../repository/chat");
const chatUC = new chatUseCase(new chatRepo());

module.exports = (socket) => {
  const userId = socket.handshake.auth["id"];

  const room = `room_${userId}`;

  socket.join(room);

  socket.on("sendMessage", async (contentMessage) => {
    let recipient = contentMessage.recipientId;

    contentMessage.senderId = userId;

    let messageResult = await chatUC.insertChat(contentMessage);

    if (messageResult !== null) {
      socket.emit("onNewChat", messageResult);

      socket.to(`room_${recipient}`).emit("onNewChat", {
        ...messageResult,
        sender: false,
      });
    }
  });

  socket.on("disconnect", () => {
    loggerWinston.info("User Disconnect");
  });
};
