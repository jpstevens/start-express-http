# Start Express HTTP

A HTTP listener helper for Express.js

## Example Usage:

```javascript
var express = require('express');
var app = express();

// start HTTP server
require('start-express-http').start(app).then(function(){
  // do something here...
});
```
