const
  express = require('express'),
  usersController = require('../controllers/users'),

  router = express.Router()

router.route('/')
  .get(usersController.index)
  .post(usersController.newUser)

module.exports = router
