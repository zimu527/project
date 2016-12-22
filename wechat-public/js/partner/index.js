/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-24 11:15:15
 * @version $Id$
 */

$(document).ready(function(){
    //2.19. 绘画活动信息查询
    //getActiveInfo();

});

var time=3;

function heartbig () {
	$('#heartbig').css("display","inline-block");
	$('#heartsmall').css("display","none");
	document.getElementById('heartbig').innerHTML = time;
	time--;
	if(time>0){
		window.setTimeout(heartsmall,300);
	}else {
		window.setTimeout(gotoAuto,1000);
	}
}

function gotoAuto(){
	//var url = "introduce_formIndex.vm";
	var pid = $("#pid").val();
	var url = "partner.do?op=introducefromIndex&pid=" + pid;
	window.location.href = url;
}

function heartsmall () {
	$('#heartbig').css("display","none");
	$('#heartsmall').css("display","inline-block");
	window.setTimeout(heartbig,700);
}

function start(){
	window.setTimeout(heartbig,100);
}

function gotozjddb(){
	//var url = "partnerTopList.vm";
	var pid = $("#pid").val();
	var url = "partner.do?op=partnerTop&pid=" + pid;
	window.location.href = url;
}

function gotohdgz(){
	$('#boxHidden').css('display', 'block');
}

function closeRule(){
	$('#boxHidden').css('display', 'none');
}

var tog = true;
function playPause(){
	if (tog) {
		$('audio').trigger('pause');
		tog = false;
	}else {
		$('audio').trigger('play');
		tog = true;
	}
}

function getActiveInfo(){
	
	var pid = $("#pid").val();
	
    var onResult = getActiveInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerProjectService({'pid':pid} , resultProcessor);
}
function getActiveInfoOnResult(result){
	if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        if(result.data.ended){
        	alert('活动已结束，请进入最佳搭档榜，查看是否有奖励。');
        	return;
        }else{
        	start();
        }
    }
}