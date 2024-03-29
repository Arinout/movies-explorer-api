const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
