const express = require('express');
const router = express.Router();
const userImpl = require('../db/implement/userImpl');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  userImpl
    .findUser(username, password)
    .then((user) => {
      if (!!user) {
        res.status(201).send(user);
      } else {
        res.status(404).send({
          details: 'user or password is not right',
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
