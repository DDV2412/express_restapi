"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM("Pending", "Approved", "Cancel"),
        defaultValue: "Pending",
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
      },
      payment_method: {
        type: Sequelize.ENUM("Cash", "Credit"),
        defaultValue: "Cash",
      },
      confirm_payment: {
        type: Sequelize.ENUM("Waiting Payment", "Confirm Payment", "Cancel"),
        defaultValue: "Waiting Payment",
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
    await queryInterface.dropTable("orders");
  },
};
