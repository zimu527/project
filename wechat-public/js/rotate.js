// JavaScript Document
//$(".contentRo").height($("html").height() - $(".rotateTop").height());

if(ti == 'undefined' || ti == null || ti == "" || de == 'undefined' || de == null || de == "" || im == 'undefined' || im == null || im == ""){
	wxShare(rotateTitle , rotateDesc , rotateImg , rotateUrl);
}else{
	wxShare(ti , de , im , rotateUrl);
}

$(function(){
	//判断活动是否已结束或未开始
	if(status == 1){
		popBoxAlert("","来早啦！活动还未开始呢！");
	}else if(status == 2){
		popBoxAlert("","来迟了！活动结束，下次再来吧");
	}

	//	2.10. 大转盘获取当天剩余抽奖次数
	getDrawNum();
	//点击转盘中间按钮
	$("#lotteryBtn").rotate({ 
		bind:{
			click: function(){
				var drawNum = Number($('#remainRotate').html());
				if(drawNum <= 0){
					popBoxAlert("","您今天没有抽奖机会了，明天可以继续抽哦");
					return false;
				}
				if(num != "" && num > 0){
					comfirmPopBox("提示" , "每次抽奖会消耗" + num + "积分" , "startRo()");
					return false;
				}else {
					startRo();
				}
			}
		}
	});
	//删除按钮
	$(".delete").click(function(){
		$(this).parent().slideUp("slow");
	});
});
function startRo(){
	if(num != "" && num > 0){
		hiddenBox('confirm');
	}
	_showPopBoxById("loadingToast");//loading
	//memberflag   1 粉丝  2 会员
	if(memberflag == 1){
		//判断粉丝是否输入过号码姓名
		getFansInfo();
	}else{
		//hiddenBox("loadingToast");//loading
		rotate("" , "");
	}
}
//	2.10. 大转盘获取当天剩余抽奖次数
function getDrawNum(){
	var onResult = getDrawNumOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.RouletteGetDrawNumService({'rid':rId , 'openid':opId} , resultProcessor);
}
function getDrawNumOnResult(result){
	if(result.code != 0){
		if(result.code == 1){
			popBoxAlert("","参数不全或不合法");
			return false;
		}
		if(result.code == 2){
			popBoxAlert("","粉丝信息不存在，请从公众号菜单进入");
			return false;
		}
		if(result.code == 3){
			popBoxAlert("","未绑定手机号");
			return false;
		}
		popBoxAlert("","不给力 刷新重试");
		return false;
	}
	$('#remainRotate').html(result.data.drawNum);
}

//2.8. 大转盘获取粉丝填写信息 判断粉丝是否输入过号码姓名
function getFansInfo(){
	var onResult = getFansInfoOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.RouletteGetFansInfoService({'rid':rId , 'openid':opId} , resultProcessor);
}
function getFansInfoOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		if(result.code == 1){
			popBoxAlert("","参数不全或不合法");
			return false;
		}
		if(result.code == 2){
			popBoxAlert("","粉丝信息不存在，请从公众号菜单进入");
			return false;
		}
		if(result.code == 3){
			popBoxAlert("","未绑定手机号");
			return false;
		}
		popBoxAlert("","不给力 刷新重试");
		return false;
	}
	if(result.data.result == 0){//存在号码姓名
		rotate(result.data.name , result.data.tel);
	}else if(result.data.result == 1){//不存在
		$("#inputData").slideDown("slow");
	}
}

//弹出输入姓名和手机号的弹窗，点击提交按钮
function commitData(){
	var name = $("#userName").val();
	var phone = $("#userPhone").val();
	if(name == "undefined" || name == null || name == ""){
		popBoxAlert("","请输入姓名");
		return false;
	}
	if(name.length > 10){
		popBoxAlert("" , "姓名的最大长度为10，请重新输入");
		return false;
	}
	if(phone == "undefined" || phone == null || phone == ""){
		popBoxAlert("","请输入号码");
		return false;
	}
	if(phone.length != 11){
		popBoxAlert("" , "手机号格式不正确");
		return false;
	}
	$("#inputData").slideUp("slow");
	_showPopBoxById("loadingToast");//loading
	rotate(name , phone);
}
//大转盘抽奖2.7
function rotate(name , phone){
	if($('.transDiv').hasClass('hide'))$('.transDiv').removeClass('hide');
	var onResult = rotateOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.RouletteDrawService({'rid':rId , 'openid':opId , 'tel':phone , 'name':name} , resultProcessor);
}
function rotateOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		if(result.code == 1){
			rotateFunc(0 , "参数不全或不合法");//旋转
			return false;
		}
		if(result.code == 2){
			rotateFunc(0 , "粉丝信息不存在，请从公众号菜单进入");//旋转
			return false;
		}
		if(result.code == 3){
			rotateFunc(0 , "未绑定手机号");//旋转
			return false;
		}
		rotateFunc(0 , "不给力 刷新重试");//旋转
		return false;
	}
	var drawNum = parseInt($('#remainRotate').html());
	if(result.data.result == 0){
		var grade = 0;
		if(result.data.pGrade){
			grade = prizeGrade(result.data.pGrade);
		}
		//if(memberflag == 1){//粉丝
		//	$("#inputData").slideUp("slow");
		//}
		rotateFunc(result.data.angle , "恭喜您获得"+ grade+ "等奖，"+result.data.pName);//旋转
		drawNum = drawNum - 1;
		$('#remainRotate').html(drawNum);
	}else if(result.data.result == 1){
		rotateFunc(result.data.angle , "居然没中奖，再接再厉");//旋转
		drawNum = drawNum - 1;
		$('#remainRotate').html(drawNum);
	}
	if(result.data.result == 2){
		$('.transDiv').addClass('hide');
		popBoxAlert("","来早啦~活动还未开始呢");
		return false;
	}
	if(result.data.result == 3){
		$('.transDiv').addClass('hide');
		popBoxAlert("","来晚啦~活动已经结束了");
		return false;
	}
	if(result.data.result == 4){
		$('.transDiv').addClass('hide');
		popBoxAlert("","您今天没有抽奖机会了，明天可以继续抽哦");
		return false;
	}
	if(result.data.result == 5){
		$('.transDiv').addClass('hide');
		popBoxAlert("","活动期间您的总抽奖数用完啦");
		return false;
	}
	if(result.data.result == 6){
		$('.transDiv').addClass('hide');
		popBoxAlert("","OMG，积分居然不够~");
		return false;
	}
}

//点击我的奖品
function myPrize(){
	_showPopBoxById("loadingToast");//loading
	$("#prizeResult").empty();
	$("#prizeList").slideDown("slow");
	var onResult = myPrizeOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.RouletteGetPrizeRecordService({'rid':rId , 'openid':opId} , resultProcessor);
}
function myPrizeOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		if(result.code == 1){
			popBoxAlert("","参数不全或不合法");
			return false;
		}
		if(result.code == 2){
			popBoxAlert("","粉丝信息不存在，请从公众号菜单进入");
			return false;
		}
		if(result.code == 3){
			popBoxAlert("","未绑定手机号");
			return false;
		}
		popBoxAlert("","不给力 刷新重试");
		return false;
	}
	if(result.data.prizeRecord ==  "undefined" || result.data.prizeRecord == null || result.data.prizeRecord == "" ){
		var prizeNo = $("<p class='fs26 prizeNo'>暂无中奖纪录</p>");
		$("#prizeResult").append(prizeNo);
	}else{
		for(var i=0; i<result.data.prizeRecord.length; i++){
			var grade = prizeGrade(result.data.prizeRecord[i].prizeGrade) + "等奖";
			var time = getFormatDateByLong(result.data.prizeRecord[i].prizeTime , 'yyyy-MM-dd');
			var oTable = $("<table class='prizeTable'></table>");
			var oTr1 = $("<tr><td class='td1'>"+ grade +"</td><td>"+ result.data.prizeRecord[i].prizeName +"</td><td class='td2'>"+ time +"</td></tr>");
			oTable.append(oTr1);
			if(result.data.prizeRecord[i].cdkey){
				var oTr2 = $("<tr><td colspan='3'>兑奖码："+ result.data.prizeRecord[i].cdkey +"</td></tr>");
				oTable.append(oTr2);
			}
			$("#prizeResult").append(oTable);
		}
	}
}
//旋转转盘
function rotateFunc(angle , text){
	if(angle == 'undefined' || angle == null || angle == ""){
		angle = 0;
	}
	$('#lotteryBtn').stopRotate();
	$('#lotteryBtn').rotate({
		angle:0,
		duration: 5000,
		animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
		callback:function(){
			$('.transDiv').addClass('hide');
			popBoxAlert('抽奖结果' , text);
		}
	});
}

function prizeGrade(g){
	var grade;
	switch (g)
	{
		case 1:
			grade = "一";
			break;
		case 2:
			grade = "二";
			break;
		case 3:
			grade = "三";
			break;
		case 4:
			grade = "四";
			break;
		case 5:
			grade = "五";
			break;
		case 6:
			grade = "六";
			break;
		case 7:
			grade = "七";
			break;
		case 8:
			grade = "八";
			break;
		default:
			grade = "";
	}
	return grade;
}
