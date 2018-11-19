// slice() + concat()
function insert(arr, item, index) {
    var res = arr.slice(0, index);
    res.push(item);
    return res.concat(arr.slice(index));
}
// splice()
function insert(arr, item, index) {
    var res = arr.slice();
	// var res = arr.concat();
    res.splice(index, 0, item);   // splice()是修改原数组，不会返回一个新数组
    return res;
}