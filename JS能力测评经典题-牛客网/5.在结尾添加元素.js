// 第一反应
function append(arr, item) {
    var res = arr.slice();   // 第一次submit的时候直接用成了res = arr;QWQ
    res.push(item);
    return res;
}
// concat()
function append(arr, item) {
    return arr.concat(item);
}
// 没想到的另一种拷贝数组方式join() + split()
function append(arr, item) {
    var res = arr.join().split(",");
    res.push(item);
    return res;
}