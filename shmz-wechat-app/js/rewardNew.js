/**
 * Created by wq on 2016/10/11.
 */

//个人海报获取用户信息
function PosterUserInfo(){
    var onResult = PosterUserInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetUserInfoService({'posterId':activityId , 'openid':opId} , resultProcessor);
}
function PosterUserInfoOnResult(result){
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        $('.nickName').text(result.data.nickname);
        $('#phone').text(result.data.phone);
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
        var endTime = formatDateTime(result.data.endTime);
        $('#expirationDate').text(endTime);//活动截止时间
        $('#targetNum').text(result.data.targetNum);//目标粉丝数
        var type = result.data.rewardType;
        var value = result.data.rewardValue;
        if(type == 1){//奖励是流量
            $('#reward').text(value + "流量");
        }else{
            $('#reward').text(value + "元话费");
        }
        $('#currentNum').text(result.data.promotionNum);//当前粉丝数
        var rewardTime = formatDate(result.data.rewardTime);
        $('#rewardTime').text(rewardTime);//发奖时间
    }
}
//个人海报获取推广记录列表
function PosterPromotionList(){
    var onResult = PosterPromotionListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetPromotionListService({'posterId':activityId , 'openid':opId} , resultProcessor);
}
function PosterPromotionListOnResult(result){
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if(result.data.promotionList.length > 0){
        //<div class="tableBox">
        //        <p><span class="nickName"></span>邀请的好友</p>
        //        <img class="slice" src="img/recommend/x1021001.png">
        //        <table id="recommendTable"></table>
        //        </div>
            var oTableBox = $('<div class="tableBox"><p><span class="nickName"></span>邀请的好友</p><img class="slice" src="img/recommend/x1021001.png"><table id="recommendTable"></table></div>');
            $("#bg").append(oTableBox);
            var oTable = $('#recommendTable');
            //新建列表
            for(var i=0; i<result.data.promotionList.length; i++){
                var subscribeTime = formatDate(result.data.promotionList[i].subscribeTime);
                var imgUrl;
                if(result.data.promotionList[i].headimgurl == "" || result.data.promotionList[i].headimgurl == null || result.data.promotionList[i].headimgurl == 'undefined'){
                    imgUrl = "img/common/mr1028.jpg";
                }else{
                    imgUrl = result.data.promotionList[i].headimgurl;
                }
                var oTr = $('<tr><td><img src="'+ imgUrl +'"></td><td>'+ result.data.promotionList[i].nickname +'</td><td>'+ subscribeTime +'</td></tr>');
                oTable.append(oTr);
            }
        }
        //else {
        //    $('.tableBox').addClass('hide');
        //}
    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    if(status == 2){
        $('#doing').addClass('hide');
        $('#did').removeClass('hide');
    }else if(status == 0){
        $('#did').addClass('hide');
        $('#doing').removeClass('hide');
    }
    judgeState();
    //分享
    var url = getRootUrl() +  'channel.do?op=posterShareSrv&p=' + activityId + '&ch=' + userId;
    wxShare(title , desc , img , url);


    //个人海报获取用户信息
    PosterUserInfo();
    //个人海报获取奖励信息
    posterReward();
    //个人海报获取推广记录列表
    PosterPromotionList();
});