    <!-- start|体育快报 -->
            <%
String sportsidx = (String)request.getParameter("sportsidx") == null ? "1" : (String)request.getParameter("sportsidx");
request.setAttribute("sportsidx",sportsidx);
try{%>
        <c:if test="${fn:contains(s1.name,'体育快报')}">
        <section class="module" id="sports">
        <div class="newsletter sports">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="tykbcontent"  pageidx="${sportsidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
        <c:forEach var="s2" items="${tykbcontent}" varStatus="tykbindex">
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${sportsidx+1}#sports"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|体育快报 -->
        <!-- start|娱乐八卦 -->
            <%
String entertainmentidx = (String)request.getParameter("entertainmentidx") == null ? "1" : (String)request.getParameter("entertainmentidx");
request.setAttribute("entertainmentidx",entertainmentidx);
try{%>
        <c:if test="${fn:contains(s1.name,'娱乐八卦')}">
        <section class="module" id="entertainment">
        <div class="newsletter entertainment">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="sszxcontent"  pageidx="${entertainmentidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${entertainmentidx+1}#entertainment"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|娱乐八卦 -->
        <!-- start|爆笑短片 -->
            <%
String shortidx = (String)request.getParameter("shortidx") == null ? "1" : (String)request.getParameter("shortidx");
request.setAttribute("shortidx",shortidx);
try{%>
        <c:if test="${fn:contains(s1.name,'爆笑短片')}">
        <section class="module" id="short">
        <div class="newsletter short">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="bxdpcontent"  pageidx="${shortidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
        <c:forEach var="s2" items="${bxdpcontent}" varStatus="bxdpindex">
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${shortidx+1}#short"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|爆笑短片 -->

        <!-- start|原创精华 -->
            <%
String originalidx = (String)request.getParameter("originalidx") == null ? "1" : (String)request.getParameter("originalidx");
request.setAttribute("originalidx",originalidx);
try{%>
        <c:if test="${fn:contains(s1.name,'原创精华')}">
        <section class="module" id="original">
        <div class="newsletter original">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="ycjhcontent"  pageidx="${originalidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
        <c:forEach var="s2" items="${ycjhcontent}" varStatus="ycjhindex">
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${originalidx+1}#original"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|原创精华 -->

        <!-- start|少儿天地 -->
            <%
String juvenileidx = (String)request.getParameter("juvenileidx") == null ? "1" : (String)request.getParameter("juvenileidx");
request.setAttribute("juvenileidx",juvenileidx);
try{%>
        <c:if test="${fn:contains(s1.name,'少儿天地')}">
        <section class="module" id="juvenile">
        <div class="newsletter juvenile">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="srtdcontent"  pageidx="${juvenileidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
        <c:forEach var="s2" items="${srtdcontent}" varStatus="srtdindex">
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${juvenileidx+1}#juvenile"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|少儿天地 -->

        <!-- start|综艺世界 -->
            <%
String varietyidx = (String)request.getParameter("varietyidx") == null ? "1" : (String)request.getParameter("varietyidx");
request.setAttribute("varietyidx",varietyidx);
try{%>
        <c:if test="${fn:contains(s1.name,'综艺世界')}">
        <section class="module" id="variety">
        <div class="newsletter variety">
        <div class="ao-title ao-title-newsletter ">${s1.name}</div>
        <ul class="ao-grid xg-grid clearfix">
        <cms:nodecont var="zysjcontent"  pageidx="${varietyidx}" pagesize="4" nodeid="${s1.fields.ABSTRACT}" sortKey="ranking" sortType="desc"/>
        <c:forEach var="s2" items="${zysjcontent}" varStatus="zysjindex">
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
        <a class="ao-options-item" href="?whid=${whid}&idx=${varietyidx+1}#variety"><span>换一批</span><img src=${huan_src}></a>
        <a class="ao-options-item" href="${s1.fields.LINKS}"><span>更多热门</span><img src=${more_src}></a>
        </div>
        </div>
        </section>
        </c:if>
            <%}catch(Exception e){}%>
        <!-- end|综艺世界 -->

