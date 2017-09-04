const
  express = require('express'),
  router = require('express-promise-router')(),

  usersController = require('../controllers/users')

router.route('/')
  .get(usersController.index)
  .post(usersController.newUser)

router.route('/:userId')
  .get(usersController.getUser)
  .put(usersController.replaceUser)

module.exports = router
