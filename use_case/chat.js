class Chat {
  constructor(ChatRepository) {
    this.ChatRepository = ChatRepository;
  }

  async GetChat(recipientId) {
    let message = [];
    let indexed = {};
    let results = await this.ChatRepository.GetChat(recipientId);

    for (let i = 0; i < results.length; i++) {
      let chatTemp = {
        ...results[i].get(),
        sender: false,
      };

      if (chatTemp["senderId"] == recipientId) {
        chatTemp["sender"] = true;
      }

      let index = indexed[`${chatTemp.senderId}_${chatTemp.recipientId}`];

      if (typeof index !== "number") {
        let temp = {
          senderId: chatTemp.senderId,
          recipientId: chatTemp.recipientId,
          lastChat: chatTemp.createdAt,
          chats: [chatTemp],
        };
        message.push(temp);
        indexed[`${chatTemp.senderId}_${chatTemp.recipientId}`] =
          message.length - 1;
      } else {
        message[index].lastChat = chatTemp.createdAt;
        message[index].chats.push(chatTemp);
      }
    }
    return message;
  }

  async insertChat(contentMessage) {
    let result = await this.ChatRepository.insertChat(contentMessage);

    if (result === null) {
      return null;
    }

    return {
      ...result.get(),
      sender: true,
    };
  }
}

module.exports = Chat;
