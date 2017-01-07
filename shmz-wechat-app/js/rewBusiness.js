/**
 * Created by wq on 2016/10/18.
 */
//获取推广记录列表
function BusinessData(){
    var onResult = BusinessDataOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BusinessGetPromoteDataService({"activityId":activityId , "openid":opId} , resultProcessor);
}
function BusinessDataOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else {
        $('#nickName').text(result.data.nickname);
        $('#phone').attr('src' , result.data.phone);
        var oTable = $('#businessTable');
        if(result.data.promotionList.length > 0){
            $('#busNum').text(result.data.promotionList.length + "个");//成功推荐业务数

            //新建列表
            for(var i=0; i<result.data.promotionList.length; i++){
                var type = result.data.promotionList[i].rewardType;
                var value = result.data.promotionList[i].rewardValue;
                var reward;
                if(type == 1){//奖励  1是流量  2是话费
                    reward = value;
                }else {
                    reward = value + "元";
                }
                var time = formatDate(result.data.endTime);//时间
                var oTr1 = $('<tr class="tr1"><td rowspan="2"><img src="'+ result.data.promotionList[i].headimgurl +'"></td><td colspan="2">'+ result.data.promotionList[i].nickname +'&nbsp;&nbsp;'+ result.data.promotionList[i].businessName+'</td></tr>');
                var oTr2 = $('<tr class="tr2"><td>赠送你<span class="special1">'+ reward +'</span></td><td>'+ time +'</td></tr>');
                oTable.append(oTr1).append(oTr2);
            }
        }else {
            $('.tableDiv').addClass('hide');
            $('.tableTop').addClass('hide');
        }
        if(result.data.rewardList.length > 0){
            var sumType = result.data.rewardList[0].rewardType;
            var sumValue = result.data.rewardList[0].rewardValue;
            var sumReward;
            if(sumType == 1){//奖励  1是流量  2是话费
                sumReward = sumValue;
            }else {
                sumReward = sumValue + "元";
            }
            $('#reward').text(sumReward);//奖励
        }

    }
}

$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    //分享
    var url = getShareUrl();
    wxShare(title , desc , img , url);


    //取推广记录列表
    BusinessData();
});