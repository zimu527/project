/**
 * Created by ruyz on 2016/6/15.
 */
/*var HEIGHT = $('.transaction').height();
$(window).resize(function() {
	$('.transaction').height(HEIGHT);
});*/
wxShare(reservationTitle , reservationDesc , reservationImg , reservationUrl);
$(function(){
//  判断活动是否开始
    if(status==1){//未开始
        popBoxAlert("","活动未开始！");
    }else if(status==2){
        popBoxAlert("","来晚了~活动结束了！ ");
    }
	//给出表单里name和phone默认值
	$("input[name='name']").val(requestRealname);
	$("input[name='phone']").val(requestPhone);
    //更换产品时，切换说明内容及图片
    $('#selectForReservation').change(function(e){
        var oLis = $('.detail li');
        oLis.addClass('hide');
        var x=Number($("#selectForReservation option:selected").attr("name"));
        oLis.eq(x-1).removeClass('hide');
    });
});
//添加下拉框序号
$(document).ready(function(){
    //题目序号
	var options = $('select option');
    for(var i=0;i<options.length;i++){
    	options.eq(i).attr('name',i+1);
    }
});
//显示预约办理部分，隐藏预约说明部分
function gotoTransact(){
    $(".reservation").hide();
    var productName=$("#selectForReservation option:selected").text();
    $("#productName").text(productName);//更改产品名
    $(".transaction").show();
}
//隐藏预约办理部分，显示预约说明部分
function gotoReservation(){
	$(".reservation").show();
	$(".transaction").hide();
	//window.location.reload(true);
}
//获取办理预约的参数
var prodId;
var name;
var tel;
var addr;
var bookingTime;
var remark;
function reservation(){
    hiddenBox('confirm');
    prodId=$("#selectForReservation option:selected").val();
    name=$("input[name='name']").val();
    tel=$("input[name='phone']").val();
    addr=$("input[name='address']").val();
    bookingTime=$("input[name='time']").val();
    remark=$("textarea").val();

    if(name==''||name==undefined) {
        popBoxAlert("错误提示", '请填写您的姓名');
        return;
    }
    if(name.length > 10){
        popBoxAlert("小提示" , "姓名的最大长度为10，请重新输入");
        return false;
    }
    if(tel==''||tel==undefined){
        popBoxAlert("错误提示",'请填写您的电话号码');
        return;
    }else if(tel.length != 11){
        popBoxAlert("错误提示",'请填写正确的电话号码');
        return;
    }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(tel))){
        popBoxAlert("错误提示",'请填写正确的电话号码');
        return;
    }
    if(addr==''||addr==undefined){
        popBoxAlert("错误提示",'请填写您的地址');
        return;
    }
    if(addr.length > 50){
        popBoxAlert("小提示" , "地址的最大长度为50，请重新输入");
        return false;
    }
    if(bookingTime != ''){
    	var nowTime=new Date();
    	nowTime=nowTime.getTime();
    	bookingTime=_getDate(bookingTime);
		if(bookingTime<=nowTime){ 
			alert("预约时间必须大于系统时间！"); 
			return; 
	    }
    } 
    if(remark != ''){
    	if(remark.length > 100){
    		popBoxAlert("小提示",'备注信息不能超过100字');
    		 return;
    	}
    }
    comfirmPopBox('小提示','提交后不可修改，您确定提交吗？','BookingProduct()');
}

function BookingProduct(){
    hiddenBox('confirm');
    _showPopBoxById("loadingToast");//loading
	var onResult = BookingProductOnResult;
	var resultProcessor = {
	    'onResult':onResult
	};
	BWFRI.BookingProductService({'openid':opId, 'prodId': prodId, 'name': name, 'tel': tel, 'addr': addr, 'bookingTime': bookingTime, 'remark': remark} , resultProcessor);
}
function BookingProductOnResult(result){
    hiddenBox("loadingToast");//hide loading
    if(result.code != 0){
        if(result.code==1){
            popBoxAlert("","不给力  刷新重试");
        }else if(result.code==2){
            popBoxAlert("","粉丝信息不存在，请从公众号菜单进入");
        }else if(result.code==3){
            popBoxAlert("","未绑定手机号");
        }else{
            popBoxAlert("","不给力  刷新重试");
        }
        return false;
    }else{
        if(result.data.result==0){
        	popBoxAlert("","您已成功办理预约");
        }else if(result.data.result==1){
        	popBoxAlert("","来早啦~活动还未开始呢，持续关注哈");
        }else if(result.data.result==2){
        	popBoxAlert("","来晚了~活动结束了！");
        }
    	gotoReservation();
        $(".transaction input").val('');
        $(".transaction textarea").val('');
    }
}
/**
 * 转换日期格式
 * @param {} _date  时间  格式为 2013-3-10
 */
function _getDate(_date) {
	var tmp = _date.split("-");
	var y = parseInt(tmp[0], 10);
	var m = parseInt(tmp[1], 10) - 1;
	var t = parseInt(tmp[2], 10);
	var d = new Date(y, m, t);
	d.setDate(d.getDate());

	return d.getTime();
}
