$(function(){
	$(".nav_wd a").on('click',function(){
				$(".nav_wd a").removeClass("active");
				$(".common_wd").hide();
				$(this).addClass("active");
				$(".common_wd[id='"+$(this).attr("name")+"']").show();
			})
});
