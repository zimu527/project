/**
 * Created by wq on 2016/8/26.
 */

wxShare(channelTitle , channelDesc , channelImg , channelUrl);
document.body.addEventListener('touchstart', function () { });//解决移动端active失效的问题
//对整个表分页
var theTable = $("#list");//数据主体
var numberRowsInTable;//数据总行数
var pageSize = 10;//每一页的数据行数
var page = 1;

$(document).ready(function(){
    $('#accountName').text(wxName);//公众号名称
    //2.5. 奥运传火炬获取用户信息
    getUserInfo();
    //2.7. 奥运传火炬获取吸粉排名列表
    getRankList();

});
//    2.5. 奥运传火炬获取用户信息
function getUserInfo(){
    var onResult = getUserInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetUserInfoService({'openid':opId , 'posterId':posterId} , resultProcessor);
}
function getUserInfoOnResult(result){
    if(result.code != 0){
        if(result.code == 161){
            alert('去孝感移动-乐活动中参与“我为奥运传火炬”活动吧');
        }else {
            alert('不给力，刷新重试~');
        }
    }else {
        $('#uImg').attr('src' , result.data.headimgurl);
        $('#uName').text(result.data.nickname);

        //$('#uFire').text(result.data.recommendNum);
        //$('#uRank').text(result.data.rank);
        //var t;
        //var a = new Date(parseInt(result.data.nowTime));
        //t = a.getHours();
        //$('#nowT').text(t);
    }
}
//    2.7. 奥运传火炬获取吸粉排名列表
function getRankList(){
    var onResult = getRankListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PosterGetRankService({'posterId':posterId} , resultProcessor);
}
function getRankListOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        // 新建整个表
        var oTable = $('#list');
        oTable.empty();
        if(result.data.rankList.length){
            for( var i=0; i<result.data.rankList.length; i++){
                var word = showWord(result.data.rankList[i].nickname , 5);
                if(result.data.rankList[i].headimgurl == 'undefinde' || result.data.rankList[i].headimgurl == null || result.data.rankList[i].headimgurl == '')result.data.rankList[i].headimgurl = 'img/Olympic/u.png';
                var oTr = $('<tr><td>'+ result.data.rankList[i].rank +'</td><td><img class="fImg" src="'+ result.data.rankList[i].headimgurl +'"></td><td>'+ word +'</td><td>'+ result.data.rankList[i].recommendNum +'</td></tr>');
                oTable.append(oTr);
            }
            numberRowsInTable = theTable.find('tr').length;//数据总行数
        }
        //显示用户吸粉列表的首页
        onlyFirstPage();
    }
}

//下一页
function next(){
    $('.btn').remove();
    currentRow = pageSize * page;
    maxRow = currentRow + pageSize;
    if ( maxRow > numberRowsInTable ) maxRow = numberRowsInTable;//尾页
    for ( var i = currentRow; i< maxRow; i++ ){
        theTable.find('tr').eq(i).removeClass('hide');
    }
    page++;
    if ( maxRow == numberRowsInTable ) { //尾页只显示上一页按钮
        //$('.btn').remove();
    }else{
        showNextBtn();
    }
}

function showNextBtn(){
    var btnNext = $('<div class="btn returnBtn fs16" onclick="next()">查看更多</div>');
    $('#fansRank').append(btnNext);
}
//只显示首页数据   隐藏除了首页数据的表格
function onlyFirstPage(){
    if ( pageSize < numberRowsInTable){//有多页数据
        for ( var i = pageSize; i<numberRowsInTable; i++ ){
            theTable.find('tr').eq(i).addClass('hide');
        }
        showNextBtn();
    }
}

//超出字数用省略号表示
function showWord(desc , plen){
    if(desc){
        if(desc.length > plen){
            desc = desc.substr(0 , plen) + '...';
        }
    }else{
        desc = "";
    }
    return desc;
}