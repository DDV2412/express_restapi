"use strict";
const { hash } = require("../../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: "37f3a09f-66ad-4a4b-ad3b-68395ada5bb0",
          name: "Computer and Laptop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "sub_categories",
      [
        {
          id: "cfb6d76a-c005-4af4-9810-29d39c6d87e6",
          catId: "37f3a09f-66ad-4a4b-ad3b-68395ada5bb0",
          name: "Laptop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "04b5e968-0cde-4e4c-b115-90213a1ae0c9",
          subCatId: "cfb6d76a-c005-4af4-9810-29d39c6d87e6",
          name: "Asus ROG Ram 12GB SSD 512",
          description: "Laptop Gaming",
          stock: "10",
          price: "12500000",
          weight: "2.5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "product_images",
      [
        {
          id: "b228d1e1-18a4-4aa0-9f7b-8ae3676004ec",
          productId: "04b5e968-0cde-4e4c-b115-90213a1ae0c9",
          name: "ASUS-ROG.jpg",
          url: "http://localhost:5000\\product\\1664422100542ASUS-ROG.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("sub_categories", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("product_images", null, {});
  },
};
