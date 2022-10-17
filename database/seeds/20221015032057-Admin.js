"use strict";
const { hash } = require("../../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          userName: "Admin",
          firstName: "Admin",
          lastName: "Binar",
          email: "admin@mail.com",
          noPhone: "090",
          password: hash("123456"),
          isAdmin: true,
          photoProfile: "-",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          userName: "Customer",
          firstName: "Customer",
          lastName: "Binar",
          email: "customer@mail.com",
          noPhone: "091",
          password: hash("123456"),
          isAdmin: false,
          photoProfile: "-",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
