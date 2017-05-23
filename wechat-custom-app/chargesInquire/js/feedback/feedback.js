/**
 * Created by ruyz on 2016/10/12.
 */
//轮播图
var swiperSlideList=$(".swiper-slide");//必须在插件外部获取，否则受插件影响不能取得正确个数
(function () {
/*    var ratioOfPic = 2 / 1//滚动图图片宽高比例
    $('.home-banner img,.group-img>img').css('height', parseInt($('body').width() / ratioOfPic));*/

    //顶部轮播图
    var swiper = new Swiper('#home-swiper', {
        pagination: '.swiper-pagination',
        paginationClickable: true,//值为true时,点击分页器的指示点时会发生Swiper
        loop: true,
        autoplay: 3000,//自动切换的时间间隔(单位ms),不设定该参数slide不会自动切换。
        autoplayDisableOnInteraction: false//用户操作swiper之后,是否禁止autoplay。
    });
    if(swiperSlideList.length<=1){//只有一张图时，不显示滚图效果
        swiper.stopAutoplay();
        $(".swiper-pagination").hide();
    }
})();
$(document).ready(function(){
    $('.js-submit-btn').on('click', function(){
        FeedbackSubmit();
    });
});
//提交留言
function FeedbackSubmit(){
    var phone = $('input[name="phone"]').val();
    var name = $('input[name="name"]').val();
    var content = $('textarea[name="content"]').val();
    if(phone != "undefined" && phone != null && phone != ""){//选填
        if(!(/^1[34578]\d{9}$/.test(phone))) {
            popBoxAlert('请填写正确的手机号！');
            return false;
        }
    }
    if(name == undefined|| name==null || name == ''){
        popBoxAlert('留言人不能为空！');
        return false;
    }
    if(content == undefined|| content==null || content == ''){
        popBoxAlert('留言内容不能为空！');
        return false;
    }else if(content.length > 200){
        popBoxAlert('留言内容不能超过200字！');
        return false;
    }
    _showPopBoxById("loadingToast");//loading
    $('.js-submit-btn').off('click');
    var onResult = FeedbackSubmitOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.FeedbackSubmitService({'name':name, 'content':content, 'phone':phone, 'activityId':activityId} , resultProcessor);
}
function FeedbackSubmitOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        $('.js-submit-btn').on('click', function(){
            FeedbackSubmit();
        });
        popBoxAlert('网络不给力，刷新重试~');
    } else {
        popBoxAlert('您的留言已成功提交！');
    }
}


