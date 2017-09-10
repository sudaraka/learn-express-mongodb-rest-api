const
  express = require('express'),
  router = require('express-promise-router')(),

  usersController = require('../controllers/users'),
  { validateId, validateBody, schemas } = require('../helpers/route-helpers')

router.route('/')
  .get(usersController.index)
  .post(
    validateBody(schemas.user),
    usersController.newUser
  )

router.route('/:userId')
  .all(
    validateId(schemas.id, 'userId'),
  )
  .get(
    usersController.getUser
  )
  .put(
    // req.body must contain all the fields
    validateBody(schemas.user),
    usersController.updateUser
  )
  .patch(
    // req.body may contain any number of fields
    validateBody(schemas.userOptional),
    usersController.updateUser
  )

router.route('/:userId/cars')
  .all(
    validateId(schemas.id, 'userId'),
  )
  .get(
    usersController.getUserCars
  )
  .post(
    validateBody(schemas.car),
    usersController.newUserCar
  )

module.exports = router
