var async = require("async");
function exec() {
  // series 串行无关联,fun1全部执行完毕后再执行fun2
  // parallel  并行无关联，边执行fun1边执行fun2
  // waterfall  串行有关联
  // 三点差别， async的大括号换位中括号(因为最后的回调函数是数组的形式)；执行的函数是匿名函数； 第二个函数起有两个参数，第一个参数是前面一个函数的done返回值(可修改)
  async.parallel({
    fun1: function(done) {
      let i = 0;
      setInterval(function() {
        console.log("fun1" + " " + i);      //若放到if后面，则会打印四次，因为clearInterval后还会把下面的内容执行完再停止
        i++;
        if(i === 3) {
          clearInterval(this);
          done(null, "fun1 over");      // 开始执行fun2，第一个参数err一旦成立就不再执行后面的函数直接退出
        }
      },1000)
    },
    fun2: function(done) {
      let j = 0;
      setInterval(function() {
        console.log("fun2" + " " + j);
        j++;
        if(j === 3) {
          clearInterval(this);
          done(null, "fun2 over");
        }
      },1000)
    }
  },function(err , res) {    // 所有函数都执行完毕后的回调函数
    console.log(err);
    console.log(res);       // 返回前面函数done中返回的内容，一个对象的形式，前面的函数名为键，done的第二个参数为值
  })
}
exec();
console.log("全部执行完毕");