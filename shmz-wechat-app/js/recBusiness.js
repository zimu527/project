/**
 * Created by wq on 2016/10/18.
 */
//分享
var url = getShareUrl();
//wxShare(title , desc , img , url);

//获取业务信息
function businessInfo(){
    var onResult = businessInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BusinessGetListService({"activityId":activityId} , resultProcessor);
}
function businessInfoOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else {
        var bus = $('#bus');
        //bus.empty();
        //业务名称，酬劳，业务图
        if(result.data.businessList.length > 0){
            for(var i=0; i<result.data.businessList.length; i++){
                var type = result.data.businessList[i].rewardType;
                var value = result.data.businessList[i].rewardValue;
                var reward;
                if(type == 1){//奖励是流量 MB
                    if(value >= 1024){
                        reward = (value/1024).toFixed(2) + "GB流量";
                    }else {
                        reward = value + "MB流量";
                    }
                }else{//奖励是话费  分
                    reward = value/100 + "元话费";
                }
                var name = limitWord1(result.data.businessList[i].name , 10);
                var url = "business.do?op=orderDataIndex&a="+ activityId +"&b="+ result.data.businessList[i].id +"&u="+ userId;
                var oDiv = $('<div class="bus-icon"></div>');
                var oImg1 = $('<img class="separate" src="img/recommend/x1021001.png">');
                var title = $('<div class="conn"><div class="conLeft">'+ name +'</div><div>酬劳：<span class="conRight">'+ reward +'</span>/次</div></div>');
                var oImg2 = $('<div class="imgBox"><a href="'+ url +'"><img class="imgWidth100" src="'+ result.data.businessList[i].imgUrl +'"></a></div>');
                var oUl = $('<ul class="busUl"><li><a href="'+ url +'">了解详情</a></li><li onclick=\"share(\''+ result.data.businessList[i].name +'\',\''+ result.data.businessList[i].imgUrl +'\',\''+ url +'\')\">推荐好友</li></ul>');
                oDiv.append(oImg1).append(title).append(oImg2).append(oUl);
                bus.append(oDiv);
            }
        }else{
            var oDiv1 = $('<div class="bus-no"><img class="separate" src="img/recommend/x1021001.png"><img class="imgWidth100" src="img/recommend/1025001.png"></div>');
            bus.append(oDiv1);
        }
    }
}
function share(name , imgUrl , urlNew){
    $('#sharePop').removeClass('hide');
    title = name;
    img = imgUrl;
    url = getRootUrl() + urlNew;
    preWxShare();
    //alert(title+img+url+desc);
}
//var wxTitle;// 分享标题
//var wxDesc;// 分享描述
//var wxUrl;// 分享链接
//var wxImg;// 分享图标
function preWxShare(){
    //分享接口
    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    shareTimeLine();
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    shareFriend();
    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    shareQQ();
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    wxShare();

    $('#myReward').click(function(){
        if(status == 1){
            popBoxAlert('' , '活动还未开始');
        }else if(status == 9){
            popBoxAlert('' , '活动未开启');
        }else {
            window.location.href = 'business.do?op=bizPromoteReward&b=' + activityId;
        }
    });

   // 2.4. 业务推广获取业务列表
    businessInfo();
});

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
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url,// 分享链接
        imgUrl: img, // 分享图标
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
        title: title, // 分享标题
        link: url,// 分享链接
        imgUrl: img, // 分享图标
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
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url,// 分享链接
        imgUrl: img, // 分享图标
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
