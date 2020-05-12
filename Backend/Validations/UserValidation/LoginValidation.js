const Validator = require("validator");
const isEmpty = require("../../Utils/IsEmpty");
const LogInValidation = (data) => {
  const error = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!Validator.isEmail(data.email)) {
    error.email = "Please Provide Correct Email";
  }
  if (Validator.isEmpty(data.email)) {
    error.email = "Please Provide Email";
  }
  if (Validator.isEmpty(data.password)) {
    error.password = "Please Provide Password";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    error.password = "Password Must Be Atleast 6 Characters Long";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
module.exports = LogInValidation;
