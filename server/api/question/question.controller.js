/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  update
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Question from './question.model';

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

//Gets all the questions related to a user
export function findAllQuestions(req,res){
  Question.find({asker: req.params.id})
  .populate('asker', 'name email')
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//Gets all the answers related to a user
export function findAllAnswers(req,res){
  Question.find({"answers.answerer": req.params.id})
  .populate('answerer', 'name email')
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a list of Questions
export function index(req, res) {
  Question.find({}).populate('answers.user').populate('expertices')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  Question.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  Question.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Question.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  Question.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
