const joi = require("joi");

module.exports = {
  productValidation: (body) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Product name cannot be an empty field",
          "any.required": "Product name is required field",
        }),
        description: joi.string().required().messages({
          "string.empty": "Product description cannot be an empty field",
          "any.required": "Product description is required field",
        }),
        stock: joi.number().required().messages({
          "string.empty": "Product stock cannot be an empty field",
          "any.required": "Product stock is required field",
        }),
        price: joi.string().required().messages({
          "string.empty": "Product price cannot be an empty field",
          "any.required": "Product price is required field",
        }),
        weight: joi.string().required().messages({
          "string.empty": "Product weight cannot be an empty field",
          "any.required": "Product weight is required field",
        }),
        image_product: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                image_name: joi.string().required().messages({
                  "string.empty": "Image product name cannot be an empty field",
                  "any.required": "Image product name is required field",
                }),
                image_url: joi.string().required().messages({
                  "string.empty": "Image product url cannot be an empty field",
                  "any.required": "Image product url is required field",
                }),
              })
          ),
      })
      .validate(body);
  },
  categoryValidation: (body) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Category name cannot be an empty field",
          "any.required": "Category name is required field",
        }),
      })
      .validate(body);
  },
  subCategoryValidation: (body) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Sub category name cannot be an empty field",
          "any.required": "Sub category name is required field",
        }),
      })
      .validate(body);
  },
  orderValidation: (body) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Order cannot be an empty field",
          "any.required": "Order is required field",
        }),
      })
      .validate(body);
  },
  forgotPass: (body) => {
    return joi
      .object()
      .keys({
        email: joi.string().required().email().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": `Email is a required field`,
          "string.email": `Please insert a valid email address'`,
        }),
      })
      .validate(body);
  },
  resetPassword: (body) => {
    return joi
      .object()
      .keys({
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        confirmPassword: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Confirm password cannot be an empty field",
            "string.pattern.base":
              "Invalid confirm password, alphanumeric and characters",
            "string.min": `Confirm password should have a minimum length of {#limit}`,
            "any.required": `Confirm password is a required field`,
          }),
      })
      .validate(body);
  },
  login: (body) => {
    return joi
      .object()
      .keys({
        userName: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },
  register: (body) => {
    return joi
      .object()
      .keys({
        userName: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        firstName: joi.string().required().messages({
          "string.empty": "Firstname cannot be an empty field",
          "any.required": "Firstname is required field",
        }),
        lastName: joi.string().required().messages({
          "string.empty": "Lastname cannot be an empty field",
          "any.required": "Lastname is required field",
        }),
        email: joi.string().email().required().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": "Email is required field",
          "string.email": `Please insert a valid email address'`,
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },
  password: (body) => {
    return joi
      .object()
      .keys({
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },
};
