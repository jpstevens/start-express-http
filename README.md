# Start Express HTTP

A HTTP listener helper for Express.js

## Example Usage:

```javascript
var express = require('express');
var app = express();

// method #1
app.set('port', 4000);
// method #2
process.env.PORT = 5000;
// method #3
// do nothing... default port is 3000

// start HTTP server
require('start-express-http').start(app).then(function(){
  // do something here...
});
```
