/**
 * Created by wq on 2016/10/12.
 */

document.body.addEventListener('touchstart', function () { });

function judgeState(){
    //活动是否结束  0-活动进行中，1-未开始，2-已结束 9-活动未开启
    if(status == 2){
        popBoxAlert('' , '活动已结束');
        return false;
    }else if(status == 1){
        popBoxAlert('' , '活动还未开始');
        return false;
    }else if(status == 9){
        popBoxAlert('' , '活动未开启');
        return false;
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
function limitWord1(str , num){
    var objLength = str.length;
    if(objLength > num){
        str = str.substring(0 , num) + '...';
    }
    return str;
}

//限制字数显示
function splitStr(str , n){
    if(str.length > n){
        str = str.substring(0 , n) + "...";
    }
    return str;
}
//过去的时间
function timeOut(end , begin){
    var time = end - begin;
    var str;
    if(time < 60){
        str = '刚刚';
    } else if(time >= 60 && time < 60*60){
        str = parseInt(time / 60) + '分钟前';
    } else if(time >= 60*60 && time < 24*60*60){
        str = parseInt(time / (60*60)) + '小时前';
    } else if(time >= 24*60*60 && time < 30*24*60*60){
        str = parseInt(time / 24*60*60) + '天前';
    } else if(time >= 30*24*60*60 && time < 12*30*24*60*60){
        str = parseInt(time / 30*24*60*60) + '月前';
    } else{
        var bTime = new Date(begin);
        str = bTime.getYear() + '年' + (bTime.getMonth()+1) + '月' + bTime.getDay() + '日';
    }
    return str;
}

//判断图片是横图还是竖图
function judgeImg(img){
    var w = img.width();
    var h = img.height();
    if(w >= h){//横图
        img.css('height' , 100+'%');
        img.css('width' , 'auto');
    }else{
        img.css('width' , 100+'%');
        img.css('height' , 'auto');
    }
}

//上拉到底部然后加载
//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }
    else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}