const { addColors, format, transports, createLogger } = require('winston');

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'cyan',
  },

  maxLevel: () => {
    const enviroment = process.env.NODE_ENV ?? 'development';
    const isDevelopment = enviroment === 'development';
    return isDevelopment ? 'debug' : 'info';
  },
};

addColors(customLevels.colors);

const customFormats = {
  console: format.combine(format.colorize({ all: true })), // colorize -> Only for console
  general: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
};

const customTransports = [
  new transports.File({ filename: 'logs/combined.log' }),
  new transports.File({ filename: 'logs/errors.log', level: 'error' }),
  new transports.Console({ format: customFormats.console }),
];

const Logger = createLogger({
  level: customLevels.maxLevel(),
  levels: customLevels.levels,
  transports: customTransports,
  format: customFormats.general, // General format
});

module.exports = Logger;
