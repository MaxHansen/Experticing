'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  date: Date,
  expertices : [{
    type: mongoose.Schema.ObjectId,
    ref: 'expertice'
  }],
  answers: {
    header: String,
    answer: String,
    date: Date,
    user:{
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    }
  }
});

export default mongoose.model('Question', QuestionSchema);
