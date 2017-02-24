function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type]=handler;
	}
}
function each(arr,fn){
	for(var cur=0;cur<arr.length;cur++){
		fn(cur);
	}
}
window.onload=function(){
	var buttonList=document.getElementsByTagName("input"),
	    resutlt=document.getElementById("result");
	var queue={
		strArr:[],
		leftPush:function(str){
			for(var i=0;i<str.length;i++){
				this.strArr.unshift(str[i]);
			}
			this.paint();
		},
		rightPush:function(str){
			for(var i=0;i<str.length;i++){
				this.strArr.push(str[i]);
			}
			this.paint();
		},
		isEmpty:function(){
			return(this.strArr.length==0);
		},
		leftPop:function(){
			if(this.isEmpty()){
				alert("the queue is already empty");
			}else{
			   this.strArr.shift();
			   this.paint();
		    }
		},
		rightPop:function(){
			if(this.isEmpty()){
				alert("the queue is already empty");
			}else{
			   this.strArr.pop();
			   this.paint();
		    }
		},
		paint:function(){
			var content="";
			/*for(var i=0;i<this.strArr.length;i++){
				if(this.strArr[i]!=""){
				content+="<div>"+this.strArr[i]+"</div>";
			    }
			}*/
			each(this.strArr,function(i){
				console.log(this);
				if(queue.strArr[i]!=""){
					content+="<div>"+queue.strArr[i]+"</div>";
				}
			});
			result.innerHTML=content;
		}
	}
	addEvent(buttonList[0],"click",function(){
		var input=document.getElementsByTagName("textarea")[0].value.trim();
		var str=input.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		queue.leftPush(str);
	});
	addEvent(buttonList[1],"click",function(){
		var input=document.getElementsByTagName("textarea")[0].value.trim();
		var str=input.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		queue.rightPush(str);
	});
	addEvent(buttonList[2],"click",function(){
		queue.leftPop();
	});
	addEvent(buttonList[3],"click",function(){
		queue.rightPop();
	});
	addEvent(buttonList[5],"click",function(){
		var search=buttonList[4].value;
		if((/[^0-9a-zA-Z\u4e00-\u9fa5]+/).test(search)){
			alert("Please enter again!");
			buttonList[4].value="";
		}else{
			var patt=new RegExp(search,"g");
			each(queue.strArr,function(i){
				queue.strArr[i]=queue.strArr[i].replace(/\<span\>|\<\/span\>/,"");
				queue.strArr[i]=queue.strArr[i].replace(patt,"<span>"+search+"</span>");
			});
			/*for(var i=0;i<queue.strArr.length;i++){
				queue.strArr[i]=queue.strArr[i].replace(/\<span\>|\<\/span\>/,"");
				queue.strArr[i]=queue.strArr[i].replace(patt,"<span>"+search+"</span>");
			}*/
			queue.paint();
		}
	});

}