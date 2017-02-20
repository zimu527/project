(function() {

	var ratioOfPic = 2/1//滚动图图片宽高比例
	$('.home-banner img,.group-img>img').css('height', parseInt($('body').width() / ratioOfPic));

	//顶部轮播图
    var swiper = new Swiper('#home-swiper', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });

    //小喇叭点击查看全部
    var activeAllHeight = 0;
    $('#xg-active').click(function(e){
       // alert('click')
        e.preventDefault();

        var activeDom = $('#xg-active');

        if(!activeAllHeight){
            activeAllHeight = activeDom.height();
            //$(this).text('点击收起…');
            var h =$(".active-all").height();
            activeDom.animate({'height': h});
        }else{
            //$(this).text('点击查看全部…');
            activeDom.animate({'height': activeAllHeight});
            activeAllHeight = 0;
        }
    });

    //发布时间
    var liveItems=$(".live-item");
    var t2=new Date();
    for(var i=0;i<liveItems.length;i++){
        var t1=liveItems.eq(i).find(".updatetime").text();
        var updateState=getDateDiff(t1,t2);
        console.log(t1);
        console.log(t2);
        console.log(updateState)
        liveItems.eq(i).find(".update-state").text(updateState);
    }

})();

//返回顶部
    $("#m-goTop").click(function() {
        //alert('')
        $("html,body").animate({scrollTop:0}, 500);
    });

/********************
 * 取窗口滚动条高度
 ******************/
function getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
/********************
 * 取文档内容实际高度
 *******************/
function getScrollHeight()
{
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}



$(window).scroll(function() {
    var domHeight=getScrollHeight();
    // 当滚动到最底部以上100像素时， 加载新内容
    if (getScrollTop()*2>domHeight) {
        if($(".m-goTop").hasClass('hide'))
        $(".m-goTop").removeClass('hide');
        //alert('scroll')
        //$("div.navbar").css("position","fixed");
    }else{
        if(!($(".m-goTop").hasClass('hide')))
        $(".m-goTop").addClass('hide');
        //$("div.navbar").css("position","relative");//也可能是absolute等，反正就是你原来的值
    }
    /*if ($(this).scrollTop() >= 150) {
        $("div.log").css("position","fixed");
    }else{
        $("div.log").css("position","relative");//也可能是absolute等，反正就是你原来的值
    }*/
});

//隐藏底部下载栏
$(".dl-close").click(function(){
    $(".footer").hide();
});

//发布时间状态
function getDateDiff(d1,d2) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now1 = new Date(d1).getTime();
    var now2 = new Date(d2).getTime();
    var diffValue = now2 - now1;
    if (diffValue < 0) { //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = parseInt(diffValue / month);
    var weekC = parseInt(diffValue / (7 * day));
    var dayC = parseInt(diffValue / day);
    var hourC = parseInt(diffValue / hour);
    var minC = parseInt(diffValue / minute);

    if (dayC >= 1 && dayC <=7) {
        result =  parseInt(dayC) + "天前发布";
    } else if (dayC > 7) {
        result =  "一周前发布";
    } else if (hourC >= 1) {
        result =  parseInt(hourC) + "小时前发布";
    }  else if (hourC < 1) {
        result =  "刚刚发布";
    } else result = "刚刚发表";
    return result;
}