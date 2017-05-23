/**
 * Created by Administrator on 2017/5/9.
 */
(function(){
  $('main')
    .on('click', '.js-migu-video', function () {
      goRecommend('video');
    }).on('click', '.js-migu-audio', function () {
    goRecommend('audio');
  }).on('click', '.js-rule-show', function () {
    $('.rule').show();
  });
  $('.close-icon').click(function(){//隐藏活动规则
    $(".rule").hide();
  });
  $(".active-info").slimScroll({
    width: 'auto', //可滚动区域宽度
    height: '100%', //可滚动区域高度
    size: '8px', //组件宽度
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
  function goRecommend(type){
    var checkHaveLength = function(className){
      return ($('.'+className).length>0);
    };
    var checkRequest = function(className){
      var required = $('.'+className).attr('required');
      return(required==undefined||required==''||required ==null);
    };
    if(checkHaveLength('js-user-phone')){
      if(checkRequest('js-user-phone')){
        var userPhone = $('input[name="userPhone"]').val();
        if(userPhone==''||userPhone==undefined) {
          popBoxAlert('温馨提示','请填写推荐人的手机号');
          return;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(userPhone))){
          popBoxAlert('温馨提示','请填写正确的推荐人手机号码');
          return;
        }
      }
    }
    if(checkHaveLength('js-recommend-phone')){
      if(checkRequest('js-recommend-phone')){
        var recommendPhone = $('input[name="recommendPhone"]').val();
        if(recommendPhone==''||recommendPhone==undefined) {
          popBoxAlert('温馨提示','请填写被推荐人的手机号');
          return;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(recommendPhone))){
          popBoxAlert('温馨提示','请填写正确的被推荐人手机号码');
          return;
        }
      }
    }
    (function(){
      _showPopBoxById("loadingToast");//loading
      var servId = 0;
      if (type == 'video'){
        servId = 100;
      }else if (type == 'audio'){
        servId = 101;
      }
      BWFRI.XaRecommendMiguService({"opPhone":activityId, "rcmdPhone":openid, "servId":servId},{'onResult':function(result) {//业务id，100-咪咕音乐，101-咪咕视频。
        hiddenBox("loadingToast");//loading
        if (result.code ==0){
          if (servId == 100){
            window.location.href = 'http://www.baidu.com?a=100';
          }else if (servId == 101){
            window.location.href = 'http://www.baidu.com?a=101';
          }
        }
      }});
    }());
  }
}());

