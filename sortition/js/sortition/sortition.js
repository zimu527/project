$(document).ready(function() {
    //判断活动是否已结束或未开始
     if (status == 1) {
        popBoxAlert("", "来早啦！活动还未开始呢！");
     } else if (status == 2) {
        popBoxAlert("", "来迟了！活动结束，下次再来吧");
     }
 });
$(document).ready(function(){
    setHeight();
});
$(window).on('resize',function(){
    setHeight();
});
$('.btn').on('click',function(){
    getData();
});
$(".share-mask").click(function(){//隐藏分享引导
    $(this).hide();
});
//form提交
function getData(){
    var username = $('input[name="username"]').val();
    var tel = $('input[name="tel"]').val();
    if(username == undefined || username == null || username == ""){
        popBoxAlert("提示",'请填写您的姓名！');
        return false;
    }
    if(username.length>5){
        popBoxAlert("提示",'姓名的长度不能超过5个字哦~');
        return false;
    }
    if(tel == "undefined" || tel == null || tel == ""){
        popBoxAlert("提示",'请填写您的手机号');
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(tel))){
        popBoxAlert("提示",'请填写正确的手机号');
        return false;
    }
    //window.formAttention.submit();
    //console.log(username+','+tel+';');
    $('.btn').off('click');
    _showPopBoxById("loadingToast");//loading
    //window.location.href='sortition.html'
    window.formAttention.submit();
}
function setHeight(){
    //获取页面浏览器视口的高度
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }
    else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    var topImgHeight=378*clientHeight/1336;
    var middleImgHeight=515*clientHeight/1336;
    var bottomImgHeight=443*clientHeight/1336;
    $('.bg-img-top').height(topImgHeight);
    $('.btn-list').css('top',(topImgHeight+bottomImgHeight));
    $('.cont').css('top',(topImgHeight+15));
    $('.bg-img-middle').height(middleImgHeight);
    $('.bg-img-bottom').height(bottomImgHeight);
    //alert(w_s_height)
}


