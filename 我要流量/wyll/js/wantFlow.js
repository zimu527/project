
var browserVersion = navigator.userAgent.toLowerCase();
var w_s_width = window.screen.width ;
var w_s_height = window.screen.height ;

/*
在PC上模拟的移动浏览器上面，不能用innerWidth 这样每次刷新获取到innerWidth 不一样
但是在mobile端要用innerHeight才不至于将浏览器工具栏计算进去。
*/
if( browserVersion.indexOf('ucbrowser') >= 0 ||
browserVersion.indexOf('qqbrowser') >= 0 ||
browserVersion.indexOf('micromessenger') >= 0  ){
    w_s_width = window.innerWidth ;
    w_s_height = window.innerHeight;
    }

//这里有一个问题是低版本的chrome内核微信上面不能用innerSize来计算
//只能用screenSize减去浏览器头部的值
//头部的值默认取73，当然不同的手机不同的浏览器上面这个值不同，这里可能会是以后需要常修改的地方
if( browserVersion.indexOf('android') >= 0 ){
    var cvIdx = browserVersion.indexOf('chrome/');
    var cVersion = parseInt(browserVersion.substring(cvIdx+7,cvIdx+9)) || 0;
    //浏览器头部高度，暂时没有发现非73高度的浏览器，后期如果需要更改可以根据浏览器的版本确定该高度的值
    var browserHeaderHeight = 73;
    if(cVersion > 0 && cVersion < 34){
    w_s_width = window.screen.width;
    w_s_height = window.screen.height - browserHeaderHeight ;
    }
    }

var w_o_width = 750,w_o_height = 1206;

var opercent = w_o_width / w_o_height;
var wpercent = w_s_width / w_s_height;

var w_scale = (w_s_width / w_o_width).toFixed(4);
var h_scale = (w_s_height / w_o_height).toFixed(4);

var i_scale = (opercent > wpercent) ? w_scale : h_scale;
var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute('content', 'width=device-width, minimum-scale='+i_scale+',maximum-scale='+i_scale+', initial-scale='+i_scale+', user-scalable=no');

$(window).bind("load resize", function () {
    d();
    });
function d () {
    var c = 750;
    var i = 1206;
    var g = $(window).height() * 1;
    var f = $(window).width() * 1;
    var s = (g - i) / 2+'px';
    var m = (f - c) / 2+'px';
    $(".contentBg").css("width",f).css("height", g);
    if(opercent > wpercent){
    $(".contentBg_img").css("height",'100%');
    }else{
    $(".contentBg_img").css("width",'100%');
    }
    }
