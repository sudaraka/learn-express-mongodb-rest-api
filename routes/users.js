const
  express = require('express'),
  usersController = require('../controllers/users'),

  router = express.Router()

router.route('/')
  .get(usersController.index)

module.exports = router
