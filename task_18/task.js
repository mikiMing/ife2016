window.onload=function(){
	var input=document.getElementById("number_input").value,
	    left_in=document.getElementById("left_in"),
	    left_out=document.getElementById("left_out"),
	    right_in=document.getElementById("right_in"),
	    right_out=document.getElementById("right_out"),
	    queue=document.getElementById("queue");
	left_in.onclick=function(){
		var div=createDiv();
		leftIn(div);
	}
	right_in.onclick=function(){
		var div=createDiv();
		rightIn(div);
	}
	left_out.onclick=leftOut;
	right_out.onclick=rightOut;
	for(var i=0;i<queue.children.length;i++){
		queue.children[i].onclick=function(){
			removeChild(this);
		}
	}
}
function insertAfter(newEle,targetEle){
	var parent=targetEle.parentNode;
	if(parent.lastChild==targetEle){
		parent.appendChild(newEle);
	}else{
		parent.insertBefore(newEle,targetEle.nextSibling);
	}
}
function createDiv(){
	var div=document.createElement("div"),
	    input=document.getElementById("number_input").value;
	div.innerHTML=input;
	return div;
}
function leftIn(div){
	var queue=document.getElementById("queue");
	if(queue.children.length==0){
		queue.appendChild(div);
	}else{
		queue.insertBefore(div,queue.firstChild);
	}
}
function rightIn(div){
	var queue=document.getElementById("queue");
	if(queue.children.length==0){
		queue.appendChild(div);
	}else{
		insertAfter(div,queue.lastChild);
	}
}
function leftOut(){
	var queue=document.getElementById("queue");
	if(queue.children.length!=0){
		queue.removeChild(queue.firstChild);
	}
}
function rightOut(){
	var queue=document.getElementById("queue");
	if(queue.children.length!=0){
		queue.removeChild(queue.lastChild);
	}
}