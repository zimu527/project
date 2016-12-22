/**
 * Created by wq on 2016/12/12.
 */
$(function(){
    //分享
    var title = '圣诞手机大折扣';//分享标题
    var desc = '4折华为手机等你抢。赶紧来参与吧。';//分享简介
    var img = getRootUrl() +  'img/bargain/kk1612070023.jpg';//分享图片
    var url = getRootUrl() +  'bargain.do?op=index&a=1&aw=' + aw;
    wxShare(title , desc , img , url);

});
//获取手机详情
function getPhoneInfo(){
    var onResult = getPhoneInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainGetRecordInfoService({'bargainId':bId} , resultProcessor);
}
function getPhoneInfoOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else{
        if(result.data.state == 3){
            $(".fail").attr('src' , 'img/bargain/kk1612070037.png');//失败页的失败图片
        }else{
            $(".fail").attr('src' , 'img/bargain/kk1612070036.png');
        }
        //结束日期
        $('#now').text(getCurrentDate(result.data.endtime));
        //当天剩余时间倒计时
        //var current = new Date(now + ' GMT+8');
        var current = new Date(startTime);
        var nowTime = Date.parse(current);
        var remain = (result.data.endtime - nowTime) / 1000;
        setInterval(function(){
            remain--;
            count(remain);
        } , 1000);

        //手机图片
        var imgurl = result.data.imgurl;//产品图片
        if (imgurl != "") {
            $("#goodImg").attr("src" , imgurl);
        }else {
            $("#goodImg").attr("src" , "img/bargain/sj1213001.png");
        }

        $('#goodsName').text(result.data.goodsName);//产品名
        $('#entryCount').text(result.data.entryCount + '人参与');//参与人数
        var successCount = result.data.allStock - result.data.remainCount;
        $('#successCount').text(successCount + '人成功');//成功人数
        $('#goodsDetail').text(result.data.goodsDetail);//产品详情
        $('#description').text(result.data.description);//产品套餐描述
        var originalPrice = result.data.originalPrice / 100;
        $('.originalPrice').text(originalPrice);//原价
        $('#remainCount').text(result.data.remainCount);//剩余库存
        var discountPrice = result.data.discountPrice / 100;
        $('.discountPrice').text('￥' + discountPrice);//折扣价
        $('#discountRate').text(result.data.discountRate);//折扣率

        $('.bargainNum').text(result.data.bargainNum);//帮砍价人数
        //var bargainPrice = result.data.bargainPrice / 100;//砍掉后的现价
        //var remainBargain = bargainPrice - discountPrice;
        //$('#remainBargain').text(remainBargain);//砍价后，还剩余要砍的钱
        var bargaining = (result.data.originalPrice - result.data.bargainPrice) / 100;
        $('#bargaining').text('￥' + bargaining);//砍掉的钱

        //    进度条
        var sumPrice = originalPrice - discountPrice;//总的需要砍掉的价格
        var rate = (bargaining * 100) / sumPrice;
        if(rate >= 100)rate = 100;
        $('.rate-inner').animate({width: rate + '%'});
    }
}