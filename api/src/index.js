const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Running in port ${PORT}`);
  /* eslint-enable no-console */
});
