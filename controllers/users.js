const
  User = require('../models/user'),
  Car = require('../models/car')

module.exports = {
  'index': async (req, res, next) => {
    const
      users = await User.find({})

    res
      .status(200)
      .json(users)
  },

  'newUser': async (req, res, next) => {
    const
      newUser = new User(req.valid.body),
      user = await newUser.save()

    res
      .status(201)
      .json(user)
  },

  'getUser': async (req, res, next) => {
    const
      { userId } = req.valid.params,
      user = await User.findById(userId)

    res
      .status(200)
      .json(user)
  },

  'replaceUser': async (req, res, next) => {
    // TODO: enfore that req.body must contain all the fields
    const
      { userId } = req.params,
      user = await User.findByIdAndUpdate(userId, req.body)

    res
      .status(200)
      .json()
  },

  'updateUser': async (req, res, next) => {
    // req.body may contain any number of fields
    const
      { userId } = req.params,
      user = await User.findByIdAndUpdate(userId, req.body)

    res
      .status(200)
      .json()
  },

  'getUserCars': async (req, res, next) => {
    const
      { userId } = req.params,
      { cars } = await User.findById(userId).populate('cars')

    res
      .status(200)
      .json(cars)
  },

  'newUserCar': async (req, res, next) => {
    const
      { userId } = req.params,
      user = await User.findById(userId),

      // Create a new car
      newCar = new Car(req.body)

    // Assign user as car's seller
    newCar.seller = user
    await newCar.save()

    // Add car to the user's selling array `cars`
    user.cars.push(newCar)
    await user.save()

    res
      .status(201)
      .json(newCar)
  }
}
