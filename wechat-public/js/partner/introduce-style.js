/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-29 20:31:53
 * @version $Id$
 */
$(document).ready(function(){
	var ww = $(window).width();
	var wh = $(window).height();
	$('.pic>p').css('width', Math.floor(0.5486*ww) + 'px')
				.css('height', Math.floor(0.5486*ww*165 / 401)*0.55 + 'px')
				.css('padding-top', Math.floor(0.5486*ww*165 / 401)*0.45 + 'px');
	var h = $('.btn_base').width();
	$('.btn_base').css('height', Math.floor(17*h/30) + 'px');
	if (wh > ww) {
		$('body').css('font-size', 16 + 'px');
	}else {
		$('body').css('font-size', Math.floor(ww/wh * 16)*0.8 + 'px');
	}

	$(window).resize(function () {          //当浏览器大小变化时
	    var ww = $(window).width();
	    var wh = $(window).height();
	    $('.btn').css('width', '100%');
	    var bw = $('#box>div>.btn_base').width();
	    $('#box>div>.btn_base').css('height', bw*6/17 + 'px');
	    if (wh > ww) {
	    	$('body').css('font-size', 16 + 'px');
	    }else {
	    	$('body').css('font-size', Math.floor(ww/wh * 16)*0.8 + 'px');
	    }
	});
	
	$("#DrawInLeft").click(function(){
		var pid = $("#pid").val();
		var url = "partner.do?op=drawInLeft&pid=" + pid;
		window.location.href = url;
	});
	
});
