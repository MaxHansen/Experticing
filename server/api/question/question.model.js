'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  date: Date,
  asker: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  expertices : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Expertice'
  }],
  answers: [{
    header: String,
    answer: String,
    date: Date,
    answerer:{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }]
});

export default mongoose.model('Question', QuestionSchema);
