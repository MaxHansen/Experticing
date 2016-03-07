/**
 * Expertice model events
 */

'use strict';

import {EventEmitter} from 'events';
var Expertice = require('./expertice.model');
var ExperticeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExperticeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Expertice.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ExperticeEvents.emit(event + ':' + doc._id, doc);
    ExperticeEvents.emit(event, doc);
  }
}

export default ExperticeEvents;
