const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateSignupInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.FirstName = !isEmpty(data.FirstName) ? data.FirstName : "";
  data.LastName = !isEmpty(data.LastName) ? data.LastName : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";
// Name checks
  if (Validator.isEmpty(data.FirstName)) {
    errors.FirstName = "Name field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.LastName)) {
    errors.LastName = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Email field is required";
  } else if (!Validator.isEmail(data.Email)) {
    errors.Email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.Password)) {
    errors.Password = "Password field is required";
  }
if (!Validator.isLength(data.Password, { min: 6, max: 30 })) {
    errors.Password = "Password must be at least 6 characters";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};