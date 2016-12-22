/**
 * Created by wq on 2016/10/18.
 */
//获取业务信息
function businessInfo(){
    var onResult = businessInfoOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.({} , resultProcessor);
}
function businessInfoOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
    }else {
        //业务名称，酬劳，业务图

    }
}