// 直接for循环
function count(arr, item) {
    var sum = 0 ;
    for(var key in arr){
        if(arr[key] === item) sum++;
    }
    return sum;
}
// forEach
function count(arr, item) {
    var sum = 0 ;
    arr.forEach(function(val, index){
        if(val === item) sum++;
    })
    return sum;
}
// map()
function count(arr, item) {
    var sum = 0;
    arr.map(function(val, index){
        if(val === item) {
            sum++;
        }
    }); 
    return sum;
}
// 过滤器
function count(arr, item) {
    var res = arr.filter(function(val, index){
        return val === item;
    }); 
    return res.length;
}
// reduce()
function count(arr, item) {
    var sum = arr.reduce(function(prev, curr){
        return curr === item ? prev+1 : prev;
    }, 0);
    return sum;
}
// 没想到的match() + 正则表达式
function count(arr, item) {
   return arr.toString().match(new RegExp(item,"g")).length;
}