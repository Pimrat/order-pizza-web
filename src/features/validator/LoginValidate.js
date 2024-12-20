import Joi from "joi";

const loginSchema = Joi.object({
  identify: Joi.string()
    .required()
    .custom((value, helpers) => {
      // Regular expression for validating email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regular expression for validating username (alphanumeric and at least 3 characters)
      const usernameRegex = /^[a-zA-Z0-9]/;

      if (emailRegex.test(value) || usernameRegex.test(value)) {
        return value; // Valid identify
      } else {
        return helpers.message(
          "Identify must be a valid email or username (at least 3 alphanumeric characters)"
        );
      }
    })
    .messages({
      "string.empty": "Email or username is required",
      "any.required": "Email or username is required",
    }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
    "string.pattern.base":
      "password must be alphanumeric and at least 6 character ",
  }),
});

const loginValidate = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });
  console.log("joi validate________", error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default loginValidate;
