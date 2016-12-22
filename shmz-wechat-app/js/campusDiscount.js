/**
 * Created by ruyz on 2016/10/8.
 */ 
//分享
var campusUrl = getShareUrl();//获取当前页面地址
wxShare(campusTitle , campusDesc , campusImg , campusUrl);

//判断活动是否正在进行
function checkStatusUnable(){
    if(status==1){//未开始
        popBoxAlert("","活动未开始！");
        return false;
    }else if(status==2){
        popBoxAlert("","来晚了~活动结束了！ ");
        return false;
    }else if(status==9){
      popBoxAlert("","活动未启用!");
      return false;
    }
}

//对整个表分页
var theTable = $(".campus-list");//数据主体
var numberRowsInTable;//数据总行数
var pageSize = 10;//每一页的数据行数
var page = 1;
//获取学校列表
function getCampusList(){
	_showPopBoxById("loadingToast");//loading
    var onResult = getCampusListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.DiscountGetCampusListService({'openid':opId,'activityId':activityId} , resultProcessor);
}
function getCampusListOnResult(result) {
	hiddenBox("loadingToast");//loading
    if(result.code != 0){
    	popBoxAlert("",'不给力，刷新重试~');
    }else {
        // 新建整个表
        var oTable = $('.campus-list');
        oTable.empty();
        if(result.data.discountCampusList){
            for (var i = 0; i < result.data.discountCampusList.length; i++) {
                var oLi = $('<li><a href="discount.do?op=discountList&c='+result.data.discountCampusList[i].code+'&a='+activityId+'"><img class=\"campus-logo\" src="'
                    +result.data.discountCampusList[i].logoUrl+'" alt=\"\">'+result.data.discountCampusList[i].name + '<img class=\"goDiscountList\" src=\"img/discount/xyyh1018001.png\" alt=\"\"></a></li>');
                oLi.appendTo(oTable);
            }
            $("<p>(○^～^○) 没有啦~</p>").appendTo(oTable);
        }else{
          $('<p class="stip">╮(╯▽╰)╭ 近期没有活动哟~</p>').appendTo(oTable);
        }
        numberRowsInTable = $(".campus-list").find('li').length;//数据总行数
        console.log('数据总行数'+numberRowsInTable);
    }
    //myScroll.refresh();
    setHeight();
}
//自定义滚动条
$(".campus-list").slimScroll({
  width: 'auto', //可滚动区域宽度
  height: '100%', //可滚动区域高度
  size: '0', //组件宽度
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

/*var myScroll = null;
window.onload = function() {
	getCampusList();
	myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true ,preventDefault:false});
	
};*/
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
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
	var headerImg_height=338/720*w_s_width;
	
	var mainImg_height=w_s_height-headerImg_height-5;
	$("#wrapper").css("height",(mainImg_height-40)+'px');
	$(".cont").css("height",mainImg_height+'px');
}



