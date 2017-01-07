/**
 * Created by wq on 2016/10/12.
 */

document.body.addEventListener('touchstart', function () { });

function judgeState(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束 9-活动未开启
    if(status == 2){
        popBoxAlert('' , '活动已结束');
    }else if(status == 1){
        popBoxAlert('' , '活动还未开始');
    }else if(status == 9){
        popBoxAlert('' , '活动未开启');
    }else {
        return true;
    }
}
//转换时间戳为2016-9-17
function formatDate(time){
    var myDate = new Date(time);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    return year + '-' + month + '-' + day;
}
//时间戳转换成四位时间10:10
function formatTime(time){
    var myDate = new Date(time);
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    return hours + ':' + minutes;
}
//转换时间戳为2016-9-17 10:10:10
function formatDateTime(time){
    var myDate = new Date(time);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
//    限制字数
function limitWord(obj , num){
    obj.each(function () {
        var objString = $(this).text();
        var objLength = objString.length;
        if(objLength > num){
            objString = $(this).text(objString.substring(0 , num) + '...');
        }
    });
}