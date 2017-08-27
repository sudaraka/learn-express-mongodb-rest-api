const
  express = require('express'),

  app = express(),
  port = app.get('port') || 5000

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`))
