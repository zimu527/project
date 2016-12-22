/**
 * Created by wq on 2016/8/29.
 */

wxShare(channelTitle , channelDesc , channelImg , channelUrl);
document.body.addEventListener('touchstart', function () { });//解决移动端active失效的问题
$(document).ready(function(){
    if( name != "" || tel != ""){//非第一次参与的粉丝
        $('#fansInfo').removeClass('whiteWin');
        $('#uName').addClass('hide');
        $('#uTel').addClass('hide');
    }
    //1订阅号  0服务号
    if(uType == 0){
        $('#fansInfo').attr('action' , '');
    }else{
        $('#fansInfo').attr('action' , '');
    }
});

function getChannel(){
    if( name == "" && tel == "") {//粉丝  显示输入框
        var uName = $('#uName').val();
        var uTel = $('#uTel').val();
        if(uName == '' || uName == undefined) {
            popBoxAlert("错误提示", '请填写您的姓名');
            return false;
        }
        if(uName.length > 10){
            popBoxAlert("小提示" , "姓名的最大长度为10，请重新输入");
            return false;
        }
        if(uTel == '' || uTel == undefined){
            popBoxAlert("错误提示",'请填写您的电话号码');
            return false;
        }
        if(uTel.length != 11){
            popBoxAlert("错误提示",'请填写正确的电话号码');
            return false;
        }
        if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(uTel))){
            popBoxAlert("错误提示",'请填写正确的电话号码');
            return false;
        }
    }else{
        $('#uName').val(name);
        $('#uTel').val(tel);
    }
    //window.formChannel.submit();
}
