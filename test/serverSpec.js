/* global describe, it */

process.env.NODE_ENV = 'test';

(function(){
  'use strict';
  var request = require('supertest');
  var chai = require('chai');
  var should = chai.should();
  var expect = chai.expect;
  var app = require('../server/server.js');

  describe('Node Server Request Listener Function', function() {
    it('should answer GET requests for /', function(done) {
      request(app)
        .get('/')
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.property('status').equal(200);
          done();
        });
    });

    it('should answer GET requests for /buy-ticker', function(done) {
      request(app)
        .get('/buy-ticker')
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.property('status').equal(200);
          done();
        });
    });

    it('should answer GET requests for /prices', function(done) {
      request(app)
        .get('/prices')
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.property('status').equal(200);
          done();
        });
    });

    it('should answer GET requests for /tweets', function(done) {
      request(app)
        .get('/tweets')
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.property('status').equal(200);
          done();
        });
    });

    it('should return 404 for GET request to /doesnotexist', function(done) {
      request(app)
        .get('/doesnotexist')
        .end(function(err, res) {
          res.should.have.property('status').equal(404);
          done();
        });
    });

  });
})();