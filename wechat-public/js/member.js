

wxShare(registerTitle , registerDesc , registerImg , registerUrl);

$(document).ready(function() {
	_showPopBoxById("loadingToast");//loading
	$(".userUl").css("margin-left" , ($("body").width() - $(".userUl").width())/2 + "px");
	var mySwiper = new Swiper('.swiper-container',{
		autoplay: 3000,
		loop: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		pagination : '.swiper-pagination'
	});
	//2.3. 获取会员积分
	getCredit();
	//2.7. 获取会员活动配置开关
	memberSwitch();
	hiddenBox("loadingToast");//loading
});

function showDesc(){
	if($("#userDesc").hasClass("hide")){
		$("#userDesc").removeClass("hide");
	}else{
		$("#userDesc").addClass("hide");
	}
}

//2.3. 获取会员积分
function getCredit(){
	var onResult = getCreditOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.MemberGetCreditService ({'openid':opId} , resultProcessor);
}
function getCreditOnResult(result){
	if(result.code != 0){
		popBoxAlert("",'不给力 刷新重试');
	}else{
		$('#userCredits').html(result.data.credits);
	}
}

//2.7. 获取会员活动配置开关
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
		if(result.data.signSwitch == 1){
			$("#signIn").removeClass("hide");
			$("#signIn").attr("href" , "member.do?op=signIndex&a=" + aId);
		}else{
			$("#signIn").hide();
		}
		if(result.data.shareSwitch == 1){
			$("#share").removeClass("hide");
			$("#share").attr("href" , "share.do?op=index&a=" + aId);
		}else{
			$("#share").hide();
		}
		if(result.data.drawSwitch == 1){
			$("#draw").removeClass("hide");
			$("#draw").attr("href" , "lucky.do?op=roulette&r=" + result.data.luckyId);
		}else{
			$("#draw").hide();
		}
		if(result.data.signSwitch == 0 && result.data.shareSwitch == 0 && result.data.drawSwitch == 0){
			$(".userAc").hide();	
		}
	}
}