// JavaScript Document
document.body.addEventListener('touchstart', function () { });
(function() {
    var ratioOfPic = 2 / 1//分享图片宽高比例
    $('.share_pic').css('height', parseInt($('body').width() / ratioOfPic));

    //是否配置积分抽奖
    memberSwitch();
})();
$(document).ready(function() {
    var startAnswerUrl = 'overlordProblems.html';
    $('.startAnswer-btn').attr('href', startAnswerUrl);
    $(".rule-btn").click(function () {//查看活动规则
        $(".active-rule").show();
    });
    $(".share-btn").click(function(){//显示分享引导
        $(".share-mask").show();
    });
    $(".share-mask").click(function(){//隐藏分享引导
        $(this).hide();
    });
    $(".close-icon").click(function(){//隐藏活动规则
        $(".active-rule").hide();
    });

    if(sex == 1){
        $('#sex').attr('src' , 'img/member/bd1017001.png');//女
    }else {
        $('#sex').attr('src' , 'img/member/bd1017002.png');//男
    }
    $(".goToDraw").click(function(){
    		window.location.href="http://wxtest.bw30.com/shmz-wechat-app/lucky.do?op=roulette&r="+;
    	});
});
//削字
function GetLength(str,x){
    var realLength=0;
    var newStr="";
    for(var i=0; i<str.length; i++) {
        var charCode=str.charCodeAt(i);
        if(charCode>=0 && charCode<=128){
            realLength+=1;
        }else{
            realLength+=2;
        }
        if(realLength<=x){
            newStr+=str[i];
        }else{
            newStr+="...";
            break;
        }
    }
    return newStr;
}
$(document).ready(function(){
    //获取会员信息
    MemberGetInfo();
    //削字
    var shareConts=$(".share_cont");
    var shareTitlts=$(".title");
    var newContStr;
    var newTitleStr;
    for(var i= 0;i<shareConts.length;i++){
        newContStr=GetLength(shareConts.eq(i).text(),60);
        shareConts.eq(i).text(newContStr);
        newTitleStr=GetLength(shareTitlts.eq(i).text(),30);
        shareTitlts.eq(i).text(newTitleStr);
    }
    //获取分享签名
    wxShare();//页面加载后，获取分享签名
});
//切换分享内容
var i = 0;
function changeShareCont(){
    if(i<$(".main li").length){
        $(".main li").eq(i).hide();
        i++;
        if(i==$(".main li").length)
            $(".main li").eq(0).show();
        else
            $(".main li").eq(i).show();
    }else{
        i=0;
        changeShareCont();
    }
    preWxShare();//每次切换，都要重新获取分享参数
}
//切换分享参数
var wxTitle;// 分享标题
var wxDesc;// 分享描述
var wxUrl;// 分享链接
var wxImg;// 分享图标
function preWxShare(){
    var li =$(".main li:visible");
    //alert(li.attr('id'));
    wxTitle = li.find(".title").text();
    wxDesc = li.find(".share_cont").text();
    //wxImg = getRootUrl() + li.find("img").attr("src");
    wxImg = li.find("img").attr("src");
    wxUrl = li.find(".url").val();
    //分享接口
    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    shareTimeLine();
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    shareFriend();
    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    shareQQ();
    //图像接口
}

//获取会员信息
function MemberGetInfo(){
	_showPopBoxById("loadingToast");//loading
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
        //return false;
    }else{
        if(result.data.headimgurl != '')$(".userImg").attr("src",result.data.headimgurl);
        $(".nickname").text(result.data.nickname);
        $(".phone").text(result.data.phone);
        $(".credits").text(result.data.credits);
        //$("#shareCount").text(result.data.shareCount);
    }
}
//积分统计
function ShareStatistic(){
	_showPopBoxById("loadingToast");//loading
    var articleId = $(".main li:visible").attr("id");
    var onResult = ShareStatisticoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ShareStatisticService({'openid':opId, 'articleId': articleId} , resultProcessor);
}
function ShareStatisticoOnResult(result){
	hiddenBox("loadingToast");//loading
    if(result.code != 0){
    	popBoxAlert("","不给力！刷新重试");
    }else{
        if(result.data.result==0){
            var newCredits = parseInt($("#credits").text())+parseInt($(".articleC:visible").text());
            //alert(newCredits);
            $("#credits").text(newCredits);
            $("#shareCount").text(parseInt($("#shareCount").text())+1);
            popBoxAlert("","恭喜您~分享成功,奖励" + $(".articleC:visible").text() + "积分");
        }
        else if(result.data.result==1){
        	popBoxAlert("","分享成功~换一个内容分享有积分奖励哦");
        }
    }
}
/*
 * 以下是获取签名以及微信分享
 */

//获得微信JSSDK参数
function wxShare(){
	_showPopBoxById("loadingToast");//loading
    var pUrl = getShareUrl();//获取当前页面地址
    var onResult = wxShareOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.JssdkSignatureService({'pageurl':pUrl , 'aid':aId} , resultProcessor);
}
function wxShareOnResult(result){
	hiddenBox("loadingToast");//loading
    if(result.code != 0){
        //alert("",result.message);
        return false;
    }else{
        //通过config接口注入权限验证配置
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.data.appId, // 必填，公众号的唯一标识
            timestamp: result.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
            signature: result.data.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline' , 'onMenuShareAppMessage' , 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
}
//通过ready接口处理成功验证
wx.ready(function(){
    preWxShare();//获取要分享的内容
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
//步骤五：通过error接口处理失败验证
wx.error(function(res){
	popBoxAlert("","不给力  刷新重试");
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
            ShareStatistic();
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
            ShareStatistic();
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
            ShareStatistic();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

//获取当前页面地址
function getShareUrl() {
    var url =window.location.href.split('#')[0];
    return url;
}

//获取当前地址根目录
function getRootUrl() {
    var url =window.location.href.split('.do')[0];
    var strx=url.lastIndexOf('/');
    var str1;
    if(strx!=-1){
        str1=url.substring(0,strx+1);
    }
    return str1;
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
