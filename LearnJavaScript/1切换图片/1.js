window.onload= function() { 
    var btn1= document.getElementById("prev");
    var btn2= document.getElementById("next");
    var picture= document.getElementById("image");
    var minImg= 1, maxImg= 4, current= minImg;
	
    btn1.onclick = function() {
	    if(current===minImg)   current= maxImg;
	    else  current--;
	    picture.setAttribute("src",current+".jpg");
        }
		
    btn2.onclick = function() {
	    if(current===maxImg)   current= minImg;
	    else  current++;
	    picture.setAttribute("src",current+".jpg");
        }
} 

