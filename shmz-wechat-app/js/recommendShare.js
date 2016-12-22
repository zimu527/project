/**
 * Created by wq on 2016/10/11.
 */
//2.23 个人海报获取用户信息
function PosterUserInfo(){
    var onResult = PosterUserInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetUserInfoService({'posterId':activityId , 'openid':opId} , resultProcessor);
}
function PosterUserInfoOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        $('.nickName').text(result.data.nickname);
        $('#wechatImg').attr('src' , result.data.qrcodeUrl);
    }
}
//2.20 个人海报获取推广记录列表
function PosterPromotionList(){
    var onResult = PosterPromotionListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetPromotionListService({'posterId':activityId , 'openid':opId} , resultProcessor);
}
function PosterPromotionListOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        var oTable = $('#recommendTable');
        //新建列表
        for(var i=0; i<result.datapromotionList.length; i++){
            var time = formatDate(result.datapromotionList[i].subscribeTime);
            var oTr = $('<tr><td>'+ result.datapromotionList[i].headimgurl +'</td><td>'+ result.datapromotionList[i].nickname +'</td><td>'+ time +'</td></tr>');
            oTable.append(oTr);
        }
    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    //个人海报获取用户信息
    PosterUserInfo();
    //个人海报获取推广记录列表
    PosterPromotionList();
    //分享
    var url = getShareUrl();
    wxShare(title , desc , img , url);
});