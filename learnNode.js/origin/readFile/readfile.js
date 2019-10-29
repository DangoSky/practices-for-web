// 先导入node.js自带的操作文件的fs对象
var fs = require('fs');
module.exports = {
  // 同步调用
  readfileSync: function(path, res) {
    var data = fs.readFileSync(path, 'utf-8');
    res.write(data + "\n");
    console.log(data);
    console.log("同步事件执行完毕。")
  },
  // 异步调用
  readfile: function(path, recall) {
    fs.readFile(path, function(err, data) { // data为文件里的内容
      if(err) {
        console.log(err);
      }
      else {
        // 必须得再调用toString()
        // 由于是异步，所以会先console.log出其他内容再console.log出data
        console.log(data.toString());
        recall(data);
      }
    });
    console.log("异步事件执行完毕。")
  },
  // 读取图片
  readimg: function(path, res) {
    fs.readFile(path, 'binary', function(err, data) {   // 以二进制流读取图片
      if(err) {
        console.log(err);
        return;
      }
      else {
        res.write(data, 'binary');
        res.end();
      }
    })
  }
}