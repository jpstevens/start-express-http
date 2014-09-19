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

  });

  describe('failing to start app on a port', function(){

    describe('when port is invalid', function(){

      beforeEach(function(){
        process.env.PORT = 'invalid_port';
        this.promise = startExpressHTTP.start(this.app);
      });

      it('rejects the promise', function(done){
        this.promise.fail(function(err){
          done();
        });
      });

    });

    describe('when port is in use', function(){

      beforeEach(function(){
        process.env.PORT = 80;
        this.promise = startExpressHTTP.start(this.app);
      });

      it('rejects the promise', function(done){
        this.promise.fail(function(err){
          done();
        });
      });

    });

  });
});
