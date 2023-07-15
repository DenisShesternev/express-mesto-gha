const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64b20a1d368c2aaa822a77d3',
  };
  next();
});

app.use(router);

mongoose.connect(MONGODB);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущено на ${PORT} порту`);
});
