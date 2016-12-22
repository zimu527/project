/**
 * Created by Administrator on 2016/11/24.
 */
var oUl=$('<ul></ul>');
for(var i=0;i<list.length;i++){
    var oLi=$('<li><a href="javascript:void(0);" class="option" name="'+i+'">'+list[i].name+'</a></li>');
    oLi.appendTo(oUl);
    var oCont=$('<div class="cont hide"></div>');
    for(var j=0;j<list[i].data.length;j++){
        if(list[i].data[j].url!=''){
            var contList=$('<a class="cont-list" href="'+list[i].data[j].url+'"><img src="img/newsList/'+list[i].data[j].img+'" alt="">');
        }else {
            var contList=$('<a class="cont-list" href="javascript:void(0);"><img src="img/newsList/'+list[i].data[j].img+'" alt="">');
        }
        if(list[i].data[j].time&&list[i].data[j].time!=''&&list[i].data[j].time!=undefined){
            var contListTime=$('<div class="cont-list-info"><p class="cont-list-title">'+list[i].data[j].title+'</p>' +
            '<p class="cont-list-cont">'+list[i].data[j].cont+'</p><div class="cont-list-place"><span class="cont-list-time">活动时间：'+list[i].data[j].time+'</span></div></div></a>');

        }else {
            var contListTime=$('<div class="cont-list-info"><p class="cont-list-title">'+list[i].data[j].title+'</p>' +
                '<p class="cont-list-cont">'+list[i].data[j].cont+'</p><div class="cont-list-place"></div></div></a>');
        }
        contListTime.appendTo(contList);
        contList.appendTo(oCont);
    }
    oLi.appendTo(oUl);
    oCont.appendTo('.main');
    $(".cont-list:last").css('border','none');
}
oUl.appendTo('.header');
$(".option:first").addClass("selected");
$('.cont:first').show();

//切换选项卡
$(".option").click(
    function(){
        var optionList=$('.option');
        for(var i=0;i<optionList.length;i++){
            if(optionList.eq(i).hasClass("selected")){
                $(optionList.eq(i)).removeClass("selected");
                $('.cont').eq(i).hide();
            }
        }
        $(this).addClass("selected");
        $('.cont').eq(parseInt($(this).attr("name"))).show();
    }
);
//削字
function GetLength(str,x){
    var realLength=0;
    var newStr="";
    for(var i=0; i<str.length; i++) {
        var charCode=str.charCodeAt(i);
        if(charCode>=0 && charCode<=128){
            realLength+=1;
        }else{
            realLength+=2;
        }
        if(realLength<=x){
            newStr+=str[i];
        }else{
            newStr+="...";
            break;
        }
    }
    return newStr;
}
document.body.addEventListener('touchstart',function(){});