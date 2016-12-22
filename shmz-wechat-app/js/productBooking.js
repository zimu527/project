/**
 * Created by wq on 2016/8/17.
 */
/*var HEIGHT = $('.transaction').height();
 $(window).resize(function() {
 $('.transaction').height(HEIGHT);
 });*/

var area = [];
var areaName = [];
var parentId = [];
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
    //判断是否显示区域这一块 并且下拉框显示
    getArea();
});

function getArea(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getAreaOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BookingGetAreaListService({'pid':productId} , resultProcessor);
}
function getAreaOnResult(result) {
    hiddenBox("loadingToast");//hide loading
    if (result.code != 0) {
        popBoxAlert("", "不给力  刷新重试");
    } else {
        if(result.data.areaList.length){
            for(var i=0; i<result.data.areaList.length; i++){
                if(result.data.areaList[i].parentId == -1){
                    var newOption = $('<option value='+ result.data.areaList[i].areaId +' pid='+ result.data.areaList[i].parentId+'>'+ result.data.areaList[i].areaName +'</option>');
                    $('#areaA').append(newOption);
                }else{
                    area.push(result.data.areaList[i].areaId);
                    areaName.push(result.data.areaList[i].areaName);
                    parentId.push(result.data.areaList[i].parentId);
                }
            }
        }else {
            $('#area').addClass('hide');
        }
    }
}

function addAreaB(){
        $('#areaB').empty();
        $('#areaB').append('<option></option>');
        for(var j=0; j<area.length; j++){
            if($('#areaA option:selected').attr('value') == parentId[j]) {
                var newOptionB = $('<option value='+ area[j] +' pid='+ parentId[j] +'>'+ areaName[j] +'</option>');
                $('#areaB').append(newOptionB);
            }
        }
}
//办理预约
var name;
var tel;
var areaId;
var addr;
var bookingTime;
var remark;
function reservation(){
    name = $("input[name='name']").val();
    tel = $("input[name='phone']").val();
    addr = $("input[name='address']").val();
    bookingTime = $("input[name='time']").val();
    remark = $("textarea").val();

    if(name==''||name==undefined) {
        popBoxAlert("错误提示", '请填写您的姓名');
        return false;
    }
    if(name.length > 10){
        popBoxAlert("小提示" , "姓名的最大长度为10，请重新输入");
        return false;
    }
    if(tel==''||tel==undefined){
        popBoxAlert("错误提示",'请填写您的电话号码');
        return false;
    }
    if(tel.length != 11){
        popBoxAlert("错误提示",'请填写正确的电话号码');
        return false;
    }
    if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(tel))){
        popBoxAlert("错误提示",'请填写正确的电话号码');
        return false;
    }
    if(!$('#area').hasClass('hide')){
        areaId = $("#areaB option:selected").val();
        if(areaId == '') {
            popBoxAlert("错误提示", '请填写您所在的区域');
            return false;
        }
    }
    if(addr==''||addr==undefined){
        popBoxAlert("错误提示",'请填写您的详细地址');
        return false;
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
    BWFRI.BookingProductService({'openid':opId, 'prodId': productId, 'name': name, 'tel': tel, 'area':areaId , 'addr': addr, 'bookingTime': bookingTime, 'remark': remark} , resultProcessor);
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
    }else{
        if(result.data.result==0){
            popBoxAlert("","您已成功办理预约");
        }else if(result.data.result==1){
            popBoxAlert("","来早啦~活动还未开始呢，持续关注哈");
        }else if(result.data.result==2){
            popBoxAlert("","来晚了~活动结束了！");
        }
        $(".transaction input").val('');
        $("#areaA option:first-child").attr('selected' , 'selected');
        $('#areaB').html('<option></option>');
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
