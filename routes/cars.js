const
  express = require('express'),
  router = require('express-promise-router')(),

  carsController = require('../controllers/cars'),
  { validateId, validateBody, schemas } = require('../helpers/route-helpers')

router.route('/')
  .get(carsController.index)

module.exports = router
