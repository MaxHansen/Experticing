/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Expertice from '../api/expertice/expertice.model';

Expertice.find({}).removeAsync()
  .then(() => {
    Expertice.create({
      name: "Mathmatics"
    },
    {
      name: "Literature"
    }
  });

User.find({}).removeAsync()
  .then(() => {
    name: "Karl",
    email: "bools@gmail.com",
    expertices: [{
    }]
  })
    .then(() => {
      console.log('finished populating users');
    });
  });
