const Validator = require("validator");
const { isEmpty } = require("../../Utils/IsEmpty");
const UploadValidation = (data) => {
  const error = {};
  data.pic = !isEmpty(data.pic) ? data.pic : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  if (data.month) {
    data.month = !isEmpty(data.month) ? data.month : "";
    if (isEmpty(data.month)) {
      error.month = "Please Provide Month";
    }
  }
  if (data.year) {
    if (isEmpty(data.year)) {
      error.year = "Please Provide Year";
    }
  }
  if (isEmpty(data.pic)) {
    error.pic = "Please Provide Picture";
  }

  if (data.amount <= 0) {
    error.amount = "Amount Should Be Greater The Zero";
  }
  if (isEmpty(data.amount)) {
    error.amount = "Please Provide Amount";
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = UploadValidation;
