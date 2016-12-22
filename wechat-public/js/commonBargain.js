/**
 * Created by wq on 2016/10/12.
 */
document.body.addEventListener('touchstart', function () { });

//    限制字数
function limitWord(obj , num){
    obj.each(function () {
        var objString = $(this).text();
        var objLength = objString.length;
        if(objLength > num){
            objString = $(this).text(objString.substring(0 , num) + '...');
        }
    });
}
function limitWord1(str , num){
    var objLength = str.length;
    if(objLength > num){
        str = str.substring(0 , num) + '...';
    }
    return str;
}
//获取结束日期
function getCurrentDate(endtime){
    var current = new Date(endtime);
    var year = current.getFullYear();
    var month = current.getMonth() + 1;
    var day = current.getDate();
    return year+"/"+month+"/"+day;
}
//倒计时
function count(remain){
    var rH = parseInt((remain % (24*3600))/3600); //剩余小时
    var rM = parseInt((remain % 3600)/60); //剩余分钟
    var rS = parseInt(remain % 60); //剩余秒
    if(remain < 0){
        rH = "00";
        rM = "00";
        rS = "00";
    }
    $('#rH').text(rH);
    $('#rM').text(rM);
    $('#rS').text(rS);
}



//对整个表分页
var relativesBox = $("#relativesBox");//整个box
var theTable = $("#relativeList");//数据主体
var numberRowsInTable;//数据总行数
var pageSize = 5;//每一页的数据行数
var page = 1;

//亲友列表
function getRelationList(){
    var onResult = getRelationListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.BargainGetHelpFluxService({'bargainId':bId} , resultProcessor);
}
function getRelationListOnResult(result){
    if(result.code != 0){
        popBoxAlert('' , '不给力，刷新重试~');
    }else{
        var relativeList = $('#relativeList');
        relativeList.empty();
        if(result.data.bargainFlux.length > 0){
            for(var i=0; i<result.data.bargainFlux.length; i++){
                var headImg;
                if(result.data.bargainFlux[i].headimgurl != "" && result.data.bargainFlux[i].headimgurl != undefined && result.data.bargainFlux[i].headimgurl != null){
                    headImg = result.data.bargainFlux[i].headimgurl;
                }else{
                    headImg = "img/bargain/gg01.jpg";
                }
                var reducePrice = result.data.bargainFlux[i].reducePrice / 100;
                var bargainDate = new Date(result.data.bargainFlux[i].bargainTime);
                var year = bargainDate.getFullYear();
                var month = bargainDate.getMonth() + 1;
                if(month < 10)month = '0' + month;
                var day = bargainDate.getDate();
                if(day < 10)day = '0' + day;
                var hours = bargainDate.getHours();
                if(hours < 10)hours = '0' + hours;
                var minutes = bargainDate.getMinutes();
                if(minutes < 10)minutes = '0' + minutes;
                var bargainTime =  year+"/"+month+"/"+day + "&nbsp;&nbsp;" + hours + ":" + minutes;
                var oDiv = $('<div class="flex relative fs12"><div class="flex"><div class="reOne"><img class="imgWidth100" src="'+ headImg +'"></div><p class="reTwo"><span class="colorR">'+ result.data.bargainFlux[i].nickname +'</span>帮忙砍了<br>'+ bargainTime +'</p></div><p class="reThree colorR fs20">'+ reducePrice +'元</p></div>');
                relativeList.append(oDiv);
            }
            numberRowsInTable = theTable.find('.relative').length;//数据总行数
            //显示用户吸粉列表的首页
            onlyFirstPage();
        }else{
            relativeList.append('<p class="cenP fs14">暂无亲友列表哟~</p>');
            $('#lookMore').addClass('hide');
        }
    }
}

//下一页
function next(){
    $('#lookMore').remove();
    currentRow = pageSize * page;
    maxRow = currentRow + pageSize;
    if ( maxRow > numberRowsInTable ) maxRow = numberRowsInTable;//尾页
    for ( var i = currentRow; i< maxRow; i++ ){
        theTable.find('.relative').eq(i).css('display' , 'flex').css('display' , '-webkit-flex');
    }
    page++;
    if ( maxRow == numberRowsInTable ) { //尾页只显示上一页按钮
        //$('.btn').remove();
    }else{
        showNextBtn();
    }
}

function showNextBtn(){
    //$('#lookMore').removeClass('hide');
    var btn = $('<p class="lookMore fs12 colorR" id="lookMore" onclick="next()">查看更多亲友》</p>');
    relativesBox.append(btn);
}
//只显示首页数据   隐藏除了首页数据的表格
function onlyFirstPage(){
    if ( pageSize < numberRowsInTable){//有多页数据
        for ( var i = pageSize; i<numberRowsInTable; i++ ){
            //theTable.find('.relative').eq(i).addClass('hide');
            theTable.find('.relative').eq(i).css('display' , 'none');
        }
        showNextBtn();
    }
}