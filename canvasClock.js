var canvas=document.getElementById("canvas"),
	context=canvas.getContext("2d"),
	FONT_SIZE=15,
	MARING=35,
	HAND_TRUNCATION=canvas.width/2,
	HOUR_HAND_TRUNCATION=canvas.width/10,
	NUMERAL_SPACING=20,
	RADIUS=canvas.height/2-MARING,
	HAND_RADIUS=RADIUS-NUMERAL_SPACING;
var loop=setInterval(drawClock,1000);
context.font=FONT_SIZE+"px Arial";

//绘制时钟
function drawClock(){ 
	context.clearRect(0,0,canvas.width,canvas.height);

	drawCricle();
	var timeObj=handTime();
	drawHand(timeObj.seconds,0.8);
	drawHand(timeObj.mins,0.6);
	drawHand(timeObj.hours,0.4);
	drawCenter();
	drawNumerals();
}

//绘制表盘
function drawCricle(){ 
	context.save();
	context.beginPath();
	context.strokeStyle="#ccc";
	context.lineWidth=5;
	context.fillStyle="#eee";
	context.arc(canvas.width/2,canvas.height/2,RADIUS,0,Math.PI*2,true)
	context.fill();
	context.stroke();
	context.restore();
}

//绘制时钟中心
function drawCenter(){ 
	context.beginPath();
	context.arc(canvas.width/2,canvas.height/2,5,0,Math.PI*2,true)
	context.stroke();
}

//绘制刻度
function drawNumerals(){ 
	var numerals=[1,2,3,4,5,6,7,8,9,10,11,12];
	angle=0;
	numeralWidth=0;
	numerals.forEach(function(numeral){ 
		angle=Math.PI*2/12*(numeral-3);
		numeralWidth=context.measureText(numeral).width;
		var x=canvas.width/2+Math.cos(angle)*HAND_RADIUS-numeralWidth/2;
		var y=canvas.height/2+Math.sin(angle)*HAND_RADIUS+FONT_SIZE/2;
		context.fillText(numeral,x,y);

	});
}

//绘制时针
function drawHourHand(hour){ 
	var angle=Math.PI*2/12
}

//绘制分针
function drawMinHand(min){ 
}

//绘制秒针
function drawSecondHand(second){ 
	var angle=Math.PI*2/60*(second-15);
	var x=0,y=0;
	context.save();
	context.beginPath();
	context.moveTo(canvas.width/2,canvas.height/2);
	x=canvas.width/2+RADIUS*0.8*Math.cos(angle);
	y=canvas.height/2+RADIUS*0.8*Math.sin(angle);
	context.lineWidth=3;
	context.lineTo(x,y);
	context.stroke();
	context.restore();
}

//绘制指针
function drawHand(num,ratio){ 
	var angle=Math.PI*2/60*(num-15);
	var x=0,y=0;
	context.moveTo(canvas.width/2,canvas.height/2);
	x=canvas.width/2+RADIUS*ratio*Math.cos(angle);
	y=canvas.height/2+RADIUS*ratio*Math.sin(angle);
	context.lineWidth=3;
	context.lineTo(x,y);
	context.stroke();
	context.restore();
}

//时间处理

function handTime(){ 
	var timeObj={};
	var time=new Date();
	var hour=time.getHours();
	var min=time.getMinutes();
	var second=time.getSeconds();
	timeObj["hours"]=60/12*hour+60/12*(min/60);
	timeObj["mins"]=min;
	timeObj["seconds"]=second;
	return timeObj;
}


