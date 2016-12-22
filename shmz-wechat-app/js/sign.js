
var signList = [];

//签到流水格式
//var signInList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];

$(document).ready(function() {
	//活动是否结束  0-活动进行中，1-未开始，2-已结束
	//judgeState();
	_showPopBoxById("loadingToast");//loading
	signFun(signList);//首先画一个空日历
	//获取会员信息
	MemberGetInfo();
	//2.4获取签到记录
	getSignIn();
	//是否配置积分抽奖
	memberSwitch();
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
	}else{
		if(result.data.headimgurl != '')$("#headimgurl").attr("src",result.data.headimgurl);//头像
		$("#phone").text(result.data.phone);//手机号
		$('#nickName').text(result.data.nickname);//昵称
		//性别   男1女2
		var sex = result.data.sex;
		if(sex == 2){
			$('#sex').attr('src' , 'img/member/bd1017001.png');//女
		}else {
			$('#sex').attr('src' , 'img/member/bd1017002.png');//男
		}
		$("#credits").text(result.data.credits);//积分数
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
		$("#btnSign").removeAttr("onClick");//已签到按钮 不能点击
		$("#btnSign").attr("src" , "img/member/an6.png");
		popBoxAlert("","不给力 刷新重试");
	}else{
		var signInDay = result.data.signInDays;
		$("#signInDay").html(signInDay);//连续签到天数
		if(result.data.signFlux == 'undefined' || result.data.signFlux == null || result.data.signFlux == ''){
			signList = [];
		}else{
			var signInList = result.data.signFlux;//之前的数据结构不能用了，要改成【1,2,6,12】这样的
			//var signInList=[{"signDay":"10"},{"signDay":"15"},{"signDay":"22"},{"signDay":"23"}];
			for(var i=0; i<signInList.length; i++){
				signList.push(parseInt(signInList[i].signDay) - 1);
			}
		}
		signFun(signList);
		if(result.data.status == 1){
			popBoxAlert("","今天已签，明天再来吧");
			$("#btnSign").removeAttr("onClick");//已签到按钮 不能点击
			$("#btnSign").attr("src" , "img/member/an4.png");
		}else if(result.data.status == 2){
			popBoxAlert("","来早啦！签到活动还未开始呢！");
			$("#btnSign").attr("src" , "img/member/an6.png");//按钮灰掉
			$("#btnSign").removeAttr("onClick");
		}else if(result.data.status == 3){
			popBoxAlert("","来迟了！签到活动结束，下次再来吧");
			$("#btnSign").attr("src" , "img/member/an6.png");//按钮灰掉
			$("#btnSign").removeAttr("onClick");
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
		$("#btnSign").attr("src" , "img/member/an4.png");
		$("#btnSign").removeAttr("onClick");//已签到按钮 不能点击
		var curCre;//积分
		curCre = Number($("#credits").html()) + Number(result.data.creditsIncrease);
		$("#credits").text(curCre);
		var signInDay = result.data.signInDays;
		$("#signInDay").html(signInDay);//连续签到天数
		signList.push(parseInt(result.data.currDate) - 1);
		signFun(signList);
	}
}
//2.7. 是否配置积分抽奖
function memberSwitch(){
	var onResult = memberSwitchOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.MemberSwitchConfigService ({'aid':aId} , resultProcessor);
}
function memberSwitchOnResult(result){
	if(result.code != 0){
		popBoxAlert("",'不给力 刷新重试');
	}else{
		if(result.data.drawSwitch == 1){
			$(".roulette").attr("href" , "lucky.do?op=roulette&r=" + result.data.luckyId);
		}else{
			$(".roulette").attr("onclick" , "popBoxAlert('','活动暂未开放');");
		}
	}
}