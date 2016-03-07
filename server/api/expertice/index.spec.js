'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var experticeCtrlStub = {
  index: 'experticeCtrl.index',
  show: 'experticeCtrl.show',
  create: 'experticeCtrl.create',
  update: 'experticeCtrl.update',
  destroy: 'experticeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var experticeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './expertice.controller': experticeCtrlStub
});

describe('Expertice API Router:', function() {

  it('should return an express router instance', function() {
    experticeIndex.should.equal(routerStub);
  });

  describe('GET /api/expertices', function() {

    it('should route to expertice.controller.index', function() {
      routerStub.get
        .withArgs('/', 'experticeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/expertices/:id', function() {

    it('should route to expertice.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'experticeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/expertices', function() {

    it('should route to expertice.controller.create', function() {
      routerStub.post
        .withArgs('/', 'experticeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/expertices/:id', function() {

    it('should route to expertice.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'experticeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/expertices/:id', function() {

    it('should route to expertice.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'experticeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/expertices/:id', function() {

    it('should route to expertice.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'experticeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
