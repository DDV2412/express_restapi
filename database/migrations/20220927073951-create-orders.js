"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "shopping_carts",
          },
          key: "id",
        },
        onDeleted: "cascade",
        onUpdated: "cascade",
      },
      payment_method: {
        type: Sequelize.ENUM("cash", "credit"),
        defaultValue: "cash",
      },
      confirm_payment: {
        type: Sequelize.ENUM("Confirm Payment", "Cancel"),
        defaultValue: "Confirm Payment",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
