const
  express = require('express'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

  // Routes
  users = require('./routes/users'),

  app = express(),
  port = app.get('port') || 5000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://172.17.0.2:27017/api-data', { 'useMongoClient': true })

// Middleware
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users', users)

// Catch 404 Errors and forward to error handlers
app.use((req, res, next) => {
  const
    err = new Error('Not Found')

  err.status = 404

  next(err)
})

// Error handlers
app.use((err, req, res, next) => {
  const
    error = 'development' === app.get('env') ? err : {},
    status = err.status || 500

  // Respond to client
  res
    .status(status)
    .json({ 'error': { 'message': error.message } })

  // Respond to server console
  console.error(err)
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`))
