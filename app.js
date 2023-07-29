const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');

const handelError = require('./middlewares/handleError');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);
app.use(errors());
app.use(handelError);

mongoose.connect(MONGODB);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущено на ${PORT} порту`);
});
