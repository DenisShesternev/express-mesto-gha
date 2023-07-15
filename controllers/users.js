const User = require('../models/user');

const ERR_BAD_REQUEST = 400;
const ERR_DEFAULT = 500;
const ERR_NOT_FOUND = 404;

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Ошибка по умолчанию.' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
