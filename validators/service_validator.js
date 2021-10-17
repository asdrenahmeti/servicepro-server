const joi = require("@hapi/joi");
const messages = require("./messages");

let serviceCreateValidator = joi
  .object({
    name: joi.string().required().messages({
      "string.empty": messages.en.service.name,
      "any.required": messages.en.service.name,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = serviceCreateValidator;
