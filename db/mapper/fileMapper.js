const { MongoClient } = require('mongodb');

function queryFile(conditionName) {
  return async (userId, conditionValue) => {
    const client = new MongoClient(process.env.DB_URL);
    try {
      const document = client.db('document');
      const files = document.collection('file');
      const file = await files.findOne({
        [conditionName]: conditionValue,
        user_id: userId,
      });
      return file;
    } catch (err) {
      throw err;
    } finally {
      client.close();
    }
  };
}

const queryFileByFileName = queryFile('name');
const queryFileByFileId = queryFile('_id');

async function storeFiles(filesInfo) {
  const client = new MongoClient(process.env.DB_URL);
  try {
    const document = client.db('document');
    const files = document.collection('file');
    const result = await files.insertMany(filesInfo);
    return;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

async function queryUserFilesInfo(userId) {
  const client = new MongoClient(process.env.DB_URL);
  let cursor = null;
  try {
    const document = client.db('document');
    const file = document.collection('file');
    cursor = file.find({ user_id: userId });
    let filesInfo = [];
    for await (const file of cursor) {
      filesInfo.push({ id: file._id, name: file.name, size: file.size });
    }
    return filesInfo;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

async function deleteFile(userId, fileId) {
  const client = new MongoClient(process.env.DB_URL);
  try {
    const document = client.db('document');
    const file = document.collection('file');
    const result = await file.deleteOne({ user_id: userId, _id: fileId });
    return result;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

module.exports = {
  queryFileByFileName,
  queryFileByFileId,
  storeFiles,
  queryUserFilesInfo,
  deleteFile,
};
