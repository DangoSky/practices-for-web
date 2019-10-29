var file = require("../readFile/readfile");

module.exports = {
  login: function(req, res) {
    recall = getRecall(req, res);
    file.readfile('./test.html', recall);
  },
  sign: function(request, res) {
    res.write("这是注册页面.\n");
  },
  // 当检测到img时，根据src调用到该函数，改换头部使得读取图片
  showImg: function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    file.readimg("../readFile/xyj.jpg", res);
    // 如果图片后面还有其他内容，可以再次改换头部，可以生效，但感觉怪怪的
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
  }
}

// 异步在前台输出需要回调
function getRecall(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});   
  function recall(data) {
    res.write(data);
    res.end('');
  }
  return recall;
}