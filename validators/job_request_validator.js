const joi = require("@hapi/joi");
const messages = require("./messages");

let jobRequestCreateValidator = joi
  .object({
    title: joi.string().required().messages({
      "string.empty": messages.en.job_request.title,
      "any.required": messages.en.job_request.title,
    }),
    description: joi.string().required().messages({
      "string.empty": messages.en.job_request.description,
      "any.required": messages.en.job_request.description,
    }),
    userId: joi.number().integer().required().messages({
      "string.empty": messages.en.job_request.userId,
      "any.required": messages.en.job_request.userId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = jobRequestCreateValidator;
