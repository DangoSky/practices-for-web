var http = require("http");
var file = require("./readfile");

http.createServer(function(request, response) {
  if(request.url !== '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    file.readimg('./xyj.jpg', response);
  }
}).listen(8000);
console.log("open localhost:8000");