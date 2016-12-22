// JavaScript Document
document.body.addEventListener('touchstart', function () { });
$(".conH").css("min-height" , ($("html").height() - $("#top").height() - $("#info").height()) + "px");
var voteUrl = getRootUrl() + "vote.do?op=index&v=" + voteId;//获取当前页面地
if(ti == 'undefined' || ti == null || ti == "" || de == 'undefined' || de == null || de == "" || im == 'undefined' || im == null || im == ""){
	wxShare(voteTitle , voteDesc , voteImg , voteUrl); //微信分享调用
}else{
	wxShare(ti , de , im , voteUrl);
}


$(document).ready(function(){
	showDetail(optionId);
});

//2.16. 获取投票选项详情
function showDetail(optionId){
	_showPopBoxById("loadingToast");//loading
	var onResult = showDetailOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteOptionDetailService({'optionId':optionId} , resultProcessor);
}

function showDetailOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("",result.message);
		$('#btnVote').removeAttr('onClick');
		$('#btnVote').css('background' , '#dcdcdc');
		return false;
	}
	$("#deTitle").html(result.data.detail.oTitle);
	$("#deSerialNum").html(result.data.detail.oNum);
	$("#deVoteNum").html(result.data.detail.oZnum);
	$("#deDesc").text(result.data.detail.oDesc);
	for(var i=0; i<result.data.detail.oPicture.length; i++){
		var img = $("<img class='imgWidth100 voteImg' src='"+result.data.picUrl + result.data.detail.oPicture[i]+"'>");
		$("#btnVote").before(img);
	}
	
}

//2.11. 单选投票   点击投票按钮
function vote(){
	_showPopBoxById("loadingToast");//loading
	var onResult = voteOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteSingleService({'openid':opId , 'voteId':voteId , 'optionId':optionId} , resultProcessor);
}
function voteOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		if(result.code == 1){
			popBoxAlert("","参数不全或不合法");
			return false;
		}
		if(result.code == 4){
			popBoxAlert("","不给力  刷新重试");
			return false;
		}
		return false;
	}else{
		if(result.data.result == 0){
			popBoxAlert("","投票成功");
			var currentVote = Number($("#deVoteNum").html());
			currentVote += 1;
			$("#deVoteNum").html(currentVote);
			return false;
		}
		if(result.data.result == 1){
			popBoxAlert("","您不是粉丝");
			return false;
		}
		if(result.data.result == 2){
			popBoxAlert("","您不是会员");
			return false;
		}
		if(result.data.result == 3){
			popBoxAlert("","今天您的投票数已用完");
			return false;
		}
		if(result.data.result == 4){
			popBoxAlert("","今天给TA投了好多次了  明天再来哟");
			return false;
		}
		if(result.data.result == 5){
			popBoxAlert("","活动期间您的总投票数用完啦");
			return false;
		}
		if(result.data.result == 6){
			popBoxAlert("","来早啦~活动还未开始呢，持续关注哈");
			return false;
		}
		if(result.data.result == 7){
			popBoxAlert("","来晚啦~投票活动已经结束");
			return false;
		}
	}
}