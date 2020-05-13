const Validator = require("validator");
const { isEmpty } = require("../../Utils/IsEmpty");
const SignUpValidation = (data) => {
  const error = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.office = !isEmpty(data.office) ? data.office : "";

  if (Validator.isEmpty(data.name)) {
    error.name = "Please Provide Name";
  }
  if (!Validator.isEmail(data.email)) {
    error.email = "Please Provide Correct Email";
  }
  if (Validator.isEmpty(data.email)) {
    error.email = "Please Provide Email";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    error.password = "Password Must Be Atleast 6 Characters Long";
  }
  if (Validator.isEmpty(data.password)) {
    error.password = "Please Provide Password";
  }
  if (Validator.isEmpty(data.office)) {
    error.office = "Please Provide Office";
  }
  if (Validator.isEmpty(data.phone_number)) {
    error.phone_number = "Please Provide Phone Number";
  }
  if (
    !/^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.\-]?[0-9]{3}[-\s\.]?[0-9]{3,5}$/im.test(
      data.phone_number
    )
  ) {
    error.phone_number = "Please Provide Correct Phone Number";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
module.exports = SignUpValidation;
