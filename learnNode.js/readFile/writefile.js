var fs = require("fs");
module.exports = {
  // 异步写文件
  writefile: function(path, data, recall) {   // data是要写入的内容
    fs.writeFile(path, data, function(err) {
      if(err) {
        throw err;
      }
      else {
        console.log("异步写入文件成功。\n");
        recall(data);
      }
    })
  },
  // 同步写文件
  writeFileSync: function(path, data) {
    fs.writeFileSync(path, data);
    console.log("同步写入文件成功");
  }
}