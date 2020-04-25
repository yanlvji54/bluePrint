const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');//用于req.body获取值的
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
// 数据
const data = require('./testData.json');
const $ = require('./filter')

//解决跨域  
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


const server = app.listen(8000, 'localhost', function () {
  console.log('服务器已经启动，地址是http://localhost:8000')
})

app.get('/', function (req, res) {
  res.send('这里是首页')
})
app.get('/data', function (req, res) {
  res.json(data) // 返回json
})
app.post('/data/id', function(req, res){
  if (!(req.body.id)) throw Error('id is not defined');
  const id = req.body.id;
  const item = data;
  const result = $.getMessageById(item.data, id);
  res.json(result);
})
app.post('/data/addPersonal', function(req, res) {
  if (!(req.body)) throw Error('body is not defined');
  const person = req.body;
  const item = data;
  item.data.push(person);
  fs.writeFile('./testData.json', JSON.stringify(item), (err) => {
    if (err) throw err;
    res.json('文件已被保存');
  })
})