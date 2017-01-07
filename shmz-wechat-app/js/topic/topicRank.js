/**
 * Created by Administrator on 2016/12/19.
 */
//1.3分页获取评论列表
function getTopicRank(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getTopicRankOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicRankService({'openid':openId,'peroid':peroid} , resultProcessor);
}
function getTopicRankOnResult(result) {
    //hiddenBox("loadingToast");//loading
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前期次的话题已经消失在外太空了∑っ°Д;)っ ');
            return false;
        }else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                if(result.data.showrs===false){
                    $('.time').text(result.data.time);
                    $('.post-rank').hide();
                    $('.post-none-rank').show();
                }else {
                    if (result.data.rankinfo && result.data.rankinfo.list.length != undefined && result.data.rankinfo.list.length>0) {
                        $('.num').text(result.data.rankinfo.list.length);
                        $('.awardtime').text(result.data.rankinfo.awardtime);
                        $('.rank-list').html();
                        creatRankList(result);//绘制列表
                    }else {
                        $('.rank-info .num').text(0);
                        $('.awardtime').text(result.data.rankinfo.awardtime);
                        popBoxAlert("", '没有该话题的排行榜~');
                        return false;
                    }
                }
            }
        }
    }
}
function creatRankList(result) {
    for(var i=0;i<result.data.rankinfo.list.length;i++){
        var oRankListDIv=$('<a class="rank-list-div" id="'+result.data.rankinfo.list[i].tid+'" href="#">'+
            '<div class="parent-flex">'+
            '<div>第'+result.data.rankinfo.list[i].rank+'名</div>'+
            '<div>'+result.data.rankinfo.list[i].user.nickname+'</div>' +
            '</div>' +
            '<p class="nowrap">'+result.data.rankinfo.list[i].content+'</p>' +
            '<div class="post-line post-line-min"><img src="img/topic/line.png" alt=""></div>' +
            '</a>');
        oRankListDIv.appendTo('.rank-list');
    }
    $('<div class="whiteBlock"></div>');
}
