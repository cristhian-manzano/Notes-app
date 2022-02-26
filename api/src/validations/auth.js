const joi = require('joi');

const signUpValidate = (data) => {
  const schema = joi.object({
    email: joi.string().max(75).email().required(),
    password: joi.string().max(40).min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  signUpValidate,
};
