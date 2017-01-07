/**
 * Created by wq on 2016/10/11
 */
//点击活动规则按钮
function showActive(){
    $('#activePop').removeClass('hide');
    var h = $('body').height() - $('.conBox').height();
    if(h < 125){
        $('.conBox').css('margin-top' , '0');
    }else {
        $('.conBox').css('margin-top' , '5rem');
    }
}

//个人海报获取奖励信息
function posterReward(){
    var onResult = posterRewardOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetRewardService({'posterId':activityId , 'openid':opId} , resultProcessor);
}
function posterRewardOnResult(result){
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        var value = result.data.rewardValue;
        $('#reward').text(value);
        $('#fansNum').text(result.data.promotionNum);//粉丝数
    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    //分享
    var url = getRootUrl() +  'channel.do?op=posterShareSrv&p=' + activityId + '&ch=' + userId;
    wxShare(title , desc , img , url);


    $('#myReward').click(function(){
        judgeState();
        window.location.href = 'channel.do?op=posterReward&p=' + activityId;
    });
    //个人海报获取奖励信息
    posterReward();

});