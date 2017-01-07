/**
 * Created by Administrator on 2017/1/3.
 */
/*window.setTimeout(function(){//第一页财神图片，调整显示时间，适应两个动画切换
    $('.page1-god-of-wealth').css('opacity','1');
},1700);*/
/*window.setTimeout(function(){//春联页洋气去拜年图片按钮，调整显示时间，适应两个动画切换
    $('.couplets-page-btn-pic').css('opacity','1');
},2500);*/
//切换页面、获取春联内容
$('.page1-btn-pic-box').click(function(){//切换到第2页
    $('.page1').addClass('fadeOutUp');
    var timer2 = window.setTimeout(function(){
        $('.page1').hide();
        $('.page2').show();
    },300);
});
$('.page2-btn-pic').click(function(){//切换到第3页
    $('.page2').addClass('fadeOutUp');
    var timer3 = window.setTimeout(function(){
        $('.page2').hide();
        $('.page3').show();
    },300);
});
$('.page3-btn-pic').click(function(){//切换到第4页
    $('.page3').addClass('fadeOutUp');
    window.setTimeout(function(){
        $('.page3').hide();
        $('.page4').show();
    },300);
});
$('.top-couplets-btn').click(function(){//获取上联内容，切换到第4页第2部分
    //topCoupletsCont = $(this).find('p').text();
    $('input[name="topCoupletsCont"]').val($(this).find('p').text());
    $(this).addClass('bounceOut animated');
    $('.page4-box1').addClass('fadeOut animated');
    $('.page4-box2').show();
    //console.log(topCoupletsCont);
});
$('.bottom-couplets-btn').click(function(){//获取下联内容，切换到第5页
    //bottomCoupletsCont = $(this).find('p').text();
    $('input[name="bottomCoupletsCont"]').val($(this).find('p').text());
    $(this).addClass('bounceOut animated');
    $('.page4').addClass('fadeOut animated');
    window.setTimeout(function(){
        $('.page5').show();
    },300);
    //console.log(bottomCoupletsCont);
});
$('.horizontal-couplets-btn').click(function(){//点击横批，获取横批内容，显示放大效果
    //horizontalCoupletsCont = $(this).find('p').text();
    $('input[name="horizontalCoupletsCont"]').val($(this).find('p').text());
    var horizontalCouplets=$('.horizontal-couplets-btn');
    for(var i=0;i<horizontalCouplets.length;i++){//循环获取上一个被点击的横批，移除动画效果，增加不放大的class
        if(horizontalCouplets.eq(i).hasClass('zoom')){
            var className='horizontal-couplets'+(i+1);
            horizontalCouplets.eq(i).removeClass(className);
            horizontalCouplets.eq(i).removeClass('zoom');
            horizontalCouplets.eq(i).addClass('zoom0');
        }
    }
    if($(this).hasClass('zoom0')){//移除被选中的横批不放大的class
        $(this).removeClass('zoom0');
    }
    $(this).addClass('zoom');//添加放大效果
    //console.log(horizontalCoupletsCont);
});

//点击功能按钮效果
$('.page3-btn-upload-div').on('click',function(){/*第一次点击上传照片，显示免责声明*/
    showSHE
    /*再次点击上传照片，直接上传图片*/
//免责声明确认，隐藏声明，删除显示声明事件，添加上传图片事件
$('.top-couplets-btn-my').click(function(){/*点击我要自己写上联*/
    showInputBox('1');
});
$('.bottom-couplets-btn-my').click(function(){/*点击我要自己写下联*/
    showInputBox('2');
});
$('.horizontal-couplets-my').click(function(){/*点击我要自己写横批*/
    var horizontalCouplets=$('.horizontal-couplets-btn');
    for(var i=0;i<horizontalCouplets.length;i++){//循环获取上一个被点击的横批，移除动画效果，增加不放大的class
        if(horizontalCouplets.eq(i).hasClass('zoom')){
            var className='horizontal-couplets'+(i+1);
            horizontalCouplets.eq(i).removeClass(className);
            horizontalCouplets.eq(i).removeClass('zoom');
            horizontalCouplets.eq(i).addClass('zoom0');
        }
    }
    showInputBox('0');/*显示输入窗口*/
});
$('.submit-btn').click(function(){/*点击提交按钮，保存用户输入的内容*/
    var name=$('#area').attr('name');
    saveCont(name);
});
$('.cancel-btn').click(function(){/*点击取消按钮，关闭输入窗口*/
    $('.input-box').hide();
    $('.mask').hide();
});
$('.page5-btn-pic').click(function(){/*点击一键生成按钮，提交春联*/
    //form表单提交
    getData();
    //window.location.href='couplets.html'
});

function showInputBox(name){/*显示输入窗口，清空内容，显示对应的提示语*/
    $('#area').attr('name',name);
    $('#area').val('');
    $('#area').focus();
    $('.input-box').show();
    $('.mask').show();
    if(name==1){
        $('#area').attr('placeholder','请输入7个字作为上联');
    }else if(name==2){
        $('#area').attr('placeholder','请输入7个字作为下联');
    }else if(name==0){
        $('#area').attr('placeholder','请输入4个字作为横批');
    }
}
function saveCont(name){/*校验并保存用户输入的内容*/
    var content=$('#area').val();
    if(name==1){
        if(content==undefined||content==''){
            alert('您还未输入上联内容！');
            return false;
        }else if(content.length!=7){
            alert('上联内容要是7个字哦~');
            return false;
        }else {
            $('input[name="topCoupletsCont"]').val(content);
            //topCoupletsCont=content;
            //console.log(topCoupletsCont);
            $('.input-box').hide();
            $('.mask').hide();
            $('.page4-box1').addClass('fadeOut animated');
            $('.page4-box2').show();
        }
    }else if(name==2){
        if(content==undefined||content==''){
            alert('您还未输入下联内容！');
            return false;
        }else if(content.length!=7){
            alert('下联内容要是7个字哦~');
            return false;
        }else {
            //bottomCoupletsCont=content;
            $('input[name="bottomCoupletsCont"]').val(content);
            //console.log(bottomCoupletsCont);
            $('.input-box').hide();
            $('.mask').hide();
            $('.page4').addClass('fadeOut animated');
            window.setTimeout(function(){
                $('.page5').show();
            },300);
        }
    }else if(name==0) {
        if (content == undefined || content == '') {
            alert('您还未输入横批内容！');
            return false;
        }else if(content.length!=4){
            alert('横批内容要是4个字哦~');
            return false;
        } else {
            $('input[name="horizontalCoupletsCont"]').val(content);
            //horizontalCoupletsCont = content;
            //console.log(horizontalCoupletsCont);
            $('.input-box').hide();
            $('.mask').hide();
            //console.log('快点击下方一键生成按钮，生成属于你的洋气春联吧！');
            //alert('快点击下方一键生成按钮，生成你的洋气春联吧！');
        }
    }
}
//form提交
function getData(){
    //var topCoupletsCont;
    //var bottomCoupletsCont;
    //var horizontalCoupletsCont;
    var topCoupletsCont = $('input[name="topCoupletsCont"]').val();
    var bottomCoupletsCont = $('input[name="bottomCoupletsCont"]').val();
    var horizontalCoupletsCont = $('input[name="horizontalCoupletsCont"]').val();
    if(topCoupletsCont == undefined || topCoupletsCont == null || topCoupletsCont == ""){
        //popBoxAlert("提示",'您还没有选择上联！');
        alert('您还没有选择上联')
        //$('.page4-box2').show();
        return false;
    }
    if(bottomCoupletsCont == undefined || bottomCoupletsCont == null || bottomCoupletsCont == ""){
        //popBoxAlert("提示",'您还没有选择下联！');
        alert('您还没有选择下联')
        return false;
    }
    if(horizontalCoupletsCont == undefined || horizontalCoupletsCont == null || horizontalCoupletsCont == ""){
        //popBoxAlert("提示",'您还没有选择横批！');
        alert('您还没有选择横批')
        return false;
    }
    console.log(topCoupletsCont+','+bottomCoupletsCont+';'+horizontalCoupletsCont);
    window.location.href='couplets.html'
    //window.formAttention.submit();
}

//上传图片
var images={
    localId:'',
    serverId:''
};

//var upImgCount = 1;//总共可以上传照片张数
//添加照片
function addImg(){
    //拍照或从手机相册中选图接口
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            images.localIds = res.localIds[0];// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            var upload = function(){
                wx.uploadImage({
                    localId: images.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        images.serverId = res.serverId[0];
                        var avatarImg=$('.page3-btn-upload-div img');
                        avatarImg.removeClass('.avatar-upload-img');
                        avatarImg.attr('src',images.localIds);
                        //调整图片
                        var realWidth;//真实的宽度
                        var realHeight;//真实的高度
                        $("<img/>").attr("src", avatarImg.attr("src")).load(function() {
                            realWidth = avatarImg.width;
                            realHeight = avatarImg.height;
                            if(realWidth<realHeight){
                                img.addClass('avatar-img-long');
                            }else {
                                img.addClass('avatar-img-wide');
                            }
                        });
                        upload();
                    },
                    fail: function () {
                        popBoxAlert("" , "上传失败");
                    }
                });
            };
            upload();
        }

    });
}

document.body.addEventListener('touchstart',function(){ });//兼容ios的active事件