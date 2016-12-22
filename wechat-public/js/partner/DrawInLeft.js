/**
*
* @authors Your Name (you@example.org)
* @date    2016-10-27 11:36:30
* @version $Id$
*/
var radius = 60;//圆半径
var ruler = [];// 刻度线组成的点集合
var rulerPoint = {
	n: 0,
	x: 0,
	y: 0
};// 刻度线上刻度，n为度的标识，x、y为刻度坐标
var step = 4;// 刻度线跨度
var point = new Array(4*radius/step + 1);//存放绘画出来筛选后的点数据
var pointSH = [];//存放绘画出来的圆上的点数据
var cankaolength = 0;
var toggle = 0;// 用来控制绘画次数
var long = 0;// 总长度
var scoreSJ;// 根据长度规定的实际分数
var lastPoint;
var currentPoint;
var isMouseDown = false;
var timer;//定时器
var chance;//可以玩的次数


window.onload = function(){
	// 分享jssdk
	var partnerUrl = getRootUrl() + "partner.do?op=index&pid=" + $("#pid").val();
	wxShare(partnerTitle , partnerDesc , partnerImg , partnerUrl);

	getPartnerADTimes();
	
	var restart = document.getElementById('restart');
	var playChance = document.getElementById('play_chance');
	var btnRule = document.getElementsByClassName('btnRule')[0];
	var btnBestPartener = document.getElementsByClassName('btnBestPartener')[0];

	var canvasLeft = document.getElementById('canvasLeft');
	var canvasRight = document.getElementById('canvasRight');
	var contextLeft = canvasLeft.getContext('2d');
	var contextRight = canvasRight.getContext('2d');
	canvasLeft.setAttribute("width", 2.25 * radius);
	canvasLeft.setAttribute("height", (2.5 + Math.sqrt(2)) * radius);
	canvasLeft.setAttribute("style", 'border-radius: 2px 0 0 2px; border-right: 1px dashed #660014; float: left;');
	canvasRight.setAttribute("width", 2.25 * radius);
	canvasRight.setAttribute("height", (2.5 + Math.sqrt(2)) * radius);
	canvasRight.setAttribute("style", 'border-radius: 0 2px 2px 0; border-left: 1px dashed #660014; float: left;');



	// 标准心形
	contextLeft.save();
	contextLeft.beginPath();
	contextLeft.arc(1.25 * radius, 1.25 * radius, radius, 2 * Math.PI, 0.75 * Math.PI, true);
	contextLeft.moveTo((1.25 - Math.sqrt(2)/2)*radius, (1.25 + Math.sqrt(2)/2)*radius);
	contextLeft.lineTo(2.25 * radius, (2.25 + Math.sqrt(2)) * radius);
	contextLeft.lineWidth = 6;
	contextLeft.lineCap = 'round';
	contextLeft.strokeStyle = 'white';
	contextLeft.stroke();
	contextLeft.closePath();
	contextLeft.restore();

	contextRight.save();
	contextRight.beginPath();
	contextRight.arc(radius, 1.25 * radius, radius, 0.25 * Math.PI, Math.PI, true);
	contextRight.moveTo((1 + Math.sqrt(2)/2)*radius, (1.25 + Math.sqrt(2)/2)*radius);
	contextRight.lineTo(0, (2.25 + Math.sqrt(2)) * radius);
	contextRight.lineWidth = 6;
	contextRight.lineCap = 'round';
	contextRight.strokeStyle = 'white';
	contextRight.stroke();
	contextRight.closePath();
	contextRight.restore();



	// 标准刻度点
	for (var i = 0; i <= radius/step*4 + 1; i++) {
		if (i <= radius/step*2) {
			var rx = canvasLeft.width - i*step;
			var ry = yCrossCircle(i, rx);
		}else if (i > radius/step*2 && i < radius/step*4 - Math.floor((1 + Math.sqrt(2)/2) * radius / step)) {
			var rx = 0.25 * radius + (i - radius/step*2)*step;
			var ry = yCrossCircle(i, rx);
		}else {
			var rx = 0.25 * radius + (i - radius/step*2)*step;
			var ry = rx + Math.sqrt(2) * radius;
		}
		rulerPoint = {
			n: i,
			x: rx,
			y: ry
		};
		ruler.push(rulerPoint);
	}

	timer = setTimeout(function(){
		contextLeft.clearRect(0, 0, canvasLeft.width, canvasLeft.height);
		clearTimeout(timer);
	}, 500);

	restart.onclick = function(){
		contextLeft.clearRect(0, 0, canvasLeft.width, canvasLeft.height);
		toggle = 0;
		cankaolength = 0;
		scoreSJ = 0;
		point = new Array(4*radius/step + 1);
		lastPoint = undefined;
//		if (pointSH.length > 0) {
//		chance --;
//		}
		if (chance >= 0 && chance <= 5) {
		document.getElementById('play_chance').innerHTML = chance;
		}
		pointSH = [];
		document.getElementById('score').innerHTML = '00.00';
		if (chance <= 0) {
		$('#boxHiddenJH').css('display', 'block');
		}
	}

	canvasLeft.addEventListener('touchend', function(e){
		e.preventDefault();
		isMouseDown = false;

		if (pointSH.length == 0) {
			toggle = 0;
		}

		if (toggle == 1) {
			pushPoint();
			long = getLength();
			scoreSJ = judgeScore(long);
			document.getElementById('score').innerHTML = scoreSJ;
			toggle ++;
			getPartnerADrawService(scoreSJ,pointSH);
		}
	})

	canvasLeft.addEventListener('touchstart', function(e){
		e.preventDefault();

		toggle ++;
		if (toggle == 1) {
			isMouseDown = true;
		}
	})

	canvasLeft.addEventListener('touchmove', function(e){
	    e.preventDefault();

	    // 画笔路径
	    if (isMouseDown && chance > 0) {
	        currentPoint = pointXY(e.touches[0].clientX, e.touches[0].clientY);

	        if (currentPoint.x <= 2.25 * radius && currentPoint.x >=0 && currentPoint.y >= 0 && currentPoint.y <= (2.5 + Math.sqrt(2)) * radius) {
		        pointSH.push(currentPoint);// 存入绘画轨迹
		        if (pointSH.length != 0 && pointSH.length > 400) {
    		 		pushPoint();
    		 		long = getLength();
    		 		scoreSJ = judgeScore(long);
    		 		document.getElementById('score').innerHTML = scoreSJ;
    	        	toggle ++;
    	        	isMouseDown = false;
    	        	getPartnerADrawService(scoreSJ,pointSH);
		        }

		        if (lastPoint) {
			        contextLeft.save();
			        contextLeft.beginPath();
			        contextLeft.moveTo(lastPoint.x, lastPoint.y);
			        contextLeft.lineTo(currentPoint.x, currentPoint.y);

			        contextLeft.strokeStyle = 'white';
			        contextLeft.lineWidth = 6;
			        contextLeft.lineCap = 'round';
			        contextLeft.lineJoin = 'round'
			        contextLeft.stroke();
			        contextLeft.closePath();
			        contextLeft.restore();
		        }

		        lastPoint = currentPoint;
	        }else {
	 		pushPoint();
	 		long = getLength();
	 		scoreSJ = judgeScore(long);
	 		document.getElementById('score').innerHTML = scoreSJ;
	        	toggle ++;
	        	isMouseDown = false;
	        getPartnerADrawService(scoreSJ,pointSH);
	        }
	    }
	})

	btnRule.addEventListener('touchstart', function(){
		btnRule.style.backgroundImage="url('img/partner/hdgz_p.png')"
	})
	btnRule.addEventListener('touchend', function(){
		btnRule.style.backgroundImage="url('img/partner/hdgz_n.png')"
	})

	btnBestPartener.addEventListener('touchstart', function(){
		btnBestPartener.style.backgroundImage="url('img/partner/zjzh_p.png')"
	})
	btnBestPartener.addEventListener('touchend', function(){
		btnBestPartener.style.backgroundImage="url('img/partner/zjzh_n.png')"
	})



	// 根据x轴坐标值计算与圆的y轴交点坐标
	function yCrossCircle(i, x){
		if (i <= radius/step*2) {
			return 1.25*radius - Math.sqrt(radius*radius - (x - 1.25*radius)*(x - 1.25*radius));
		}else {
			return 1.25*radius + Math.sqrt(radius*radius - (x - 1.25*radius)*(x - 1.25*radius));
		}
	}
	
	// 距离
	function distance(p1, p2){
		return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
	}
	
	// 坐标转换——将鼠标划过的点的坐标转化为相对于canvasLeft画布的坐标值
	function pointXY(x, y){
		return {
			x: Math.round(x - canvasLeft.getBoundingClientRect().left),
			y: Math.round(y - canvasLeft.getBoundingClientRect().top)
		}
	}
	
	// 判断长度对应的分数
	function judgeScore(len){
	    var fenshu, gw, sw, bw, qw;
	    fenshu =5000 - Math.floor(len*10 / 14);
	    if (fenshu >= 0 && fenshu <= 5000) {
	    	gw = fenshu % 10;
	    	sw = Math.floor(fenshu % 100 / 10);
	    	bw = Math.floor(fenshu % 1000 / 100);
	    	qw = Math.floor(fenshu / 1000);
	    	if (qw == 0) {
	    		return bw + '' + '.' + sw + '' + gw;
	    	}else {
	    		return qw + '' + bw + '' + '.' + sw + '' + gw;
	    	}
	    }else {
	    	return '00.00';
	    }
	}
	
	
	// 补点时获得不同刻度线与直线的交点
	function getCross(linshiL, linshiC, x){
	    // 直线求交点
	    var k1 = linshiC.y == linshiL.y ? 0 : (linshiC.y-linshiL.y)/(linshiC.x-linshiL.x);
	    var b1 = linshiC.y - linshiC.x * k1;
	    var y1 = k1 * x + b1 ? k1 * x + b1 : yCrossCircle(radius/step*2, 0.25*radius);
	    return {
	    	x: x,
	    	y: y1
	    };
	}
	
	// 判断当前点所在的刻度范围n
	function judgeN(p){
		if (p) {
			if (p.x < 0.25*radius + step/2) {
				return 2*radius/step;
			}else {
				// if(p.y > yCrossCircle(2*radius/step + 1, 0.25*radius + step/2)) {
				if(p.y > yCrossCircle(2*radius/step, 0.25*radius)) {
					return Math.abs(Math.floor((p.x + step/2 - 0.25*radius) / step) + 2*radius/step);
				}else {
					return Math.abs(2*radius/step - Math.floor((p.x + step/2 - 0.25*radius) / step));
				}
			}
		}
	}
	
	// 根据n的值返回刻度的坐标
	function nToX(i){
		return 0.25*radius + Math.abs(i - radius*2/step)*step;
	}
	
	// 取得每个刻度中用于与标准刻度进行比较的点（标准为选取距离刻度线最远的点）
	function pushPoint(){
		var linshiN, linshiN1, linshiN2, linshiC, linshiL;
		var pointWillIn;
		var linshipoint, linshix, linshi;
	
		// 初始化第一个值
		linshiL = {
			n: judgeN(pointSH[0]),
			x: pointSH[0].x,
			y: pointSH[0].y
		};
		point[judgeN(pointSH[0])] = linshiL;
	
		for (var j = 1, k = 0; j < pointSH.length; j++) {
	        linshiN1 = judgeN(pointSH[j]);// 当前点n值
	        linshiN2 = judgeN(pointSH[j-1]);// 前一个点n值
	        linshiC = {// 当前点
	        	n: linshiN1,
	        	x: pointSH[j].x,
	        	y: pointSH[j].y
	        };
	        linshiL = {// 前一个点
	        	n: linshiN2,
	        	x: pointSH[j-1].x,
	        	y: pointSH[j-1].y
	        };
	
	        if (linshiN1 == linshiN2) {
	        	// 同一个刻度范围内筛选距离大的那个点
		 		linshipoint = distance(linshiC, ruler[linshiN1]) > distance(point[linshiN1], ruler[linshiN1]) ? linshiC : point[linshiN1];
		 		point[linshiN1] = {
		 			n: linshiN1,
		 			x: linshipoint.x,
		 			y: linshipoint.y
		 		};
	        }else if (linshiN1 > linshiN2) {
	        	// 正常顺序情况下
	
	        	if (linshiN1 - linshiN2 == 1) {
	        		point[linshiN1] = linshiC;
	        	}else {// 跨刻度
	        		point[linshiN1] = linshiC;
	        		while (linshiN1 > linshiN2 && linshiN1 - linshiN2 <= 5) {
	        			linshix = nToX(linshiN2);
	        			linshi = getCross(linshiL, linshiC, linshix);
	        			linshipoint = {
	        				n: linshiN2,
	        				x: linshi.x,
	        				y: linshi.y
	        			}
	
	        			// 判断是否已存在
			        	if (point[linshiN2]) {
				        	// 同一个刻度范围内筛选距离大的那个点
			    	 		linshipoint = distance(linshipoint, ruler[linshiN2]) > distance(point[linshiN2], ruler[linshiN2]) ? linshipoint : point[linshiN2];
			    	 		point[linshiN2] = {
			    	 			n: linshiN2,
			    	 			x: linshipoint.x,
			    	 			y: linshipoint.y
			    	 		}
			    	 	}else {
		        			point[linshiN2] = linshipoint;
			    	 	}
	        			linshiN2 ++;
	        		}
	        	}
	        }else {
	        	// 正常顺序相反情况下
	
	        	// 若该刻度上已存在数据，则筛选距离大的点
	        	if (linshiN2 - linshiN1 == 1) {
		        	if (point[linshiN1]) {
			        	// 判断是否已存在
		    	 		linshipoint = distance(linshiC, ruler[linshiN1]) > distance(point[linshiN1], ruler[linshiN1]) ? linshiC : point[linshiN1];
		    	 		point[linshiN1] = {
		    	 			n: linshiN1,
		    	 			x: linshipoint.x,
		    	 			y: linshipoint.y
		    	 		}
		        	}else {
		        		point[linshiN1] = linshiC;
		        	}
	        	}else {
	        		point[linshiN1] = linshiC;
	        		while (linshiN1 < linshiN2 && linshiN2 - linshiN1 <= 5) {
	        			linshix = nToX(linshiN2);
	        			linshi = getCross(linshiL, linshiC, linshix);
	        			linshipoint = {
	        				n: linshiN2,
	        				x: linshi.x,
	        				y: linshi.y
	        			}
	
	        			// 判断是否已存在
			        	if (point[linshiN2]) {
				        	// 同一个刻度范围内筛选距离大的那个点
			    	 		linshipoint = distance(linshipoint, ruler[linshiN2]) > distance(point[linshiN2], ruler[linshiN2]) ? linshipoint : point[linshiN2];
			    	 		point[linshiN2] = {
			    	 			n: linshiN2,
			    	 			x: linshipoint.x,
			    	 			y: linshipoint.y
			    	 		}
			    	 	}else {
		        			point[linshiN2] = linshipoint;
			    	 	}
	        			linshiN2 --;
	        		}
	        	}
	        }
		}
	}
	
	
	// 获取全部长度
	function getLength(){
		for (var i = 0; i < point.length; i++) {
			if ((i == 0 || i == point.length - 1) && point[i] != undefined) {
				cankaolength += distance(point[i], ruler[i]);
			}else if ((i == 0 || i == point.length - 1) && point[i] == undefined) {
				continue;
			}else if (point[i] != undefined) {
				cankaolength += distance(point[i], ruler[i]);
			}else {
				cankaolength += canvasLeft.height / 2;
			}
		}
		return cankaolength;
	}
	
}

function gotohdgz(){
		$('#boxHidden').css('display', 'block');
	}

function closeRule(){
		$('#boxHidden').css('display', 'none');
	}

function gotoFX(){
		$('#boxHiddenJH').css('display', 'none');
		$('#boxHiddenFX').css('display', 'block');
	}

function closeFX(){
		$('#boxHiddenFX').css('display', 'none');
	}

function hide(){
		$('#boxHiddenJH').css('display', 'none');
	}
//2.10. 用户A可绘画剩余次数查询
function getPartnerADTimes(){
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	
    var onResult = getPartnerADTimesOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerAGetDrawENService({'pid':pid,'openid':openid} , resultProcessor);
}
function getPartnerADTimesOnResult(result){
    if(result.code != 0){
    	chance = 0;
        alert('不给力，刷新重试~');
        $('#play_chance').text("0");
//        $('#play_chance').text("无限");
    		chance = 10000;
    }else {
    	if(result.data.entimes == '-1'){
    		$('#play_chance').text("无限");
    		chance = 100;
    	}else{
    		$('#play_chance').text(result.data.entimes);
    		chance = result.data.entimes;
    	}
    }
}

//2.9用户A画数据上传
function getPartnerADrawService(score,pointsh){
	var pointsh_string;
	for(var i=0; i<pointsh.length;i++){
		if(pointsh.length==1){
			pointsh_string = "[{x:"+pointsh[i].x+",y:"+pointsh[i].y+"}]";
		}else{
			if(i==0){
			    pointsh_string = "[{x:"+pointsh[i].x+",y:"+pointsh[i].y+"}";
		   }else if(i==pointsh.length-1){
		   	    pointsh_string = pointsh_string+ ",{x:"+pointsh[i].x+",y:"+pointsh[i].y+"}]";
		   }else{
		   	    pointsh_string = pointsh_string+ ",{x:"+pointsh[i].x+",y:"+pointsh[i].y+"}";
		   }
		}
	}
    var pid = $("#pid").val();
	var openid = $("#openid").val();
	var key = $("#key").val();
	var score_sc=DES3.encrypt(key,score);
	var pointsh_sc=DES3.encrypt(key,pointsh_string);
    var onResult = getPartnerADrawServiceResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerADrawService({'pid':pid,'openid':openid,'str1':score_sc,'str2':pointsh_sc} , resultProcessor);
}
function getPartnerADrawServiceResult(result){
	if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
    	if(result.data.entimes == '-1'){
    		$('#play_chance').text("无限");
    		chance = 10000;
    	}else{
    		$('#play_chance').text(result.data.entimes);
    		chance = result.data.entimes;
    	}
    	$("#pathid").val(result.data.pathid);
    	$("#picid").val(result.data.picid);
    	
    	var pid0 = $("#pid").val();
    	var picid0 = $("#picid").val();
    	wxUrl = getRootUrl() + "partner.do?op=drawInRight&pid=" + pid0 + "&picid=" + picid0;
    	//分享接口    
    	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    	shareTimeLine();
    	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
    	shareFriend();
    	//获取“分享到QQ”按钮点击状态及自定义分享内容接口
    	shareQQ();

    }
}

//2.11. 用户A绘画成功分享
function getPartnerAShareService(){
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	var picid = $("#picid").val();
    var onResult = getPartnerAShareServiceResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerAShareService({'pid':pid,'openid':openid,'picid':picid} , resultProcessor);
}
function getPartnerAShareServiceResult(result){
    if(result.code != 0){
    	chance = 0;
        alert('不给力，刷新重试~');
        $('#play_chance').text("0");
    }else {
    	if(result.data.entimes == '-1'){
    		$('#play_chance').text("无限");
    		chance = 10000;
    	}else{
    		$('#play_chance').text(result.data.entimes);
    		chance = result.data.entimes;
    	}
    }
}