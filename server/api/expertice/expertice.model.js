'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ExperticeSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Expertice', ExperticeSchema);
