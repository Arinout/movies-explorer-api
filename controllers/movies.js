const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movieData = {
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  };

  Movie.create(movieData)
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Необходимы права для удаления фильма');
      }
    })
    .then(() => res.status(200).send({ message: 'успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий _id фильма.'));
        return;
      }
      next(err);
    });
};
