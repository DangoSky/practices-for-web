var http = require("http");
var url = require("url");
var file = require("../readFile/readfile");
var querystring = require("querystring");     // post请求需要导入querystring来解析格式

http.createServer( function(request, response) {
  if(request.url !== "/favicon.ico") {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    file.readfileSync('./form.html', response);
    // get 
    // var data = url.parse(request.url, true).query;
    // console.log(data.email);
    // console.log(data.password);
    // console.log("get请求完毕");
    
    // post
    var post = '';   // 定义一个变量来存储请求体信息
    request.on('data', function(param) {      // 监听数据，每当接受到请求体的数据时就存储到变量中去
      post += param;
    })
    request.on('end', function() {   // 异步！！!
      post = querystring.parse(post);       // 使用querystring解析成真正的post格式
      console.log(post);
      console.log("post请求完毕");
    })
  }
}).listen(8000);
console.log("server runing at localhost:8000");