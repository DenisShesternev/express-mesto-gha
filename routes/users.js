const { Router } = require('express');

const {
  getUsers,
  getCurrentUser,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validations');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validationUserId, getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', validationUpdateUser, updateUser);
usersRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = usersRouter;
