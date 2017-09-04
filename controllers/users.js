const
  User = require('../models/user')

module.exports = {
  'index': async (req, res, next) => {
    try {
      const
        users = await User.find({})

        res
          .status(200)
          .json(users)
    }
    catch(ex) {
      next(ex)
    }
  },

  'newUser': async (req, res, next) => {
    try {
      const
        newUser = new User(req.body),
        user = await newUser.save()

      res
        .status(201)
        .json(user)
    }
    catch(ex) {
      next(ex)
    }
  }
}
