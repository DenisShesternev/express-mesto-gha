const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadReqError = require('../errors/BadReqError');

const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }

  throw new BadReqError('Некорректный адрес URL.');
};

const validationID = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadReqError('Передан некорретный id.');
};

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validationID),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validationID),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
  validationCreateCard,
  validationCardId,
};
