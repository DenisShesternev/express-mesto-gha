const Cards = require('../models/card');

const ERR_BAD_REQUEST = 400;
const ERR_DEFAULT = 500;
const ERR_NOT_FOUND = 404;

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Cards.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Cards.findByIdAndRemove(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else if (err.message === 'NotFound') {
        res.status(ERR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
