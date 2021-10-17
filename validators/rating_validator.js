const joi = require("@hapi/joi");
const messages = require("./messages");

let ratingCreateValidator = joi
  .object({
    rating_value: joi.number().integer().min(1).max(5).required().messages({
      "string.empty": messages.en.rating.rating_value,
      "any.required": messages.en.rating.rating_value,
      "number.min": messages.en.rating.rating_value_data,
      "number.max": messages.en.rating.rating_value_data,
    }),
    masterId: joi.number().integer().required().messages({
      "string.empty": messages.en.rating.masterId,
      "any.required": messages.en.rating.masterId,
    }),
    guestId: joi.number().integer().required().messages({
      "string.empty": messages.en.rating.guestId,
      "any.required": messages.en.rating.guestId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = ratingCreateValidator;
