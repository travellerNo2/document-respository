const userMapper = require('../mapper/userMapper');

function findUser(name, password) {
  return userMapper.queryUser(name, password);
}

module.exports = {
  findUser,
};
