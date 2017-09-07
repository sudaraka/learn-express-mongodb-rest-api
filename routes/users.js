const
  express = require('express'),
  router = require('express-promise-router')(),

  usersController = require('../controllers/users'),
  { validateId, validateBody, schemas } = require('../helpers/route-helpers')

router.route('/')
  .get(usersController.index)
  .post(validateBody(schemas.user), usersController.newUser)

router.route('/:userId')
  .get(validateId(schemas.id, 'userId'), usersController.getUser)
  .put(usersController.replaceUser)
  .patch(usersController.updateUser)

router.route('/:userId/cars')
  .get(usersController.getUserCars)
  .post(usersController.newUserCar)

module.exports = router
