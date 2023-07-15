const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64b20a1d368c2aaa822a77d3',
  };
  next();
});

app.use(userRouter);
app.use(cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Приложение успешно запущено на ${PORT} порту`);
});
