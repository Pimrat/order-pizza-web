import Joi from "joi";

const productSchema = Joi.object({
  productName: Joi.string()
    .required()
    .messages({ "any.required": "Product Name is required" }),
  productType: Joi.string()
    .valid("PIZZA", "OTHERS", "SOFTDRINKS")
    .required()
    .messages({
      "any.required": "Product Type is required",
      "any.only": "Product Type must be one of PIZZA, OTHERS, SOFTDRINKS",
    }),
  productDetail: Joi.string()
    .required()
    .messages({ "any.required": "Product Detail is required" }),
  productPrice: Joi.number().required().positive().messages({
    "number.base": "Price is required and must be a number.",
    "number.positive": "Price must be greater than 0.",
  }),
  productImage: Joi.optional(),
});

const productValidate = (input) => {
  const { error } = productSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default productValidate;
