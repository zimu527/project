/**
 * Created by Administrator on 2016/10/15.
 */
var overlordUrl = getRootUrl()+"exam.do?op=index&a="+activityId;//获取首页地址
wxShare(overlordTitle , overlordDesc , overlordImg , overlordUrl);
$(document).ready(function(){
    examGetLastTop();
    var getHomeUrl='exam.do?op=index&a='+activityId;
    $('.startAnswer-btn').attr('href',getHomeUrl);
	var mainHeight=$('.main').height();
	var w_s_width = window.screen.width ;
	var w_s_height = window.screen.height ;
	var headerImg_height=448/720*w_s_width;
	var mainImg_height=w_s_height-headerImg_height;
	if(mainHeight<mainImg_height){
		$('.main').height((mainImg_height+10)+'px');
		$('html,body').css('overflow','hidden');
	}
});
//学霸排行榜
function examGetLastTop(){
	_showPopBoxById("loadingToast");//loading
    var onResult = examGetLastTopOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ExamGetLastTopService({'activityId':activityId} , resultProcessor);
}
function examGetLastTopOnResult(result) {
	hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("",'不给力，刷新重试~');
    } else{
    	  if(result.data.nameList&&result.data.nameList.length!=undefined) {
	        var nameList=result.data.nameList;
	        var examTop=$(".rank-list");
	        var oUl=$('<ul></ul>');       
	        for(var i=0;i<nameList.length;i++){
	        	 var oLi=$('<li>第'+(i+1)+'名<i class="name">'+nameList[i]+'</i></li>');
	        	 oLi.appendTo(oUl);        	 
	        }
	        oUl.appendTo(examTop);
	        $('.studentNum').text(nameList.length);
      	}else{
      		$(".rank-list").css('border','none');
      		$('.Congratulations').html("还未到放榜时间，<br>活动结束后再来查看哦~");
      		$('.go-home').css('padding-top','2rem');
      	}
    }
}
