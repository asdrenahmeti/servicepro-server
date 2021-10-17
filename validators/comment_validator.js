const joi = require("@hapi/joi");
const messages = require("./messages");

let commentCreateValidator = joi
  .object({
    comment_text: joi.string().required().messages({
      "string.empty": messages.en.comment.comment_text,
      "any.required": messages.en.comment.comment_text,
    }),
    masterId: joi.number().integer().required().messages({
      "string.empty": messages.en.comment.masterId,
      "any.required": messages.en.comment.masterId,
    }),
    guestId: joi.number().integer().required().messages({
      "string.empty": messages.en.comment.guestId,
      "any.required": messages.en.comment.guestId,
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

module.exports = commentCreateValidator;
