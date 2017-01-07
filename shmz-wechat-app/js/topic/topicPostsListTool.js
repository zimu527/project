/**
 * Created by Administrator on 2016/12/14.
 */
//取窗口滚动条高度
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
//取文档内容实际高度
function documentHeight(){
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}
//获取页面浏览器视口的高度
function windowHeight(){
    //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
    return (document.compatMode == "CSS1Compat")?
        document.documentElement.clientHeight:
        document.body.clientHeight;
}
//显示隐藏回到顶部按钮>>>>>>>>>>>>>>>>>>>>>>>>>
$(window).scroll(function() {
    var domHeight=documentHeight();
    var scrollHeight=getScrollTop();
    var w_s_height = window.screen.height ;
    // 当滚动超过窗口高度时，加载下一页
    if (scrollHeight>w_s_height) {
        $('.go-top').show();
    }else {
        $('.go-top').hide();
    }
});
$('.go-top').click(function(){
    $('body,html').animate({scrollTop:0},500);
});

/*字数限制*/
$("#area").on("input propertychange", function() {
    var $this = $(this),
        _val = $this.val(),
        count = "";
    if (_val.length > 300) {
        $this.val(_val.substring(0, 300));
    }
    count =$this.val().length;
    $("#text-count").text(count);
});
//上传图片
var images = {
    localId: [],  //选定照片的本地ID列表
    serverId: []  //图片的服务器端ID
};

var upImgCount = 3;//总共可以上传照片张数
//添加照片
function addImg(){
    if(images.serverId.length == "undefined" || images.serverId.length == null || images.serverId.length == ""){
        images.serverId.length = 0;
    }
    if(upImgCount - images.serverId.length <= 0){
        popBoxAlert("" , "只能上传3张照片哟~");
        return false;
    }
    //拍照或从手机相册中选图接口
    wx.chooseImage({
        count: upImgCount - images.serverId.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            images.localId = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

            var i = 0;
            var length = images.localId.length;

            var upload = function(){
                wx.uploadImage({
                    localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        images.serverId.push(res.serverId);

                        var pic = $('<div class="post-line post-line-min"><img src="img/topic/line.png" alt=""></div>'+
                            '<div class="post-img-box"><img class="imgX" src="img/topic/x0607.png">' +
                            '<img class="post-img2" src="'+ images.localId[i] +'"></div>'+
                            '<div class="post-line post-line-min"><img src="img/topic/line.png" alt=""></div>');
                        pic.appendTo('.post-img-list2');
                        if(upImgCount - images.serverId.length>0){
                            $('.canUpPicNum').text(upImgCount - images.serverId.length);
                            $('.canUpPicNum-box').show();
                        }else {
                            $('.canUpPicNum-box').hide();
                        }
                        $(".post-img2").each(function(i){
                            var img = $(this);
                            var realWidth;//真实的宽度
                            var realHeight;//真实的高度
                            $("<img/>").attr("src", $(img).attr("src")).load(function() {
                                realWidth = this.width;
                                realHeight = this.height;
                                if(realWidth<realHeight){
                                    img.addClass('post-img-long');
                                }else {
                                    img.addClass('post-img-wide');

                                }
                            });
                        });

                        i++;
                        if(i < length){
                            upload();
                        }
                    },
                    fail: function () {
                        popBoxAlert("" , "上传失败");
                    }

                });
            };
            upload();
            $(".imgX").click(function(){
                $(this).parent(".post-img-box").hide();
                var picSrc = $(this).next("img").attr("src");
                for(var j=0; j<images.serverId.length; j++){
                    if(picSrc == result.data.picUrl + images.serverId[j]){
                        images.serverId.splice(j , 1);
                        return false;
                    }
                }
            });
        }

    });
}
//时间显示
//js函数代码：字符串转换为时间戳
function getDateTimeStamp(dateStr){
    return Date.parse(dateStr.replace(/-/gi,"/"));
}
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
function getDateDiff(dateTimeStamp){
    var now = new Date().getTime();
    console.log(now);
    var date = new Date(dateTimeStamp);
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
        result='';
    }else{
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(weekC>=1){
            result="" + date.getFullYear()+'-'+(date.getMonth()+1) + "-"+date.getDay();
        }else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }else if(hourC>=1){
            result=""+ parseInt(hourC) +"个小时前";
        }else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
            result="刚刚发表";
    }
    return result;
}
//显示大图
$(document).ready(function(){//设置类名为.min-img
    var initWindowWithIMGAndShow = function( src ){
        $('.window img').attr('src',src);
        $('.window').addClass('window-show');
    };
    $('.min-img').click(function(){
         //alert('kkk');
        var src = this.src;
        initWindowWithIMGAndShow( src );

    });
    $('.cloes-tag').click(function(){
        //alert('gg');
        $('.window').removeClass('window-show');
    });
});
//削字
function GetLength(str,x){//50个字
    var realLength=0;
    var newStr="";
    for(var i=0; i<str.length; i++) {
        var charCode=str.charCodeAt(i);
        if(charCode>=0 && charCode<=128){
            realLength+=1;
        }else{
            realLength+=2;
        }
        if(realLength<=x){
            newStr+=str[i];
        }else{
            newStr+="...";
            break;
        }
    }
    return newStr;
}
//单位转换
function unitConversion(data) {
    if (isNaN(data)) {
        data = Number(data);
    }
    if (data > 10000) {
        data = (data / 1000).toFixed(2) + '万';
    }
    return data;
}
//返回上一页
$('#goBack').click(function(){
    window.history.back(-1);
})
