function getErrors(details){
  let errors = details.map((item) => {
    let err = { [item.context.key]: item.message };
    return err;
  });
  return errors;
}

module.exports = getErrors