/**
 * Created by wq on 2016/10/18.
 */

//获取用户信息
function businessUserInfo(){
    var onResult = businessUserInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.({} , resultProcessor);
}
function businessUserInfoOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        //$('.nickName').text(result.data.nickname);
        //$('#phone').attr('src' , result.data.phone);
    }
}
//获取奖励信息
function businessReward(){
    var onResult = businessRewardOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.({} , resultProcessor);
}
function businessRewardOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        var endTime = formatDateTime(result.data.endTime);
        $('#expirationDate').text(endTime);//活动截止时间
        $('#targetNum').text(result.data.targetNum);//目标粉丝数
        var type = result.data.rewardType;
        var value = result.data.rewardValue;
        if(type == 'M'){//奖励是流量
            if(value >= 1024){
                value = value/1024;
                type = 'GB'
            }else{
                type = 'MB';
            }
            $('#reward').text(value + type + '流量');
        }//奖励
        $('#currentNum').text(result.data.promotionNum);//当前粉丝数
        var rewardTime = formatDate(result.data.promotionNum);
        $('#rewardTime').text(rewardTime);//发奖时间
    }
}
//个人海报获取推广记录列表
function businessPromotionList(){
    var onResult = businessPromotionListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.({} , resultProcessor);
}
function businessPromotionListOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        var oTable = $('#recommendTable');
        //新建列表
        for(var i=0; i<result.datapromotionList.length; i++){
            //var oTr = $('<tr><td>'+ result.datapromotionList[i].headimgurl +'</td><td>'+ result.datapromotionList[i].nickname +'</td><td>'+ result.datapromotionList[i].subscribeTime +'</td></tr>');
            oTable.append(oTr);
        }
    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    if(status == 2){
        $('.judgeState').addClass('hide');
        $('#did').removeClass('hide');
    }else if(status == 0){
        $('.judgeState').addClass('hide');
        $('#doing').removeClass('hide');
    }
    judgeState();
    //获取用户信息
    PosterUserInfo();
    //获取奖励信息
    posterReward();
    //取推广记录列表
    PosterPromotionList();
    //分享
    var url = getShareUrl();
    wxShare(title , desc , img , url);
});