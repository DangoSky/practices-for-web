window.onload= function(){
    //瀑布流布局
	waterFull("content", "box");
	//动态加载图片
	var timer1= null;
	window.onscroll= function(){
		clearTimeout(timer1);
	  timer1= setTimeout(function(){
		  if(checkWillLoadImage()){
			//图片数据，应从服务器上获取
			var arrImg= [
			    {"src" : "10.jpg" },
			    {"src" : "17.jpg" },
			    {"src" : "11.jpg" },
			    {"src" : "12.jpg" },
			    {"src" : "18.jpg" },
			    {"src" : "8.jpg" },
			    {"src" : "16.jpg" },
			];
			for(var i=0; i<arrImg.length; i++){
				//创建一个新盒子
				var newBox= document.createElement("div");
				newBox.className= "box";
				$("content").appendChild(newBox);
				//给盒子添加图片
				var newPic= document.createElement("div");
				newPic.className= "pic";
				newBox.appendChild(newPic);
				var newImg= document.createElement("img");
				newImg.src= arrImg[i].src;
				newPic.appendChild(newImg);
			}
			//重新布局
			waterFull("content", "box");
		}	
	  },200);	
		
	};
	//窗口大小发生改变
	var timer= null;
	window.onresize= function(){
		clearTimeout(timer);
		//节流
		tiemr= setTimeout(function(){
			 waterFull("content","box");
		},200)
	}
};



function waterFull(parent, child){
	var allBox= $(parent).getElementsByClassName(child);
	//图片宽度
	var boxWidth= allBox[0].offsetWidth;
	//屏幕宽度
	var screenW= document.documentElement.clientWidth;
	//显示的图片列数
    var cols= parseInt(screenW / boxWidth);
	//设置列数
	$(parent).style.width= boxWidth * cols + 'px';
	$(parent).style.margin= "0 auto";
	
	
	var arrHeight= [], boxHeight= 0, minBoxHeight= 0, minBoxIndex= 0;
	for(var i= 0; i< allBox.length; i++){
		boxHeight= allBox[i].offsetHeight;
		//将第一行的盒子的高度放入高度数组中
		if(i < cols) {
			 arrHeight.push(boxHeight);
			 allBox[i].style= '';
		}
		//其他行的盒子取每行的最小盒子高度放入高度数组
		else{
			//找出一行中最小的盒子高度
			minBoxHeight= _.min(arrHeight);
			//找到最矮盒子的索引
			minBoxIndex= getMinBoxIndex(arrHeight, minBoxHeight);
			//对第二行及后面的盒子进行排版
			allBox[i].style.position= "absolute";
			allBox[i].style.left= boxWidth * minBoxIndex + 'px';
			allBox[i].style.top= minBoxHeight + 'px';
			//更新高度数组中的最小盒子高度
			arrHeight[minBoxIndex]+= boxHeight;
		}		
	}
}

function checkWillLoadImage(){
	//获取最后一个盒子
	var allBox= document.getElementsByClassName("box");
	var lastBox= allBox[allBox.length - 1];
	//求屏幕高度
	var screenH= document.body.clientHeight || document.documentElement.clientHeight;
	// 0.5无关紧要，可以是0也可以是1，只是略微影响到加载图片的时间而已
	var lastBoxDis= lastBox.offsetHeight * 0.5 + lastBox.offsetTop;   
	//页面已经滚动上去的距离
	var scrollTop= scroll().top;
	//动态加载图片的条件
	return lastBoxDis <= scrollTop + screenH;
	
}

//寻找最矮盒子的索引
function getMinBoxIndex(arr, val){
	for(var i= 0; i< arr.length; i++){
		if(arr[i]===val) return i;
	}
}

function $(id){
	return typeof id=== "string" ?  document.getElementById(id) : null; 
}