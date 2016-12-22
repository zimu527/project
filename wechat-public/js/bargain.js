/**
 * Created by wq on 2016/12/12.
 */
$(function(){
    //手机详情  倒计时
    getPhoneInfo();
    //判断是否已经砍过
    judgeBargain();
    //亲友列表
    getRelationList();
    //分享
    var title = '圣诞手机大折扣';//分享标题
    var desc = name + '正在参与4折！5折！华为手机砍价活动，小伙伴赶紧帮TA砍价吧。';//分享简介
    var img = getRootUrl() +  'img/bargain/kk1612070023.jpg';//分享图片
    var url = getRootUrl() +  'bargain.do?op=shareForHelp&recid=' + bId + '&aw=' + aw;
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
        //结束日期
        $('#now').text(getCurrentDate(result.data.endtime));

        //当天剩余时间倒计时
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
        //手机信息
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
        $('.discountPrice').text(discountPrice);//折扣价
        $('#discountRate').text(result.data.discountRate);//折扣率
        $('.bargainNum').text(result.data.bargainNum);//帮砍价人数
        //var bargainPrice = result.data.bargainPrice / 100;//砍掉后的现价
        //var remainBargain = bargainPrice - discountPrice;
        //$('#remainBargain').text(remainBargain);//砍价后，还剩余要砍的钱
        var bargaining = (result.data.originalPrice - result.data.bargainPrice) / 100;
        $('#bargaining').text(bargaining);//已砍掉的钱
        //$('#phone').text(result.data.phone);//手机号

        //    进度条
        var sumPrice = originalPrice - discountPrice;//总的需要砍掉的价格
        var rate = (bargaining * 100) / sumPrice;
        if(rate >= 100)rate = 100;
        $('.rate-inner').animate({width: rate + '%'});
    }
}
//判断是否已经砍过
function judgeBargain(){
    var onResult = judgeBargainOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainGetHelpHistoryService({'openid':opId , 'bargainId':bId} , resultProcessor);
}
function judgeBargainOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else{
        if(result.data.isDone == 0){//未砍
            $("#self").removeClass("hide");
            $("#other").addClass("hide");
        }else{//已砍
            $("#self").addClass("hide");
            $("#other").removeClass("hide");
        }
    }
}

//自砍一刀
function bargainMe(){
    var onResult = bargainMeOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainHelpBargainService({'openid':opId , 'bargainId':bId} , resultProcessor);
}
function bargainMeOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else{
        if(result.data.result == 0){
            $('#bargainSuccess').removeClass('hide');
            var price = result.data.bargainPrice / 100;
            $('#bargainPrice').text(price);//砍价金额
            $("#self").addClass("hide");
            $("#other").removeClass("hide");
            getPhoneInfo1();
            getRelationList();
        }else{
            if(result.data.result == 1){
                popBoxAlertClick('' , '您已经砍过啦~' , 'reload()');
            }else if(result.data.result == 2){
                popBoxAlertClick('' , '已被抢光啦~' , 'reload()');
            }else if(result.data.result == 3){
                popBoxAlertClick('' , '活动还未开始呢~' , 'reload()');
            }else if(result.data.result == 4){
                popBoxAlertClick('' , '活动已经结束啦~' , 'reload()');
            }else if(result.data.result == 5){
                popBoxAlertClick('' , '好友已帮您砍价成功~' , 'reload()');
            }
        }
    }
}
function reload(){
    window.location.href = 'bargain.do?op=index&a=1&aw=' + aw;
}

//获取手机详情
function getPhoneInfo1(){
    var onResult = getPhoneInfo1OnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainGetRecordInfoService({'bargainId':bId} , resultProcessor);
}
function getPhoneInfo1OnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else{
        //结束日期
        $('#now').text(getCurrentDate(result.data.endtime));
        //手机图片
        var imgurl = result.data.imgurl;//产品图片
        if (imgurl != "") {
            $("#goodImg").attr("src" , imgurl);
        }else {
            $("#goodImg").attr("src" , "img/bargain/sj1213001.png");
        }
        //手机信息
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
        $('.discountPrice').text(discountPrice);//折扣价
        $('#discountRate').text(result.data.discountRate);//折扣率
        $('.bargainNum').text(result.data.bargainNum);//帮砍价人数
        //var bargainPrice = result.data.bargainPrice / 100;//砍掉后的现价
        //var remainBargain = bargainPrice - discountPrice;
        //$('#remainBargain').text(remainBargain);//砍价后，还剩余要砍的钱
        var bargaining = (result.data.originalPrice - result.data.bargainPrice) / 100;
        $('#bargaining').text(bargaining);//已砍掉的钱

        //    进度条
        var sumPrice = originalPrice - discountPrice;//总的需要砍掉的价格
        var rate = (bargaining * 100) / sumPrice;
        if(rate >= 100)rate = 100;
        $('.rate-inner').animate({width: rate + '%'});
    }
}
function fresh(){
    var temp = new Date();
    temp = temp.getTime();
    window.location.href = getRootUrl() +  'bargain.do?op=index&a=1&aw=' + aw + '&t=' + temp;
}