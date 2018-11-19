// 不带排序
function duplicates(arr) {
    var res = [];
    arr.forEach(function(val, index){
        if((arr.indexOf(val) !== arr.lastIndexOf(val)) && (res.indexOf(val) === -1)) {
            res.push(val);
        }
    });
    return res;
}
// 强大的过滤器
function duplicates(arr) {
    arr.sort();
    return arr.filter(function(val, index){
        return (val === arr[index + 1] && index === arr.indexOf(val));    
    })
}