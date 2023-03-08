const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

module.exports = function urlValidation(url) {
  const validity = validator.isURL(url);
  if (!validity) {
    throw new BadRequestError('Некорректный адрес');
  }
  return url;
};
