/**
 * Created by Administrator on 2016/11/25.
 */
//var oUl=$('<ul></ul>');
//for(var i=0;i<list.length;i++){
    //var oLi=$('<li><a href="javascript:void(0);" class="option" name="'+i+'">'+list[i].name+'</a></li>');
    //oLi.appendTo(oUl);
    var oCont=$('<div class="cont"></div>');
    for(var j=0;j<list.length;j++){
        if(list.url!=''){
            var contList=$('<a class="cont-list" href="'+list[j].url+'"><img src="img/newsList/'+list[j].img+'" alt="">' +
                '<div class="cont-list-info"><p class="cont-list-title">'+list[j].title+'</p>' +
                '<p class="cont-list-cont">'+list[j].cont+'</p><div class="cont-list-place">' +
                '<span class="cont-list-time">活动时间：'+list[j].time+'</span></div></div></a>');
        }else {
            var contList=$('<a class="cont-list" href="javascript:void(0);"><img src="img/newsList/'+list[j].img+'" alt="">' +
                '<div class="cont-list-info"><p class="cont-list-title">'+list[j].title+'</p>' +
                '<p class="cont-list-cont">'+list[j].cont+'</p><div class="cont-list-place">' +
                '<span class="cont-list-time">活动时间：'+list[j].time+'</span></div></div></a>');

        }
        contList.appendTo(oCont);
    }
    //oLi.appendTo(oUl);
    oCont.appendTo('.main');

//}
//oUl.appendTo('.header');
/*$(".option:first").addClass("selected");
$('.cont:first').show();*/

