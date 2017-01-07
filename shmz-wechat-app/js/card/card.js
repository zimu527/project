if(headimgurl!=''){
    $('.user-img').attr('src',headimgurl);
}else {
    $('.user-img').attr('src','img/gg01.jpg');
}
$('.title').text(nickname+'发来祝福：');
$('.message-cont').text(blessWords);

var shareThisUrl=getShareUrl();//当前页面地址
var shareHomeUrl=getRootUrl()+'op=index?a='+activityId;//首页地址
var cardShareInfo=[
    {
        'cardShareTitle':'双旦狂欢季，流量抢不停',
        'cardShareCont':'【微信昵称】在“双旦”狂欢季不仅给你送来祝福，还有流量大礼包哦~',
        'cardShareImg':'',
        'cardShareUrl':shareThisUrl
    },
    {
        'cardShareTitle':'大师兄在上海移动动感俱乐部派礼物啦~',
        'cardShareCont':'免费亲手自作你喜欢的贺卡派发给好友，TA不仅会收到你的祝福，还会有流量礼包惊喜哦~数量有限,快来哟~。',
        'cardShareImg':'',
        'cardShareUrl':shareHomeUrl
    }
];

$(document).ready(function(){
    //分享
    if(role==1){// 角色，1-自己的贺卡，2-他人的贺卡
        //wxShare(cardShareInfo[0].cardShareTitle,cardShareInfo[0].cardShareCont,cardShareInfo[0].cardShareImg,cardShareInfo[0].cardShareUrl);
        $('#goToShare').text('发祝福流量');
        $('#goToShare').click(function(){
            $('.share-mask').show();
        });
    }else {
        //wxShare(cardShareInfo[1].cardShareTitle,cardShareInfo[1].cardShareCont,cardShareInfo[1].cardShareImg,cardShareInfo[1].cardShareUrl);
        $('#goToShare').text('我要发贺卡');
        $('#goToShare').click(function(){
        	window.location.href=shareHomeUrl;
        });    
    }
    setHeight();
});
$(".share-mask").click(function(){//隐藏分享引导
    $(this).hide();
});
$('.clock').click(function(){
    audioPlay();
});
$('#openGift').click(function(){
    window.location.href='op=openGift&a='+activityId+'&cid='+cid;
});
function audioPlay(){
    var myAudio=document.getElementById("music1");
        if(myAudio.paused){
            myAudio.play();
            $('.clock').addClass('clock-animate');
            return false;
        }else{
            myAudio.pause();
            $('.clock').removeClass('clock-animate');
            return false;
        }
}
function setHeight(){
    var browserVersion = navigator.userAgent.toLowerCase();
    var w_s_width = window.screen.width ;
    var w_s_height = window.screen.height ;

    if( browserVersion.indexOf('ucbrowser') >= 0 ||
        browserVersion.indexOf('qqbrowser') >= 0 ||
        browserVersion.indexOf('micromessenger') >= 0  ){
        w_s_width = window.innerWidth ;
        w_s_height = window.innerHeight;
    }    
    var browserHeaderHeight = 64;//微信浏览器的头部bar高为64px
    w_s_height = window.screen.height - browserHeaderHeight ;
    var topImgHeight=468*w_s_height/1304;
    var middleImgHeight=411*w_s_height/1304;
    var bottomImgHeight=425*w_s_height/1304;
    $('.bg-img-top').height(topImgHeight);
    $('.bg-img-middle').height(middleImgHeight);
    $('.bg-img-bottom').height(bottomImgHeight);
}
