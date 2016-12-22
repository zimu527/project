// JavaScript Document

// 分享标题 title     分享描述 desc    分享图标img    分享链接 url

//微会员专区
var registerTitle = "会员福利社";
var registerDesc = "注册微会员，给您提供便捷服务，赶快注册吧！好礼多多，惊喜多多！";
var registerImg =  getRootUrl() + "img/register/liwu.png";
var registerUrl = getShareUrl();//获取当前页面地

//签到
var signTitle = "签到送好礼";
var signDesc = "天天签到，惊喜不断！";
var signImg =  getRootUrl() + "img/register/liwu.png";
var signUrl = getShareUrl();//获取当前页面地址

//预约
var reservationTitle = "预约新产品";
var reservationDesc = "最新最热的产品出炉了，赶紧来预约吧，更多优惠等着你哦！";
var reservationImg =  getRootUrl() + "img/register/liwu.png";
var reservationUrl = getShareUrl();//获取当前页面地

//投票
var voteTitle = "拉票了";
var voteDesc = "我正报名参与投票，还差一点就可以拿惊喜大奖啦。您的一票很重要！帮我投一票呗！";
var voteImg =  getRootUrl() + "img/register/liwu.png";

//抽奖
var rotateTitle = "幸运大抽奖";
var rotateDesc = "轻轻松松就能抽到大奖，现在是验证你人品的时候了，赶紧来抽奖吧！";
var rotateImg =  getRootUrl() + "img/rotate/5711a1ab7cdcc.png";
var rotateUrl = getShareUrl();//获取当前页面地

//调研
var surveyTitle = "参与调研送豪礼";
var surveyDesc = "小伙伴们！快来参与我的调研活动，动动手指就可以拿礼品啦！";
var surveyImg =  getRootUrl() + "img/register/liwu.png";
var surveyUrl = getShareUrl();//获取当前页面地

//预约
var bookTitle = "在线预约";
var bookDesc = "惊喜优惠新品，便捷业务办理，还可享受更多产品折扣半价优惠，赶快来观看预约吧。";
var bookImg =  getRootUrl() + "img/booking/b.jpg";
var bookUrl = getShareUrl();//获取当前页面地

//微渠道
var channelTitle = "我为【公众号名称】代言";
var channelDesc = "【公众号名称】需要小伙伴助力，最给力的小伙伴将会有惊喜大奖红包奉上哦！快来参与吧。";
var channelImg =  getRootUrl() + "img/channel/u.jpg";
var channelUrl = getShareUrl();//获取当前页面地

//画心游戏
var partnerTitle = "寻找你的另一半";
var partnerDesc = "帮助你的好友完成另一半“心”的绘画，探寻你们的相配程度吧！";
var partnerImg =  getRootUrl() + "img/partner/hxfx.jpg";

//获取当前地址根目录
function getRootUrl() {
    var url =window.location.href.split('.html')[0];
    var strx=url.lastIndexOf('/');
    var str1;
    if(strx!=-1){
        str1=url.substring(0,strx+1);
    }
    return str1;
}

//获取当前页面地址
function getShareUrl() {
    var url =window.location.href.split('#')[0];
    return url;
}
