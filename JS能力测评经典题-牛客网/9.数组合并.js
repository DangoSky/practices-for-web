// slice() + apply()
function concat(arr1, arr2) {
    var res = [];
    res = arr1.slice();
    [].push.apply(res, arr2);
    return res;
}
// concat();
function concat(arr1, arr2) {
    var res = arr1.concat(arr2);
    // var res = [].concat(arr1, arr2);
    return res;
}
// join() + split() 
function concat(arr1, arr2) {
    var res = arr1.join() + "," + arr2.join();
    return res.split(",");
}
// map() + apply()
function concat(arr1, arr2) {
    var res = arr1.map(function(val, index){
        return val;
    });
    [].push.apply(res, arr2);
    return res;
}