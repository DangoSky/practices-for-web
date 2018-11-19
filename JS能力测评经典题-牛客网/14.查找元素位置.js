// while + indexOf
function findAllOccurrences(arr, target) {
    var res = [];
    var index = arr.indexOf(target);
    while(index != -1){
        res.push(index);
        index = arr.indexOf(target,index+1);
    }
   return res;
}
// 直接forEach
function findAllOccurrences(arr, target) {
    var res = [];
    arr.forEach(function(val, index){
        if(val === target)  res.push(index);
    });
    return res;
}
// 过滤器
function findAllOccurrences(arr, target) {
    var res = [];
    arr.filter(function(val,index) {
        return val === target && res.push(index);
    });
    return res;
}