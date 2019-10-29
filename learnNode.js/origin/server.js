var otherFun = require("./function");
var User = require("./class/user");
var Student = require("./class/student");
var router = require("./route");


// 使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http，
var http = require("http");
var url = require("url");
// 使用 http.createServer()方法(返回一个对象)创建服务器
http.createServer(function(request, response) {
  // 发送 HTTP 头部，有头部就要包含尾部end，如果没有end的话网页会一直在转圈圈加载 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  // 当有多个response时，url会访问一个favicon.ico的东西，会重复执行多次，添加if判断消除多次访问
  if(request.url !== '/favicon.ico') {
    console.log('访问');
    // 发送响应数据
    response.write('这是内容主体。\n');

    // 函数部分
    fun1(response);
    otherFun.fun2(response);
    otherFun['fun3'](response);
    var user = new User(response, "lxy", "coding");
    user.todo();
    var student = new Student(response, "lxy", "coding", "home");
    student.show();

    // 路由
    var pathname = url.parse(request.url).pathname;   // url.parse将字符串url转化为对象输出
    pathname = pathname.replace(/\//, '');    // 去除路径中的/
    router[pathname](request, response);
    response.end('这是内容尾部。\n');
  }
}).listen(2754);      // 使用 listen 方法指定这个 HTTP 服务器监听的端口号
// node命令运行后，输出的内容
console.log('Server running at http://127.0.0.1:2754/ 或者 http://localhost:2754/');

function fun1(res) {
  res.write("调用本地函数。\n");
}