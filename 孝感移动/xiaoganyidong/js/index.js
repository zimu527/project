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

    //奥运名人堂
    var swiper = new Swiper('#star-swiper', {
    	nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: 1//这里需要确保至少有一个滚动的
    });

    //完全奖杯榜中点击查看全部
    var lastTrophyHeight = 0;
    $('#trophy-more').click(function(e){
    	e.preventDefault();

    	var listDom = $('.trophy-list');

    	if(!lastTrophyHeight){
	    	lastTrophyHeight = listDom.height();
	    	$(this).text('点击收起…');
	    	var h = 32 + 33 * listDom.find('tbody tr').length;//这里32，33分别为标头和每行的高度
    		listDom.animate({'height': h});
    	}else{
    		$(this).text('点击查看全部…');
    		listDom.animate({'height': lastTrophyHeight});
    		lastTrophyHeight = 0;
    	}
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



})();

//返回顶部
    $("#m-goTop").click(function() {
        //alert('')
        $("html,body").animate({scrollTop:0}, 500);
    });

//倒计时
var interval = 1000;
function ShowCountDown(){
    var endTime= new Date('2016/08/6 7:00:00');
    var nowTime = new Date();
    var t =endTime.getTime() - nowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    d=Math.floor(t/1000/60/60/24);
    h=Math.floor(t/1000/60/60%24);
    m=Math.floor(t/1000/60%60);
    s=Math.floor(t/1000%60);
    if(d<10) d='0'+d;
    if(h<10) h='0'+h;
    if(m<10) m='0'+m;
    if(s<10) s='0'+s;
    var cc = $("#countdown-time");
    cc.find($(".countdown-day")).text(d);
    cc.find($(".countdown-hour")).text(h);
    cc.find($(".countdown-minute")).text(m);
    cc.find($(".countdown-second")).text(s);
}
//window.setInterval(function(){ShowCountDown();}, interval);

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