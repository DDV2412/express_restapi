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
};
