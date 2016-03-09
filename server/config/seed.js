/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Expertice from '../api/expertice/expertice.model';
import Question from '../api/question/question.model';

Expertice.find({}).removeAsync()
  .then(() => {
    Expertice.create({
      _id: "56af278833ff150934c32b5a",
      name: "Mathmatics"
    },
    {
      _id: "56af278833ff150934c32b5b",
      name: "Literature"
    }
  );
});

  Question.find({}).removeAsync()
    .then(() => {
      Question.create({
        topic: "I don't know how to multiply",
        question: "how do I multiply 2 * 2?",
        date: new Date().toJSON().slice(0,10),
        asker: "56af278833ff150934c32b5c",
        expertices: [
          "56af278833ff150934c32b5a"
        ],
        answers: [{
          header: "That's easy",
          answer: "You just add 2, 2 times",
          date: new Date().toJSON().slice(0,10),
          answerer: "56af278833ff150934c32b5c"
        }]
      },{
        topic: "What did shakespear mean?",
        question: "To be or not to be? What did he mean?",
        date: new Date().toJSON().slice(0,10),
        asker: "56af278833ff150934c32b5d",
        expertices: [
          "56af278833ff150934c32b5b"
        ],
        answers: [{
          header: "Nothing",
          answer: "Literature sucks, you should study science",
          date: new Date().toJSON().slice(0,10),
          answerer: "56af278833ff150934c32b5d"
        }]
      });
  });

User.find({}).removeAsync()
  .then(() => {
    User.create({
    _id: "56af278833ff150934c32b5c",
    name: "Karl",
    email: "bools@gmail.com",
    expertices: [
      "56af278833ff150934c32b5a"
    ]
  },{
    _id: "56af278833ff150934c32b5d",
    name: "Bent",
    email: "bent@gmail.com",
    expertices: [
      "56af278833ff150934c32b5b"
    ]
  }).then(() => {
      console.log('finished populating users');
    });
  });
