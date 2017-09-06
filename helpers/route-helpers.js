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

  schemas = {
    'id': Joi.object().keys({
      'id': Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    })
  }

module.exports = { validateId, schemas }
