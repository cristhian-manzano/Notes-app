const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/v1/api', routes);

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Running in port ${PORT}`);
  /* eslint-enable no-console */
});
