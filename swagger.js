const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Kel 2 - Ecommerce Web API",
    description: "Ecommerce Web API",
  },
  host: "localhost:5000",
  schemes: ["http"],
  definitions: {
    Product: {
      subCatId: "",
      name: "",
      description: "",
      stock: 1,
      price: "",
      weight: "",
      variation: "",
    },
    Category: {
      name: "",
    },
    SubCategory: {
      catId: "",
      name: "",
    },
    CustomerAddress: {
      cust_id: "",
      city: "",
      province: "",
      line: "",
      zip_code: "",
    },
    Order: {
      status: `ENUM("Pending", "Approved", "Cancel"))`,
      amount: 1,
      cartId: "",
      payment_method: `ENUM("Cash", "Credit")`,
      confirm_payment: `ENUM("Waiting Payment",
        "Confirm Payment",
        "Cancel")`,
    },
    ProductImage: {
      productId: "",
      name: "",
      url: "",
    },
    ResetPassword: {
      email: "",
      resetToken: "",
      expired_at: "",
    },
    ShoppingCart: {
      customerId: "",
      productId: "",
      qty: 1,
      variation: "",
    },
    Customer: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      noPhone: "",
      password: "",
      photoProfile: "",
      verified: "",
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};

const outputFile = "./docs/docs.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
