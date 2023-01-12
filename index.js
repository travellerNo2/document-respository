require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');
const indexRouter = require('./routes/index');
const port = 8080;

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200); //让options尝试请求快速结束
  else next();
});
app.use(express.json());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send({ details: err.message });
});

app.listen(port, () => {
  console.log(
    `Express started on http://1.116.165.46:${port} press Ctrl-C to terminate`
  );
});
