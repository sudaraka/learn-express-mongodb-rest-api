const
  User = require('../models/user'),
  Car = require('../models/car')

module.exports = {
  'index': async (req, res, next) => {
    const
      cars = await Car.find({})

    res
      .status(200)
      .json(cars)
  },

  'newCar': async (req, res, next) => {
    let
      car = null

    const
      { 'seller': sellerId, ...carWithoutSeller } = req.valid.body,
      seller = await User.findById(sellerId),
      newCar = new Car(carWithoutSeller)

    if(seller) {
      newCar.seller = seller
      car = await newCar.save()

      seller.cars.push(newCar)
      await seller.save()

      res
        .status(201)
        .json(car)
    }
    else {
      res
        .status(404)
        .json({ 'error': 'Seller nor found' })
    }
  },

  'getCar': async (req, res, next) => {
    const
      { carId } = req.valid.params,
      car = await Car.findById(carId)

    res
      .status(200)
      .json(car)
  }
}
