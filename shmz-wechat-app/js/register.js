
wxShare(registerTitle , registerDesc , registerImg , registerUrl);

document.body.addEventListener('touchstart', function () { });
$(document).ready(function() {
	_showPopBoxById("loadingToast");//loading
	
	$(".in").width($(".inputInfo").width() - $(".pn").width());
	$(".inin").width($(".inputInfo").width() - $(".pn").width() - $(".inputInfoRight").width() - 5);
	hiddenBox("loadingToast");//loading
});
//60s倒计时
var maxTime = 120;
function countDown(){
    if(maxTime >= 0){
        $("#acYZM").val(maxTime + "s");
        maxTime--;
    }else{
		clearInterval(timer);//停用计时器
       	$("#acYZM").removeAttr("disabled");//启用按钮
		$("#acYZM").val("获取验证码");
	  	refreshImg();
    }
}

//刷新图形验证码
function refreshImg(){
	var timestamp = (new Date()).valueOf();
	$("#imgYZM").attr("src" , "member.do?op=getRandCode&t=" + timestamp);
	$("#randCode").val("");
}
//点击获取短信验证码
function acquireCode(){
	var phoneNum = $("#phoneNum").val();//号码
	var randCode = $("#randCode").val();//图形验证码
	if(phoneNum == "undefined" || phoneNum == null || phoneNum == ""){
		popBoxAlert("","请输入号码");
		return false;
	}
	if(phoneNum.length != 11){
		popBoxAlert("" , "手机号格式不正确");
		return false;
	}
	if(randCode == "undefined" || randCode == null || randCode == ""){
		popBoxAlert("" , "请输入图形验证码");
		return false;
	}
	_showPopBoxById("loadingToast");//loading
	//向后台发送处理数据
	$.ajax({
		type:"post",
		url:"member.do?op=sendVerifyCode",
		data:{
			mobile:phoneNum,
			randCode:randCode,
			a:aId
		},
		dataType:"json",
		success:function(data){
			hiddenBox("loadingToast");//loading
			if(data == 0){
				popBoxAlert("" , "已发送验证码，请稍等~");
				$("#acYZM").attr("disabled" , "true");//不能点击
				timer = setInterval("countDown()" , 1000);//倒计时120
			}else if(data == 141){
				popBoxAlert("" , "获取短信验证码失败");
			}else if(data == 142){
				popBoxAlert("" , "获取短信验证码过于频繁");
				$("#acYZM").attr("disabled" , "true");
				timer = setInterval("countDown()" , 1000);
			}else if(data == 143){
				popBoxAlert("" , "图形验证码过期");
				refreshImg();
			}else if(data == 144){
				popBoxAlert("" , "图形验证码不正确");
				$("#randCode").val("");
			}else if(data == 145){
				popBoxAlert("" , "发送短信次数超出限制");
				$("#acYZM").attr("disabled" , "true");
				timer = setInterval("countDown()" , 1000);
			}else if(data == 146){
				popBoxAlert("" , "短信通道错误");
			}
		},
		error:function(){
			popBoxAlert("" , "不给力  刷新重试");
		}
	});
	
}
//点击绑定会员
function bindMember(){
	var phoneNum = $("#phoneNum").val();//号码
	var randCode = $("#randCode").val();//图形验证码
	var messageText = $("#messageText").val();//验证码
	var userName = $("#userName").val();//姓名
	$("#opId").val(opId);
	if(phoneNum == "undefined" || phoneNum == null || phoneNum == ""){
		popBoxAlert("" , "请输入号码");
		return false;
	}
	if(phoneNum.length != 11){
		popBoxAlert("" , "手机号格式不正确");
		return false;
	}
	if(randCode == "undefined" || randCode == null || randCode == ""){
		popBoxAlert("" , "请输入图形验证码");
		return false;
	}
	if(messageText == "undefined" || messageText == null || messageText == ""){
		popBoxAlert("" , "请输入短信验证码");
		return false;
	}
	if(userName == "undefined" || userName == null || userName == ""){
		popBoxAlert("" , "请输入姓名");
		return false;
	}
	if(userName.length > 10){
		popBoxAlert("" , "姓名的最大长度为10，请重新输入");
		return false;
	}
	_showPopBoxById("loadingToast");//loading
	window.bindForm.submit();
	hiddenBox("loadingToast");//loading
}