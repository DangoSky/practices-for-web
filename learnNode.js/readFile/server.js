var http = require("http");
var file = require("./readfile");
var file1 = require('./writefile');

http.createServer(function(request, response) {
  if(request.url !== '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.write("hello world.\n");
    // file.readfileSync('./file.txt', response);       // 同步读取文件
    // file.readfile('./file.txt', recall);            //  异步读取文件
    // 如果要异步在前台打印，需要将response.end放到打印data后面去，可以采取闭包的形式
    function recall(data) {
      response.write(data + "\n");
      response.end("全部执行完毕");
    }
    var str = "异步写入文件";
    file1.writefile('./write.txt', str, recall);       // 异步写入文件
    // file1.writeFileSync('./write.txt', "同步写入文件");   // 同步写入文件
    console.log("全部执行完毕。");
  }
}).listen(8000);
console.log("open localhost:8000");