const
  express = require('express'),
  router = express.Router()

router.route('/')
  .get((req, res, next) => {
    res
      .status(200)
      .json({ 'message': 'You requested the index page' })
  })

module.exports = router
