const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

async function createUser(newUser) {}

async function deleteUser(id) {}

async function updateUser(id, newUser) {}

async function findUser(name, password) {
  const client = new MongoClient(url);
  try {
    const document = client.db('document');
    const users = document.collection('user');
    const user = await users.findOne({ name, password });

    return user
      ? { exit: true, username: user.name, user_id: user._id, role: user.role }
      : { exit: false };
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUser,
};
