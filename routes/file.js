const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/upload', (req, res) => {
  // multipart/form-data; boundary=----WebKitFormBoundaryWDxUdTi37Gtg5R5y
  const splitStr = req.headers['content-type'].split('; boundary=')[1];
  let data = '';
  console.log('file loading...');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const json = normalizeFormData(data, splitStr);
    console.log(json);
    res.end(JSON.stringify(json));
  });
});

function normalizeFormData(chunk, splitStr) {
  let arr = chunk.toString().split(splitStr);
  arr = arr.slice(1, arr.length - 1);
  let json = {};
  const reName = /Content-Disposition: form-data; name="(\w+)"/;
  for (const i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split('\n');
    let name = arr2[1].match(reName)[1];
    if (name === 'file') {
      let reFileName = /filename="([\w-.\u4e00-\u9fa5]+)"/;
      let filename = arr2[1].match(reFileName)[1];
      json[name] = filename;
    } else {
      // 去掉尾部\r
      json[name] = arr2[3].substr(0, arr2[3].length - 1);
    }
  }
  return json;
}

module.exports = router;
