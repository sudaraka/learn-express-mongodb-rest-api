const
  express = require('express'),
  logger = require('morgan'),

  app = express(),
  port = app.get('port') || 5000

// Middleware
app.use(logger('dev'))

// Catch 404 Errors and forward to error handlers
app.use((req, res, next) => {
  const
    err = new Error('Not Found')

  err.status = 404

  next(err)
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`))
