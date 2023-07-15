const { Router } = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
