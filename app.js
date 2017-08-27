const
  express = require('express'),
  logger = require('morgan'),

  app = express(),
  port = app.get('port') || 5000

// Middleware
app.use(logger('dev'))

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`))
