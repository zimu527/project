/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-02 23:04:35
 * @version $Id$
 */

$(document).ready(function(){
    //2.12. 用户最佳组合列表获取
	getPartnerTopList();
//	getPartnerAwardService();
});

function back() {
    var mback = document.getElementById('mback');
    history.back();
}

function gotoReceive(){
	 //var url = "receive.vm";
	var pid = $("#pid").val();
    var url = "partner.do?op=receive&pid=" + pid;
    window.location.href = url;
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

// 调用该方法时为有数据的时候跳转到最佳搭档
function haveData(){
    $('body').css('backgroundImage', 'none');
    $('div.noData').css('display', 'none');
    $('.haveData').css('display', 'block');
}

// 调用该方法时为没有数据的时候跳转邀请页面
function noData(){
    $('.haveData').css('display', 'none');
    $('div.noData').css('display', 'block');
}

function gotoFX(){
    $('#boxHiddenFX').css('display', 'block');
}

function closeFX(){
    $('#boxHiddenFX').css('display', 'none');
}

function drawInLeft(){
	var pid = $("#pid").val();
	var url = "partner.do?op=drawInLeft&pid=" + pid;
    window.location.href = url;
}
//2.14. 用户是否有奖励
function getPartnerAwardService(){
	
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	
    var onResult = getPartnerAwardServiceResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerAwardService({'pid':pid, 'openid':openid} , resultProcessor);
}
function getPartnerAwardServiceResult(result){
    if(result.code != 0){
    	$("#lqjl").css("display","none");
        //alert('不给力，刷新重试~');
    }else {
        if(result.data.awardflag){
        	$("#lqjl").css("display","block");
        }else{
        	$("#lqjl").css("display","none");
        }
    }
}

function getPartnerTopList(){
	
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	
    var onResult = getPartnerTopListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerATopListService({'pid':pid, 'openid':openid} , resultProcessor);
}
function getPartnerTopListOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
        //测试数据start
        haveData();
        var htmls="";
        for( var i=1; i<=10; i++){
            	if(i<=3){
            		htmls =htmls+ "<div class='list"+i+"'>";
            	}else{
            		htmls =htmls+ "<div class='list4'>";
            	}
            	htmls = htmls + "<div class='listleft'>"
            	              + "<img src=img/partner/back.png>"
            	              + "<span>"+"少昵称字段"+"</span>"
            	              + "</div>"
            	              + "<div class='listmid'>"
            	              + "<span>"+i+"</span>"
            	              + "</div>"
            	              + "<span class='listscore'>"+88.88+"分</span>"
            	              + "<div class='listright'>"
            	              + "<img src=img/partner/back.png>"
            	              + "<span>"+"少昵称字段"+"</span>"
            	              + "</div>"
            	              + "</div>";
            }
            $("#list").html(htmls);
            //测试数据end
    }else {
        if(result.data.gamelist.length>0){
        	haveData();
        	var htmls="";
            for( var i=1; i<=result.data.gamelist.length; i++){
            	if(i<=3){
            		htmls =htmls+ "<div class='list"+i+"'>";
            	}else{
            		htmls =htmls+ "<div class='list4'>";
            	}
            	htmls = htmls + "<div class='listleft'>"
            	              + "<img src="+result.data.gamelist[i-1].a.imageurl+">"
            	              + "<span>"+result.data.gamelist[i-1].a.name+"</span>"
            	              + "</div>"
            	              + "<div class='listmid'>"
            	              + "<span>"+result.data.gamelist[i-1].rank+"</span>"
            	              + "</div>"
            	              + "<span class='listscore'>"+result.data.gamelist[i-1].scores+"分</span>"
            	              + "<div class='listright'>"
            	              + "<img src="+result.data.gamelist[i-1].b.imageurl+">"
            	              + "<span>"+result.data.gamelist[i-1].b.name+"</span>"
            	              + "</div>"
            	              + "</div>";
            }
            $("#list").html(htmls);
        }else{
            noData();
        }
    }
    
    // getPartnerTopList完成之后再执行getPartnerAwardService！
    getPartnerAwardService();
}

