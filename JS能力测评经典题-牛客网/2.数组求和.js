// 直接循环
function sum(arr) {
    var sum = 0;
    for(key in arr){
        sum += arr[key];
    }
    return sum;
}
// 使用forEach
function sum(arr) {
    var sum = 0;
    arr.forEach(function(val, index, arr){
        sum += val;
    })
     return sum;
}
// 使用Array.prototype.reduce()
function sum(arr) {
    return res = arr.reduce(function(a,b){     // 或者先声明一个变量来接收return回来的结果
       return a + b ;					  
    });
}
// 没想到的eval()
function sum(arr) {
    return eval(arr.join("+"));
};
