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
        fn();
    }
}
window.onload=function(){
    var buttonList=document.getElementsByTagName("input"),
        container=document.getElementById("container");
    var queue={
        arr:[],
        leftPush:function(num){
            if(this.arr.length>60){
                alert("You can not enter an Interger anymore!");
            }else{
                this.arr.unshift(num);
                this.paint();
            }
        },
        rightPush:function(num){
           if(this.arr.length>60){
                alert("You can not enter an Interger anymore!");
            }else{
                this.arr.push(num);
                this.paint();
            }
        },
        isEmpty:function(){
            return(this.arr.length==0);
        },
        leftPop:function(){
            if(!this.isEmpty()){
                this.arr.shift();
                this.paint();
            }else{
                alert("The queue is already empty!");
            }
        },
        rightPop:function(){
            if(!this.isEmpty()){
                this.arr.pop();
                this.paint();
            }else{
                alert("The queue is already empty!");
            }
        },
        paint:function(){
            var str="";
            each(this.arr,function(){
                str+="<div></div>";
            });
            container.innerHTML=str;
            addHeight();
            addDivDelEvent();
        },
        deleteId:function(id){
            console.log(id);
            this.arr.splice(id,1);
            this.paint();
        }
    }
    function addHeight(){
        for(var cur=0;cur<container.childNodes.length;cur++){
            container.childNodes[cur].style.height=queue.arr[cur]*3+"px";
        }
    }
    function addDivDelEvent(){
        for(var cur=0;cur<container.childNodes.length;cur++){
            container.childNodes[cur].cur=cur;
            addEvent(container.childNodes[cur],"click",function(){
                return queue.deleteId(this.cur);
            });
        }
    }
   /* function bubbleSort(){
            for(var i=queue.arr.length;i>0;i--){
               for(var j=0;j<i-1;j++){
                //如果没有加parseInt 则100不能参与排序
                   if(parseInt(queue.arr[j])>parseInt(queue.arr[j+1])){
                       var temp=queue.arr[j];
                       queue.arr[j]=queue.arr[j+1];
                       queue.arr[j+1]=temp;
                       queue.paint();
                   }
               }
            }
        }*/
    function bubbleSort(){
        var timer,i=queue.arr.length,j=0;
        /*冒泡算法可视化通过延时来展示*/
        timer=setInterval(function(){
            if(i<=0){
                clearInterval(timer);
            }
            if(j==i-1){
                i--;
                j=0;
            }
            if(parseInt(queue.arr[j])>parseInt(queue.arr[j+1])){
                var temp=queue.arr[j];
                queue.arr[j]=queue.arr[j+1];
                queue.arr[j+1]=temp;
                queue.paint();
            }
            j++;
        },50);
    }
    /*打乱数组里元素的顺序*/
    function random(){
        var index,
            len=queue.arr.length;
        for(var i=0;i<len;i++){
            index=Math.floor(Math.random()*len);
            if(index!=i){
                var temp=queue.arr[i];
                queue.arr[i]=queue.arr[index];
                queue.arr[index]=temp;
                queue.paint();
            }
        }
    }
    addEvent(buttonList[1],"click",function(){
        var input=buttonList[0].value;
        if(!(/^[0-9]+$/).test(input)){
            alert("Please enter an interger!");
        }else{
            if(input>=10&&input<=100){
                queue.leftPush(input);
            }else{
                alert("Please enter an interger between 10 and 100!");
            }
        }
    });

    addEvent(buttonList[2],"click",function(){
        var input=buttonList[0].value;
        if(!(/^[0-9]+$/).test(input)){
            alert("Please enter an Interger!");
        }else{
            if(input>=10&&input<=100){
                queue.rightPush(input);
            }else{
                alert("Please enter an interger between 10 and 100!");
            }
        }
    });

    addEvent(buttonList[3],"click",function(){
        queue.leftPop();
    });
    addEvent(buttonList[4],"click",function(){
        queue.rightPop();
    });
    addEvent(buttonList[5],"click",function(){
        bubbleSort();
    });
    addEvent(buttonList[6],"click",function(){
        random();
    });
}