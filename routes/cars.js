const
  express = require('express'),
  router = require('express-promise-router')(),

  carsController = require('../controllers/cars'),
  { validateId, validateBody, schemas } = require('../helpers/route-helpers')

router.route('/')
  .get(carsController.index)
  .post(
    validateBody(schemas.newCar),
    carsController.newCar
  )

router.route('/:carId')
  .get(
    validateId(schemas.id, 'carId'),
    carsController.getCar
  )
  .put(
    validateId(schemas.id, 'carId'),
    validateBody(schemas.replaceCar),
    carsController.replaceCar
  )
  .patch(
    validateId(schemas.id, 'carId'),
    validateBody(schemas.replaceCarOptional),
    carsController.updateCar
  )

module.exports = router
