/**
 * Created by wq on 2016/10/28.
 */

/***
 * comfirm弹出框
 * @param title 标题
 * @param msg 消息
 * @param clickop 操作事件
 * @return
 */
function comfirmPopBox(title, msg, clickop){
    var divId = "confirm";
    $("#" + divId).find("#confirmBoxTitle").text(title);
    $("#" + divId).find("#confirmMessageCont").text(msg);
    $("#" + divId).find("#confirmCancelBtn").attr("onclick",'hiddenBox(\'confirm\')');
    $("#" + divId).find("#confirmAgreeBtn").attr("onclick", clickop);
    _showPopBoxById(divId);
}

/***
 * Alert弹出框
 * @param title 标题
 * @param msg 消息
 * @return
 */
function popBoxAlert(msg){
    var divId = "popBoxAlert";
    // $("#" + divId).find("#alertBoxTitle").text(title);
    $("#" + divId).find("#alertMessageCont").html(msg);
    $("#" + divId).find("#alertAgreeBtn").attr("onclick",'hiddenBox(\'popBoxAlert\')');
    _showPopBoxById(divId);
}

/***
 * 显示box
 * @param id  box id
 * @return
 */
function _showPopBoxById(id){
    $("#"+id).removeClass("hide");
}

function hiddenBox(id){
    $("#"+id).addClass("hide");
}
/***
 * 显示box  显示loading里面的文字text
 * @param id  box id
 * @return
 */
function _showPopBox(id , text){
    $("#"+id).removeClass("hide");
    $(".weui_toast_content").html(text);
}

/***
 * Alert弹出框
 * @param title 标题
 * @param msg 消息
 * @return
 * 点击确定，调用函数
 */
function popBoxAlertClick(title, msg , newFunc){
    var divId = "popBoxAlert";
    $("#" + divId).find("#alertBoxTitle").text(title);
    $("#" + divId).find("#alertMessageCont").html(msg);
    $("#" + divId).find("#alertAgreeBtn").attr("onclick" , newFunc);
    _showPopBoxById(divId);
}
