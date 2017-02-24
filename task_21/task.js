function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type]=handler;
	}
}
function getEvent(event){
	return event?event:window.event;
}
function isRepeat(value,arr){
	var sum=0;
	for(var i=0;i<arr.length;i++){
		if(value==arr[i]){
			sum+=1;
		}
	}
	return sum;
}
window.onload=function(){
	var tag_result=document.getElementById("tag_result"),
	    hobby_result=document.getElementById("hobby_result"),
	    tag=document.getElementById("tag"),
	    hobby=document.getElementsByTagName("textarea")[0],
	    confirm=document.getElementById("confirm");
	function queue(input,container,isDiv){
		this.arr=[];
		this.pushValue=function(value){
			for(var i=0;i<value.length;i++){
				var sum=isRepeat(value[i],this.arr);
				if(sum==0){
					this.arr.push(value[i]);
				}
			}
				this.paint();
				this.isTen();
				input.value="";
		};
		this.paint=function(){
			var str="";
			for(var i=0;i<this.arr.length;i++){
				str+="<div>"+this.arr[i]+"</div>";
			}
			container.innerHTML=str;
			if(isDiv==true){
				this.addDivDelEvent();
			}
		};
		this.deleteId=function(id){
			this.arr.splice(id,1);
			this.paint();
		};
		this.addDivDelEvent=function(){
			for(var cur=0;cur<container.childNodes.length;cur++){
               container.childNodes[cur].cur=cur;
               container.childNodes[cur].height=container.childNodes[cur].offsetHeight;
               container.childNodes[cur].width=container.childNodes[cur].offsetWidth;
               var g=this;
               addEvent(container.childNodes[cur],"mouseover",function(){
               	   this.style.width=this.width+"px";
               	   this.style.height=this.height+"px";
               	   this.innerHTML="删除";
               });
               addEvent(container.childNodes[cur],"mouseout",function(){
               	   this.innerHTML=g.arr[this.cur];
               });
               addEvent(container.childNodes[cur],"click",function(){
                   return g.deleteId(this.cur);
               });
		    }
	    };
	    this.isTen=function(){
	    	var len=container.childNodes.length;
	    	if(len>10){
	    		return this.deleteId(0);
	    	}
	    };
	}
	var tagEvent=new queue(tag,tag_result,true);
	var hobbyEvent=new queue(hobby,hobby_result,false);
	addEvent(tag,"keyup",function(event){
		event=getEvent(event);
		if(event.keyCode==13||event.keyCode==32||event.keyCode==188){
			var tagValue=tag.value.trim();
			tagValue=tagValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
			tagEvent.pushValue(tagValue);
		}
	});
	addEvent(confirm,"click",function(){
		var hobbyValue=hobby.value.trim();
		hobbyValue=hobbyValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]/);
		hobbyEvent.pushValue(hobbyValue);
	});
}
