const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("start server");
  const filePath = parseUrl(req.url);

  const dataArr = combindFile(filePath);
  writeFile('./public/total.txt', dataArr);
  res.end();
}).listen(8001);


function parseUrl(url) {
  const [base, fileStr] = url.split('/??');
  const fileArr = fileStr.split(',');

  return fileArr.map(val => {
    return path.join(__dirname, base, val);
  })
}

function combindFile(filePath) {
  const dataArr = [];
  filePath.forEach(path => {
    const data = fs.readFileSync(path);
    dataArr.push(data);
  })
  return dataArr;
}

function writeFile(path, dataArr) {
  // 先删除文件下原先的内容
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
    dataArr.forEach(data => {
      fs.writeFileSync(path, data, { flag: 'a' });
    })
  });
}

