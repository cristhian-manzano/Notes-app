const morgan = require('morgan');
const Logger = require('./logger');

// Env variable
const enviroment = process.env.NODE_ENV ?? 'development';

const morganMiddleware = morgan('tiny', {
  skip: () => enviroment === 'production',
  stream: { write: (message) => Logger.http(message) },
});

module.exports = morganMiddleware;
