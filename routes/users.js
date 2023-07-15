const { Router } = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
