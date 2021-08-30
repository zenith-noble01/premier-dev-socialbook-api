const express = require('express');
const { ObjectId } = require('mongodb');

const { UsersC } = require('../../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await UsersC.find().toArray();  // get users cursor, convert to array

  res.send(users);
});

router.post('/', (req, res) => {
  res.send(req.body);
});

// will get a particular user
router.get('/users/:id', async (req, res) => {
  // validate id as ObjectId
  if (ObjectId.isValid(req.params.id)) {
    let user = await UsersC.findOne({ _id: new ObjectId(req.params.id) }); // get a user by his _id

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router
