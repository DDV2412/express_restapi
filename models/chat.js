"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat.init(
    {
      senderId: DataTypes.UUID,
      recipientId: DataTypes.UUID,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "chat",
    }
  );
  chat.beforeCreate(async (Chat) => {
    Chat["id"] = uuidv4();
  });
  return chat;
};
