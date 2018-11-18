// 头脑简单
function indexOf(arr, item) {
    return arr.indexOf(item);
}
// 没想到的兼容性写法
function indexOf(arr, item) {
	if (Array.prototype.indexOf){   //判断当前浏览器是否支持
		return arr.indexOf(item);
	} 
	else {
		for (var i = 0; i < arr.length; i++){
			if (arr[i] === item){
				return i;
		    }
	    }
	}     
	return -1;     
}