const Validator = require("validator");
const { isEmpty } = require("../../Utils/IsEmpty");
const ProfileValidation = (data) => {
  const error = {};
  if (data.password) {
    data.password = !isEmpty(data.password) ? data.password : "";
    if (!Validator.isLength(data.password, { min: 6 })) {
      error.password = "Password Must Be Atleast 6 Characters Long";
    }
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};
module.exports = ProfileValidation;
