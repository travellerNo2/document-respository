const { MongoClient } = require('mongodb');

async function createUser(newUser) {}

async function deleteUser(id) {}

async function updateUser(id, newUser) {}

async function queryUser(name, password) {
  const client = new MongoClient(process.env.DB_URL);
  try {
    const document = client.db('document');
    const users = document.collection('user');
    const user = await users.findOne({ name, password });
    return user
      ? { username: user.name, user_id: user._id, role: user.role }
      : undefined;
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
  queryUser,
};
