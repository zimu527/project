/**
 * Created by wq on 2016/8/25.
 */

wxShare(channelTitle , channelDesc , channelImg , channelUrl);

//点击活动说明按钮
function showActive(){
    $('#activePop').removeClass('hide');
    var h = $('body').height() - $('.conBox').height();
    if(h < 125){
        $('.conBox').css('margin-top' , '0');
    }else {
        $('.conBox').css('margin-top' , '5rem');
    }
}

$(document).ready(function(){
    //判断是否为粉丝，查看排行按钮是否可点击
    //uFlag    0是粉丝可点击  1不是粉丝
    $('#showRank').click(function(){
        if( uFlag != '' && uFlag == 0){
            window.location.href = '';
        }else{
            popBoxAlert("提示",'长按识别二维码，进入公众号参与活动吧~');
        }
    });
    $('#showJoin').click(function(){
        if( uFlag != '' && uFlag == 0){
            window.location.href = '';
        }else{
            popBoxAlert("提示",'长按识别二维码，进入公众号参与活动吧~');
        }
    });

    //2.5. 奥运传火炬获取用户信息
    getUserInfo();
});

//    2.5. 奥运传火炬获取用户信息
function getUserInfo(){
    var onResult = getUserInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.({'openid':opId} , resultProcessor);
}
function getUserInfoOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        $('#uImg').attr('src' , result.data.headimgurl);//头像
        $('#uName').text(result.data.nickname);//用户名
        $('#accountName').text(result.data.);//公众号名称
        $('#fansNum').text(result.data.recommendNum);//粉丝数
        $('#uRank').text(result.data.rank);//排名
    }
}
