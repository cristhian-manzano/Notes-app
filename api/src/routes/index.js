const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  const x = 'hello';

  try {
    res.status(201).json({ message: 'Good!' });
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
