'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.STRING,
        defaultValues: 'rejected',
        format: 'enum',
        values: ['approved', 'rejected']
      },
      amount: {
        type: Sequelize.BIGINT
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING,
        defaultValues: 'cash',
        format: 'enum',
        values:['cash', 'credit']
      },
      confirm_payment: {
        type: Sequelize.STRING,
        defaultValues: 'Confirm Payment',
        format: 'enum',
        values: ['Confirm Payment', 'Cancel']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};