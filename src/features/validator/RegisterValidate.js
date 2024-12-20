import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "First name is required" }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Last name is require" }),
  username: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "username is required" }),
  email: Joi.string()
    .email({ tlds: false })
    .messages({ "string.empty": "email is required" }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be alphanumeric and at least 6 character ",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .strip()
    .messages({
      "string.empty": "confirm password is required.",
      "any.only": "password and confirm password didn't match",
    }),
});

const registerValidate = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default registerValidate;
