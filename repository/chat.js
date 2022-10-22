const { chat: Chat } = require("../models");
const loggerWinston = require("../helpers/logs-winston");
const { Op } = require("sequelize");

class ChatRepository {
  constructor() {
    this.Chat = Chat;
  }

  GetChat = async (recipientId) => {
    try {
      return await this.Chat.findAll({
        where: {
          [Op.or]: [{ recipientId: recipientId }, { senderId: recipientId }],
        },
        order: [["createdAt", "asc"]],
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  insertChat = async (contentMessage) => {
    try {
      return await this.Chat.create(contentMessage);
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

module.exports = ChatRepository;
