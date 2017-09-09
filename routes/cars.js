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
    // req.body must contain all the fields
    validateId(schemas.id, 'carId'),
    validateBody(schemas.replaceCar),
    carsController.updateCar
  )
  .patch(
    // req.body may contain any number of fields
    validateId(schemas.id, 'carId'),
    validateBody(schemas.replaceCarOptional),
    carsController.updateCar
  )
  .delete(
    validateId(schemas.id, 'carId'),
    carsController.deleteCar
  )

module.exports = router
