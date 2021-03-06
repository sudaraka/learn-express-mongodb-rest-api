const
  Joi = require('joi'),

  validateId = (schema, name) => (req, res, next) => {
    const
      params =  { 'id': req.params[name] },
      result = Joi.validate(params, schema)

    if(result.error) {
      return res
        .status(400)
        .json(result.error)
    }

    req.valid = req.valid || {}

    req.valid = {
      ...req.valid,
      'params': {
        ...req.valid.params,
        [name]: result.value.id
      }
    }

    next()
  },

  validateBody = schema => (req, res, next) => {
    const
      result = Joi.validate(req.body, schema)

    if(result.error) {
      return res
        .status(400)
        .json(result.error)
    }

    req.valid = {
      ...req.valid || {},
      'body': result.value
    }

    next()
  },

  schemas = {
    'id': Joi.object().keys({
      'id': Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }),

    'user': Joi.object().keys({
      'firstName': Joi.string().required(),
      'lastName': Joi.string().required(),
      'email': Joi.string().email().required()
    }),

    'userOptional': Joi.object().keys({
      'firstName': Joi.string(),
      'lastName': Joi.string(),
      'email': Joi.string().email()
    }),

    'car': Joi.object().keys({
      'make': Joi.string().required(),
      'model': Joi.string().required(),
      'year': Joi.number().required()
    }),

    'newCar': Joi.object().keys({
      'make': Joi.string().required(),
      'model': Joi.string().required(),
      'year': Joi.number().required(),
      'seller': Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }),

    'replaceCar': Joi.object().keys({
      'make': Joi.string().required(),
      'model': Joi.string().required(),
      'year': Joi.number().required()
    }),

    'replaceCarOptional': Joi.object().keys({
      'make': Joi.string(),
      'model': Joi.string(),
      'year': Joi.number()
    })
  }

module.exports = { validateId, validateBody,  schemas }
