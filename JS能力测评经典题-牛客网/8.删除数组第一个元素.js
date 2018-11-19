// slice()
function curtail(arr) {
    var res = arr.slice();   
    res.shift();
    return res;
}
// concat()
function curtail(arr) {
    var res = arr.concat();
    res.shift();
    return res;
}
// join() + split()
function curtail(arr) {
    var res = arr.join().split(",");
    res.shift();
    return res;
}
// apply()
function curtail(arr) {
   var res = [];
    [].push.apply(res, arr); 
    res.shift();
    return res;
}
// 过滤器
function curtail(arr) {
    return arr.filter(function(val, index, arr){
        return index !== 0;
    })
}