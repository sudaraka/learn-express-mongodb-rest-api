const
  express = require('express'),
  logger = require('morgan'),

  app = express(),
  port = app.get('port') || 5000

// Middleware
app.use(logger('dev'))

// Routes
app.get('/', (req, res, next) => {
  res
    .status(200)
    .json({ 'message': 'You requested the index page' })
})

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