const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  try {
    res.status(201).json({ message: 'Good!' });
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
