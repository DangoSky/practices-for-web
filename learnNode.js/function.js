module.exports = {
  fun2: function(res) {
    res.write("调用外部导入的函数。\n");
  },
  fun3: function(res) {
    res.write("通过字符串的形式调用外部导入的函数，借此可以动态选择要调用的函数(路由)。\n");
  }
}