/**
 * Created by Administrator on 2016/10/15.
 */
var overlordUrl = getShareUrl();//获取当前页面地址
wxShare(overlordTitle , overlordDesc , overlordImg , overlordUrl);

if(studentNum!=''){
	$('#studentNum').text(studentNum);
}else{
    $('#studentNum').text("0");
}
if(socialNum!=''){
	$('#socialNum').text(socialNum);
}else {
    $('#socialNum').text("0");
}

$(document).ready(function(){
    //按人数比例展示进度条
    studentNum=parseInt(studentNum);
    socialNum=parseInt(socialNum);
    var proportionWidth=$(".proportion").width();
    if((studentNum+socialNum)>0){
        var proportionRedWidth=proportionWidth*studentNum/(studentNum+socialNum);
        $(".proportion-red").css("width",proportionRedWidth);    	
    }else{
    	$(".proportion-red").hide();
    }
    var getRankUrl='exam.do?op=getTop&a='+activityId;
    $('.rank-btn').attr('href',getRankUrl);

    //    判断活动是否开始
    if(status==1){//未开始
    	popBoxAlert("","活动未开始！");
        $('.startAnswer-btn').on('click',function(){
            popBoxAlert("","活动未开始！");
        });
    }else if(status==2){
    	popBoxAlert("","今日是放榜日，答题请于明日赶早！");
        $('.startAnswer-btn').on('click',function(){
            popBoxAlert("","今日是放榜日，答题请于明日赶早！");
        });
    }else if(status==9){
        popBoxAlert("","活动未启用！ ");
        $('.startAnswer-btn').on('click',function(){
            popBoxAlert("","活动未启用！");
        });
    }else{
        var startAnswerUrl='exam.do?op=doExam&a='+activityId;
        $('.startAnswer-btn').attr('href',startAnswerUrl);

        $("#studentNum").text(studentNum);
        $("#socialNum").text(socialNum);
    }
    $(".rule-btn").click(function(){//查看活动规则
        $(".active-rule").show();
    });
    $(".share-btn").click(function(){//显示分享引导
        $(".share-mask").show();
    });
    $(".share-mask").click(function(){//隐藏分享引导
        $(this).hide();
    });
    $(".close-icon").click(function(){//隐藏活动规则
        $(".active-rule").hide();
    });
    $(".active-info").slimScroll({
        width: 'auto', //可滚动区域宽度
        height: '100%', //可滚动区域高度
        size: '8px', //组件宽度
        color: '#e6bc10', //滚动条颜色
        distance: '0px', //组件与侧边之间的距离
        start: 'top', //默认滚动位置：top/bottom
        opacity: 1, //滚动条透明度
        alwaysVisible: true, //是否 始终显示组件
        disableFadeOut: false, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
        railVisible: true, //是否 显示轨道
        railColor: '#fff', //轨道颜色
        railOpacity: 1, //轨道透明度
        railDraggable: true, //是否 滚动条可拖动
        wrapperClass: 'slimScrollDiv', //外包div类名
        allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
        wheelStep: 50, //滚轮滚动量
        touchScrollStep: 200, //滚动量当用户使用手势
        borderRadius: '7px', //滚动条圆角
        railBorderRadius: '7px' //轨道圆角
    });
});

document.body.addEventListener('touchstart', function () { });
