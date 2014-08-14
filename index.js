var chalk = require('chalk'),
    q = require('q');

exports.start = function(app) {
  var port = app.get('port') || process.env.PORT || 3000;
  var deferred = q.defer();
  app.listen(port, function(){
    var message = 'Server listening on port: ' + port;
    console.log(chalk.green(" ✔ ") + message);
    deferred.resolve();
  });
  return deferred.promise;
};
