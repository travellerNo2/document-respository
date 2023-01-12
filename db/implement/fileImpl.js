const fs = require('fs');
const fileMapper = require('../mapper/fileMapper');

async function addFiles(filesInfo, userId) {
  const formattedFilesInfo = Array.from(filesInfo).map((fileInfo) => ({
    user_id: userId,
    name: JSON.parse(fileInfo).name,
    size: JSON.parse(fileInfo).size,
  }));
  const isFileDuplication = await formattedFilesInfo.reduce(
    async (prev, curr) => {
      if (await prev) {
        return prev;
      }
      const file = await fileMapper.queryFileByFileName(userId, curr.name);
      return !!file;
    },
    Promise.resolve(false)
  );
  if (isFileDuplication) {
    throw Error('Duplicate file exists');
  } else {
    return await fileMapper.storeFiles(formattedFilesInfo);
  }
}

function searchUserFiles(userId) {
  return fileMapper.queryUserFilesInfo(userId);
}

function searchFile(userId, fileId) {
  return fileMapper.queryFile(userId, fileId);
}

function deleteFile(userId, fileId) {
  return fileMapper.deleteFile(userId, fileId);
}

module.exports = {
  addFiles,
  searchUserFiles,
  searchFile,
  deleteFile,
};
