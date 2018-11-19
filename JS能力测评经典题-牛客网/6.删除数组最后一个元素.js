// slice()
function truncate(arr) {
    var res = arr.slice();   
    res.pop();
    return res;
}
// get到的concat
function truncate(arr) {
    var res = arr.concat();
    res.pop();
    return res;
}
// 万能的call()和apply()
function truncate(arr) {
    var res = [];
    [].push.apply(res, arr);  // 和call同一个作用，但apply是把要调用的函数参数打包成数组再传递，
    res.pop();
    return res;
}
// get到的join() + split()
function truncate(arr) {
    var res = arr.join().split(",");
    res.pop();
    return res;
}
// 过滤器
function truncate(arr) {
    return arr.filter(function(val, index, arr){
        return index !== arr.length - 1;
    });
}