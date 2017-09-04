const
  express = require('express'),
  router = require('express-promise-router')(),

  usersController = require('../controllers/users')

router.route('/')
  .get(usersController.index)
  .post(usersController.newUser)

module.exports = router
