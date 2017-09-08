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
  },

  'replaceCar': async (req, res, next) => {
    // req.body must contain all the fields
    const
      { carId } = req.valid.params,
      car = await Car.findByIdAndUpdate(carId, req.valid.body)

    res
      .status(200)
      .json()
  },

  'updateCar': async (req, res, next) => {
    // req.body may contain any number of fields
    const
      { carId } = req.valid.params,
      car = await Car.findByIdAndUpdate(carId, req.valid.body)

    res
      .status(200)
      .json()
  },

  'deleteCar': async (req, res, next) => {
    const
      { carId } = req.valid.params,
      car = await Car.findById(carId)

    if(!car) {
      return res
        .status(404)
        .json({ 'error': 'Car doesn\'t exists' })
    }

    const
      seller = await User.findById(car.seller)

    seller.cars.pull(carId)
    await seller.save()

    await car.remove()

    res
      .status(200)
      .json()
  }
}
