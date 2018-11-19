// slice()
function prepend(arr, item) {
    var res = arr.slice();   
    res.unshift(item);
    return res;
}
// 使用concat前要把item先转化为数组
function prepend(arr, item) {
     return [item].concat(arr);
}
// join() + split()
function prepend(arr, item) {
    var res = arr.join().split(",");
    res.unshift(item);
    return res;
}
// apply()
function prepend(arr, item) {
    var res = [item];
    [].push.apply(res, arr);  
    return res;
}
/*res已经是数组，好像也可以直接用res.push(arr)，但这样arr数组会被当成整体作为res的一个元素而已，即[item, Array()]
 *而[].push.apply(res, arr) 则会把arr数组中的元素一个个追加进res数组，即[item, Array(0), Array(1), Array(2),···]
 */
