const
  mongoose = require('mongoose'),

  { Schema } = mongoose,

  carSchema = new Schema({
    'make': String,
    'model': String,
    'year': Number,
    'seller': {
      'type': Schema.Types.ObjectId,
      'ref': 'User'
    }
  })

module.exports = mongoose.model('Car', carSchema)
