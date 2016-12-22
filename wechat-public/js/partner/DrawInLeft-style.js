/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-28 16:08:36
 * @version $Id$
 */
$(document).ready(function(){
	var ww = $(window).width();
	var wh = $(window).height();

	var r = 60;
	// 按钮
	var h = $('.btn_base').width();
	$('.btn_base').css('height', Math.floor(17*h/30) + 'px');
	// 玩法介绍
	var hh = $('.howtoplay').width() / 4;
	$('.howtoplay').css('height', hh + 'px');
	// 画心部分
	$('#huakuang').css('width', 2.25 * r * 2 + 2);//60是radius
	$('#huakuang').css('height', (2.5 + Math.sqrt(2)) * r);

	$(window).resize(function () {          //当浏览器大小变化时
	    var ww = $(window).width();
	    var wh = $(window).height();
	    if (wh > ww) {
	    	$('#palette, .words>p').css('font-size', 16 + 'px');
	    	$('#palette>p.defen').css('font-size', 14 + 'px');
	    	$('.btn').css('width', '80%');
	    }else {
	    	$('#palette, .words>p').css('font-size', Math.floor(ww/wh * 16)*0.8 + 'px');
	    	$('#palette>p.defen').css('font-size', Math.floor(ww/wh * 14)*0.8 + 'px');
	    	$('.btn').css('width', '54%');
	    }
	    hh = $('.howtoplay').width() / 4;
	    $('.howtoplay').css('height', hh + 'px');
	});
	
	$("#howtoplay").click(function(){
		var pid = $("#pid").val();
		var url = "partner.do?op=introduce&pid=" + pid; 
		window.location.href = url;
	});
	
	$("#paihangbang").click(function(){
		var pid = $("#pid").val();
		var url = "partner.do?op=paihangbang&pid=" + pid;
		window.location.href = url;
	});
	
});

