/**
 * Created by ruyz on 2016/10/8.
 */
var overlordUrl = getRootUrl()+"exam.do?op=index&a="+activityId+"&aw="+aw;//获取首页地址
wxShare(overlordTitle , overlordDesc , overlordImg , overlordUrl);

//学霸成绩单
function examGetReport(){
    _showPopBoxById("loadingToast");//loading
    var onResult = examGetReportOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ExamGetReportService({'activityId':activityId,'openId':opId} , resultProcessor);
}
function examGetReportOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        popBoxAlert("",'不给力，刷新重试~');
    } else {
        //console.log(result);
        $(".name").text(result.data.name);
        $(".phone").text(result.data.phone);
        $(".department").text(result.data.department);
        $(".score").text((result.data.ringNum*4));
        creatQuestionlist(result.data.questions,1);
    }
}

//判断是否答题
var checkExamStatusFlag;
function checkExamStatus(){
    _showPopBoxById("loadingToast");//loading
    var onResult = checkExamStatusOnResult;
    var resultProcessor2 = {
        'onResult':onResult
    };
    BWFRI.ExamGetQuestionsService({'openId':opId,'activityId':activityId} , resultProcessor2);
}
function checkExamStatusOnResult(result) {
     hiddenBox("loadingToast");//loading
    //if(result.code == 191){
       // alert('true')
       // checkExamStatusFlag= true;
        //    判断活动是否开始
        if(status==1){//未开始
            popBoxAlert("","活动未开始！");
            $('.startAnswer-btn').on('click',function(){
                popBoxAlert("","活动未开始！");
            });
        }else if(status==2){
            if(result.code == 191){
                var startAnswerUrl='exam.do?op=getReport&a='+activityId+'&aw='+aw;
                $('.startAnswer-btn').attr('href',startAnswerUrl);
            }else{
                $('.startAnswer-btn').on('click',function(){
                    popBoxAlert("","活动已结束！");
                });
            }
            popBoxAlert("","活动已结束！");
        }else if(status==9){
            popBoxAlert("","活动未启用！ ");
            $('.startAnswer-btn').on('click',function(){
                popBoxAlert("","活动未启用！");
            });
        }else{
            var startAnswerUrl='exam.do?op=doExam&a='+activityId+'&aw='+aw;;
            $('.startAnswer-btn').attr('href',startAnswerUrl);
        }
    //}
}
//获取题目
function getQuestionList(){
    _showPopBoxById("loadingToast");//loading
    var onResult = getQuestionListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.ExamGetQuestionsService({'openId':opId,'activityId':activityId} , resultProcessor);
}
function getQuestionListOnResult(result) {
    hiddenBox("loadingToast");//loading
    if(result.code == 0){
        creatQuestionlist(result.data.questions,'0');
        timer = setInterval(function(){ShowCountDown(startTime);}, interval);
        $('.footer').show();
    }else if(result.code == 191){
        $("#questionlist").html('<p class="center">您已经参加过该活动~</p>');
        $('.time').text('');
    }else{
        popBoxAlert("",'不给力，刷新重试~');
    }
}

//提交答案
var flag=true;
function submitAnswer(){
    application();
    if(flag){
    	clearInterval(timer);//停用计时器
        var endTime=new Date();
        costTime=(parseFloat(endTime.getTime()-startTime.getTime())/1000).toFixed(2);   //相差秒数
        console.log(costTime);
        $(".footer").hide();
        _showPopBoxById("loadingToast");//loading
        var onResult = submitAnswerOnResult;
        var resultProcessor = {
            'onResult':onResult
        };
        BWFRI.ExamSubmitService({'openId':opId,'activityId':activityId,'answers':answers,'name':name,'costTime':costTime,'phone':phone,'department':department} , resultProcessor);
    }
    //console.log(answers);
}
function submitAnswerOnResult(result) {
    hiddenBox("loadingToast");//loading
    if (result.code != 0) {
        if(result.code==0){
            popBoxAlert("","提交失败，错误信息："+result.message);
        }else{
            popBoxAlert("",'不给力，刷新重试~');
        }
    } else {
        window.top.location.href = "exam.do?op=getReport&a="+activityId+'&aw='+aw;
    }
}

//绘制题目
function creatQuestionlist(data,type){//type=0是答题前，type=1是答题后
    $("#questionlist").html('');
    var optionWords=["A","B","C","D","E"];
    for(var i=0;i<data.length;i++){
        var fieldset=$('<fieldset></fieldset>');
        if(data[i].type=='0'){//单选
            var oDiv=$('<div class="radio" qid="'+data[i].id+'"></div>');
            var oTitle=$('<p><span class="questionNo">'+(i+1)+'、</span><span>'+data[i].question+'</span><span class="questionType">（单选）</span></p>');
            var oDiv2=$('<div></div>');
            for(var j=0;j<data[i].options.length;j++){
                var olabel=$('<label class="radio-option option-'+optionWords[j]+'" title="'+data[i].options[j].title+'">' +
                    '<input type="radio" name="radio'+data[i].id+'" id="'+data[i].options[j].id+'" value="'+data[i].options[j].title+'"/>' +
                    '<span>'+data[i].options[j].title+'</span>. ' +
                    '<i>'+data[i].options[j].content+'</i></label>');
                olabel.appendTo(oDiv2);
                //console.log(data[i].options[j].content)
            }
            oTitle.appendTo(oDiv);
            oDiv2.appendTo(oDiv);
        }else if(data[i].type=='1'){//多选
            var oDiv=$('<div class="checkbox" qid="'+data[i].id+'"></div>');
            var oTitle=$('<p><span class="questionNo">'+(i+1)+'、　</span><span>'+data[i].question+'</span><span class="questionType">（多选）</span></p>');
            var oDiv2=$('<div></div>');
            for(var j=0;j<data[i].options.length;j++){
                var olabel=$('<label class="checkbox-option option-'+optionWords[j]+'" title="'+data[i].options[j].title+'">' +
                    '<input type="checkbox" name="checkbox'+data[i].id+'" id="'+data[i].options[j].id+'" value="'+data[i].options[j].title+'"/>' +
                    '<span>'+data[i].options[j].title+'</span>. ' +
                    '<i>'+data[i].options[j].content+'</i></label>');
                olabel.appendTo(oDiv2);
            }
            oTitle.appendTo(oDiv);
            oDiv2.appendTo(oDiv);
        }
        oDiv.appendTo(fieldset);
        fieldset.appendTo("#questionlist");
        if(type==1){
            //console.log(userAnswerNum)
            var questionField=$("fieldset").eq(i);
            if(data[i].rightAnswer!=null&&data[i].rightAnswer!=undefined&&data[i].rightAnswer!=""&&data[i].rightAnswer==data[i].userAnswer){
                questionField.find(">div p .questionType").addClass("right");
                for(var n=0;n<data[i].options.length;n++){
                    questionField.find('label[title="'+data[i].userAnswer+'"]').addClass("label1");
                }
            }else{
                questionField.find(">div p .questionType").addClass("wrong");
                var answerSpan=$("<span class='answer'></span>");
                answerSpan.text("正确答案："+data[i].rightAnswer);
                answerSpan.appendTo(questionField.find(">div p"));
                for(var n=0;n<data[i].options.length;n++){
                    questionField.find('label[title="'+data[i].userAnswer+'"]').addClass("label1");
                }
            }
        }
    }
    if(type==0){
        addClick();
    }
}

//获取答案
var answers=[];
var phone='';
var name='';
var department='';
function application(){
    //获取参与人信息
    if($("input[name='name']").length >= 1){//如果存在姓名输入框
        name = $("input[name='name']").val();
        if(name == '' || name == 'undefined') {
            popBoxAlert("错误提示", '请填写姓名');
             $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else if(name.length > 10){
            popBoxAlert("错误提示" , "姓名的最大长度为10，请重新输入");
             $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else{
        	flag=true;
        }

    }
    if($("input[name='phone']").length >= 1){//如果存在手机号输入框
        phone=$("input[name='phone']").val();
        if(phone==''||phone==undefined){
            popBoxAlert("错误提示",'请填写手机号');
            $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else if(phone.length != 11){
            popBoxAlert("错误提示",'请填写正确的手机号');
            $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))){
            popBoxAlert("错误提示",'请填写正确的手机号');
             $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else{
        	flag=true;
        }

    }
    if($("input[name='department']").length>=1){
        department=$("input[name='department']").val();
        if(department==''||department==undefined){
            popBoxAlert("错误提示",'请填写部门');
             $('body,html').animate({scrollTop:0},500);
            flag=false;
            return false;
        }else{
        	flag=true;
        }
    }
    //获取选择题答案
    var oLis=$(".questionlist fieldset").find(">div");
    for(var i=0;i<oLis.length;i++){
        oLis.eq(i).find("p").removeClass('red');
        //单选
        //alert((oLis.eq(i).find(">div").length))
        if((oLis.eq(i).hasClass('radio'))){
            if(oLis.eq(i).find('input:radio:checked').val()==undefined||oLis.eq(i).find('input:radio:checked').val()==""){
                oLis.eq(i).find("p").addClass('red');//没有任何选项被选中的题目变成红色
                continue;
            }
            answers.push({
                'questionId':parseInt(oLis.eq(i).attr("qid")),
                'optionId':oLis.eq(i).find('input:radio:checked').attr("id"),
                'answer':oLis.eq(i).find('input:radio:checked').val()
            });
            //多选
        }else if((oLis.eq(i).find("input").attr("type"))=='checkbox'){
            var checkboxResult=chk(oLis.eq(i));
            if(answer=='') {
                obj.find("p").addClass('red');
                continue;
            }
            answers.push({
                'questionId':parseInt(oLis.eq(i).attr("qid")),
                'optionId':checkboxResult.split(';')[1],
                'answer':checkboxResult.split(';')[0]
            });
        }
    }
    for(var j=0;j<oLis.length;j++){//判断题目是否全部完成
        if(oLis.eq(j).find("p").hasClass('red')) {
            popBoxAlert("","还没做完呢！加油！");
             $('body,html').animate({scrollTop:0},500);
            flag=false;
            break;
        }else{
        	flag=true;
        }
    }
}
//传入多选题，被选中的值放入数组中返回
function chk(obj){
    //取到对象数组后，我们来循环检测它是不是被选中
    var optionid='';
    var answer='';
    for(var i=0; i<obj.find("input[type=checkbox]:checked").length; i++){
        if(obj.find("input[type=checkbox]:checked").eq(i).val() != undefined||obj.find("input[type=checkbox]:checked").eq(i).val() != ''){
            answer+=obj.find("input[type=checkbox]:checked").eq(i).val()+','; //如果选中，将value添加到变量answer中
            optionid+=obj.find("input[type=checkbox]:checked").eq(i).attr("id")+','; //如果选中，将id添加到变量optionid中
        }
    }
    if(answer!='') answer=answer.substring(0,answer.length-1);
    if(optionid!='') optionid=optionid.substring(0,optionid.length-1);
    return answer+';'+optionid;
}
//点击选项效果
function addClick() {
    $('.radio-option').bind('click',function(){
        $(this).siblings().removeClass('label1') && $(this).addClass('label1');
        $(this).siblings().find('input[type="radio"]').removeAttr('checked') && $(this).find('input[type="radio"]').attr('checked', 'checked');
    });
    $('.checkbox-option').click(function(){
        if($(this).hasClass("label1")){
            $(this).removeClass('label1')&& $(this).find('input[type="checkbox"]').removeAttr('checked');
            return false;
        }else{
            $(this).addClass('label1')&& $(this).find('input[type="checkbox"]').attr('checked', 'checked');
            return false;
        }
    });
};
document.body.addEventListener('touchstart', function () { });
//计时
var interval = 10;
function ShowCountDown(startTime){
    var nowTime = new Date();
    var t =nowTime.getTime()-startTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    s=(t/1000).toFixed(2);
    //if(s<10) s='0'+s;
    //$("#time").text(s);
}
