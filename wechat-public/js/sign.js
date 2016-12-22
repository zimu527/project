var sumDay;
var signList = [];

wxShare(signTitle , signDesc , signImg , signUrl);

$(document).ready(function() {
	$(".zhuD").width($(".content").width() - $(".zhu").width() - 10);
	//var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];		
	//calUtil.init(signList);
	_showPopBoxById("loadingToast");//loading
	calUtil.init(signList);//首先画一个空日历

	//获取会员信息
	MemberGetInfo();
	//2.4获取签到记录
	getSignIn();
});
//获取会员信息
function MemberGetInfo(){
	var onResult = MemberGetInfoOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.MemberGetInfoService({'openid':opId} , resultProcessor);
}
function MemberGetInfoOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("",result.message);
		return false;
	}else{
		if(result.data.headimgurl != '')$("#headimgurl").attr("src",result.data.headimgurl);
		$("#phone").text(result.data.phone);
		$("#credits").text(result.data.credits);
	}
}
//2.4获取签到记录
function getSignIn(){
	var onResult = getSignInOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.MemberGetSignInService({'openid':opId , 'aid':aId} , resultProcessor);
}
function getSignInOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		$(".btnSign").css("background" , "#dcdcdc");//签到按钮 不能点击
		$(".btnSign").removeAttr("onClick");
		popBoxAlert("","不给力 刷新重试");
		return false;
	}else{
		sumDay = result.data.maxDays;
		var signInDay = result.data.signInDays;
		var scale = (signInDay / sumDay) * 100;
		$("#contin").animate({width: scale + "%"},1000);//进度条
		$("#signInDay").html(signInDay);//连续签到天数
		if(result.data.signFlux == 'undefined' || result.data.signFlux == null || result.data.signFlux == ''){
			signList = [];
		}else{
			signList = result.data.signFlux;
		}
		calUtil.init(signList);//当月签到流水
		if(result.data.status == 1){
			popBoxAlert("","今天已签，明天再来吧");
			$("#signOver").html("已签到");
			$(".btnSign").css("background" , "#dcdcdc");//签到按钮 不能点击
			$(".btnSign").removeAttr("onClick");
			return false;
		}
		if(result.data.status == 2){
			popBoxAlert("","来早啦！签到活动还未开始呢！");
			$(".btnSign").css("background" , "#dcdcdc");
			$(".btnSign").removeAttr("onClick");
			return false;
		}
		if(result.data.status == 3){
			popBoxAlert("","来迟了！签到活动结束，下次再来吧");
			$(".btnSign").css("background" , "#dcdcdc");
			$(".btnSign").removeAttr("onClick");
			return false;
		}
	}
}
//点击签到按钮  2.5. 会员签到 
function signIn(){
	_showPopBoxById("loadingToast");//loading
	var onResult = signInOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.MemberSignInService ({'openid':opId} , resultProcessor);
}
function signInOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("",result.message);
		return false;
	}else{
		popBoxAlert("","恭喜您！签到成功，奖励" + result.data.creditsIncrease + "积分");
		$('#signOver').html("已签到");
		$(".btnSign").css("background" , "#dcdcdc");//签到按钮 不能点击
		$(".btnSign").removeAttr("onClick");
		var curCre = Number($("#credits").html());//积分
		curCre = curCre + Number(result.data.creditsIncrease);
		$("#credits").html(curCre);
		var signInDay = result.data.signInDays;
		var scale = (signInDay / sumDay) * 100;
		$("#contin").animate({width: scale + "%"},1000);//进度条
		$("#signInDay").html(signInDay);//连续签到天数
		var newDay = new Object;
		newDay.signDay = result.data.currDate;
		signList.push(newDay);		
		calUtil.init(signList);//当月签到流水
	}
}
