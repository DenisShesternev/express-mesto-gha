const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const auth = require('./middlewares/auth');

const handelError = require('./middlewares/handleError');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/mesvxcvxcvx' } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(auth);
app.use(routes);
app.use(errors());
app.use(handelError);

mongoose.connect(MONGODB);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущено на ${PORT} порту`);
});
