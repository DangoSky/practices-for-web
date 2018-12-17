
var slider_main= $("slider_main");
var slider_main_img= slider_main.children;
var slider_ctl= $("slider_ctl");
var currentIndex= 0;

//动态创建span指示标签
for(var i= 0; i<slider_main_img.length; i++){
	var span= document.createElement("span");
	span.className= "slider-ctl-icon";
	span.innerText= slider_main_img.length - i - 1;
	slider_ctl.insertBefore(span, slider_ctl.children[1]);
	
}
slider_ctl.children[1].className = "slider-ctl-icon current";

//多余的图片放到右边
var imgW= $("slider").offsetWidth;
for(var i=1; i<slider_main_img.length; i++){
	slider_main_img[i].style.left= imgW + 'px';
}

//监听
for(var i=0; i<slider_ctl.children.length; i++){
	slider_ctl.children[i].onmousedown= function(){
	    if(this.className === "slider-ctl-prev"){
			//点击上一张图片，则将当前图片移动到右边，将上一张图片放到左边准备做缓动动画进入
			animation(slider_main_img[currentIndex], {left: imgW});
			currentIndex--;
			if(currentIndex < 0)  {currentIndex= slider_main_img.length - 1;}
			slider_main_img[currentIndex].style.left= -imgW + 'px';
			animation(slider_main_img[currentIndex], {left: 0});
		}
		else if(this.className === "slider-ctl-next"){
			autoplay();
		}
		else{
			//点击索引标签，判断是要切换到 < 还是 >
			var index= parseInt(this.innerText);
			console.log(index);
			if(index > currentIndex){
				animation(slider_main_img[currentIndex], {"left": -imgW});
				slider_main_img[index].style.left= imgW + 'px';
			}
			else if(index < currentIndex){
				animation(slider_main_img[currentIndex], {"left": imgW});
				slider_main_img[index].style.left= -imgW + 'px';
			}
			currentIndex= index;
			animation(slider_main_img[currentIndex], {"left": 0});
			
		}
		changeIndex();
	}
}

//切换索引
function changeIndex(){
	for(var i= 1; i< slider_ctl.children.length-1; i++){
		slider_ctl.children[i].className= "slider-ctl-icon";
	}
	slider_ctl.children[currentIndex + 1].className= "slider-ctl-icon current";
}


//自动轮播
var timer= setInterval(autoplay, 1000);
function autoplay(){
	//点击下一张图片，则将当前图片移动到左边，将下一张图片放到右边准备做缓动动画进入
	animation(slider_main_img[currentIndex], {"left": -imgW});
	currentIndex++;
	if(currentIndex >= slider_main_img.length )  {currentIndex= 0;}
	slider_main_img[currentIndex].style.left= imgW + 'px';
	animation(slider_main_img[currentIndex], {"left": 0});
	changeIndex();
}

//鼠标进入停止定时器
slider.onmouseover= function(){
	clearInterval(timer);
}

//鼠标离开开始定时器
slider.onmouseout= function(){
	timer= setInterval(autoplay, 1000);
}