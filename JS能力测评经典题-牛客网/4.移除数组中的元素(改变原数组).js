// 万能的splice
function removeWithoutCopy(arr, item) {
    for(var i=0; i<arr.length; i++){
        if(arr[i] === item) {
            arr.splice(i,1);
            i--;
        }
    }
    return arr;
}
// 没想到的先push后shift
function removeWithoutCopy(arr, item) {
    var len = arr.length;
    for(var i=0; i<len; i++){
        if(arr[0] !== item) {
           arr.push(arr[0]);
        }
        arr.shift();
    }
    return arr;
}