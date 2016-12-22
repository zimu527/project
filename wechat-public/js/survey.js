// JavaScript Document

if(ti == 'undefined' || ti == null || ti == "" || de == 'undefined' || de == null || de == "" || im == 'undefined' || im == null || im == ""){
    wxShare(surveyTitle , surveyDesc , surveyImg , surveyUrl);
}else{
    wxShare(ti , de , im , surveyUrl);
}

$(document).ready(function(){
    //题目序号
    var oQuestions=$(".question").find(".questionNo");
    for(var i=0;i<oQuestions.length;i++){
        oQuestions.eq(i).text(i+1);
    }
    checkStatusUnable();//判断活动是否开始
    $("input[type='radio']").click(function(){
    	checkStatusUnable();//判断活动是否开始
    });
    $("input[type='checkbox']").click(function(){
    	checkStatusUnable();//判断活动是否开始
    });
    getMyAnswer();
});

function checkStatusUnable(){
	if(status==1){//未开始
	    popBoxAlert("","活动未开始！");
	}else if(status==2){
	    popBoxAlert("","来晚了~活动结束了！ ");
	}
}

//已答题,获取答案信息
function getMyAnswer(){
    _showPopBoxById("loadingToast");
    var onResult = getMyAnswerOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ResearchGetMyAnswerService({'openid':opId,'researchId':researchId} , resultProcessor);
}
function getMyAnswerOnResult(result){
    hiddenBox("loadingToast");//loading
    if(result.code != 0) {
        if(result.code==1)
            popBoxAlert("错误提示","参数不全或不合法");
        else
            popBoxAlert("错误提示","发生异常");
    }else{
        if(result.data.result==0){//未答题
        	if($(".transactionBtn").hasClass('grey')){
    			$(".transactionBtn").removeClass('grey');
    			$(".transactionBtn").addClass('blue');
    		}
    		$(".transactionBtn").click(function(){
    			application();
    	    });
        }else if(result.data.result==1){//已答题
            if(result.data.name!=null&&result.data.name!=undefined||result.data.name!=''){
                $("input[name='name']").val(result.data.name);
            }
            if(result.data.tel!=null&&result.data.tel!=undefined||result.data.tel!=''){
                $("input[name='phone']").val(result.data.tel);
            }
            if(result.data.addr!=null&&result.data.addr!=undefined||result.data.addr!=''){
                $("input[name='address']").val(result.data.addr);
            }
            if(result.data.remark!=null&&result.data.remark!=undefined||result.data.remark!=''){
                $("textarea[name='note']").val(result.data.remark);
            }

            var oLis=$(".question");
            for(var i= 0;i<result.data.answers.length;i++){
                if(result.data.answers[i].qid!=undefined){
                    var question=(oLis.find("li").attr("qId")==result.data.answers[i].qid);
                    for(var j=0;j<result.data.answers[i].answer.length;j++){
                        $("input[value="+result.data.answers[i].answer[j]+"]").attr("checked",true);
                    	//$("input[name='question2']").attr("checked",true);
                    }
                }
            }
            //禁止修改选项
            $(":radio").attr("disabled", true);
            $(":checkbox").attr("disabled", true);
            $(".userInfo input").attr("readonly","readonly");
            $(".userInfo textarea").attr("readonly","readonly");
        }
    }


}
//提交
var answers=[];
var name;
var phone;
var address;
var note;
function application(){
    //获取选择题答案
    var oLis=$(".question").find("li");
    for(var i=0;i<oLis.length;i++){
        oLis.eq(i).find("p").removeClass('red');
        //单选
        if((oLis.eq(i).find("input").attr("type"))=='radio'){
            if(oLis.eq(i).find($('input:radio:checked')).val()==undefined||oLis.eq(i).find($('input:radio:checked')).val()==""){
                oLis.eq(i).find("p").addClass('red');//没有任何选项被选中的题目变成红色
                continue;
            }
            var answer=[];
            answer[0]=oLis.eq(i).find($('input:radio:checked')).val();
            answers.push({
                'qid':oLis.eq(i).attr("qId"),
                'answer':answer
            });
        //多选
        }else if((oLis.eq(i).find("input").attr("type"))=='checkbox'){
            answers.push({
                'qid':oLis.eq(i).attr("qId"),
                'answer':chk(oLis.eq(i))
            });
        }
    }
    for(var j=0;j<oLis.length;j++){//判断题目是否全部完成
        if(oLis.eq(j).find("p").hasClass('red')) {
            popBoxAlert('小提示', "还没做完呢！加油！");
            return;
        }
    }

    //获取参与调研人信息
    if($("input[name='name']").length >= 1){//如果存在姓名输入框
		name = $("input[name='name']").val();
        if(name == '' || name == 'undefined') {
            popBoxAlert("错误提示", '请填写姓名');
            return;
        }
        if(name.length > 10){
            popBoxAlert("错误提示" , "姓名的最大长度为10，请重新输入");
            return false;
        }
        
    }
    if($("input[name='phone']").length >= 1){//如果存在手机号输入框
		phone=$("input[name='phone']").val();
        if(phone==''||phone==undefined){
            popBoxAlert("错误提示",'请填写手机号');
            return;
        }else if(phone.length != 11){
            popBoxAlert("错误提示",'请填写正确的手机号');
            return;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))){
            popBoxAlert("错误提示",'请填写正确的手机号');
            return;
        }
        
    }
    if($("input[name='address']").length>=1){
		address=$("input[name='address']").val();
        if(address==''||address==undefined){
            popBoxAlert("错误提示",'请填写联系地址');
            return;
        }
        if(address.length > 50){
            popBoxAlert("错误提示" , "地址的最大长度为50，请重新输入");
            return false;
        }
        
    }
    if($("textarea").length>=1){
		note=$("textarea").val();
        if(note==''||note==undefined){
            popBoxAlert("错误提示",'请备注下意见哦');
            return;
        }
        if(note.length > 100){
            popBoxAlert("错误提示" , "备注的最大长度为100，请重新输入");
            return false;
        }
        
    }
    comfirmPopBox('小提示','提交后不可修改，您确定提交吗？','postResearchAnswer()');
}
//传入多选题li，被选中的值放入数组中返回
function chk(obj){
	//取到对象数组后，我们来循环检测它是不是被选中 
	var s=[]; 
	for(var i=0; i<obj.find("input[type=checkbox]:checked").length; i++){ 
		if(obj.find("input[type=checkbox]:checked").eq(i).val() != undefined||obj.find("input[type=checkbox]:checked").eq(i).val() != ''){
            s.push(obj.find("input[type=checkbox]:checked").eq(i).val()); //如果选中，将value添加到变量s中
        }
	}
    if(s==''||s==null){//如果没有选项被选中，题目变成红色
       obj.find("p").addClass('red');
    }
	return s;
}
function postResearchAnswer(){
    //禁止修改选项-------------------------------------------------------------------------记得取消注释
    $(":radio").attr("disabled", true);
    $(":checkbox").attr("disabled", true);
    $(".userInfo input").attr("readonly","readonly");
    $(".userInfo textarea").attr("readonly","readonly");
    if($(".transactionBtn").hasClass('blue')){
		$(".transactionBtn").removeClass('blue');
		$(".transactionBtn").addClass('grey');
	}
    $('.transactionBtn').unbind("click");

    hiddenBox('confirm');
    _showPopBoxById("loadingToast");
    //console.log(answers);
    var onResult = postResearchAnswerOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ResearchAnswerService({'openid':opId,'researchId':researchId,'answers':answers,'name':name,'tel':phone,'addr':address,'remark':note} , resultProcessor);
}
function postResearchAnswerOnResult(result){
    hiddenBox("loadingToast");//loading
    if(result.code != 0) {
        if(result.code==1)
            popBoxAlert("错误提示","参数不全或不合法");
        else
            popBoxAlert("错误提示","发生异常");
    }else{
        if(result.data.result==0){
            popBoxAlert("","辛苦了~提交成功！");
        }else if(result.data.result==1){
            popBoxAlert("","已答题！");
        }else if(result.data.result==2){
            popBoxAlert("","活动未开始！");
        }else if(result.data.result==3){
            popBoxAlert("","活动已结束！");
        }else if(result.data.result==4){
            popBoxAlert("","不是粉丝！");
        }else if(result.data.result==5){
            popBoxAlert("","不是会员！");
        }else if(result.data.result==6){
            popBoxAlert("","没有题目！");
        }else if(result.data.result==7){
            popBoxAlert("","答题不全！");
        }
    }
}
