/**
 * Created by wq on 2016/10/17.
 */
    var title = "上海移动";
    var desc = "关注上海移动哟~";
var img =  "";
var url = getShareUrl();
wxShare(title , desc , img , url);

$(document).ready(function() {
    var mySwiper = new Swiper('.swiper-container',{
        autoplay: 3000,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination : '.swiper-pagination'
    });
    //2.3. 获取会员积分
    getCredit();
});

//2.3. 获取会员积分
function getCredit(){
    var onResult = getCreditOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.MemberGetCreditService ({'openid':opId} , resultProcessor);
}
function getCreditOnResult(result){
    if(result.code != 0){
        popBoxAlert("",'不给力 刷新重试');
    }else{
        $('#userCredits').html(result.data.credits);
    }
}

var images = {
    localId: [],  //选定照片的本地ID列表
    serverId: []  //图片的服务器端ID
};
var upImgCount = 1;//总共可以上传照片张数

//添加照片
function addImg(){
    if(images.serverId.length == "undefined" || images.serverId.length == null || images.serverId.length == ""){
        images.serverId.length = 0;
    }
    //if(upImgCount - images.serverId.length <= 0){
    //    popBoxAlert( '提示' , "只能上传一张照片哟~");
    //    return false;
    //}

    //拍照或从手机相册中选图接口
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            images.localId = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

            //var i = 0;
            //var length = images.localId.length;

            var upload = function(){
                wx.uploadImage({
                    localId: images.localId[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        images.serverId.push(res.serverId);

                        $('#wechat').html('<img class="twoImg" id="showImg" src="'+ images.localId[0] +'">');

                        uploadImg(images.serverId);
                        //$("#showImg").attr('src' , );

                        //i++;
                        //if(i < length){
                        //    upload();
                        //}
                    },
                    fail: function () {
                        popBoxAlert("提示" , "上传失败");
                    }
                });
            };
            upload();
        }
    });
}

function uploadImg(serverId){
    var onResult = uploadImgOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.MemberUploadQrcodeService ({'openid':opId , 'qrcodeMediaId':serverId[0]} , resultProcessor);
}
function uploadImgOnResult(result){
    if(result.code != 0){
        popBoxAlert("",'不给力 刷新重试');
    }else{
        popBoxAlert("提示" , "上传成功");
    }
}
