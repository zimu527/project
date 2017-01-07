/**
 * Created by Administrator on 2016/12/5.
 */


document.body.addEventListener('touchstart', function () { });//解决:active的问题
//1.接口调用>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//1.1话题信息查询
function getTopic(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getTopicOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicService({'openid':openId,'peroid':peroid} , resultProcessor);
}
function getTopicOnResult(result) {
    //hiddenBox("loadingToast");//loading
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if(result.data.rs==1){
            popBoxAlert("",'当前期次不存在');
            return false;
        }else {
            if(result.data.rs!=0){
                popBoxAlert("",'不给力，刷新重试~');
                return false;
            }else {
                if(result.data.topicinfo&&result.data.topicinfo!=''&&result.data.topicinfo!=null){
                    $('.imgWidth100').attr('src',result.data.topicinfo.images);
                    $('.topic-title').text(result.data.topicinfo.title);
                    $('.topic-cont').text(result.data.topicinfo.content);
                    $('.topic-peroid').text(result.data.topicinfo.peroid+'期话题');
                    $('.topic-posts-num').text(result.data.topicinfo.threadsnum+'讨论');
                }
            }
        }
    }
}
var pages=0;
var rank=0;
var listLenght=0;
var page=1;
//1.2获取跟帖列表第一页
function getFirstTopicThreadList(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getFirstTopicThreadListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadListService({'openid':openId,'peroid':peroid} , resultProcessor);
}
function getFirstTopicThreadListOnResult(result) {
    //hiddenBox("loadingToast");//loading
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前期次不存在');
            return false;
        } else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                if(result.data.pages){
                    pages=result.data.pages;
                }
                $('.topic-posts-list').html();
                if (result.data.list && result.data.list.length != undefined && result.data.list.length>0) {
                    creatPostsList(result);//绘制列表
                }else {
                    var oNonePost=$('<p class="noPost fs16 yellow">该话题下暂无用户发帖，<br>快点击右下角发帖按钮，<br>抢占第一个位子吧~</p>');
                    oNonePost.appendTo('.topic-posts-list');
                }
            }
        }
    }
}
//1.3分页获取跟帖列表
function topicThreadListPage(){
    $('.waterfllow-loading').addClass('active');

    //_showPopBoxById("loadingToast");//loading
    var onResult = topicThreadListPageOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadListPageService({'openid':openId,'peroid':peroid,'page':(page+1)} , resultProcessor);
}
function topicThreadListPageOnResult(result) {
    window.setInterval(function(){$('.waterfllow-loading.active').removeClass('active');},3000);
    //$('.waterfllow-loading.active').removeClass('active');
    //hiddenBox("loadingToast");//loading
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前期次不存在');
            return false;
        }else if(result.data.rs == 2){
            popBoxAlert("", '下一页的内容已经没有内容了~');
            return false;
        }else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                if(result.data.page){
                    page=result.data.page;
                }
                if (result.data.list && result.data.list.length != undefined && result.data.list.length>0) {
                    $('.topic-posts-list').html();
                    creatPostsList(result);//绘制列表
                }else {
                    popBoxAlert("", '这已经是最后一页了~');
                    return false;
                }
            }
        }
    }
}
//分页获取帖子列表>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var h=0;
//图片查询中正对浏览器主页面滚动事件处理(瀑布流)。只能使用window方式绑定，使用document方式不起作用
$(window).on('scroll',function(){
    if(documentHeight()>h&&getScrollTop() + windowHeight() >= (documentHeight() -20/*滚动响应区域高度取50px*/)){
        waterallowData();
        h=documentHeight();
    }
});
function waterallowData(){
    $('.waterfllow-loading').addClass('active');
    if(pages>page){
        //topicThreadListPage();
        topicThreadListPageOnResult(TopicThreadListPageServiceResult);
    }
}

//发帖
function topicThreadSubmit(){
    _showPopBoxById("loadingToast");//loading
    var topicThread = $("#area").val();//帖子的文字，不少于15个
    if(topicThread==''||topicThread.length<15){
        $('#releaseBtn').one(function(){
            topicThreadSubmit();
        });
        popBoxAlert("" , "帖子内容不能少于15个字哟~");
        return false;
    }
    var upImages='';
    if(images.serverId.length > 0){
        for(var i=0;i<images.serverId.length;i++) {
            if (i < images.serverId.length - 1) {
                upImages += images.serverId[i] + '||';
            } else {
                upImages += images.serverId[i];
            }
        }
    }
    var onResult = topicThreadSubmitOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadSubmitService({'openid':openid,'peroid':peroid,'content':content,'images':upImages} , resultProcessor);
}
function topicThreadSubmitOnResult(result) {
    //hiddenBox("loadingToast");//loading
    $('#releaseBtn').one(function(){
        topicThreadSubmit();
    });
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前期次不存在');
            return false;
        } else{
            if(result.data.rs!=0){
                popBoxAlert("", '不给力，刷新重试~');
            }else {
                popBoxAlert("", '发布成功');
                $('.topic-posts-num').text(result.data.threadsnum+'讨论');
                getFirstTopicThreadList();
            }
        }
    }
}
//删除帖子
function topicThreadDelete(tid){
    _showPopBoxById("loadingToast");//loading
    var onResult = topicThreadDeleteOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadDeleteService({'openid':openid,'tid':tid} , resultProcessor);
}
function topicThreadDeleteOnResult(result) {
    //hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
        return false;
    } else {
        if (result.code != 0) {
            popBoxAlert("", '不给力，刷新重试~');
            return false;
        } else {
            if (result.data.rs == 1) {
                popBoxAlert("", '这个帖子已经消失在外太空了~');
                return false;
            }else if(result.data.rs == 0){
                popBoxAlert("", '该贴已被成功删除！');
                $('#'+tid).remove();
                $('.topic-posts-num').text(result.data.threadsnum+'讨论');
                getFirstTopicThreadList();
            }else {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            }
        }
    }
}
//举报帖子
function topicThreadReport(tid){
    _showPopBoxById("loadingToast");//loading
    var onResult = topicThreadReportOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadReportService({'openid':openid,'tid':tid} , resultProcessor);
}
function topicThreadReportOnResult(result) {
    //hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
        return false;
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '这个帖子已经消失在外太空了~');
            return false;
        }else if(result.data.rs == 0){
            popBoxAlert("", '您已成功举报该贴！');
        }else {
            popBoxAlert("", '不给力，刷新重试~');
            return false;
        }
    }
}
//显示操作按钮列表
function showActionBtnList(type,tid){//0举报他人帖子，1删除本人帖子
    if(type==0){
        $('.action-btn-report').one('click',function(){
            topicThreadReport(tid);
        });
        $('.action-btn-report').show();
        $('.popUp').show();
    }else if(type==1){
        $('.action-btn-delete').one('click',function(){
            topicThreadDelete(tid);
        });
        $('.action-btn-delete').show();
        $('.popUp').show();
    }
}
//隐藏操作按钮列表
$('.cancle-btn').click(function(){
    $('.popUp').hide();
    $('.action-btn-delete').hide();
    $('.action-btn-report').hide();
});
//发帖上传图片
$('#addImg').click(function(){
    addImg();
});
$('#goBack').click(function(){//返回上一页
    window.history.back(-1);
});

//显示、隐藏发帖窗口
$('.add-picture-btn').click(function(){
    $('.post-box').show();
    $('.main').hide();
    $('.cancel').one('click',function(){//关闭窗口
        $('.main').show();
        $('.post-box').hide();
    });
    $('#releaseBtn').one('click',function(){//发帖
        topicThreadSubmit();
    });
});
//绘制帖子列表
function creatPostsList(result){
    listLenght=result.data.list.length;
    for(var i=0;i<result.data.list.length;i++){
        if(result.data.list[i].rank!=null&&result.data.list[i].rank!=''&&result.data.list[i].rank!=undefined){
            rank=result.data.list[i].rank;
        }
        var oPostDiv=$('<div class="post-div" id="'+result.data.list[i].tid+'"></div>');
        if(result.data.list[i].user.image!=null&&result.data.list[i].user.image!=''&&result.data.list[i].user.image!=undefined){
            var oPostHeader=$('<div class="parent-flex post-header">'+
                '<a class="post-user fs16" href="topicPostDetail.html">'+
                '<img src="'+result.data.list[i].user.image+'" alt="">'+
                '<span class="post-user-nickname">'+result.data.list[i].user.nickname+'</span></a>'+
                '</div>');
        }else {
            var oPostHeader=$('<div class="parent-flex post-header">'+
                '<a class="post-user fs16" href="topicPostDetail.html">'+
                '<img src="img/gg01.jpg" alt="">'+
                '<span class="post-user-nickname">'+result.data.list[i].user.nickname+'</span></a>'+
                '</div>');
        }
        if(openId==result.data.list[i].user.openid){//1,删除本人帖子，0举报他人帖子
            var oActionBtnBox=$(' <div class="topic-more-btn" onclick="showActionBtnList(1,'+result.data.list[i].tid+')"><img src="img/topic/more.png" alt=""></div>');
        }else {
            var oActionBtnBox=$(' <div class="topic-more-btn" onclick="showActionBtnList(0,'+result.data.list[i].tid+')"><img src="img/topic/more.png" alt=""></div>');
        }
        oActionBtnBox.appendTo(oPostHeader);
        if(result.data.list[i].images&&result.data.list[i].images!=''&&result.data.list[i].images!=null){
            var oPostMain=$('<div class="post-main fs14">' +
                '<a class="post-main-cont" href="topicPostDetail.html">'+GetLength(result.data.list[i].content,80)+'</a>' +
                '</div>');
            var oPostImgList=$('<div class="post-img-list parent-flex3"></div>');
            var imgs=result.data.list[i].images.split("||");

            for (j=0;j<imgs.length ;j++ )
            {
                var oImg=$('<div class="post-img-box"> <img class="post-img min-img highlight" src="'+imgs[j]+'" alt=""> </div>');
                oImg.appendTo(oPostImgList);
            }
            oPostImgList.appendTo(oPostMain);
        }else {
            var oPostMain=$('<a class="post-main fs14" href="topicPostDetail.html">' +
                '<p class="post-main-cont">'+GetLength(result.data.list[i].content,116)+'</p>' +
                '</a>');
        }
        var oPostLine=$('<div class="post-line post-line-min"> <img src="img/topic/line.png" alt=""></div>');

        if(result.data.list[i].haveliked===true){
            var oPostFooter=$('<div class="parent-flex post-footer fs12">'+
                '<div>'+getDateDiff(result.data.list[i].time)+'</div>'+
                '<div class="post-message"><a href="topicPostDetail.html"><img src="img/topic/message_2.png" alt=""><span class="post-comment">'+unitConversion(result.data.list[i].replynum)+'</span></a>'+
                '<div class="add-like" name="0"><img src="img/topic/like_2.png" alt=""><span class="post-like">'+unitConversion(result.data.list[i].likenum)+'</span></div></div></div>');
        }else if(result.data.list[i].haveliked===false){
            var oPostFooter=$('<div class="parent-flex post-footer fs12">'+
                '<div>'+getDateDiff(result.data.list[i].time)+'</div>'+
                '<div class="post-message"><a href="topicPostDetail.html"><img src="img/topic/message_2.png" alt=""><span class="post-comment">'+unitConversion(result.data.list[i].replynum)+'</span></a>'+
                '<div class="add-like" name="0" onclick="addLike(0,this)"><img src="img/topic/like.png" alt=""><span class="post-like">'+unitConversion(result.data.list[i].likenum)+'</span></div></div></div>');
        }else {
            var oPostFooter=$('<a class="parent-flex post-footer fs12" href="topicPostDetail.html">'+
                '<div>'+getDateDiff(result.data.list[i].time)+'</div>'+
                '<div class="post-message"><span><img src="img/topic/message_2.png" alt=""><span class="post-comment">'+unitConversion(result.data.list[i].replynum)+'</span></span>'+
                '<div class="add-like" name="0"><img src="img/topic/like.png" alt=""><span class="post-like">'+unitConversion(result.data.list[i].likenum)+'</span></div></div></a>');
        }
        oPostHeader.appendTo(oPostDiv);
        oPostMain.appendTo(oPostDiv);
        oPostLine.appendTo(oPostDiv);
        oPostFooter.appendTo(oPostDiv);
        oPostDiv.appendTo('.topic-posts-list');
    }
    if(rank>0&&rank<result.data.list.length){
        //console.log(rank);
        //console.log($('.post-div').length);
        var oPostDivList=$('.post-div');
        //var moreLine=$('<div class="parent-flex more-list"><div class="fs0"><img src="img/topic/line.png" alt=""></div><div class="fs14">更多热门讨论</div><div class="fs0"><img src="img/topic/line.png" alt=""></div></div>')
        //moreLine.insertAfter($('.oPostDiv').eq(rank));
        var moreLine=$('<div class="parent-flex more-list"><div class="fs0"><img src="img/topic/line.png" alt="">' +
            '</div><div class="fs14">更多热门讨论</div><div class="fs0"><img src="img/topic/line.png" alt=""></div></div>');
        //$('<div class="parent-flex more-list">hhh</div>').insertAfter(oPostDivList.eq(1));
        moreLine.insertAfter(oPostDivList.eq(rank-1));
    }
    $(".post-img").each(function(i){
        var img = $(this);
        var realWidth;//真实的宽度
        var realHeight;//真实的高度
        $("<img/>").attr("src", $(img).attr("src")).load(function() {
            realWidth = this.width;
            realHeight = this.height;
            if(realWidth<realHeight){
                img.addClass('post-img-long');
            }else {
                img.addClass('post-img-wide');
            }
        });
    });
}
