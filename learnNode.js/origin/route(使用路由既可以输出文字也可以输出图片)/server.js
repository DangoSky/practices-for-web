var http = require("http");
var url = require("url");
var router = require("./route");

http.createServer( function(request, response) {
  if(request.url !== "/favicon.ico") {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.replace(/\//, '');
    try {
      router[pathname](request, response);
    }
    catch(err) {
      console.log(err);
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      router['sign'](request, response);
      response.end();
      console.log("重定向到sign页面");
    }
  }
}).listen(8000);
console.log("server runing at localhost:8000");