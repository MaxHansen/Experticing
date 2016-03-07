'use strict';

var app = require('../..');
import request from 'supertest';

var newExpertice;

describe('Expertice API:', function() {

  describe('GET /api/expertices', function() {
    var expertices;

    beforeEach(function(done) {
      request(app)
        .get('/api/expertices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expertices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expertices.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/expertices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/expertices')
        .send({
          name: 'New Expertice',
          info: 'This is the brand new expertice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newExpertice = res.body;
          done();
        });
    });

    it('should respond with the newly created expertice', function() {
      newExpertice.name.should.equal('New Expertice');
      newExpertice.info.should.equal('This is the brand new expertice!!!');
    });

  });

  describe('GET /api/expertices/:id', function() {
    var expertice;

    beforeEach(function(done) {
      request(app)
        .get('/api/expertices/' + newExpertice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expertice = res.body;
          done();
        });
    });

    afterEach(function() {
      expertice = {};
    });

    it('should respond with the requested expertice', function() {
      expertice.name.should.equal('New Expertice');
      expertice.info.should.equal('This is the brand new expertice!!!');
    });

  });

  describe('PUT /api/expertices/:id', function() {
    var updatedExpertice;

    beforeEach(function(done) {
      request(app)
        .put('/api/expertices/' + newExpertice._id)
        .send({
          name: 'Updated Expertice',
          info: 'This is the updated expertice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedExpertice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExpertice = {};
    });

    it('should respond with the updated expertice', function() {
      updatedExpertice.name.should.equal('Updated Expertice');
      updatedExpertice.info.should.equal('This is the updated expertice!!!');
    });

  });

  describe('DELETE /api/expertices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/expertices/' + newExpertice._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when expertice does not exist', function(done) {
      request(app)
        .delete('/api/expertices/' + newExpertice._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
