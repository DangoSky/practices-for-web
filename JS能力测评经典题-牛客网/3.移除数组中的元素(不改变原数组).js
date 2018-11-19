// 直接for循环
function remove(arr, item) {
    var res = [];
    for(var i=0; i<arr.length; i++){
        if(arr[i] !== item){
            res.push(arr[i]);
        }
    }
    return res;
}
// 使用数组过滤器
function remove(arr, item) {
   var res = arr.filter(function(val,index){
        return arr[index] !== item;
    });
    return res;
}
// 没想到的slice() + splice()
function remove(arr, item) {
    var res = arr.slice(0);
    for(var i=0; i<res.length; i++){
        if(res[i] === item){
            res.splice(i,1);
            i--;   // 使用splice()删除后长度会减一
        }
    }
    return res;
}