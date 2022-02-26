const express = require('express');
const process = require('process');
const helmet = require('helmet');
const cors = require('cors');

const ApiError = require('./errors/customError');
const { errorResponse } = require('./helpers/httpResponses');
const routes = require('./routes/index');
const morganMiddleware = require('./config/morgan');
const Logger = require('./config/logger');

const app = express();

app.use(morganMiddleware);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/v1/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  Logger.error(err);

  if (err instanceof ApiError)
    return res
      .status(err.httpCode)
      .json(errorResponse(res.statusCode, err.message));

  return res
    .status(500)
    .json(errorResponse(res.statusCode, 'Internal server Error'));
});

// Handle Exceptions
process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (err) => {
  Logger.error(err);
});

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  Logger.info(`Running in port ${PORT}`);
});
