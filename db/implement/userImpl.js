const userMapper = require("../mapper/userMapper");

async function findUser(name, password) {
  return await userMapper.findUser(name, password);
}

module.exports = {
  findUser,
};
