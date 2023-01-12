const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fileImpl = require('../db/implement/fileImpl');
const fileUtil = require('../util/file');

router.get('/:user_id/info', async (req, res, next) => {
  const files = await fileImpl.searchUserFiles(req.params.user_id);
  const result = files.map((file) => ({
    id: file._id,
    name: file.name,
    size: file.size,
  }));
  return res.status(200).send(result);
});

router.get('/delete/:user_id/:file_id', (req, res) => {
  const { user_id, file_id } = req.params;
  try {
    fileUtil.deleteFile(file_id);
    fileImpl.deleteFile(user_id, file_id);
  } catch (err) {
    res.status(500).send(err);
  }
  res.status(200);
});

router.post('/:user_id/upload', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    await fileUtil.uploadFiles(req, res, user_id);
    const { filesInfo } = req.body;
    await fileImpl.addFiles(filesInfo, user_id);
  } catch (err) {
    console.log(err);
    next(err);
  }
  res.status(200).send();
});

router.get('/:user_id/download/:file_id', (req, res) => {
  const { user_id, file_id } = req.params;
  //判断该文件是否存在
  fs.access(`./static/${fn}`, function (err) {
    if (!err) {
      res.set({
        //告诉浏览器这是一个二进制文件
        'Content-Type': 'application/octet-stream',
        //告诉浏览器这是一个需要下载的文件，使用encodeURI方法，是为了避免中文名称下载时出问题
        'Content-Disposition': `attachment;filename=${encodeURI(fn)}`,
      });
      //使用流读取文件，并响应给客户端
      fs.createReadStream(`./static/${fn}`).pipe(res);
    }
  });
});

module.exports = router;
