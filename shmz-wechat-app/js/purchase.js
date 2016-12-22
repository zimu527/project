/**
 * Created by Administrator on 2016/11/2.
 */
/*1. start|接口部分*/
//1.1 购买流量(支付)
function purchaseTraffic () {
    $("#purchasePopBoxConfirm").hide();//隐藏确认弹窗
    _showPopBoxById('loadingToast');
    var productId=$('input[type="radio"]:checked').val();
    var num = $("input[type='number']").val();
    var onResult = purchaseTrafficOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TrafficRedOrderService({'openid':opId,'activityId':activityId,'productId':productId,'num':num} , resultProcessor);
}
function purchaseTrafficOnResult(result) {
    hiddenBox('loadingToast');//隐藏loading
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        if(result.data.result==0){
            window.location.href='trafficred.do?op=paymentFlowSucc&t='+result.data.trafficredId+'&a='+activityId;
        }else if(result.data.result==2){
            changeAlert(3);
            $('.footer-alert').show();
        }else{
            showAlertPopBox('支付失败！');
        } 
    }    
}

//1.2 拆红包
function trafficRedBonus(){
    _showPopBoxById('loadingToast');
    var onResult = trafficRedBonusOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TrafficRedBonusService({'openid':opId,'a':a} , resultProcessor);
}
function trafficRedBonusOnResult(result) {
    hiddenBox('loadingToast');
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        if(result.data.result==1){
            changeAlert(5);
            $('.footer-alert').show();
        }else if(result.data.result==2){
            changeAlert(4);
            $('.footer-alert').show();
        }else if(result.data.result==5){
            changeAlert(7);
            $('.footer-alert').show();
        }else if(result.data.result==3){
            //$('#redBox').hide();
            $("#redEnvelopesRule").hide();
            $("#expiredBox").show();//显示红包已过期
        }else if(result.data.result==0||result.data.result==4){
            $('#redBox').hide();
        	$("#openRedBox").show();
            $('#getTrafficNum').text(result.data.flowValue?result.data.flowValue:'0');
            $('#useDeadline').text(result.data.useExpiryDate?dateToStr(result.data.useExpiryDate):'');
            $('#phone').text(result.data.tel?result.data.tel:'');
        }else{
            showAlertPopBox('不给力，刷新重试~');
        }
    }
}

//1.3 获取购买红包列表
var giveRedList;
function getGiveRedList(){
    _showPopBoxById('loadingToast');
    var onResult = getGiveRedListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TrafficRedGiveRedService({'openid':opId,'activityId':activityId} , resultProcessor);
}
function getGiveRedListOnResult(result) {
    hiddenBox('loadingToast');
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
    	giveRedList=result.data.giveRedList;
        creatList(giveRedList,1,'trafficred_size');
    }
}
//1.3.2 获取红包详情列表,更换分享地址，重新调用微信分享
function goDetail(x){
    creatList(giveRedList[x],2,'flowSize');
    preWxShare(giveRedList[x].gurl);
}
//1.3.2.2
function preWxShare(shareUrl){
    wxUrl=shareUrl;// 分享链接
	//分享接口    
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	shareTimeLine();
	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
	shareFriend();
}
//1.4 获取我抢到的红包列表
function getGrapRedList(){
    _showPopBoxById('loadingToast');
    var onResult = getGrapRedListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TrafficRedReceiveRedService({'openid':opId,'activityId':activityId} , resultProcessor);
}
function getGrapRedListOnResult(result) {
    hiddenBox('loadingToast');
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        creatList(result.data.receiveRedList,3,'flowSize');
    }
}
/*end|接口部分*/

/*2. start|绘制列表与数据填充*/
//2.1 绘制红包列表
function creatList(list,type,name){//type:1,我买的流量包；2,流量包明细；3,我抢到的流量包
    if(type==1){
        $('#trafficNum').text(sumTraffic(list,name));
    }else if(type==2){
        $('#trafficNum').text(sumTraffic(list,name));
    }else if(type==3){
        $('#trafficNum').text(sumTraffic(list,name));
    }
	var main=$('.main');
    main.text('');
    if(list){
    	if(list.length!=undefined&&list.length>0){//购买红包列表或者发红包列表存在   		
            if(type==1){//已购买流量红包
    			var oListBox=$('<div class="red-envelopes-list all-padding1"></div>');//创建列表父级div
                for(var i=0;i<list.length;i++){
                    var oList=$('<div class="list-div goDetails" onclick=\"goDetail('+i+')\"></div>');
                    var oLeftBox=$('<div class="list-left-box"><span class="name">流量红包</span><p class="min-font">'+dateToStr(list[i].giveTime)+'</p></div>');
                    if(list[i].status!=0){
                        var oRightBox=$('<div class="list-right-box"><span class="yellow">'+list[i].trafficred_size+'MB</span>' +
                            '<p class="min-font"><span class="white">已过期</span> <span>'+list[i].qnum+'/'+list[i].fnum+'个</span></p></div>');
                    }else{
                        var oRightBox=$('<div class="list-right-box"><span class="yellow">'+list[i].trafficred_size+'MB</span>' +
                            '<p class="min-font"><span>'+list[i].qnum+'/'+list[i].fnum+'个</span></p></div>');
                    }
                    oLeftBox.appendTo(oList);
                    oRightBox.appendTo(oList);
                    oList.appendTo(oListBox);
                }
                oListBox.appendTo(main);
            }else if(type==3){//我抢到的红包列表
    			var oListBox=$('<div class="red-envelopes-list all-padding1"></div>');//创建列表父级div
                for (var j = 0; j < list.length; j++) {
                    var oList = $('<div class="list-div"></div>');
                    var oLeftBox = $('<div class="list-left-box"><span class="name">'+ list[j].giveNickname +
                        '</span><p class="min-font">' + dateToStr(list[j].receiveTime) + '</p></div>');
                    var oRightBox = $('<div class="list-right-box"><span class="yellow">' + list[j].flowSize + 'MB</span></div>');
                    oLeftBox.appendTo(oList);
                    oRightBox.appendTo(oList);
                    oList.appendTo(oListBox);
                }
                oListBox.appendTo(main);     
            }    		
    	}else{
    		if(type==2){//如果是红包明细，则显示红包已抢、剩余等说明文字
                if(list.status!=0){
                    var oP=$('<p class="min-font center min-red-desc" id="min-red-desc">该红包已过期，共'+list.fnum+'个，已抢'+list.qnum+'个，过期'+(list.fnum-list.qnum)+'个</p>');
                }else{
                    var oP=$('<p class="min-font center min-red-desc" id="min-red-desc">共'+list.fnum+'个，已抢'+list.qnum+'个，剩余<span class="red">'+(list.fnum-list.qnum)+'</span>个</p>');
                }
                oP.appendTo(main);
                if (list.receiveRedList&&list.receiveRedList.length>0) {//绘制明细列表
    				var oListBox=$('<div class="red-envelopes-list all-padding1"></div>');//创建列表父级div
                    for (var j = 0; j < list.receiveRedList.length; j++) {
                        var oList = $('<div class="list-div"></div>');
                        var oLeftBox = $('<div class="list-left-box"><span class="name">'+ list.receiveRedList[j].giveNickname +
                            '</span><p class="min-font">' + dateToStr(list.receiveRedList[j].receiveTime) + '</p></div>');
                        var oRightBox = $('<div class="list-right-box"><span class="yellow">' + list.receiveRedList[j].flowSize + 'MB</span></div>');
                        oLeftBox.appendTo(oList);
                        oRightBox.appendTo(oList);
                        oList.appendTo(oListBox);
                    }
                    oListBox.appendTo(main);
                    if(list.status==0&&list.qnum<list.fnum){//添加继续发红包按钮
                        var oBtn=$('<div class="submit-btn-bg"><div class="purchase-btn shadow red-bg" id="goToGiveRedEnvelopes" onclick="showMask()">继续发流量红包</div></div>');
                        oBtn.appendTo(main);
                    }
                }else{
                    $(".show-man").show();//显示背景人物图片
                    var oBtn=$('<div class="submit-btn-bg"><div class="purchase-btn shadow red-bg" id="goToGiveRedEnvelopes" onclick="showMask()">去发流量红包</div></div>');
                    oBtn.appendTo(main);//添加发红包按钮
                }
                var oBtn1=$('<div class="submit-btn-bg"><div class="purchase-btn shadow red-bg" id="goToPurchase" onclick="goBack()">返回</div></div>');
                oBtn1.appendTo(main);//添加返回按钮
            }else{
    	        //main.hide();
    	        $(".show-man").show();//显示背景人物图片
    	        if(type==1){//购买流量包为空
    	            var oBtn=$('<div class="submit-btn-bg"><div class="purchase-btn shadow red-bg" id="goToPurchase" onclick="goToPurchase()">去购买流量红包</div></div>');
    	            oBtn.appendTo(main);//添加购买红包按钮
    	        }
    	    }
    	}        
    }else{
        //main.hide();
        $(".show-man").show();//显示背景人物图片
        if(type==1){//购买流量包为空
            var oBtn=$('<div class="submit-btn-bg"><div class="purchase-btn shadow red-bg" id="goToPurchase" onclick="goToPurchase()">去购买流量红包</div></div>');
            oBtn.appendTo(main);//添加购买红包按钮
        }
    }
    var bgMargin=$('<div class="bgMargin"></div>');
    bgMargin.appendTo(main);
}

//2.2 更换弹窗内容
function changeAlert(status) {
    if(status==1){
        changeAlertCont('bq4.png','活动还没开始哦~','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==2){
        changeAlertCont('bq5.png','本次活动已结束！','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==9){
        changeAlertCont('bq4.png','本次活动还未上线哦~','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==3){
        changeAlertCont('bq1.png','流量红包购买次数已用完！','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==4){
        changeAlertCont('bq2.png','你抢太多次了，<br>留点流量给别人抢吧~','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==5){
        changeAlertCont('bq3.png','红包已抢完，下次再来吧~','查看更多活动','','activityConcentration.html');
        return false;
    }else if(status==6){
        changeAlertCont('write.png','请先填资料，<br>再购买流量包~','马上填写资料','go-register','trafficred.do?op=buyFlow&a='+activityId);
        return false;
    }else if(status==7){
        changeAlertCont('write.png','请先填资料，<br>再来抢流量包~','马上填写资料','go-register','trafficred.do?op=grabRedEnvelopeLink');
        return false;
    }
}
//2.2.2 更换弹窗内容
function changeAlertCont(imgName,p,btn,className,url){
    $(".alert-box-cont").addClass(className);
    $(".alert-box-cont").find('p').html(p);
    $(".alert-box-cont").find('.more-btn').text(btn);
    $(".alert-box-cont").find('.more-btn').attr('href',url);
    $(".alert-box-cont").find('.alert-box-headerImg img').attr('src','img/purchaseTraffic/'+imgName);
}
/*end|绘制列表与数据填充*/

/*3 start|按钮点击效果与弹窗部分*/
//3.1 隐藏提示弹出层/弹窗
$("#ruleBoxClose").click(function(){
    $("#activeRule").hide();//隐藏活动规则弹出层
});
$('#alertBoxClose').click(function(){
    $("#footerAlert").hide();//隐藏更多活动、去注册弹出层
});
$('#purchasePopBoxAlert').click(function(){
    $(this).hide();//隐藏提示弹窗
});
$('#purchaseConfirmCancelBtn').click(function(){
    $("#purchasePopBoxConfirm").hide();//隐藏确认弹窗
});
$(".share-mask").click(function(){//隐藏分享引导
    $(this).hide();
});
function showMask(){
    $(".share-mask").show();//隐藏分享引导
}

//3.2 首页按钮与弹出层
$("#showRuleBtn").click(function(){
    $("#activeRule").show();
    $('body,html').animate({scrollTop:0},100);
    return false;
});
$("#indexPurchaseBtn").click(function(){//购买并赠送流量红包
    checkStatus();
    if(flag) window.location.href='trafficred.do?op=buyFlow&a='+activityId;
});
$("#purchaseListBtn").click(function(){//跳转到我赠送的流量红包页
    window.location.href='trafficred.do?op=giveFlowList&a='+activityId;
});
$("#grabListBtn").click(function(){//跳转到我抢到的流量红包页
    checkStatus();
    window.location.href='trafficred.do?op=robFlowList&a='+activityId;
});

//3.3 订购页点击购买按钮效果
$("#purchaseBtn").click(function() {//确认购买流量按钮
    var redType = $("input[type='radio']:checked").val();
    var number = $("input[type='number']").val();
    if (redType == '' || redType == undefined) {
        showAlertPopBox('请选择红包类型！');
        return false;
    }
    if (number == '' || number == undefined) {
        showAlertPopBox('请填写红包个数！');
        return false;
    } else if (isNaN(number)) {
        showAlertPopBox('请填写有效的红包个数！');
        return false;
    } else if (number>redMax) {
        showAlertPopBox('红包个数不能多于'+redMax+'个');
        return false;
    } else if (number<redMin) {
        showAlertPopBox('红包个数不能少于'+redMin+'个');
        return false;
    }else{
        $('#purchaseConfirmAgreeBtn').one(
            'click',function(){
                purchaseTraffic();//调用支付接口
            }
        );
        showConfirmPopBox($('#confirmBoxCont').text());
    }
});

//3.4 订购页输入框获取焦点效果
$('input[type="number"]').focus(function(){
    $(this).attr('placeholder','');
});

//3.5 点击分享好友显示遮罩
$("#ShareRedEnvelopes").click(function(){
    showMask();
});

//3.6 红包页点击拆红包
$('#openEnvelopes').click(function(){//打开红包
    trafficRedBonus();//调用接口
});
//3.7红包列表点击去购买
function goToPurchase(){
    window.location.href='trafficred.do?op=buyFlow&a='+activityId;
}
//3.8刷新页面
function goBack(){
	window.location.href=window.location.href+"&id="+10000*Math.random();
}
/* end|按钮点击效果与弹窗部分*/

/*4 start|其他方法*/
//4.1 判断是否活动正在进行，是否为注册会员
var flag;
function checkStatus(){
    if(status!=0) {
        flag = false;
        changeAlert(status);
        $('.footer-alert').show();
    }else{
        if(member!=1){
            changeAlert(6);
            $('.footer-alert').show();
        }else{
            flag=true;
        }
    }
}

//4.2 显示、隐藏提示弹窗
function showAlertPopBox(cont){
    $('#purchaseAlertMessageCont').text(cont);
    $('#purchasePopBoxAlert').show();
}
function showConfirmPopBox(cont){
    $('#purchaseConfirmMessageCont').text(cont);
    $('#purchasePopBoxConfirm').show();
}

//4.3按照浏览器宽度、图片宽高比，计算图片高度
function setHeight(){
    var browserVersion = navigator.userAgent.toLowerCase();
    var w_s_width = window.screen.width ;
    var w_s_height = window.screen.height ;

    if( browserVersion.indexOf('ucbrowser') >= 0 ||
        browserVersion.indexOf('qqbrowser') >= 0 ||
        browserVersion.indexOf('micromessenger') >= 0  ){
        w_s_width = window.innerWidth ;
        w_s_height = window.innerHeight;
    }

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
    var img_height=h/w*w_s_width;
    $("."+className).css(attr,img_height+'px');
}

//4.4 计算流量总和
function sumTraffic(list,trafficred_size){
    if(list){
        for(var i=0;i<list.length;i++){
            var sumTraffic=0;
            sumTraffic+=parseInt(list[i][trafficred_size]);
        }
        return sumTraffic;
    }else{
        return 0;
    }
}

//4.5 日期显示
function dateToStr(datetime){
    var datetime=new Date(datetime);
    var year = datetime.getFullYear();
    var month = datetime.getMonth()+1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();
    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    if(hour <10){
        hour = "0" + hour;
    }
    if(minutes <10){
        minutes = "0" + minutes;
    }
    if(second <10){
        second = "0" + second ;
    }
    var time = year+"-"+month+"-"+date;
    console.log(time);
    return time;
}
//4.6 显示隐藏box
function _showPopBoxById(id){
    $("#"+id).removeClass("hide");
}
function hiddenBox(id){
    $("#"+id).addClass("hide");
}
//4.7 解决IOS下:active无效
document.body.addEventListener('touchstart',function(){});

