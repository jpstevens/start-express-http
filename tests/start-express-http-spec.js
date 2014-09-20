var startExpressHTTP = require('../index'),
    express = require('express');

describe('#start', function(){

  beforeEach(function(){
    this.app = express();
  });

  afterEach(function(){
    delete process.env.PORT;
  });

  describe('starting on a port successfully', function(){

    describe('when port is set using an enviromental variable', function(){

      beforeEach(function(){
        process.env.PORT = 9999;
        this.promise = startExpressHTTP.start(this.app);
      });

      it('resolves the promise', function(done){
        this.promise.then(function(server){
          server.close();
          done();
        });
      });

    });

    describe('when port is set using "app.set"', function(){

      describe('with key of "PORT"', function() {

        beforeEach(function(){
          this.app.set('PORT', 9999);
          this.promise = startExpressHTTP.start(this.app);
        });

        it('resolves the promise', function(done){
          this.promise.then(function(server){
            server.close();
            done();
          });
        });

      });

      describe('with key of "port"', function() {

        beforeEach(function(){
          this.app.set('port', 9999);
          this.promise = startExpressHTTP.start(this.app);
        });

        it('resolves the promise', function(done){
          this.promise.then(function(server){
            server.close();
            done();
          });
        });

      });

    });

    describe('when port is undefined', function(){

      beforeEach(function(){
        this.promise = startExpressHTTP.start(this.app);
      });

      it('resolves the promise, and starts app on the default port', function(done){
        this.promise.then(function(){
          done();
        });
      });

    });

  });

  describe('failing to start app on a port', function(){

    describe('when port is in use', function(){

      beforeEach(function(done){
        process.env.PORT = 9999;
        var secondApp = express();
        startExpressHTTP.start(this.app).then(function(){
          this.promise = startExpressHTTP.start(secondApp);
          done();
        }.bind(this));
      });

      it('rejects the promise', function(done){
        this.promise.fail(function(err){
          done();
        });
      });

    });

  });
});
