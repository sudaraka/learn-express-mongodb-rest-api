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
  .all(
    // Apply carId validation to all route methods
    validateId(schemas.id, 'carId')
  )
  .get(
    carsController.getCar
  )
  .put(
    // req.body must contain all the fields
    validateBody(schemas.replaceCar),
    carsController.updateCar
  )
  .patch(
    // req.body may contain any number of fields
    validateBody(schemas.replaceCarOptional),
    carsController.updateCar
  )
  .delete(
    carsController.deleteCar
  )

module.exports = router
