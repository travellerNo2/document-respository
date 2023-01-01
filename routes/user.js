const express = require('express');
const router = express.Router();
const userImpl = require('../db/implement/userImpl');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username, 'password:', password);
  userImpl
    .findUser(username, password)
    .then((user) => {
      if (user.exit) {
        res.status(201).send(user);
      } else {
        res.status(404).send({
          detail: 'user or password is not right',
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
