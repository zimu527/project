
var wxTitle;// 分享标题
var wxDesc;// 分享描述
var wxUrl;// 分享链接
var wxImg;// 分享图标

//获得微信JSSDK参数
function wxShare(title , desc , img , url){
	wxTitle = title;
	wxDesc = desc;
	wxImg = img;
	wxUrl = url;
	var pUrl = getShareUrl();//获取当前页面地址
	var onResult = wxShareOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.JssdkSignatureService({'pageurl':pUrl , 'aid':aId} , resultProcessor);
}
function wxShareOnResult(result){
	if(result.code != 0){
		//alert(result.message);
		return false;
	}else{
		//通过config接口注入权限验证配置
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: result.data.appId, // 必填，公众号的唯一标识
			timestamp: result.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
			signature: result.data.signature,// 必填，签名，见附录1
			jsApiList: ['onMenuShareTimeline' , 'onMenuShareAppMessage' , 'onMenuShareQQ' , 'chooseImage','previewImage','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}
}
//通过ready接口处理成功验证
wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	//分享接口    
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	shareTimeLine();
	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
	shareFriend();
	//获取“分享到QQ”按钮点击状态及自定义分享内容接口
	shareQQ();
	//图像接口 
});
//步骤五：通过error接口处理失败验证
wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
//分享朋友
function shareFriend(){
	wx.onMenuShareAppMessage({
		title: wxTitle, // 分享标题
		desc: wxDesc, // 分享描述
		link: wxUrl,// 分享链接
		imgUrl: wxImg, // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
			//alert(wxUrl + wxTitle + wxDesc + wxImg);
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
}
//分享朋友圈
function shareTimeLine(){
	wx.onMenuShareTimeline({
		title: wxTitle, // 分享标题
		link: wxUrl, // 分享链接
		imgUrl: wxImg, // 分享图标
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
}
//分享qq
function shareQQ(){
	wx.onMenuShareQQ({
		title: wxTitle, // 分享标题
		desc: wxDesc, // 分享描述
		link: wxUrl, // 分享链接
		imgUrl: wxImg, // 分享图标
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
		   // 用户取消分享后执行的回调函数
		}
	});	
}


//获取当前页面地址
function getShareUrl() {
    var url = window.location.href.split('#')[0];
    return url;
}
//获取当前地址根目录
function getRootUrl() {
	var url = window.location.href.split('.do')[0];
	var strx = url.lastIndexOf('/');
	var str1;
	if(strx != -1){
		str1 = url.substring(0,strx+1);
	}
	return str1;
}