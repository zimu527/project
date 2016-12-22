/**
 * Created by ruyz on 2016/10/12.
 */
//轮播图
var swiperSlideList=$(".swiper-slide");//必须在插件外部获取，否则受插件影响不能取得正确个数
function changeHeight () {
    var ratioOfPic = 2 / 1//滚动图图片宽高比例
    $('.module img').css('height', parseInt($('body').width() / ratioOfPic)+'px');
    //顶部轮播图
    var swiper = new Swiper('#home-swiper', {
        pagination: '.swiper-pagination',
        paginationClickable: true,//值为true时,点击分页器的指示点时会发生Swiper
        loop: true,
        autoplay: 3000,//自动切换的时间间隔(单位ms),不设定该参数slide不会自动切换。
        autoplayDisableOnInteraction: false//用户操作swiper之后,是否禁止autoplay。
    });
    if(swiperSlideList.length<=1){//只有一张图时，不显示滚图效果
        swiper.stopAutoplay();
        $(".swiper-pagination").hide();
    }
}

//绘制流量详情
function queryTraffic(result) {
	//hiddenBox("loadingToast");//loading
    if(result==''||result==null){
        $('.header').hide();
        $('.module').hide();
        $('.main').html('<div class="div404"><img class="img404" alt="" src="img/queryTraffic/img2404.png"><p class="info404">网络不给力，刷新重试~</p></div>');
    }else{
        if(result.resultInfo==null||result.resultInfo==undefined||result.resultInfo.code!=0){
            $('.header').hide();
            $('.module').hide();
            $('.main').html('<div class="div404"><img class="img404" alt="" src="img/queryTraffic/img2404.png"><p class="info404">没有查到您的流量套餐信息哦~</p></div>');
        }else{//创建流量详情列表
            $('.header').show();
            $('.module').show();
            if($('.module').find("img")&&$('.module').find("img").length>0){
                console.log("ok")
                changeHeight();
            }
            createLine("line-all",result.usedData,result.leftData+result.usedData);
            var leftValue=unitConversion(result.leftData);
            var usedValue=unitConversion(result.usedData);
            var allValue=unitConversion(result.leftData+result.usedData);
            $(".left-flow").text(leftValue);
            $(".phone").text(result.phone);
            $(".used-flow").text(usedValue);
            $(".total-flow").text(allValue);

            if(result.dataList!=undefined&&result.dataList.length!=undefined&&result.dataList.length>0){
                var flag=null;//是否有流量小类的标识
                for (var i = 0; i < result.dataList.length; i++) {
                    //if (result.measureId == 103) {
                        var oBusinessList = $('<div class="business-list"></div>');//创建流量大类列表
                        var productList = $('<div class="product-list"><p class="business-name">' + result.dataList[i].name + '</p></div>');//流量大类内容
                        var bottomLine=$('<img class="bottom-line" src="img/queryTraffic/ll1028004.png" alt="">');//流量大类下划线
                        if(result.dataList[i].resList&&result.dataList[i].resList.length!=undefined&&result.dataList[i].resList.length>0){
                            for (var j = 0; j < result.dataList[i].resList.length; j++) {
                                //if(result.dataList[i].resList[j].measureId==103){//流量，小类内容
                                    if (result.dataList[i].resList[j].freeResFlag == 3000) {//结转流量
                                        var oProduct = $('<div class="product-info"><span class="product-name">结转' + result.dataList[i].resList[j].productName + '</span>' +
                                            '<span class="product-left-flow">剩余<span class="product-left-value red">'+unitConversion(result.dataList[i].resList[j].remainValue)+'</span></span></div>');
                                    } else {
                                        var oProduct = $('<div class="product-info"><span class="product-name">' + result.dataList[i].resList[j].productName + '</span>' +
                                            '<span class="product-left-flow">剩余<span class="product-left-value red">'+unitConversion(result.dataList[i].resList[j].remainValue)+'</span></span></div>');
                                    }
                                    var oProductHtml = $('<span class="product-value clear"><span class="all-value">共' +
                                        unitConversion((result.dataList[i].resList[j].usedValue + result.dataList[i].resList[j].remainValue)) + '</span><span class="used-value">已用' +
                                        unitConversion(result.dataList[i].resList[j].usedValue) + '</span></span>');
                                    var oLine = $('<div class="proportion proportion-width clear" id="container'+i + j + '"><img class="black-line" src="img/queryTraffic/ll1028003.png" alt="">' +
                                        '<div class="red-line-box"><img class="proportion-width" src="img/queryTraffic/ll1028003_1.png" alt=""></div></div>');
                                    oProductHtml.appendTo(oProduct);
                                    oLine.appendTo(oProduct);
                                    oProduct.appendTo(productList);
                                    flag=true;
                                //}
                            }
                            if(flag){//有流量小类，把流量大类插入列表
                                bottomLine.appendTo(productList);
                                productList.appendTo(oBusinessList);
                                flag=false;
                            }
                        }
                    //}
                    oBusinessList.appendTo(".cont-list");
                }
            }
            $(".proportion-width").width($(".main").width());
            //获取流量条宽度
            if(result.dataList!=undefined&&result.dataList.length!=undefined&&result.dataList.length>0){
                for(var m=0;m<result.dataList.length;m++){
                    if(result.dataList[m].resList!=undefined&&result.dataList[m].resList.length!=undefined&&result.dataList[m].resList.length>0){
                        for(var n=0;n<result.dataList[m].resList.length;n++){
                            createLine('container' + m + n, result.dataList[m].resList[n].usedValue, result.dataList[m].resList[n].usedValue + result.dataList[m].resList[n].remainValue);
                        }
                    }
                }
            }
        }
    }
}
function createLine(id,used,all){//父元素id，已用流量，总流量
    var lineWidth=$("#"+id).width();
    if(all>0){
        var lineProportion = (used / all).toFixed(2);
        var redLineWidth=lineProportion*lineWidth;
        //console.log(id+":"+lineWidth+lineProportion+";"+redLineWidth);
        $("#"+id).find(".red-line-box").animate({width:redLineWidth},1000);
    }
}
//流量单位转换
function unitConversion(data) {
    var data = data;
    if (isNaN(data)) {
        data = Number(data);
    }
    if (data > 1000 * 1024 * 1024) {
        data = (data / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    } else {
        data = (data / (1024 * 1024)).toFixed(2) + 'MB';
    }
    return data;
}