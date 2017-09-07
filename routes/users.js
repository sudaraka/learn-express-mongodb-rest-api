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
  .get(
    validateId(schemas.id, 'userId'),
    usersController.getUser
  )
  .put(
    validateId(schemas.id, 'userId'),
    validateBody(schemas.user),
    usersController.replaceUser
  )
  .patch(
    validateId(schemas.id, 'userId'),
    validateBody(schemas.userOptional),
    usersController.updateUser
  )

router.route('/:userId/cars')
  .get(
    validateId(schemas.id, 'userId'),
    usersController.getUserCars
  )
  .post(
    validateId(schemas.id, 'userId'),
    validateBody(schemas.car),
    usersController.newUserCar
  )

module.exports = router
