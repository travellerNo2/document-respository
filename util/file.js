const fs = require('fs');
const multer = require('multer');

function deleteFile(fileName) {
  fs.unlink(`../${process.env.FILE_STORAGE_LOCATION}/${file}`, function (err) {
    if (err) {
      throw err;
    }
  });
}

function uploadFiles(req, res, dest) {
  const storage = multer.diskStorage({
    destination: (req, data, cb) => {
      const newDestination = `${process.env.FILE_STORAGE_LOCATION}/${dest}`;
      let stat = null;
      try {
        stat = fs.statSync(newDestination);
      } catch (err) {
        fs.mkdirSync(newDestination);
      }
      if (stat && !stat.isDirectory()) {
        throw new Error('文件目录： "' + dest + '已存在！"');
      }
      cb(null, newDestination);
    },
    filename: (req, file, callback) => {
      callback(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
    },
  });

  const upload = multer({
    storage: storage,
  }).array('files');

  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  deleteFile,
  uploadFiles,
};
