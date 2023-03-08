const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login, exit } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRuoter = require('./movies');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const pageNotFoundError = require('../middlewares/pageNotFoundError');

router.use('/signup', validateCreateUser, createUser);
router.use('/signin', validateLogin, login);

router.use(auth);

router.post('/signout', exit);
router.use('/users', usersRouter);
router.use('/movies', moviesRuoter);

router.use(pageNotFoundError);

module.exports = router;
