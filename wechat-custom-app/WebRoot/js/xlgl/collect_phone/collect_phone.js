(function(){
    $('.js-submit-btn').on('click', function(){
        FeedbackSubmit();
    });		
})();
//提交
function XlglCollectPhone(){
	var phone = $('input[name="phone"]').val();
    if (phone == undefined && phone == null && phone == ''){//选填
        popBoxAlert('小提示','请填写正确的手机号！');
        return;
    }else if (!(/^1[34578]\d{9}$/.test(phone))) {
        popBoxAlert('小提示','请填写正确的手机号！');
        return;
    }else{
        _showPopBoxById("loadingToast");//loading
        $('.js-submit-btn').off('click');
        var onResult = XlglCollectPhoneOnResult;
        var resultProcessor = {
            'onResult':onResult
        };
        BWFRI.XlglCollectPhoneService({'phone':phone, 'label':'xlgl_collect_phone'} , resultProcessor);
    }  
}
function XlglCollectPhoneOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert('小提示','网络不给力，刷新重试~');
    } else {
        var phone = $('input[name="phone"]').val('');
        popBoxAlert('小提示','提交成功！');
    }
}