/**
 * Created by ruyz on 2016/10/13.
 */
//分享
var discountUrl = getShareUrl();//获取当前页面地址
wxShare(discountTitle , discountDesc , discountImg , discountUrl);

$(document).ready(function(){
    getDiscountList(campusCode);
});

//对整个表分页
var theTable = $(".discount-list");//数据主体
var numberRowsInTable;//数据总行数
var pageSize = 5;//每一页的数据行数
var page = 1;
//获取活动列表
function getDiscountList(campusCode){
	_showPopBoxById("loadingToast");//loading
    var onResult = getDiscountListOnResult;
    var resultProcessor = {
         'onResult':onResult
    };
    BWFRI.DiscountGetListService({'campusCode':campusCode,'activityId':activityId} , resultProcessor);
}
function getDiscountListOnResult(result) {
	hiddenBox("loadingToast");//loading
    if(result.code != 0){
    	popBoxAlert("",'不给力，刷新重试~');
    }else {
    // 新建整个表
    var oTable = $('.discount-list');
    oTable.empty();
    if(result.data.discountList){
        for (var i = 0; i < result.data.discountList.length; i++) {
            var oLi = $('<li><a id="'+result.data.discountList[i].id+'" href="'+result.data.discountList[i].url+'"><span class=\"discount-title\">' +
                GetLength(result.data.discountList[i].title,30) + '</span><img src="'+result.data.discountList[i].imgUrl+'"alt=\"logo\"></a></li>');
            oLi.appendTo(oTable);
        }
    }
    numberRowsInTable = $(".discount-list").find('li').length;//数据总行数
    console.log('数据总行数'+numberRowsInTable);

    //显示用户吸粉列表的首页
    onlyFirstPage();
     }
}
//下一页
function next(){
    $('.returnBtn').remove();
    currentRow = pageSize * page;
    maxRow = currentRow + pageSize;
    if ( maxRow > numberRowsInTable ) maxRow = numberRowsInTable;//尾页
    for ( var i = currentRow; i< maxRow; i++ ){
        $(".discount-list").find('li').eq(i).show(280);
    }
    page++;
    if ( maxRow == numberRowsInTable ) { //尾页只显示上一页按钮
        //$('.btn').remove();
        var hasNo = $('<div class="returnBtn fs16">(○^～^○) 没有啦~</div>');
        $('.cont').append(hasNo);
    }else{
        showNextBtn();
    }
}

//只显示首页数据   隐藏除了首页数据的表格
function onlyFirstPage(){
    //alert("ff")
    if ( pageSize < numberRowsInTable){//有多页数据
        console.log('数据总行数'+numberRowsInTable);
        for ( var i = pageSize; i<numberRowsInTable; i++ ){
            $(".discount-list").find('li').eq(i).addClass('hide');
        }
        showNextBtn();
    }
}
function showNextBtn(){
    var btnNext = $('<div class="returnBtn fs16" onclick="next()">点击查看更多</div>');
    $('.cont').append(btnNext);
}

//取窗口滚动条高度
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
//取文档内容实际高度
function getScrollHeight(){
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}
$(window).scroll(function() {
    var domHeight=getScrollHeight();
    var w_s_height = window.screen.height ;
    // 当滚动超过窗口高度时，加载下一页
    if (getScrollTop()>w_s_height) {
    	next();
    }else{

    }
});
//削字
function GetLength(str,x){
    var realLength=0;
    var newStr="";
    for(var i=0; i<str.length; i++) {
        var charCode=str.charCodeAt(i);
        if(charCode>=0 && charCode<=128){
            realLength+=1;
        }else{
            realLength+=2;
        }
        if(realLength<=x){
            newStr+=str[i];
        }else{
            newStr+="...";
            break;
        }
    }
    return newStr;
}