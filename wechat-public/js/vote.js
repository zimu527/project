
var images = {
		localId: [],  //选定照片的本地ID列表
		serverId: []  //图片的服务器端ID
	};

document.body.addEventListener('touchstart', function () { });//解决移动端active失效的问题
var voteUrl = getRootUrl() + "vote.do?op=index&v=" + voteId;//获取当前页面地址

if(ti == 'undefined' || ti == null || ti == "" || de == 'undefined' || de == null || de == "" || im == 'undefined' || im == null || im == ""){
	wxShare(voteTitle , voteDesc , voteImg , voteUrl); //微信分享调用
}else{
	wxShare(ti , de , im , voteUrl);
}

var HEIGHT = $('#acJoin').height();
$(window).resize(function() {
	$('#acJoin').height(HEIGHT);
});

$(document).ready(function(){
	//判断活动是否已结束或未开始
	if(status == 1){
		popBoxAlert("","来早啦！活动还未开始呢！");
	}else if(status == 2){
		popBoxAlert("","来迟了！活动结束，下次再来吧");
	}
	//页面底部3个或2个按钮
	var n = $(".nav_main li").length;
	$(".nav_main").find("li").css("width" , 100/n + "%");

	//页面底部 显示全部和活动详情切换
	$(".nav_main").find("li").click(function(){
		$(this).children("div").addClass("nav_active");
		$(this).siblings("li").children("div").removeClass("nav_active");
		$("[name = 'ac']").hide();
		$("#" + $(this).attr("name")).show();
		goTop(0,0,0);
	});
	//页面中间 最新照片和投票排名切换
	$(".nav_con").find("li").click(function(){
		$(this).addClass("navCon_active");
		$(this).siblings("li").removeClass("navCon_active");
		$("[name = 'list']").hide();
		$("#" + $(this).attr("name")).show();
	});
	//2.7获取总报名数和总投票数
	getVoteInfo();
	//获取最新照片列表 绘制最新照片首页数据
	getNewList();
	//2.5获取投票报名信息   判断是否报名过
	judgeJoin();
});


//2.7. 获取总投票信息  显示总报名数和总投票数
function getVoteInfo(){
	var onResult = getVoteInfoOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteGetVoteInfoService({'voteId':voteId} , resultProcessor);
}
function getVoteInfoOnResult(result){
	if(result.code != 0){
		popBoxAlert("",result.message);
		return false;
	}
	if(typeof(result.data.voteInfo) == "undefined" || result.data.voteInfo == null || result.data.voteInfo == ""){
		$("#countJoin").html(0);
		$("#countVote").html(0);
	}else{
		//显示全部的总统计
		$("#countJoin").html(result.data.voteInfo.vZapplyNum);
		$("#countVote").html(result.data.voteInfo.vZnum);
		//活动详情的总统计
		$("#acJoinIn").html(result.data.voteInfo.vZapplyNum);
		$("#acVote").html(result.data.voteInfo.vZnum);
	}
}

//2.14. 搜索投票编号  点击搜索  
function searchVote(){
	var contestantId = $("#contestantId").val();
	contestantId = parseInt(contestantId);
	if(isNaN(contestantId)){
		popBoxAlert("","请输入数字");
		return false;
	}
	if(contestantId < 0){
		popBoxAlert("","暂无此编号ID");
		return false;
	}
	_showPopBoxById("loadingToast");//loading
	var onResult = searchVoteOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteSearchOptionService({'voteId':voteId , 'optionNum':contestantId} , resultProcessor);
}
function searchVoteOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		if(result.code == 1){
			popBoxAlert("" , "不给力  刷新重试");
			return false;
		}
		if(result.code == 4){
			popBoxAlert("" , "不给力  刷新重试");
			return false;
		}
		if(result.code == 121){
			popBoxAlert("" , "暂无此编号ID");
			return false;
		}
		if(result.code == 122){
			popBoxAlert("" , "该报名人在审核中");
			return false;
		}
		popBoxAlert("","不给力  刷新重试");
		return false;
	}
	window.location.href = "vote.do?op=detail&o="+result.data.optionId + "&v=" + voteId;
}

var page1;
var page2;

//2.6. 获取投票选项列表  绘制最新照片首页数据
function getNewList(){
	//order为1：时间降序   order为2：票数降序
	var onResult = getNewListOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteGetOptionsService({'voteId':voteId , 'order':1} , resultProcessor);
}
function getNewListOnResult(result){
	if(result.code != 0){
		popBoxAlert("",result.message);
		return false;
	}
	var listLength = result.data.optionList.length;
	if(listLength > 10){//有多页数据
		$("#new").find(".prev").hide();
		$("#new").find(".next").show();
		bulidList(0 , 10 , $("#newUlLeft") , $("#newUlRight") , result.data.optionList , result.data.picUrl);
		
		page1 = new Page(listLength , 10 , $("#newUlLeft") , $("#newUlRight") , $("#new") , result.data.optionList , result.data.picUrl);

	}else{//只有一页数据
		$("#new").find(".prev").hide();
		$("#new").find(".next").hide();
		bulidList(0 , listLength , $("#newUlLeft") , $("#newUlRight") , result.data.optionList , result.data.picUrl);
	}
	
}
var scrollH = $("#allTopImg").height() + $("#countUl").height() + $("#searchDiv").height();
$("#new").find(".prev").click(function(){
	page1.prev();
	goTop(0,0,scrollH);
});
$("#new").find(".next").click(function(){
	page1.next();
	goTop(0,0,scrollH);
});
//2.6. 获取投票选项列表  绘制排名数据
function getRankList(){
	//order为1：时间降序   order为2：票数降序
	var onResult = getRankListOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteGetOptionsService({'voteId':voteId , 'order':2} , resultProcessor);
}
function getRankListOnResult(result){
	if(result.code != 0){
		popBoxAlert("",result.message);
		return false;
	}
	var listLength = result.data.optionList.length;
	if(listLength > 10){//有多页数据
		$("#rank").find(".prev").hide();
		$("#rank").find(".next").show();
		bulidList(0 , 10 , $('#rankUlLeft') , $('#rankUlRight') , result.data.optionList , result.data.picUrl);
		page2 = new Page(listLength , 10 , $("#rankUlLeft") , $("#rankUlRight") , $("#rank") , result.data.optionList , result.data.picUrl);
	}else{//只有一页数据
		$(".prev").hide();
		$(".next").hide();
		bulidList(0 , listLength , $('#rankUlLeft') , $('#rankUlRight') , result.data.optionList , result.data.picUrl);
	}
}
$("#rank").find(".prev").click(function(){
	page2.prev();
	goTop(0,0,scrollH);
});
$("#rank").find(".next").click(function(){
	page2.next();
	goTop(0,0,scrollH);
});

//绘制最新照片和投票排名列表
function bulidList(start , end , obj1 , obj2 , data , imgRootUrl){
	obj1.empty();//清空列表
	obj2.empty();
	for(var i=start; i<end; i+=2){
		//左列表
		var firstImg = imgRootUrl + data[i].oPicture[0];
		var oLi = $("<li class='voteLi mainBg1'></li>");
		var oDiv1 = $("<div><a href='vote.do?op=detail&o="+data[i].oId+"&v="+voteId+"'><img class='imgWidth100' src="+ firstImg +"></a><div class='serialNum mainBg1'>"+ data[i].oNum +"</div></div>");
		var oDiv2 = $('<div class="voteInfo"><div class="voteInfo_left"><span>'+ data[i].oZnum +'</span>票</div><div class="voteInfo_right" id='+ data[i].oId +' onclick=\"vote(\''+ data[i].oId +'\')\">投票</div></div>');
		oLi.append(oDiv1);
		oLi.append(oDiv2);
		obj1.append(oLi);
		//右列表
		if(data[i+1] == "undefined" || data[i+1] == null || data[i+1] == ""){
		
		}else{
			var secondImg = imgRootUrl + data[i+1].oPicture[0];
			var vLi = $("<li class='voteLi mainBg1'></li>");
			var vDiv1 = $("<div><a href='vote.do?op=detail&o="+data[i+1].oId+"&v="+voteId+"'><img class='imgWidth100' src="+ secondImg +"></a><div class='serialNum mainBg1'>"+ data[i+1].oNum +"</div></div>");
			var vDiv2 = $('<div class="voteInfo"><div class="voteInfo_left"><span>'+ data[i+1].oZnum +'</span>票</div><div class="voteInfo_right" id='+ data[i+1].oId +' onclick=\"vote(\''+ data[i+1].oId +'\')\">投票</div></div>');
			vLi.append(vDiv1);
			vLi.append(vDiv2);
			obj2.append(vLi);
		}
	}

}
//投票按钮
//$(".voteInfo_right").click(function(){
//	var optionId = $(this).attr("oId");
//	vote(optionId , $(this));
//});
//2.15. 单选投票   点击投票按钮
function vote(optionId){
	_showPopBoxById("loadingToast");//loading
	var onResult = voteOnResult;
	var resultProcessor = {
		'onResult':onResult,
		'oId':optionId
		};
	BWFRI.VoteSingleService({'openid':opId , 'voteId':voteId , 'optionId':optionId} , resultProcessor);
}
function voteOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("","不给力  刷新重试");
		return false;
	}else{
		if(result.data.result == 0){
			var currentVote = parseInt($('#' + this.oId).prev(".voteInfo_left").children("span").html()) + 1;
			//currentVote = parseInt(currentVote);
			//currentVote += 1;
			$('#' + this.oId).prev(".voteInfo_left").children("span").html(currentVote);
			var countVote = parseInt($("#countVote").html()) + 1;
			$("#countVote").html(countVote);
			$("#acVote").html(countVote);
			popBoxAlertClick("" , "投票成功" , "voteSuccess()");
			return false;
		}
		if(result.data.result == 1){
			popBoxAlert("" , "您不是粉丝");
			return false;
		}
		if(result.data.result == 2){
			popBoxAlert("" , "您不是会员");
			return false;
		}
		if(result.data.result == 3){
			popBoxAlert("" , "今天您的投票数已用完");
			this.obj.attr("disabled" , "true");
			this.obj.css("background" , "#ccc");
			return false;
		}
		if(result.data.result == 4){
			popBoxAlert("" , "今天给TA投了好多次了  明天再来哟");
			return false;
		}
		if(result.data.result == 5){
			popBoxAlert("" , "活动期间您的总投票数用完啦");
			return false;
		}
		if(result.data.result == 6){
			popBoxAlert("" , "来早啦~活动还未开始呢，持续关注哈");
			return false;
		}
		if(result.data.result == 7){
			popBoxAlert("" , "来晚啦~投票活动已经结束");
			return false;
		}
	}
}
function voteSuccess(){
	$('#popBoxAlert').addClass('hide');
	var getTimestamp=new Date().getTime();
	console.log(getTimestamp);
	console.log(voteUrl);
	window.location.href = voteUrl + '&t=' + getTimestamp;
	//window.location.reload(true);
}
//2.7获取投票报名信息   判断是否报名过
function judgeJoin(){
	_showPopBoxById("loadingToast");//loading
	var onResult = judgeJoinOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteGetJoinInfoService({'voteId':voteId , 'openid':opId} , resultProcessor);
}

function judgeJoinOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("" , "不给力 刷新重试");
	}else{
		//未报名
		if(result.data.joinInfo == "undefined" || result.data.joinInfo == null || result.data.joinInfo == ""){
			$("#joined").hide();
		}else{//报过名  只展示数据，不能修改
			$("#joined").show();//展示编号和状态
			$("#userVoteNum").html(result.data.joinInfo.oNum);//编号
			var userStatus;
			if(result.data.joinInfo.delState == 1){
				userStatus = "未通过";
			}else{
				if(result.data.joinInfo.oAstatus == 1){
					userStatus = "已审核";
				}else{
					userStatus = "审核中";
				}
			}
			$("#userVoteStatus").html(userStatus);//状态
			$("#joinName").val(result.data.joinInfo.oTitle);//昵称
			$("#joinPhone").val(result.data.joinInfo.oTel);//联系方式
			$("#joinDesc").html(result.data.joinInfo.oDesc);//宣言
			$("#joinName").attr("readonly" , "true");
			$("#joinPhone").attr("readonly" , "true");
			$("#joinDesc").attr("readonly" , "true");
			//照片
			$("#addImg").hide();
			for(var i=0; i<result.data.joinInfo.oPicture.length; i++){
				var pic = $('<div class="showImg"><img class="joinImg" src="'+ result.data.picUrl + result.data.joinInfo.oPicture[i] +'"></div>');
				$("#pic").append(pic);
				images.serverId.push(result.data.joinInfo.oPicture[i]);
			}
			$("#join").remove();
		}
	}
}

//回到指定位置
function goTop(acceleration, time , scrollH) {
	acceleration = acceleration || 0.1;
	time = time || 16;
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0;
	}
	x3 = window.scrollX || 0;
	y3 = window.scrollY || 0;
	// 滚动条到页面顶部的水平距离
	var x = Math.max(x1, Math.max(x2, x3));
	// 滚动条到页面顶部的垂直距离
	var y = Math.max(y1, Math.max(y2, y3));
	// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
	var speed = 1 + acceleration;
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
	// 如果距离不为零, 继续调用迭代本函数
	if (x > 0 || y > scrollH) {
		var invokeFunction = "goTop(" + acceleration + ", " + time + ", " + scrollH + ")";
		window.setTimeout(invokeFunction, time);
	}
}

var upImgCount = 2;//总共可以上传照片张数

//添加照片
function addImg(){
	if(images.serverId.length == "undefined" || images.serverId.length == null || images.serverId.length == ""){
		images.serverId.length = 0;
	}
	if(upImgCount - images.serverId.length <= 0){
		popBoxAlert("" , "只能上传两张照片哟~");
		return false;
	}
	
	//拍照或从手机相册中选图接口
	wx.chooseImage({
		count: upImgCount - images.serverId.length, // 默认9
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
			images.localId = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

			var i = 0;
			var length = images.localId.length;
			
			var upload = function(){
				wx.uploadImage({
					localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						images.serverId.push(res.serverId);
						
						var pic = $('<div class="showImg"><img class="imgX" src="img/vote/x0607.png"><img class="joinImg" src="'+ images.localId[i] +'"></div>');
						$("#pic").append(pic);
						
						i++;
						if(i < length){
							upload();
						}
					},
					fail: function () {
						popBoxAlert("" , "上传失败");
					}
					
				});
			};
			upload();
			$(".imgX").click(function(){
				$(this).parent(".showImg").hide();
				var picSrc = $(this).next("img").attr("src");
				for(var j=0; j<images.serverId.length; j++){
					if(picSrc == result.data.picUrl + images.serverId[j]){
						images.serverId.splice(j , 1);
						return false;
					}
				}
			});
		}
		
	});
	
	
}

//2.10. 投票报名 点击参加页的提交按钮
function joinVote(){
	var name = $("#joinName").val();//昵称  标题
	var phone = $("#joinPhone").val();//手机号
	var desc = $("#joinDesc").val();//简介
	if(name == "undefined" || name == null || name == ""){
		popBoxAlert("" , "请输入昵称");
		return false;
	}
	if(name.length > 10){
		popBoxAlert("" , "姓名的最大长度为10，请重新输入");
		return false;
	}
	if(phone == "undefined" || phone == null || phone == ""){
		popBoxAlert("" , "请输入号码");
		return false;
	}
	if(phone.length != 11){
		popBoxAlert("" , "请输入正确的号码");
		return false;
	}
	if(images.serverId == "undefined" || images.serverId == null || images.serverId == ""){
		popBoxAlert("" , "请上传照片");
		return false;
	}
	if(desc == "undefined" || desc == null || desc == ""){
		popBoxAlert("" , "请输入宣言");
		return false;
	}
	if(desc.length > 100){
		popBoxAlert("" , "简介的最大长度为100，请重新输入");
		return false;
	}
	comfirmPopBox("" , "您输入的数据提交成功之后，不可修改，请再次确认您上传的数据" , "uploadVote()");
}
function uploadVote(){
	hiddenBox("confirm");
	var name = $("#joinName").val();//昵称  标题
	var phone = $("#joinPhone").val();//手机号
	var desc = $("#joinDesc").val();//简介
	_showPopBoxById("loadingToast");//loading
	var onResult = uploadVoteOnResult;
	var resultProcessor = {
		'onResult':onResult
		};
	BWFRI.VoteJoinService({'voteId':voteId , 'openid':opId , 'title':name , 'picture':images.serverId , 'desc':desc , 'tel':phone} , resultProcessor);
}
function uploadVoteOnResult(result){
	hiddenBox("loadingToast");//loading
	if(result.code != 0){
		popBoxAlert("" , "不给力 刷新重试");
	}else{
		if(result.data.result == 1){
			popBoxAlert("" , "投票活动不存在");
			return false;
		}
		if(result.data.result == 2){
			popBoxAlert("" , "投票不支持报名参与");
			return false;
		}
		if(result.data.result == 3){
			popBoxAlert("" , "来晚啦~投票活动已经结束");
			return false;
		}
		if(result.data.result == 0){
			popBoxAlert("" , "报名成功");
			$("#joined").show();
			$("#userVoteNum").html(result.data.oNum);
			var userStatus;
			if(result.data.oAstatus == 1){
				userStatus = "已审核";
			}else if(result.data.oAstatus == 0){
				userStatus = "审核中";
			}
			$("#userVoteStatus").html(userStatus);
			$("#joinName").attr("readonly" , "true");
			$("#joinPhone").attr("readonly" , "true");
			$("#joinDesc").attr("readonly" , "true");
			$("#addImg").hide();
			$(".imgX").hide();
			$("#join").remove();
			return false;
		}
	}
}
