/**
 * Created by Administrator on 2016/12/15.
 */
//1.1获取帖子信息
var pages=0;
var page=1;
function getTopicThreadOne(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getTopicThreadOneOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadOneService({'openid':openid,'tid':tid} , resultProcessor);
}
function getTopicThreadOneOnResult(result) {
    window.setInterval(function () {
        $('.waterfllow-loading.active').removeClass('active');
    }, 3000);
    //$('.waterfllow-loading.active').removeClass('active');
    //hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '抱歉，这个帖子已经消失在外太空了~');
            return false;
        } else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                if (result.data.pages) {
                    pages = result.data.pages;
                }
                //写入帖子信息
                if(result.data.threadinfo.user.image!=''&&result.data.threadinfo.user.image!=null&&result.data.threadinfo.user.image!=undefined){
                    $('.user-img img').attr('src',result.data.threadinfo.user.image);
                }else {
                    $('.user-img img').attr('src','img/gg01.jpg');
                }
                $('.post-detail-user-nickname').text(result.data.threadinfo.user.nickname);
                $('.post-detail-time').text(getDateDiff(result.data.threadinfo.time));
                $('.textarea-cont').text(result.data.threadinfo.content);
                if(result.data.threadinfo.images&&result.data.threadinfo.images!=''&&result.data.threadinfo.images!=null){
                    var oPostImgList=$('<div class="post-img-list parent-flex3"></div>');
                    var imgs=result.data.threadinfo.images.split("||");

                    for (j=0;j<imgs.length ;j++ )
                    {
                        var oImg=$('<div class="post-img-box"> <img class="post-img min-img highlight" src="'+imgs[j]+'" alt=""> </div>');
                        oImg.appendTo(oPostImgList);
                    }
                    oPostImgList.insertAfter($('.textarea-cont'));
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
                if(result.data.threadinfo.haveliked===false){
                    $('.like-bg').attr('name','0');
                    $('.like-bg').one('click',function(){
                        addLike(1,this);
                    });
                    $('.like-bg-cont img').attr('src','img/topic/like2.png');
                }else if(result.data.threadinfo.haveliked===true){
                    $('.like-bg').attr('name','1');
                    $('.like-bg-cont img').attr('src','img/topic/like2_2.png');
                }
                $('.like-num').text(result.data.threadinfo.likenum);
                //展示评论列表
                $('.comment-list').html();
                if (result.data.commentlist && result.data.commentlist.length != undefined && result.data.commentlist.length>0) {
                    creatCommentList(result);//绘制列表
                }else {
                    var oNonePost=$('<p class="noPost fs16 yellow">暂无用户评论~</p>');
                    oNonePost.appendTo('.comment-list');
                }

            }
        }
    }
}
//1.3分页获取评论列表
function getTopicThreadOneCommentPage(pageNum){
    $('.waterfllow-loading').addClass('active');

    //_showPopBoxById("loadingToast");//loading
    if(pageNum==''){//进入当前页的下一页
        var onResult = getTopicThreadOneCommentPageOnResult;
        var resultProcessor = {
            'onResult':onResult
        };
        BWFRI.TopicThreadOneCommentPageService({'openid':openId,'tid':tid,'page':(page+1)} , resultProcessor);
    }else {//进入指定页
        var onResult = getTopicThreadOneCommentPageOnResult;
        var resultProcessor = {
            'onResult':onResult
        };
        BWFRI.TopicThreadOneCommentPageService({'openid':openId,'tid':tid,'page':pageNum} , resultProcessor);
    }
}
function getTopicThreadOneCommentPageOnResult(result) {
    window.setInterval(function(){$('.waterfllow-loading.active').removeClass('active');},3000);
    //$('.waterfllow-loading.active').removeClass('active');
    //hiddenBox("loadingToast");//loading
    if(result.code != 0){
        popBoxAlert("",'不给力，刷新重试~');
    }else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前帖子不存在');
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
                if (result.data.commentlist && result.data.commentlist.length != undefined && result.data.commentlist.length>0) {
                    $('.comment-list').html();
                    creatCommentList(result);//绘制列表
                }else {
                    popBoxAlert("", '这已经是最后一页了~');
                    return false;
                }
            }
        }
    }
}
//分页获取评论列表>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
        //getTopicThreadOneCommentPage();
        getTopicThreadOneCommentPageOnResult(TopicThreadOneCommentPageService);
    }
}
function creatCommentList(result) {
    for (var i = 0; i < result.data.commentlist.length; i++) {
        var oCommentDiv = $('<div class="post-detail-user" id="' + result.data.commentlist[i].replycid + '"></div>');
        if (result.data.commentlist[i].user.image != null && result.data.commentlist[i].user.image != '' && result.data.commentlist[i].user.image != undefined) {
            var oUserImg = $('<a class="user-img" href="#"><img src="' + result.data.commentlist[i].user.image + '" alt=""></a>');
        } else {
            var oUserImg = $('<a class="user-img" href="#"><img src="img/gg01.jpg" alt=""></a>');
        }
        var oCommentUser = $('<div class="post-detail-user-name"></div>');
        var oCommentUserCont = $('<div class="name-time parent-flex">' +
            '<div class="nickname">' + result.data.commentlist[i].user.nickname + '</div>' +
            '<div><img src="img/topic/clock.png" alt=""><span class="green">' + getDateDiff(result.data.commentlist[i].rtime) + '</span></div>' +
            '</div>');
        if (result.data.commentlist[i].commentflag == 2) {//评论标志: 1 评论 2 回复。
            var oCommentCont = $('<div class="fs12 green"><span>回复</span><a class="blue" href="#">'+result.data.commentlist[i].replyuser.nickname + ':</a>' +
                '<span onclick="showCommentBox(0,'+result.data.commentlist[i].replycid+','+result.data.commentlist[i].cid+','+result.data.commentlist[i].replyuser.openid+')">' + result.data.commentlist[i].content + '</span>' +
                '</div>');
        } else if (result.data.commentlist[i].commentflag == 1) {
            var oCommentCont = $('<div class="fs12 green"><span onclick="showCommentBox(1,'+result.data.commentlist[i].replycid+')">' + result.data.commentlist[i].content + '</span>' +
                '</div>');
        }
        oCommentUserCont.appendTo(oCommentUser);
        oCommentCont.appendTo(oCommentUser);

        var oPostLine = $('<div class="post-line post-line-min"> <img src="img/topic/line.png" alt=""></div>');

        oUserImg.appendTo(oCommentDiv);
        oCommentUser.appendTo(oCommentDiv);
        oCommentDiv.appendTo('.comment-list');
        oPostLine.appendTo('.comment-list');
    }
}
//显示评论，回复窗口
function showCommentBox(type,replycid,cid,replyopenid){//0回复，1评论,id:回复/评论id
    var nickname=$('#'+replycid).find('.nickname').text();
    if(type==0){
        $('.post-areas').attr('placeholder','回复'+nickname);
        $('.comment-box-title').text('回复');
        $('#releaseBtn').one('click',function(){//对帖子评论
            topicThreadCommentReply(cid,replyopenid);
        });
    }else {
        $('.post-areas').attr('placeholder','说点什么吧');
        $('.comment-box-title').text('评论');
        $('#close').one('click',function(){
            $('.comment-box').hide();
            $('.post-detail').show();
        });
        $('#releaseBtn').one('click',function(){//对帖子评论
            topicThreadComment();
        });
    }
    $('.comment-box').show();
    $('.post-detail').hide();
}
//隐藏评论、回复窗口
$('.cancel').on('click',function(){
    $('.comment-box').hide();
    $('.post-detail').show();
});
//点赞
function addLike(type,obj){//0首页点赞，1详情页点赞
    if(type==0){
        var flag= $(obj).attr('name');
        //console.log(flag)
        if(flag==0){
            TopicThreadLikeSubmitService(type,obj);
/*
            $(obj).find('img').attr('src','img/topic/like_2.png');
            $(obj).find('span').text(parseInt($(obj).text())+1);
            $(obj).attr('name','1');
*/
            //调用接口，局部刷新...
        }
    }else if(type==1) {
        var flag = $(obj).attr('name');
        if (flag == 0) {
/*
            $('.like-bg-cont img').attr('src', 'img/topic/like2_2.png');
            $('.like-bg-cont .like-num').text(parseInt($(obj).find('.like-bg-cont .like-num').text()) + 1);
            $(obj).attr('name', '1');
*/
            //调用接口，局部刷新...
            TopicThreadLikeSubmitService(type,obj);
            //TopicThreadLikeSubmitOnResult(TopicThreadLikeSubmitResult);
        }
    }
}
//点赞提交
function TopicThreadLikeSubmitService(type,obj){
    $('.waterfllow-loading').addClass('active');

    //_showPopBoxById("loadingToast");//loading
    this.obj=obj;
    this.type=type;
    var onResult = TopicThreadLikeSubmitOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.TopicThreadLikeSubmitService({'openid':openId,'tid':tid} , resultProcessor);
}
function TopicThreadLikeSubmitOnResult(result) {
    window.setInterval(function () {
        $('.waterfllow-loading.active').removeClass('active');
    }, 3000);
    //$('.waterfllow-loading.active').removeClass('active');
    //hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前帖子不存在');
            return false;
        } else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                if (result.data.likenum) {
                    if(type==0){
                        $(obj).find('img').attr('src','img/topic/like_2.png');
                        $(obj).find('span').text(parseInt($(obj).text())+1);
                        $(obj).attr('name','1');
                    }else if(type==1){
                        $('.like-bg-cont img').attr('src', 'img/topic/like2_2.png');
                        $('.like-bg-cont .like-num').text(parseInt($(obj).find('.like-bg-cont .like-num').text()) + 1);
                        this.obj.text(result.data.likenum + 1);
                    }
                }
            }
        }
    }
}
//评论回复
function topicThreadCommentReply(replycid,replyopenid){
    var content=$('#area').val();
    if(content==''||content==undefined){
        popBoxAlert('','您还没有填写要回复的内容哦~');
        return false;
    }else {
        _showPopBoxById("loadingToast");//loading
        var onResult = topicThreadCommentReplyOnResult;
        var resultProcessor = {
            'onResult':onResult
        };
        BWFRI.TopicThreadCommentReplyService({'openid':openId,'tid':tid,'replycid':replycid,'replyopenid':replyopenid,'content':content} , resultProcessor);
    }
}
function topicThreadCommentReplyOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前帖子不存在');
            return false;
        } else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                popBoxAlert("", '回复成功！');
                $('.post-detail').hide();
                $('.comment-box').show();
                getTopicThreadOneCommentPage(1);//获取评论列表的第一页
            }
        }
    }
}

//评论
function topicThreadComment(type,obj){
    var content=$('#area').val();
    if(content==''||content==undefined){
        popBoxAlert('','您还没有填写要评论的内容哦~');
        return false;
    }else {
        _showPopBoxById("loadingToast");//loading
        var onResult = topicThreadCommentOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.TopicThreadCommentService({'openid': openId, 'tid': tid, 'content': content}, resultProcessor);
    }
}
function topicThreadCommentOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("", '不给力，刷新重试~');
    } else {
        if (result.data.rs == 1) {
            popBoxAlert("", '当前帖子不存在');
            return false;
        } else {
            if (result.data.rs != 0) {
                popBoxAlert("", '不给力，刷新重试~');
                return false;
            } else {
                popBoxAlert("", '评论成功！');
                $('.post-detail').hide();
                $('.comment-box').show();
                getTopicThreadOneCommentPage(1);//获取评论列表的第一页
            }
        }
    }
}

//显示/隐藏评论,发帖窗口
$('.comment-btn').click(function(){
    $('.comment-box').show();
    $('.post-detail').hide();
    $('.cancel').one('click',function(){//关闭窗口
        $('.post-detail').show();
        $('.comment-box').hide();
    });
    $('#releaseBtn').one('click',function(){//对帖子评论
        topicThreadComment();
    });
});
