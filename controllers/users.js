const
  User = require('../models/user')

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
      newUser = new User(req.body),
      user = await newUser.save()

    res
      .status(201)
      .json(user)
  },

  'getUser': async (req, res, next) => {
    const
      { userId } = req.params,
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
  }
}
