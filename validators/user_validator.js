const joi = require("@hapi/joi");
const messages = require("./messages");

let userCreateValidator = joi
  .object({
    name: joi.string().required().messages({
      "string.empty": messages.en.user.name,
      "any.required": messages.en.user.name,
    }),
    username: joi.string().required().messages({
      "string.empty": messages.en.user.username,
      "any.required": messages.en.user.username,
    }),
    email: joi.string().email().required().messages({
      "string.empty": messages.en.user.email_empty,
      "string.email": messages.en.user.email_format,
      "any.required": messages.en.user.email_empty,
    }),
    password: joi.string().min(6).required().messages({
      "string.empty": messages.en.user.pass_empty,
      "string.min": messages.en.user.pass_length,
      "any.required": messages.en.user.pass_empty,
    }),
    phone: joi.string().required().messages({
      "string.empty": messages.en.user.phone,
      "any.required": messages.en.user.phone,
    }),
    // city: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // zip_code: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // country: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // img_url: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // role: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // membership: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
    // adress: joi.string().required().messages({
    //   "string.empty": messages.en.user.name,
    //   "any.required": messages.en.user.name,
    // }),
  })
  .options({ abortEarly: false, allowUnknown: true });


module.exports = userCreateValidator;
