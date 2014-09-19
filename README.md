# start-express-http
[![Build Status](https://travis-ci.org/jpstevens/start-express-http.svg?branch=master)](https://travis-ci.org/jpstevens/start-express-http)

A Mongoose boot helper for Express.js

## Installation

```bash
$ npm install start-express-http --save
```

## Example Usage:

```javascript
var app = require('express')();

// method #1
app.set('PORT', 3000);
// method #2
process.env.PORT = 3000;
// method #3 (bonus)
app.set('port', 3000);

// start HTTP server
require('start-express-http').start(app)
.then(function(httpServer){/* success */})
.fail(function(err) { /* error */ });
```

## Hiding Log Output:

By default, this module will show log output similar to the following:
```bash
$ npm start
✔ Server listening on port: 3000
```

To hide this log output, set the `HIDE_SE_LOG` flag to `true`:

```bash
$ HIDE_SE_LOG=true npm start
```

`HIDE_SE_LOG` can equal `true` or `false` (default `false`).
