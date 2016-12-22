if(headimgurl!=''){
    $('.user-img').attr('src',headimgurl);
}else {
    $('.user-img').attr('src','img/card/touxiang.jpg');
}
$('.title').text(nickname);
$('.message-cont').text('发来祝福：'+blessWords);

var shareThisUrl=getShareUrl();//当前页面地址
var shareHomeUrl=getRootUrl()+'greetingCard.do?op=index&a='+activityId;//首页地址
var cardShareInfo=[
    {
        'cardShareTitle':'双旦狂欢季，流量抢不停',
        'cardShareCont':'【微信昵称】在“双旦”狂欢季不仅给你送来祝福，还有流量大礼包哦~',
        'cardShareImg':'img/card/shareImg.jpg',
        'cardShareUrl':shareThisUrl
    },
    {
        'cardShareTitle':'大师兄在上海移动动感俱乐部派礼物啦~',
        'cardShareCont':'免费亲手自作你喜欢的贺卡派发给好友，TA不仅会收到你的祝福，还会有流量礼包惊喜哦~数量有限,快来哟~。',
        'cardShareImg':'img/card/shareImg.jpg',
        'cardShareUrl':shareHomeUrl
    }
];

$(document).ready(function(){
    //分享
    if(role==1){// 角色，1-自己的贺卡，2-他人的贺卡
        wxShare(cardShareInfo[0].cardShareTitle,cardShareInfo[0].cardShareCont,cardShareInfo[0].cardShareImg,cardShareInfo[0].cardShareUrl);
        $('#goToShare').text('发祝福流量');
        $('#goToShare').click(function(){
            $('.share-mask').show();
        });
    }else {
        wxShare(cardShareInfo[1].cardShareTitle,cardShareInfo[1].cardShareCont,cardShareInfo[1].cardShareImg,cardShareInfo[1].cardShareUrl);
        $('#goToShare').text('我要发贺卡');
        $('#goToShare').click(function(){
        	window.location.href=shareHomeUrl;
        });    
    }
	setHeight();
});
$(window).on('resize',function(){
	setHeight();
});

$(".share-mask").click(function(){//隐藏分享引导
    $(this).hide();
});
$('.clock').click(function(){
    audioPlay();
});
$('#openGift').click(function(){
    window.location.href='greetingCard.do?op=openGift&a='+activityId+'&cid='+cid;
    _showPopBoxById('loadingToast');
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
	//获取页面浏览器视口的高度
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }
    else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    var topImgHeight=468*clientHeight/1304;
    var middleImgHeight=411*clientHeight/1304;
    var bottomImgHeight=425*clientHeight/1304;
    console.log(topImgHeight+";"+middleImgHeight+";"+bottomImgHeight)
    $('.bg-img-top').height(topImgHeight);
    $('.cont').css('top',(topImgHeight));
    $('.btn-list').css('top',(topImgHeight+bottomImgHeight));
    $('.cont').css('top',(topImgHeight+15));
    $('.cont').css('top',(topImgHeight+15));
    $('.bg-img-middle').height(middleImgHeight);
    $('.bg-img-bottom').height(bottomImgHeight);
    //alert(w_s_height)
}
