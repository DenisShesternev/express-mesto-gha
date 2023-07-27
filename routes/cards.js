const { Router } = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validations');

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCreateCard, createCard);
cardsRouter.delete('/:cardId', validationCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validationCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = cardsRouter;
