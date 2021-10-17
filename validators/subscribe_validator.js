const getErrors = require("./get_error");
const joi = require("@hapi/joi");
const messages = require("./messages");


let subscribeCreateValidator = joi
  .object({
    from: joi.date().iso().required().messages({
      "string.empty": messages.en.subscribe.from,
      "any.required": messages.en.subscribe.from,
      "date.format": messages.en.subscribe.date_format,
    }),
    to: joi.date().iso().required().messages({
      "string.empty": messages.en.subscribe.to,
      "any.required": messages.en.subscribe.to,
      "date.format": messages.en.subscribe.date_format,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });



module.exports = subscribeCreateValidator;
