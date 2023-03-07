require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const { centralizedError } = require('./middlewares/centralizedError');
const { DB_ADRESS_DEV } = require('./utils/constants');

const { NODE_ENV, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb', PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : DB_ADRESS_DEV, {
  useNewUrlParser: true,
});

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(centralizedError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
