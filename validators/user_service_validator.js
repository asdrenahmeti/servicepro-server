const joi = require("@hapi/joi");
const messages = require("./messages");

let userServiceCreateValidator = joi
  .object({
    serviceId: joi.number().integer().required().messages({
      "string.empty": messages.en.user_service.serviceId,
      "any.required": messages.en.user_service.serviceId,
    }),
    userId: joi.number().integer().required().messages({
      "string.empty": messages.en.user_service.userId,
      "any.required": messages.en.user_service.userId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = userServiceCreateValidator;
