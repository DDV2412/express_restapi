const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Kel 2 - Ecommerce Web API",
    description: "Ecommerce Web API",
  },
  host: "localhost:5000",
  schemes: ["http"],
  definitions: {
    Category: {
      id: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
      name: "Computer and Laptop",
    },
    SubCategory: {
      id: "83641605-ba8d-4223-8365-55bb92398d9f",
      catId: "6d6c816d-56ad-47ce-9eca-61a1b1dfebe1",
      name: "Laptop",
    },
    Products: {
      id: "163759dc-b400-4716-8f79-66b6e072912d",
      subCatId: "11ac4661-38f0-42d2-bde5-5ed80548300f",
      name: "ASUS A416FA-FHD323 i3-10110U 4GB SSD 256GB+ Housing Win11+OHS 14' FHD - Slate Grey",
      description: "Kondisi: Baru",
      stock: 60,
      price: "5.215.000",
      weight: "3",
      variation: [{ color: "Trans Silver" }],
      ProductImage: [
        {
          id: "6e872858-f160-4846-81ad-c97b5d18a8f1",
          productId: "41722e84-c34f-44ec-a024-851e0d84c5bf",
          name: "02 Cover Journal IJICT 2021.jpg",
          url: "F:\\Bootcamp\\PLATINUM CHALLENGE\\public\\images\\166342318284902 Cover Journal IJICT 2021.jpg-.jpg",
        },
      ],
    },
    ProductImage: {
      filename: "166381247687601 Cover Journal IJEECS 2021.jpg",
      path: "http://localhost:5000/api/product-image\\166381247687601 Cover Journal IJEECS 2021.jpg",
    },
    Cart: {
      id:"e3472e0f-664a-4927-b39d-7d122cfcce07",
      customerId: "c31f9477-65ab-4e5c-bbe5-e9138d44fa95",
      productId: "163759dc-b400-4716-8f79-66b6e072912d",
      qty: 1,
      variation:[{ color: "Trans Silver" }],
    },
    CreateProduct: {
      subCatId: "11ac4661-38f0-42d2-bde5-5ed80548300f",
      name: "ASUS A416FA-FHD323 i3-10110U 4GB SSD 256GB+ Housing Win11+OHS 14' FHD - Slate Grey",
      description: "Kondisi: Baru",
      stock: 60,
      price: "5.215.000",
      weight: "3",
      variation: [{ color: "Trans Silver" }],
      imageProduct: [{ $ref: "#/definitions/ProductImage" }],
    },
    CreateCategory: {
      name: "Sport",
    },
    CreateSubCategory: {
      catId: "31a1e640-d917-4d14-a8fc-e98612dad144",
      name: "Sport Shoes",
    },
    CreateCart: {
      customerId: "c31f9477-65ab-4e5c-bbe5-e9138d44fa95",
      productId: "163759dc-b400-4716-8f79-66b6e072912d",
      qty: 1,
      variation:[{ color: "Silver" }],
    }
  },
};

const outputFile = "./docs/docs.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
