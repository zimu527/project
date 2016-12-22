/**
 * Created by Administrator on 2016/12/7.
 */
var title = '圣诞手机大折扣';//分享标题
var desc = '4折华为手机等你抢。赶紧来参与吧。';//分享简介
var img = getRootUrl() +  'img/bargain/kk1612070023.jpg';//分享图片
var url = getRootUrl() +  'bargain.do?op=index&a=1&aw='+aw;
wxShare(title , desc , img , url);
document.body.addEventListener('touchstart',function(){});
//提交手机号
function getData(){
    var phone = $('input[name="phone"]').val();
    if(phone == "undefined" || phone == null || phone == ""){
        popBoxAlert("提示",'请填写您的手机号');
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){
        popBoxAlert("提示",'请填写正确的手机号');
        return false;
    }
    clearInterval(timer);//停用计时器
    window.formAttention.submit();
}

//获取活动机型列表
var bestList=['best1.png','best2.png','best3.png','best4.png','best5.png','best6.png'];
function BargainGetGoodsList(){
    _showPopBoxById('loadingToast');//隐藏loading
    var onResult = BargainGetGoodsListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainGetGoodsListService({'activityId':activityId} , resultProcessor);
}
function BargainGetGoodsListOnResult(result) {
    hiddenBox('loadingToast');//隐藏loading
    if (result.code != 0) {
        alert('不给力，刷新重试~');
    } else if(result.data.goodsList&&result.data.goodsList.length!=undefined&&result.data.goodsList.length>0){
    	//alert('kk')
        $('.goods-list').html('');
        for(var i=0;i<result.data.goodsList.length;i++){
            if(i/2!=0){
                var oDiv=$('<div class="goods-box"><img class="goods-box-bg" src="img/bargain/phoneBox1.jpg" alt=""></div>');
            }else {
                var oDiv=$('<div class="goods-box"><img class="goods-box-bg" src="img/bargain/phoneBox2.jpg" alt=""></div>');
            }
            var oGoodCont=$('<div class="goods-box-cont">' +
                '<div class="goods-box-left fs12">' +
                '<div class="discount-img"><img src="img/bargain/discount.png" alt=""><span class="discount-num">'+parseInt(result.data.goodsList[i].discountRate)+'折</span></div>' +
                '<p><span class="red">'+result.data.goodsList[i].entryCount+'</span>人参与</p>' +
                '<p><span class="red">'+(result.data.goodsList[i].allStock-result.data.goodsList[i].remainCount)+'</span>人成功砍价</p>' +
                '<p>库存： <span class="red">'+result.data.goodsList[i].remainCount+'</span></p>' +
                '</div></div>');
            if(result.data.goodsList[i].imgurl!=undefined&&result.data.goodsList[i].imgurl!=null){
                var oGoodContMiddle=$('<div class="goods-box-middle"><img src="'+result.data.goodsList[i].imgurl+'"></div>');
            }else{
            	var oGoodContMiddle=$('<div class="goods-box-middle"></div>');            	
            }            
            var oGoodContRightDiv=$(
                '<div class="goods-box-right">' +
                '<img class="best" src="img/bargain/'+bestList[i]+'" alt="">' +
                '<h3 class="fs16">'+result.data.goodsList[i].name+'</h3>' +
                '<p class="fs12">原价： '+Math.ceil((result.data.goodsList[i].originalPrice)/100)+'</p>' +
                '<p class="fs16">目标： <span class="red">￥'+Math.ceil((result.data.goodsList[i].discountPrice)/100)+'</span></p>' +
                '<p class="fs12">'+result.data.goodsList[i].description+'</p></div>');
            if (result.data.goodsList[i].remainCount<1){
                var oHref=$('<a class="go-discount" href="javascript:void(0)"><img src="img/bargain/ljkj_3.png"></a>');
            }else{
                var oHref=$('<a class="go-discount" href="bargain.do?op=entryIndex&gid='+result.data.goodsList[i].id+'&aw='+aw+'"><img src="img/bargain/ljkj.png"></a>');
            }
            oHref.appendTo(oGoodContRightDiv);
            oGoodContMiddle.appendTo(oGoodCont);
            oGoodContRightDiv.appendTo(oGoodCont);
            oGoodCont.appendTo(oDiv);
            oDiv.appendTo('.goods-list');
        }
    }else{
    	//$('.activity-box').html('');
    	if($('.goods-list')) $('.goods-list').html('');
    	$('.day').text('00');

        $('.hour').text('00');
        $('.minute').text('00');
        $('.second').text('00');
        var oTip=$('<p class="tips">（＋﹏＋）今日手机已抢光!<br>明天再来抢哦~</p>');
        oTip.appendTo('header');
        clearInterval(timer);//停用计时器
    }
}

//单个活动机型详情
function showBargainDetail(){
    $('.register-cont').html('');
    if(imgurl!=''&&imgurl!=undefined){
        var oImg=$('<div class="register-cont-left"><img src="'+imgurl+'" alt=""></div>');
    }else{
        var oImg=$('<div class="register-cont-left"></div>');
    }
    var oGoodContRightDiv=$(
        '<div class="register-cont-right">' +
        '<h3 class="fs16">'+name+'</h3>' +
        '<p class="fs12">'+detail+'</p>' +
        '<p class="fs12">'+description+'</p>'+
        '<p class="fs12">原价： '+Math.ceil((originalPrice)/100)+'</p>'+
        '<p class="aim-money">目标： <span class="fs16 red">￥'+((discountPrice)/100)+'('+parseInt(discountRate).toFixed(0)+'折)</span></p>'+
        '</div>');
    oImg.appendTo('.register-cont');
    oGoodContRightDiv.appendTo('.register-cont');
}

//显示当前时间：年，月，日
function dateToStr(nowTime){
    $('.now-time').text(nowDate);
}

//倒计时
var interval = 1000;
function ShowCountDown(startTime,endTime,type){ 
    //显示倒计时
	startTimer=startTime+interval;
    var second =(endTime-startTime)/1000;
    if(second>0){
    	day = '', hour = '', minute = '';
    	if (second >= 86400) {
			day = Math.floor(second / 86400);
			second = second % (86400);
			}
		if (second >= 3600) {
			hour = Math.floor(second / 3600);
			second = second % 3600;
		}
		if (second >= 60) {
			minute = Math.floor(second / 60);
			second = second % 60;
		}
		if (second > 0) {
			second = second;
		}
		if(type==0){
			if(second<10){
				second = "0" + second;
			}
			if(hour <10){
				hour = "0" + hour;
			}
			if(minute <10){
				minute = "0" + minute;
			}
            $('.day').text(day);
            $('.hour').text(hour);
            $('.minute').text(minute);
            $('.second').text(second);
        }else{
            if(day>0){
            	hour+=day*24;
            }
            if(second<10){
                second = "0" + second;
            }
            if(hour <10){
                hour = "0" + hour;
            }
            if(minute <10){
                minute = "0" + minute;
            }
            $('.hour').text(hour);
            $('.minute').text(minute);
            $('.second').text(second);
        }
    }else{
    	$('.activity-box').html('');
    	if($('.goods-list')) $('.goods-list').html('');
    	if($('.register')) $('.register').html('');
    	if(type==0) $('.day').text('00');

        $('.hour').text('00');
        $('.minute').text('00');
        $('.second').text('00');
        var oTip=$('<p class="tips">（＋﹏＋）活动结束啦!</p>');
        oTip.appendTo('header')
            clearInterval(timer);//停用计时器
    }
}

