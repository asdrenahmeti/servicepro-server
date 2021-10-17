const joi = require("@hapi/joi");
const messages = require("./messages");

let jobImageCreateValidator = joi
  .object({
    img_url: joi.string().required().messages({
      "string.empty": messages.en.job_image.img_url,
      "any.required": messages.en.job_image.img_url,
    }),
    jobId: joi.number().integer().required().messages({
      "string.empty": messages.en.job_image.jobId,
      "any.required": messages.en.job_image.jobId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = jobImageCreateValidator;
