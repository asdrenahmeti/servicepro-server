const joi = require("@hapi/joi");
const messages = require("./messages");

let jobCreateValidator = joi
  .object({
    title: joi.string().required().messages({
      "string.empty": messages.en.job.title,
      "any.required": messages.en.job.title,
    }),
    description: joi.string().required().messages({
      "string.empty": messages.en.job.description,
      "any.required": messages.en.job.description,
    }),
    userId: joi.number().integer().required().messages({
      "string.empty": messages.en.job.userId,
      "any.required": messages.en.job.userId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = jobCreateValidator;
