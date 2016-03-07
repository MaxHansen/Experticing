/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/expertices              ->  index
 * POST    /api/expertices              ->  create
 * GET     /api/expertices/:id          ->  show
 * PUT     /api/expertices/:id          ->  update
 * DELETE  /api/expertices/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Expertice from './expertice.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Expertices
export function index(req, res) {
  Expertice.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Expertice from the DB
export function show(req, res) {
  Expertice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Expertice in the DB
export function create(req, res) {
  Expertice.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Expertice in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Expertice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Expertice from the DB
export function destroy(req, res) {
  Expertice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
