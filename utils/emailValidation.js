const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

module.exports = function emailValidation(email) {
  const valid = validator.isEmail(email);
  if (!valid) {
    throw new BadRequestError('Некорректный email');
  }
  return email;
};
