const getErrors = require("./get_error");
function showValidatorResult(data, model) {
  let result = { is_valid: true, errors: {}, values: {} };
  let valid_res = model.validate(data);
  if (valid_res.error) {
    result.is_valid = false;
    result.errors = getErrors(valid_res.error.details);
  }
  result.values = valid_res.value;
  return result;
}
module.exports = showValidatorResult;
