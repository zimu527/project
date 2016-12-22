/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-10-29 16:41:31
 * @version $Id$
 */
$(document).ready(function(){


	var ww = $(window).width();
	var wh = $(window).height();
	$('.pic>p').css('width', Math.floor(0.65*ww) + 'px')
				.css('height', Math.floor(0.65*ww*165 / 401)*0.52 + 'px')
				.css('font-size', '18px')
				.css('padding-top', Math.floor(0.65*ww*165 / 401)*0.48 + 'px');

	// music
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

	// 文本行高度
	var h = $('.receiveBtn2').height();
	$('.receiveBtn1').css('height', h*80% + 'px');

	// btn_know height
	var bw = $('.receiveBtn3').width();
	$('.receiveBtn3').css('height', Math.floor(bw*6/17) + 'px');

	$("#partnerTopList").click(function(){
		var url = "partner.do?op=partnerTopPage";
		window.location.href = url;
	});
	
	//2.13. 用户中奖信息查询
    getPartnerAwardInfo();
    
});

function backHistroy(){
	history.back();
}

function gotoLqcg(){
	
	var mobile = $("#mobileId").val();
	if (mobile.length == 0) {
		alert('请输入手机号码！');
		$("#mobileId").focus();
		return false;
	}
	if (mobile.length != 11) {
		alert('请输入有效的手机号码！');
		$("#mobileId").focus();
		return false;
	}
	var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (!reg.test(mobile)) {
		alert('请输入有效的手机号码！');
		$("#mobileId").focus();
		return false;
	} 
	
	getPartnerAwardObtain();
}

function getPartnerAwardInfo(){
	
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	
    var onResult = getPartnerAwardInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerAwardInfoService({'pid':pid, 'openid':openid} , resultProcessor);
}
function getPartnerAwardInfoOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
        $("#awardId").text('1g流量领取');
        var receiveBtn3 = document.getElementsByClassName('receiveBtn3')[0];
        receiveBtn3.addEventListener('touchstart', function(){
			receiveBtn3.style.backgroundImage="url('img/partner/back_p.png')";
		});
		receiveBtn3.addEventListener('touchend', function(){
			receiveBtn3.style.backgroundImage="url('img/partner/back_n.png')";
		});
		var receiveBtn = document.getElementsByClassName('receiveBtn')[0];
		receiveBtn.style.display='none';
		var word_lqrq = document.getElementsByClassName('word_lqrq')[0];
		word_lqrq.style.display='block';
		
		$("#tel").text('1313133213');
		$("#time").text('16-12-11');
    }else {
    	//已领取
    	if(result.data.gotten){
    		$("#awardId").text(result.data.award+'已领取');
            var receiveBtn3 = document.getElementsByClassName('receiveBtn3')[0];
            receiveBtn3.addEventListener('touchstart', function(){
    			receiveBtn3.style.backgroundImage="url('img/partner/back_p.png')";
    		});
    		receiveBtn3.addEventListener('touchend', function(){
    			receiveBtn3.style.backgroundImage="url('img/partner/back_n.png')";
    		});
    		var receiveBtn = document.getElementsByClassName('receiveBtn')[0];
    		receiveBtn.style.display='none';
    		var word_lqrq = document.getElementsByClassName('word_lqrq')[0];
    		word_lqrq.style.display='block';
    		
    		$("#tel").text(result.data.phone);
    		$("#time").text(result.data.atime);
    	}else{
    		$("#awardId").text(result.data.award);
    	}
    	getPartnerAwardList();
    }
}

//2.12. 用户最佳组合列表获取
function getPartnerAwardList(){
	
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
        for( var i=0; i<1; i++){
            $("#rankId").text(1);
            $("#scoreId").text(100);
            
            $("#partnerAId").text('a');
            $("#partnerBId").text('b');
            
            $("#partnerAImgId").attr('src','img/partner/hytx.png');
            $("#partnerBImgId").attr('src','img/partner/hytx.png');
            
            $("#partnerAscoreId").text('45');
            $("#partnerBscoreId").text('55');
            
        }
        
    }else {
        if(result.data.gamelist.length){
        	for( var i=0; i<1; i++){
                $("#rankId").text(result.data.gamelist[i].rank);
                $("#scoreId").text(result.data.gamelist[i].scores);
                
                $("#partnerAId").text(result.data.gamelist[i].a.name);
                $("#partnerBId").text(result.data.gamelist[i].b.name);
                
                $("#partnerAImgId").attr('src',result.data.gamelist[i].a.imageurl);
                $("#partnerBImgId").attr('src',result.data.gamelist[i].b.imageurl);
                
                $("#partnerAscoreId").text(result.data.gamelist[i].a.score);
                $("#partnerBscoreId").text(result.data.gamelist[i].b.score);
            }
        }
    }
}

//2.14. 用户奖励领取
function getPartnerAwardObtain(){
	
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	var phone = $("#phone").val();
	
    var onResult = getPartnerAwardObtainOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerAwardObtainService({'pid':pid, 'openid':openid, 'phone':phone} , resultProcessor);
}
function getPartnerAwardObtainOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
    	//已领取
    	if(result.data.result=='0'){
    		alert('领取成功！');
    		getPartnerAwardInfo();
    	}else{
    		alert('领取失败！');
    	}
    }
}