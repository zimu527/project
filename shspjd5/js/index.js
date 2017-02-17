var numberRowsInTable;//数据总行数
var page = 1;
var pageSize = 0;//点击更多追加展示的数据行数
var indexPageSize=100;//第一次展示的数据行数
/*一行两张图片的列表展示*/
function showListTwo(result,parentDivClassName,title){
    var oDiv=$('.'+parentDivClassName);
    var oDivTitle=$('<div class="flex-parent border-bottom-line"><p class="'+title+' fs16 two-div-title title">'+result.name+'</p><a class="grey-color right fs16" href="'+result.moreUrl+'">更多精彩>></a></div>');
    oDivTitle.appendTo(oDiv);
    if(result&&result!=undefined&&result.data.length!=undefined&&result.data.length>0){
        if(result.pageSize!=undefined&&result.pageSize!=''){
            indexPageSize=result.indexPageSize;
            pageSize=result.pageSize;
            for(var i=0;i<result.data.length;i++){
                if(i%2==0){
                    var oDivContLeft=$(' <div class="two-line-cont flex-parent flex-parent-a cont1">'+
                        '<a href="'+result.data[i].url+'">' +
                        '<img src="img/dataImg/'+result.data[i].img+'" alt="">' +
                        '<p class="img-title fs13">'+result.data[i].title+'</p>' +
                        '</a>');
                    //oDivContLeft.appendTo(oDiv);
                    if(result.data[(i+1)]!=undefined&&result.data[(i+1)]!=''){
                        var oDivContLeftRight=$('<a href="'+result.data[(i+1)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+1)].img+'" alt="">' +
                            '<p class="img-title fs13">'+result.data[(i+1)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContLeftRight.appendTo(oDivContLeft);
                    }
                    oDivContLeft.appendTo(oDiv);
                }
            }

            numberRowsInTable = oDiv.find('.two-line-cont').length;//数据总行数
            console.log('数据总行数'+numberRowsInTable);
            //显示列表的首页
            onlyFirstPage(parentDivClassName,'two-line-cont');
        }else{
            for(var i=0;i<result.data.length;i++){
                if(i%2==0){
                    var oDivContLeft=$(' <div class="flex-parent flex-parent-a cont1">'+
                        '<a href="'+result.data[i].url+'">' +
                        '<img src="img/dataImg/'+result.data[i].img+'" alt="">' +
                        '<p class="img-title fs13">'+result.data[i].title+'</p>' +
                        '</a>');
                    //oDivContLeft.appendTo(oDiv);
                    if(result.data[(i+1)]!=undefined&&result.data[(i+1)]!=''){
                        var oDivContLeftRight=$('<a href="'+result.data[(i+1)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+1)].img+'" alt="">' +
                            '<p class="img-title fs13">'+result.data[(i+1)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContLeftRight.appendTo(oDivContLeft);
                    }
                    oDivContLeft.appendTo(oDiv);
                }
            }

        }
    }
}
/*一行三张图片的列表展示*/
function showListThree(result,parentDivClassName,title){
    var oDiv=$('.'+parentDivClassName);
    var oDivTitle=$('<div class="flex-parent border-bottom-line"><p class="'+title+' fs16 two-div-title title">'+result.name+'</p><a class="grey-color right fs16" href="'+result.moreUrl+'">更多精彩>></a></div>');
    oDivTitle.appendTo(oDiv);
    if(result&&result!=undefined&&result.data.length!=undefined&&result.data.length>0){
        if(result.pageSize!=undefined&&result.pageSize!=''){
            indexPageSize=result.indexPageSize;
            pageSize=result.pageSize;
            for(var i=0;i<result.data.length;i++){
                if(i%3==0){
                    var oDivContLeft=$(' <div class="three-line-cont flex-parent2 flex-parent cont2">'+
                        '<a href="'+result.data[i].url+'">' +
                        '<img src="img/dataImg/'+result.data[i].img+'" alt="">' +
                        '<p class="img-title fs13 center">'+result.data[i].title+'</p>' +
                        '</a>');
                    //oDivContLeft.appendTo(oDiv);
                    if(result.data[(i+1)]!=undefined&&result.data[(i+1)]!=''){
                        var oDivContMiddleRight=$('<a href="'+result.data[(i+1)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+1)].img+'" alt="">' +
                            '<p class="img-title fs13 center">'+result.data[(i+1)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContMiddleRight.appendTo(oDivContLeft);
                    }
                    if(result.data[(i+2)]!=undefined&&result.data[(i+2)]!=''){
                        var oDivContRight=$('<a href="'+result.data[(i+2)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+2)].img+'" alt="">' +
                            '<p class="img-title fs13 center">'+result.data[(i+2)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContRight.appendTo(oDivContLeft);
                    }
                    oDivContLeft.appendTo(oDiv);
                }
            }

            numberRowsInTable = oDiv.find('.three-line-cont').length;//数据总行数
            console.log('数据总行数'+numberRowsInTable);
            //显示列表的首页
            onlyFirstPage(parentDivClassName,'three-line-cont');
        }else{
            for(var i=0;i<result.data.length;i++){
                if(i%3==0){
                    var oDivContLeft=$(' <div class="flex-parent2 flex-parent cont2">'+
                        '<a href="'+result.data[i].url+'">' +
                        '<img src="img/dataImg/'+result.data[i].img+'" alt="">' +
                        '<p class="img-title fs13 center">'+result.data[i].title+'</p>' +
                        '</a>');
                    //oDivContLeft.appendTo(oDiv);
                    if(result.data[(i+1)]!=undefined&&result.data[(i+1)]!=''){
                        var oDivContMiddleRight=$('<a href="'+result.data[(i+1)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+1)].img+'" alt="">' +
                            '<p class="img-title fs13 center">'+result.data[(i+1)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContMiddleRight.appendTo(oDivContLeft);
                    }
                    if(result.data[(i+2)]!=undefined&&result.data[(i+2)]!=''){
                        var oDivContRight=$('<a href="'+result.data[(i+2)].url+'">' +
                            '<img src="img/dataImg/'+result.data[(i+2)].img+'" alt="">' +
                            '<p class="img-title fs13 center">'+result.data[(i+2)].title+' </p>' +
                            '</a>' +
                            '</div>');
                        oDivContRight.appendTo(oDivContLeft);
                    }
                    oDivContLeft.appendTo(oDiv);
                }
            }
        }
    }
}
/*左边图片右边文字说明*/
function showListLeftImg(result,parentDivClassName){
    var oDiv=$('.'+parentDivClassName);
    var oDivTitle=$('<div class="flex-parent border-bottom-line"><p class="fs16 film-title title">'+list2.name+'</p><a class="green-color right fs16" href="'+list2.moreUrl+'">更多精彩>></a></div>');
    oDivTitle.appendTo(oDiv);
    for(var i=0;i<list2.data.length;i++){
        var contList=$('<a class="cont-list fs12" href="'+list2.data[i].url+'">');
        if(list2.data[i].img!=''){
            var contListMin=$('<img class="cont-list-img" src="img/dataImg/'+list2.data[i].img+'" alt=""><div class="cont-list-info">' +
                '<p class="cont-list-title fs16 green-color">'+list2.data[i].title+'</p>' +
                '<p class="cont-list-cont">'+GetLength(list2.data[i].cont,40)+'</p>' +
                '<p class="cont-list-cont">'+list2.data[i].num+'次播放</p>' +
                '</div></a>');
        }else {
            var contListMin=$('<div class="cont-list-img"></div><div class="cont-list-info">' +
                '<p class="cont-list-title fs16 green-color">'+list2.data[i].title+'</p>' +
                '<p class="cont-list-cont">'+GetLength(list2.data[i].cont,50)+'</p>' +
                '<p class="cont-list-cont">'+list2.data[i].num+'次播放</p>' +
                '</div></a>');
        }
        contListMin.appendTo(contList);
        contList.appendTo(oDiv);
    }
}
$('.top-href').attr('href',url.activeUrl);
/*攻略*/
function showRule(result,parentDivClassName) {
    var oRule = $('.'+parentDivClassName);
    var oRuleCont = $('<div class="rule-cont fs14"></div>');
    for (var i = 0; i < result.cont.length; i++) {
        $('<p>'+result.cont[i]+'</p>').appendTo(oRuleCont);
    }
    oRuleCont.appendTo(oRule);
    $('.active-time').text(result.time);
}
$('.pic').attr('href',url.activeUrl);
$('.go-home').attr('href',url.returnHomePageUrl);
/*直播*/
function addTopCont(result,parentDivClassName){
    var oDiv=$('.'+parentDivClassName);
    var oDivTitle=$('<div class="flex-parent border-bottom-line"><p class="fs16 live-show title">'+result.name+'</p><a class="right fs16" href="'+result.moreUrl+'">更多直播>></a></div>');
    oDivTitle.appendTo(oDiv);
    var oImgBox=$('<a class="fs0 live-box" href="'+result.url+'"><img class="imgWidth100" src="img/dataImg/'+result.img+'"></a>');
    oImgBox.appendTo(oDiv);
}
$('.live-show');
//下一页
function next(lineName){
    currentRow = indexPageSize+pageSize * (page-1);
    maxRow = currentRow + pageSize;
    if ( maxRow >=numberRowsInTable ) {//尾页
        $('.returnBtn').remove();
        maxRow = numberRowsInTable;
    }
    for ( var i = currentRow; i< maxRow; i++ ){
        $('.'+lineName).eq(i).show();
        $('.line').eq(i).show();
    }
    page++;
/*
    if ( maxRow == numberRowsInTable ) { //尾页只显示上一页按钮
        //$('.btn').remove();
        var hasNo = $('<div class="grey returnBtn fs20">(○^～^○) 没有啦~</div>');
        hasNo.appendTo('.main');
    }else{
        showNextBtn();
    }
*/
}

//只显示首页数据   隐藏除了首页数据的表格
function onlyFirstPage(parentDivClassName,lineName){
    //alert("ff")
    if ( indexPageSize < numberRowsInTable){//有多页数据
        console.log('数据总行数'+numberRowsInTable);
        for ( var i = indexPageSize; i<numberRowsInTable; i++ ){
            $('.'+lineName).eq(i).hide();
            $('.line').eq(i).hide();
        }
        var btnNext = $('<div class="returnBtn fs12 red" onclick="next(\''+lineName+'\')">查看更多>></div>');
        btnNext.appendTo('.'+parentDivClassName);
    }
}
function showNextBtn(parentDivClassName){

}
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
document.body.addEventListener('touchDivt',function(){});
