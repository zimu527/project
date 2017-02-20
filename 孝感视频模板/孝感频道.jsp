<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs-wml.jsp"%>
<%@ page import="java.text.SimpleDateFormat"%>
<#noparse>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>孝感频道</title>
<%
String whid = (String) request.getParameter("whid") == null ? "" : (String) request.getParameter("whid");
request.setAttribute("whid", whid);
%>
<cms:nodecont var="whcont" nodeid="${whid}" sortKey="ranking" sortType="asc" pagesize="999" dataobjectid="1" />
<c:forEach var="imgs" items="${whcont}" varStatus="imgIndex">
    <c:if test="${fn:contains(imgs.name,'孝感频道')}">
    <c:forEach var="tbimgs" items="${imgs.fields.IMAGES}" varStatus="imgindex">
        <c:if test="${tbimgs.fileType=='channel'}">
        <c:set var="channel_src" value="${tbimgs.src}" scope="request"/>
        </c:if>
        <c:if test="${tbimgs.fileType=='playNum'}">
        <c:set var="playNum_src" value="${tbimgs.src}" scope="request"/>
        </c:if>
    </c:forEach>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'时事资讯')}">
    <c:set var="newsletter_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'名栏连载')}">
    <c:set var="series_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'体育快报')}">
    <c:set var="sports_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'娱乐八卦')}">
    <c:set var="entertainment_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'爆笑短片')}">
    <c:set var="short_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'原创精华')}">
    <c:set var="original_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'少儿天地')}">
    <c:set var="juvenile_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'综艺世界')}">
    <c:set var="variety_src" value="${imgs.fields.IMAGES[0].src}" scope="request"/>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'头部区块')}">
    <c:forEach var="tbimgs" items="${imgs.fields.IMAGES}" varStatus="imgindex">
    <c:if test="${tbimgs.fileType=='logo'}">
    <c:set var="logo_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='search'}">
    <c:set var="search_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='clock'}">
    <c:set var="clock_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='download'}">
    <c:set var="download_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    </c:forEach>
    </c:if>
    <c:if test="${fn:contains(imgs.name,'底部区块'}">
    <c:forEach var="dbimgs" items="${imgs.filds.IMAGES}" varStatus="imgsindex">
    <c:if test="${tbimgs.fileType=='client'}">
    <c:set var="client_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='close'}">
    <c:set var="close_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    </c:forEach>
    </c:if>

    <c:if test="${fn:contains(imgs.name,'图片区块')}">
    <c:forEach var="tbimgs" items="${imgs.fields.IMAGES}" varStatus="imgindex">
    <c:if test="${tbimgs.fileType=='change'}">
    <c:set var="change_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='more'}">
    <c:set var="more_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='laba'}">
    <c:set var="laba_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    <c:if test="${tbimgs.fileType=='channel2'}">
    <c:set var="channel2_src" value="${tbimgs.src}" scope="request"/>
    </c:if>
    </c:forEach>
    </c:if>
</c:forEach>
<style type="text/css">
    /*</#noparse>
<@use templatePath='/WAPPORTALV3/体育栏目模版库/门户/工具/css/olympic'/>
<#noparse>*/
    /*general start*/
    body,p,blockquote,figure,hr,h1,h2,h3,h4,h5,h6,ul,menu,dir,ol,dl,dd,fieldset,input[type=radio],input[type=checkbox],input[type=range],pre {
    margin: 0;
    padding: 0;
    }
    ul,menu,dir,ol,legend,fieldset,input,input[type=password],input[type=search],isindex,textarea,input[type=hidden],input[type=image],input[type=file],input[type=radio],input[type=checkbox],input[type=range],input[type=button],input[type=submit],input[type=reset],button {
    padding: 0;
    }
    input[type=search],input[type=button],input[type=submit],input[type=reset] {
    -webkit-appearance: none;/*移除iOS原生控件样式,解决下无法正常渲染按钮的问题。*/
    }
    h1,h2,h3,h4,h5,h6 {
    font-size: 100%;
    font-weight: 400;
    }
    cite,var,address,em {
    font-style: normal;
    }
    strong {
    font-weight: 400;
    }
    a:-webkit-any-link {
    text-decoration: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    fieldset,iframe {
    border: 0;
    }
    ol,ul {
    list-style: none;
    }
    input,textarea,select,button {
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    margin: 0;
    }
    select,button,input {
    color: inherit;
    }
    p,span{
    display: inline-block;
    white-space: nowrap;/*强制文字不换行*/
    text-overflow: ellipsis;
    overflow: hidden;
    max-width:90%;
    }
    html {
    -webkit-text-size-adjust: none;/*当样式表里font-size<12px时，中文版chrome浏览器里字体显示仍为12px，这时可以用 html{-webkit-text-size-adjust:none;}*/
    }
    html {
    font-size: 100px;
    }
    body {
    font: 14px/1.5 Arial, "Microsoft Yahei";
    min-width: 320px;
    max-width: 480px;
    margin: 0 auto;
    color: #4b4b4b;
    background-color: #efefef;
    position: relative;
    overflow-x: hidden;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 0 -65px;
    -webkit-user-select: none;
    }
    a {
    color: inherit;
    text-decoration: none;
    }
    ul,li,p {
    margin: 0;
    }
    @media only all and (max-width:640px) {
    /* styles for iPhone/Android landscape (and really narrow browser windows) */
    body,input,textarea {
    font-size: 14px;
    }
    }
    em {
    font-style: normal;
    }
    .clearfix {
    zoom: 1;/*Zoom属性是IE浏览器的专有属性， 它可以设置或检索对象的缩放比例。zoom:1能够比较神奇地解决ie下比较奇葩的bug。如外边距（margin）的重叠，浮动的清除，触发ie的 haslayout属性等等。*/
    }
    .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    }
    .extra {
    position: relative;
    }
    .hidden {
    overflow: hidden;
    }
    img{
    border: none;
    vertical-align: middle;
    }
    .hide{display: none!important;}
    /* noscript start */
    #noscript {
    background: #EA6201;
    width: 100%;
    color: #fff;
    text-align: center;
    border-top: 1px solid #cf5702;
    padding: 5px 0px;
    }
    /* header start */
    header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    overflow: hidden;
    height: .45rem;
    line-height: .45rem;
    padding-left: 0.1rem;
    background-color:#221D23;
    background-size: cover;
    }
    .header img{
    height: .3rem;
    }
    header .icon {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    width: .6rem;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto .25rem;
    text-align: center;
    color: #0072bc;
    }
    header .icon-search {
    right:.9rem ;
    background-image: url(${search_src});
    }
    header .icon-clock {
    right: .5rem;
    background-image: url(${clock_src});
    }
    header .icon-download {
    right: 0;
    background-image: url(${download_src});
    }
    /*common css*/
    .container {
    min-height: 320px;
    padding-top: .45rem;
    padding-bottom: 64px;
    }
    .ao-title {
    display: -webkit-box;
    display: flex;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
    font-size: 16px;
    /*border-bottom: 2px solid #000;*/
    color: #000;
    background-image: url(${channel_src});
    background-repeat: no-repeat;
    background-position: 0.07rem center;
    background-size: auto 60%;
    }
    .ao-grid {
    padding-left: 0.07rem;
    }
    .ao-grid li {
    float: left;
    width: 50%;
    }
    .ao-grid a {
    display: block;
    margin: 0 .10rem;
    }
    .ao-grid img {
    display: block;
    width: 100%;
    }
    .ao-grid p {
    height: .28rem;
    line-height: .28rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    }
    .ao-options {
    display: -webkit-box;
    display: flex;
    }
    .ao-options-item {
    display: block;
    width: 50%;
    height: .34rem;
    line-height: .34rem;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    font-size: 12px;
    text-align: center;
    color: #BE9546;
    }
    .ao-options-item span{
    display: inline-block;
    line-height: 34px;
    }
    .ao-options-item img{
    width: 20px;
    height: 20px;
    padding-top: 7px;
    vertical-align: top;
    }
    .ao-options-change {
    background: url(${change_src});
    background-repeat: no-repeat;
    background-position:18.5% center;
    background-size: auto 70%;
    }
    .ao-options-more {
    background: url(${more_src});
    background-repeat: no-repeat;
    background-position:26.5% center;
    background-size: auto 70%;
    }
    .ao-options-item:first-child {
    margin-right: .2rem;
    }
    .module {
    overflow-y: hide;
    height: auto;
    margin-bottom: 10px;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    }
    /*喇叭*/
    .xg-active{
    height: 28px;
    line-height: 28px;
    background-color: #fff;
    border-bottom:1px solid #bbb;
    }
    .xg-active img{
    /*position: absolute;*/
    float: left;
    padding:3px 5px 0 0;
    width: 22px;
    height: 22px;
    }
    .xg-active p{
    display: inline-block;
    white-space:normal;
    }
    /*滚动图*/
    .home-banner img {
    display: block;
    }
    .home-tip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: .27rem;
    line-height: .27rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    }
    .home-tip-text {
    width: 60%;
    padding-left: .12rem;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    }
    /*孝感频道*/
    .xg-channel .ao-title {
    background-image: url(${channel_src});
    }
    .xg-channel .ao-grid{
    padding-right: 0.07rem;
    }
    .live-all .live-item {
    display: -webkit-box;
    display: -moz-box;
    /*display: block;*/
    height: 72px;
    line-height: 16px;
    margin:10px 0 0 0;
    padding-bottom: .1rem;
    border-bottom: 1px solid #dadada;
    }
    .live-img {
    /*float: right;*/
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    width: 1.5rem;
    height: 100%;
    margin-left: .2rem
    }
    .live-img img {
    display: block;
    height: 100%;
    }
    .live-name {
    /*float: left;*/
    border-bottom: 1px solid #fff;
    width: 55%;
    }
    .live-name .live-title{
    width:100%;
    height: 36px;
    line-height: 20px;
    overflow: hidden;
    margin-bottom: 16px;
    }
    .live-name .live-info{
    position: relative;
    height: 20px;
    line-height: 20px;
    }
    .live-name .clickNum{
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 80px;
    height: 20px;
    margin-left: .6rem;
    text-indent: .25rem;
    background:url(${palyNum_src});
    background-size: 0.2rem;
    }
    .live-name span{
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: inline-block;
    width: 100px;
    color: #999;
    }
    .white{
    height: 2px;
    background-color: #fff;
    position: relative;
    top: -1px;
    left: 0;
    }
    /*孝感直播*/
    .xg-live{
    padding: 0;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #e7e7e7;
    }
    /*时事资讯*/
    .newsletter .ao-title{
    background-image: url(${newsletter_src});
    }
    .newsletter li{
    margin-bottom: 10px;
    border-right: 0.07rem solid #fff;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    }
    .newsletter li a{
    margin: 0;
    }
    .newsletter li a p{
    padding-left: .1rem;
    height: 20px;
    line-height: 24px;
    }
    .newsletter li a span{
    display: block;
    padding-left: .1rem;
    font-size: 12px;
    color: #bbb;
    margin-top: -3px;
    }
    /*名栏连载*/
    .series .ao-title{
    background-image: url(${series_src});
    }
    .ao-title-series{
    position: relative;
    left: 0;
    top: 0;
    }
    .ao-title-series span{
    position: absolute;
    right: 0;
    padding-right: 35px;
    font-size: 12px;
    color: #cbcbcb;
    }
    .ao-title-series img{
    position: absolute;
    width: 20px;
    top: 5px;
    right: 0;
    padding-right: .1rem;
    }
    .series .ao-grid{
    padding: 0 .035rem 0;
    }
    .series li{
    width:33.333% ;
    }
    .series li a{
    margin-left: .035rem;
    margin-right: .035rem;
    }
    .series li a p,.series li a span{
    width: 100%;
    text-align: center;
    }
    .series li a span{
    display: inline-block;
    color: plum;
    font-size: 10px;
    }
    /*体育快报*/
    .sports .ao-title{
    background-image: url(${sports_src});
    }
    /*娱乐八卦*/
    .entertainment .ao-title{
    background-image: url(${entertainment_src});
    }
    /*爆笑短片*/
    .short .ao-title{
    background-image: url(${short_src});
    }
    /*原创精华*/
    .original .ao-title{
    background-image: url(${original_src});
    }
    /*少儿天地*/
    .juvenile .ao-title{
    background-image: url(${juvenile_src});
    }
    /*综艺世界*/
    .variety .ao-title{
    background-image: url(${variety_src});
    }
    /*返回顶部*/
    .m-sideBar {
    right: 6px;
    bottom: .8rem;
    z-index: 1001;
    }
    .po-fixed {
    position: fixed;
    }
    .m-sideBar .m-goTop {
    display: block;
    color: #fff;
    width: 45px;
    height: 45px;
    text-align: center;
    margin-top: 5px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.7);
    }
    .m-sideBar .m-goTop .c-glyphicon-arrowUp {
    top: 2px;
    padding-top: 6px;
    }
    @font-face {
    font-family: 'iconography';
    src: url('http://static.iqiyi.com/ext/common/iconography/iconfont.eot');
    src: url('http://static.iqiyi.com/ext/common/iconography/iconfont.ttf') format('truetype'), url('http://static.iqiyi.com/ext/common/iconography/iconfont.svg#iconfont') format('svg')
    }
    .c-glyphicon {
    position: relative;
    display: inline-block;
    font-size: .13rem;
    font-family: 'iconography';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    color: #20bc22;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    .c-glyphicon-arrowUp:before{
    content: "\e60c";
    color: #fff;
    font-size: 20px;
    }
    .m-sideBar span {
    margin-top: -5px;

    font-size: 10px;
    display: block;
    }
    /* footer start */
    .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    height:54px;
    color: #fff;
    background-color: #221D23;
    }
    .footer .options {
    position: relative;
    display: -webkit-box;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    }
    .footer .options img{
    position: absolute;
    top: 9px;
    left:  10px;
    width: 36px;
    }
    .footer .options p{
    position: absolute;
    top: 9px;
    left:  50px;;
    white-space: normal;
    width: 100%;
    line-height: 18px;
    text-align: left;
    color: #339933;
    font-size: 14px;
    }
    .footer .options p span{
    color: #fff;
    font-size: 11px;
    opacity: .7;
    }
    .footer .options a {
    position: absolute;
    display: inline-block;
    right: 24px;
    top: 11px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    border-radius: 6px;
    padding: 6px 0px;
    text-align: center;
    background-color: #00CC00;
    color: #000;
    font-size: 14px;
    }
    .footer .dl-close {
    width: 22px;
    height: 22px;
    background-image: url(${close_src});
    background-position: 50%;
    background-size: 13px;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 16px;
    }
    .waring-to {
    width: 100px;
    margin: 0 auto;
    color: #969696;
    background: #efefef;
    position: relative;
    z-index: 5;
    }
    </style>
</head>
<body>
<!--start|头部区块-->
<c:forEach var="s1" items="${whcont}" varStatus="index">
<c:if test="${fn:contains(s1.name,'头部区块')}">
<noscript>
        <div id="noscript">您当前的浏览器不支持JavaScript脚本</div>
</noscript>
<header class="header">
    <img src=${logo_src} alt="">
        <a <c:if test="${fn:contains(s1.fields.AUTHOR,'1')}">href="${s1.fields.LABLE1}"</c:if> class="icon icon-search"></a>
        <a <c:if test="${fn:contains(s1.fields.AUTHOR,'1')}">href="${s1.fields.LABLE2}"</c:if> class="icon icon-clock"></a>
        <a <c:if test="${fn:contains(s1.fields.AUTHOR,'1')}">href="${s1.fields.LINKS}"</c:if> class="icon icon-download"></a>
</header>
</c:if>
</c:forEach>
<!--end|头部区块-->
<div class="container home">
<c:forEach var="s1" items="${whcont}" varStatus="index">
<!-- start|小喇叭 -->
    <div class="ao-grid xg-active" id="xg-active">
        <div class="active-all" id="active-all">
            <img src=${laba_src} alt="">湖北移动-金色9月，移动好礼相伴！4G飞享套餐全线半价，加量享半价，最低仅需9元；【流量三重保】流量三倍送，用1G送3G，最高可送33G，限时特惠；
        </div>
    </div>
<!-- end|小喇叭 -->
<!-- start|滚图区-->
<%try{%>
<c:if test="${fn:contains(s1.name,'滚图区块')}">
    <section class="module">
    <div class="swiper-container" id="home-swiper">
        <div class="swiper-wrapper home-banner">
            <cms:nodecont var="gtqkcontent" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="asc" pagesize="999" dataobjectid="1" />
                <c:forEach var="s2" items="${gtqkcontent}" varStatus="gtqkindex">
                    <c:if test="${fn:contains(s2.fields.AUTHOR,'图片')}">
                        <div class="swiper-slide">
                            <a href="${s2.fields.LINKS}"><img src="${s2.fields.IMAGES[0].src}" alt=""></a>
                            <div class="home-tip">
                                <div class="home-tip-text">${s2.fields.CONTENTS}</div>
                            </div>
                        </div>
                    </c:if>
                </c:forEach>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    </section>
</c:if>
<%}catch(Exception e){}%>
<!-- end|滚图区-->
<!-- start|孝感频道 -->
<%try{%>
    <c:if test="${fn:contains(s1.name,'孝感频道')}">
    <section class="module">
    <div class="xg-channel">
        <div class="ao-title">${s1.name}</div>
        <div class="live-all ao-grid clearfix">
        <cms:nodecont var="xgpdcontent" pagesize="3" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
            <c:forEach var="s2" items="${xgpdcontent}" varStatus="xgpdindex">
                <c:choose>
                <c:when test="${fn:contains(s1.fields.NAME_TWO,'1')}">
                <a class="live-item" href="${s1.fields.LABLE2}cid=${s2.contId}${s1.fields.CHANNEL}">
                </c:when>
                <c:otherwise>
                <a class="live-item" href="${s1.fields.LABLE2}p=n${s1.fields.ABSTRACT}d2c${s2.contId}${s1.fields.CHANNEL}">
                </c:otherwise>
                </c:choose>
                    <div class="live-name">
                        <div class="live-title">${s2.name}</div>
                        <div class="updatetime hide">2009,1,1</div>
                        <%--<div class=" updatetime hide">${s2.fields.UPDATETIME}</div>--%>
                        <div class="live-info">
                            <span class="update-state"></span>
                            <div class="clickNum">12</div>
                            <%--<div class="clickNum"><cms:contvisitcontid="${s2.fields.contentid}</div>--%>
                        </div>
                    </div>
                    <div class="live-img"><img src="/image${s2.fields.DISPLAYFILELISTS}/${s2.fields.HW_CID}/display/${s2.fields.UDID}_HSJ720H.jpg" alt=""/></div>
                    </a>
            </c:forEach>
            <div class="white"></div>
        </div>
    </div>
    </section>
    </c:if>
<%}catch(Exception e){}%>
<!-- end|孝感频道 -->
<!-- start|孝感频道2 -->
    <section class="module">
        <div class="ao-grid xg-live">
            <img src=${channel2_src}>
        </div>
    </section>
<!-- end|孝感频道2 -->
<!-- start|时事资讯 -->
<%
String newsidx = (String)request.getParameter("newsidx") == null ? "1" : (String)request.getParameter("newsidx");
request.setAttribute("newsidx",newsidx);
try{%>
<c:if test="${fn:contains(s1.name,'时事资讯')}">
    <section class="module" id="newsletter">
        <div class="newsletter">
            <div class="ao-title ao-title-newsletter ">${s1.name}</div>
            <ul class="ao-grid xg-grid clearfix">
            <cms:nodecont var="sszxcontent"  pageidx="${newsidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
            <c:forEach var="s2" items="${sszxcontent}" varStatus="sszxindex">
                <li>
                    <c:choose>
                    <c:when test="${fn:contains(s1.fields.NAME_TWO,'1')}">
                    <a href="${s1.fields.LABLE2}cid=${s2.contId}${s1.fields.CHANNEL}">
                    </c:when>
                    <c:otherwise>
                    <a href="${s1.fields.LABLE2}p=n${s1.fields.ABSTRACT}d2c${s2.contId}${s1.fields.CHANNEL}">
                    </c:otherwise>
                    </c:choose>
                        <img src="/image${s2.fields.DISPLAYFILELISTS}/${s2.fields.HW_CID}/display/${s2.fields.UDID}_HSJ720H.jpg" alt=""/>
                        <p>${s2.name}</p>
                        <span>${s2.fields.DESCRIPTION}</span>
                    </a>
                </li>
            </c:forEach>
            </ul>
            <div class="ao-options">
                <a class="ao-options-item" href="?whid=${whid}&idx=${newsidx+1}#newsletter"><span>换一批</span><img src=${huan_src}></a>
                <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
            </div>
        </div>
    </section>
</c:if>
<%}catch(Exception e){}%>
<!-- end|时事资讯 -->
<!-- start|名栏连载 -->
<%
String seriesidx = (String)request.getParameter("seriesidx") == null ? "1" : (String)request.getParameter("seriesidx");
request.setAttribute("seriesidx",seriesidx);
try{%>
<c:if test="${fn:contains(s1.name,'名栏连载')}">
    <section class="module" id="series">
        <div class="series">
            <div class="ao-title ao-title-series ">名栏连载</div>
            <ul class="ao-grid clearfix">
            <cms:nodecont var="mllzcontent"  pageidx="${seriesidx}" pagesize="6" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
            <c:forEach var="s2" items="${mllzcontent}" varStatus="mllzindex">
                <li>
                    <c:choose>
                    <c:when test="${fn:contains(s1.fields.NAME_TWO,'1')}">
                    <a href="${s1.fields.LABLE2}cid=${s2.contId}${s1.fields.CHANNEL}">
                    </c:when>
                    <c:otherwise>
                    <a href="${s1.fields.LABLE2}p=n${s1.fields.ABSTRACT}d2c${s2.contId}${s1.fields.CHANNEL}">
                    </c:otherwise>
                    </c:choose>
                        <img src="/image${s2.fields.DISPLAYFILELISTS}/${s2.fields.HW_CID}/display/${s2.fields.UDID}_HSJ720V.jpg" alt=""/>
                        <p>${s2.name}</p>
                    </a>
                </li>
            </c:forEach>
            </ul>
            <div class="ao-options">
            <a class="ao-options-item" href="?whid=${whid}&idx=${seriesidx+1}#series"><span>换一批</span><img src=${huan_src}></a>
            <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
            </div>
        </div>
    </section>
</c:if>
<%}catch(Exception e){}%>
    <!-- end|名栏连载 -->
</c:forEach>
    <div class="waring-to">已经到底了哦</div>
</div>
    <!--start|返回顶部-->
    <div class="m-sideBar po-fixed">
        <div data-component="page.home.fragment.backTop" data-id="page.home.fragment.backTop_45">
            <a data-node="nodeLink" href="javascript:void(0);" class="m-goTop hide" id="m-goTop">
                <i class="c-glyphicon c-glyphicon-arrowUp"></i>
                <span>顶部</span>
            </a>
        </div>
    </div>
    <!--end|返回顶部-->
    <!--start|底部区块-->
<c:forEach var="s1" items="${whcont}" varStatus="index">
<c:if test="${fn:contains(s1.name,'底部区块')}">
<footer class="footer">
    <div class="options">
        <img src=${client_src} alt="">
        <p>下载视频客户端<br><span>高清视频 离线观看 资讯新闻 一览无余</span></p>
        <a href="${s1.fields.LINKS}" class="download-btn">下载</a>
    </div>
    <div class="dl-close"></div>
</footer>
</c:if>
</c:forEach>
<!--end|底部区块-->
<!--滚图js-->
</#noparse>
<script type="text/javascript">
<@use templatePath='/WAPPORTALV3/体育栏目模版库/门户/工具/js/swiper_js'/>
<@use templatePath='/WAPPORTALV3/体育栏目模版库/门户/工具/js/jquery'/>
</script>
<#noparse>
<script>
    (function() {

    var ratioOfPic = 2/1;//滚动图图片宽高比例
    $('.home-banner img,.group-img>img').css('height', parseInt($('body').width() / ratioOfPic));

    //顶部轮播图
    var swiper = new Swiper('#home-swiper', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: false
    });

    //小喇叭点击查看全部
    var activeAllHeight = 0;
    $('#xg-active').click(function(e){
    // alert('click')
    e.preventDefault();

    var activeDom = $('#xg-active');

    if(!activeAllHeight){
    activeAllHeight = activeDom.height();
    //$(this).text('点击收起…');
    var h =$(".active-all").height();
    activeDom.animate({'height': h});
    }else{
    //$(this).text('点击查看全部…');
    activeDom.animate({'height': activeAllHeight});
    activeAllHeight = 0;
    }
    });

    //发布时间
    var liveItems=$(".live-item");
    var t2=new Date();
    for(var i=0;i<liveItems.length;i++){
    var t1=liveItems.eq(i).find(".updatetime").text();
    var updateState=getDateDiff(t1,t2);
    console.log(t1);
    console.log(t2);
    console.log(updateState)
    liveItems.eq(i).find(".update-state").text(updateState);
    }

    })();

    //返回顶部
    $("#m-goTop").click(function() {
    //alert('')
    $("html,body").animate({scrollTop:0}, 500);
    });

    /********************
    * 取窗口滚动条高度
    ******************/
    function getScrollTop()
    {
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
    scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
    scrollTop=document.body.scrollTop;
    }
    return scrollTop;
    }
    /********************
    * 取文档内容实际高度
    *******************/
    function getScrollHeight()
    {
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }



    $(window).scroll(function() {
    var domHeight=getScrollHeight();
    // 当滚动到最底部以上100像素时， 加载新内容
    if (getScrollTop()*2>domHeight) {
    if($(".m-goTop").hasClass('hide'))
    $(".m-goTop").removeClass('hide');
    //alert('scroll')
    //$("div.navbar").css("position","fixed");
    }else{
    if(!($(".m-goTop").hasClass('hide')))
    $(".m-goTop").addClass('hide');
    //$("div.navbar").css("position","relative");//也可能是absolute等，反正就是你原来的值
    }
    /*if ($(this).scrollTop() >= 150) {
    $("div.log").css("position","fixed");
    }else{
    $("div.log").css("position","relative");//也可能是absolute等，反正就是你原来的值
    }*/
    });

    //隐藏底部下载栏
    $(".dl-close").click(function(){
    $(".footer").hide();
    });

    //发布时间状态
    function getDateDiff(d1,d2) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now1 = new Date(d1).getTime();
    var now2 = new Date(d2).getTime();
    var diffValue = now2 - now1;
    if (diffValue < 0) { //若日期不符则弹出窗口告之
    //alert("结束日期不能小于开始日期！");
    }
    var monthC = parseInt(diffValue / month);
    var weekC = parseInt(diffValue / (7 * day));
    var dayC = parseInt(diffValue / day);
    var hourC = parseInt(diffValue / hour);
    var minC = parseInt(diffValue / minute);

    if (dayC >= 1 && dayC <=7) {
    result =  parseInt(dayC) + "天前发布";
    } else if (dayC > 7) {
    result =  "一周前发布";
    } else if (hourC >= 1) {
    result =  parseInt(hourC) + "小时前发布";
    }  else if (hourC < 1) {
    result =  "刚刚发布";
    } else result = "刚刚发表";
    return result;
    }</script>
</body>
</body>
</html>
</#noparse>