/**
 * Created by wq on 2016/10/18.
 */

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
                if(type == 1){//奖励  1是流量  2是话费
                    reward = value;
                }else {
                    reward = value + "元";
                }
                var oDiv = $('<div class="bus-icon"></div>');
                var oImg1 = $('<img class="separate" src="img/recommend/x1021001.png">');
                var title = $('<div class="con"><div class="conLeft">'+ result.data.businessList[i].name +'</div><div class="conRight">酬劳：<span>'+ reward +'</span>/次</div></div>');
                var oImg2 = $('<div class="imgBox"><a href="business.do?op=orderDataIndex&a='+ activityId +'&b='+ result.data.businessList[i].id +'&u='+ userId +'"><img class="imgWidth100" src="'+ result.data.businessList[i].imgUrl +'"></a></div>');
                var oUl = $('<ul class="busUl"><li><a href="business.do?op=orderDataIndex&a='+ activityId +'&b='+ result.data.businessList[i].id +'&u='+ userId +'">了解详情</a></li><li onclick="share()">推荐好友</li></ul>');
                oDiv.append(oImg1).append(title).append(oImg2).append(oUl);
                bus.append(oDiv);
            }
        }else{
            var oDiv1 = $('<div class="bus-no"><img class="separate" src="img/recommend/x1021001.png"><img class="imgWidth100" src="img/recommend/1025001.png"></div>');
            bus.append(oDiv1);
        }
    }
}
function share(){
    $('#sharePop').removeClass('hide');
}
$(document).ready(function(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束
    judgeState();
    //分享
    var url = getShareUrl();
    wxShare(title , desc , img , url);


   // 2.4. 业务推广获取业务列表
    businessInfo();
});
