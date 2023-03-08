const jwtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthtorized-error');

const { JWT_SECRET_DEV } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new UnauthorizedError('Необходимо зарегистрироваться'));
    return;
  }

  let payload;
  try {
    payload = jwtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация, токен истек'));
    return;
  }
  req.user = payload;
  next();
};
