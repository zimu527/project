
//wxShare(registerTitle , registerDesc , registerImg , registerUrl);

document.body.addEventListener('touchstart', function () { });

//$('.loginInput > input').width($('.loginInput').width() - $('.loginInput >label').width() - 10);
//$('.yzmInput > input').width($('.yzmInput').width() - $('.yzmInput > label').width() - $('.yzmInput > div').width()*13/12 - 10);

//点击获取短信验证码
function acquireYzm(){
	//var name = $("#name").val();//姓名
	var phone = $("#phone").val();//号码
	var randCode = $("#randCode").val();//图形验证码
	var judgeResult = judgeInput();
	if(judgeResult == false){
		return false;
	}
	var yzm = $("#acYzm");
	_showPopBoxById("loadingToast");//loading
	//向后台发送处理数据
	$.ajax({
		type:"post",
		url:"member.do?op=sendVerifyCode",
		data:{
			mobile:phone,
			randCode:randCode
			//name:name
		},
		dataType:"json",
		success:function(data){
			hiddenBox("loadingToast");//loading
			if(data == 0){
				popBoxAlert("" , "已发送验证码，请稍等~");
				yzm.removeAttr('onclick');//不能点击
				timer = setInterval("countDown()" , 1000);//倒计时120
			}else if(data == 141){
				popBoxAlert("" , "获取短信验证码失败");
			}else if(data == 142){
				popBoxAlert("" , "获取短信验证码过于频繁");
				yzm.removeAttr('onclick');//不能点击
				timer = setInterval("countDown()" , 1000);
			}else if(data == 143){
				popBoxAlert("" , "图形验证码过期");
				refreshImg();
			}else if(data == 144){
				popBoxAlert("" , "图形验证码不正确");
				$("#randCode").val("");
			}else if(data == 145){
				popBoxAlert("" , "发送短信次数超出限制");
				yzm.removeAttr('onclick');//不能点击
				timer = setInterval("countDown()" , 1000);
			}else if(data == 146){
				popBoxAlert("" , "短信通道错误");
			}
		},
		error:function(){
			hiddenBox("loadingToast");//loading
			popBoxAlert("" , "不给力  刷新重试");
		}
	});
}
//点击注册
function bindMember(){
	//var name = $("#name").val();//姓名
	var phone = $("#phone").val();//号码
	var randCode = $("#randCode").val();//图形验证码
	var yzmCode = $('#yzm').val();//短信验证码
	var judgeResult = judgeInput();
	if(judgeResult == false){
		return false;
	}
	if(yzmCode == "undefined" || yzmCode == null || yzmCode == ""){
		popBoxAlert("" , "请输入短信验证码");
		return false;
	}
	window.bindForm.submit();
	//var re = $('#register');
	//_showPopBoxById("loadingToast");//loading
	//向后台发送处理数据
//	$.ajax({
//		type:"post",
//		url:"account.do?op=register",
//		data:{
//			mobile:phone,
//			name:name,
//			pwd:pass,
//			verifyCode:yzmCode,
//			openid:oid,
//			force:''
//		},
//		dataType:"json",
//		success:function(data){
//			hiddenBox("loadingToast");//loading
//			if(data == 0){
//				popBoxAlert("" , "注册成功！请前往登录");
//				$('input').val('');
////                        re.removeAttr('onclick');//不能点击
//			}else if(data == 131){
//				popBoxAlert("" , "注册失败");
//			}else if(data == 132){
//				popBoxAlert("" , "未获取验证码或已过期");
////                        re.removeAttr('onclick');//不能点击
//			}else if(data == 133){
//				popBoxAlert("" , "验证码错误");
//			}else if(data == 134){
//				popBoxAlert("" , "该手机号已被别的微信号绑定，联系管理员解绑！");
////                        $("#randCode").val("");
//			}else if(data == 135){
//				popBoxAlert("" , "您已是绑定的用户");
////                        re.removeAttr('onclick');//不能点击
//			}else if(data == 136){
//				popBoxAlert("" , "您已注册过，请直接登录");
//			}else if(data == 137){
//				popBoxAlert("" , "注册信息校验不通过");
//			}
//		},
//		error:function(){
//			hiddenBox("loadingToast");//loading
//			popBoxAlert("" , "不给力  刷新重试");
//		}
//	});
}
//刷新图形验证码
function refreshImg(){
	var timestamp = (new Date()).valueOf();
	$("#imgYZM").attr("src" , "member.do?op=getRandCode&t=" + timestamp);
	$("#randCode").val("");
}
//60s倒计时
var maxTime = 120;
function countDown(){
	if(maxTime >= 0){
		$("#acYzm").text(maxTime + "s");
		maxTime--;
	}else{
		clearInterval(timer);//停用计时器
		$("#acYzm").attr("onclick" , 'acquireYzm()');//启用按钮
		$("#acYzm").text("获取验证码");
		//refreshImg();
	}
}
//判断除了短信验证码之外其他的输入框
function judgeInput(){
	//var name = $("#name").val();//姓名
	var phone = $("#phone").val();//号码
	var randCode = $("#randCode").val();//图形验证码
	//if(name == "undefined" || name == null || name == ""){
	//	$('.nameP').text("请输入姓名");
	//	return false;
	//}
	if(!(/^1[34578]\d{9}$/.test(phone))){
		popBoxAlert("" , "请输入正确的手机号");
		return false;
	}
	if(randCode == "undefined" || randCode == null || randCode == ""){
		popBoxAlert("" , "请输入图形验证码");
		return false;
	}
	return true;
}


$(document).ready(function(){
	//切换勾选，勾选则可以点击注册，
	$('#agree').click(function(){
		var re = $('#register');
		if($(this).prop('checked')){
			re.removeClass('registerNo');
			re.addClass('register');
			re.removeAttr('disabled');
		}else{
			re.removeClass('register');
			re.addClass('registerNo');
			re.attr('disabled' , 'disabled');

		}
	});

});