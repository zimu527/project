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
        $('.two').attr('src' , result.data.qrcodeUrl);
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
        if(result.data.promotionList.length > 0){
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
        //else{
        //    $('.tableBox').addClass('hide');
        //}
    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    //分享
    var url = getShareUrl();
    wxShare(title , desc , img , url);


    //个人海报获取用户信息
    PosterUserInfo();
    //个人海报获取推广记录列表
    PosterPromotionList();
});