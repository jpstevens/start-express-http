(function(exports) {
  var chalk = require('chalk'),
      q = require('q'),
      trycatch = require('trycatch'),
      DEFAULT_PORT = 3000;

  function hideLogs () {
    switch(process.env.HIDE_SE_LOG) {
      case 'true':
        return true;
      case 'false':
      case undefined:
        return false;
      default:
        var message = 'Warning: Invalid value for HIDE_SE_LOG (must be "true" or "false")';
        console.log(chalk.yellow(' > ') + message);
        return false;
    }
  }

  function logError (port) {
    if(!hideLogs()) {
      var message = 'Failed to start server on port: ' + port;
      console.log(chalk.red(" ✘ ") + message);
    }
  }

  function logSuccess (port) {
    if(!hideLogs()) {
      var message = 'Server listening on port: ' + port;
      console.log(chalk.green(" ✔ ") + message);
    }
  }

  exports.start = function(app) {
    var port = app.get('port') || app.get('PORT') || process.env.PORT || DEFAULT_PORT,
        deferred = q.defer(),
        httpServer;
    trycatch(function(){
      httpServer = app.listen(port, function(){
        logSuccess(port);
        deferred.resolve(httpServer);
      });
    }, function(err) {
      logError(port);
      deferred.reject(err);
    });
    return deferred.promise;
  };

})(module.exports);
