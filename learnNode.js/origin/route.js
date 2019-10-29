module.exports = {
  login: function(request, res) {
    res.write("这是登陆页面。\n");
  },
  sign: function(request, res) {
    res.write("这是注册页面。\n");
  }
}