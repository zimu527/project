//组装方法creatList（）,table是要填充的json数据,表格要插入的父元素（div）id、自定义表格id、分页要插入的父元素（div，可以与表格的父元素相同）id、自定义分页部分id
function creatList(table,tabParentId,tableId,page,pageParentId,pageId){
    //调用createHtml()、creatTable()、pagination()方法，生成表格和分页
    var trshtml = createHtml(table, params);//调用组装方法createHtml（）组装表格，table是要填充的json数据，params是组装配置参数
    creatTable('main',"tableCont",tableTh,trshtml);//表格要插入的父元素（div）id、自定义表格id、表头、data(注：同一页面内多个表格，id不能重复)
    pagination("main","pageCont",result.data.pager);//分页要插入的父元素（div，可以与表格的父元素相同）id、自定义分页部分id、page数据(注：同一页面内多个表格，id不能重复)
}

/*组合表格html
 data:数据
 params：自定义的组合格式
 {paradetail:[{'vname':'name',nodeType:'1'},
 {'vname':'name2',nodeType:'2'},
 {'vname':[{'classname':'btn','btnname':'bname','vtext':'新增'},{'classname':'btn','btnname':'bname','vtext':'修改'}],nodeType:'3'}]},顺序按照表格顺序
 nodeType:1,文本；2，图片;3,操作按钮；4，隐藏类型
 */
function createHtml(data, params) {
    var resultHtml = $("<div></div>");
    for (var i = 0; i < data.length; i++) {
        var ctr = $("<tr></tr>");
        //添加序号
        ctr.append($("<td class='txt-c'></td>").html((i + 1)));
        for (var n = 0; n < params.paradetail.length; n++) {
            //文本
            var cname = params.paradetail[n].vname;
            if (params.paradetail[n].nodeType == '1') {
                var ctd = $("<td>" + data[i][cname] + "</td>");
                if (cname == 'intro' || cname == 'content') {
                    if (data[i][cname].length > 100) {
                        // ctd.addClass('text-over');
                        ctd.html("<div style='line-height:2' title='" + data[i][cname] + "'>" + data[i][cname].substring(0, 100) + "...</div>");
                    } else {
                        ctd.html("<div style='line-height:2' title='" + data[i][cname] + "'>" + data[i][cname] + "</div>");
                    }
                }
                if (params.paradetail[n].isedit) {
                    ctd.attr("isedit", params.paradetail[n].isedit);
                    ctd.attr("name", cname);
                }
                ctr.append(ctd);
            } else if (params.paradetail[n].nodeType == '2') {
                //图片
                var ctd = $("<td><img src='" + data[i][cname] + "'></td>");
                if (params.paradetail[n].isedit) {
                    ctd.attr("isedit", params.paradetail[n].isedit);
                    ctd.attr("name", cname);
                }
                ctr.append(ctd);
            } else if (params.paradetail[n].nodeType == '3') {
                //操作
                var ctd = $("<td></td>");
                for (var m = 0; m < params.paradetail[n].vname.length; m++) {
                    var cspan = $("<span class='" + params.paradetail[n].vname[m].classname + "' name='" + params.paradetail[n].vname[m].btnname + "'></span>").html(params.paradetail[n].vname[m].vtext);
                    ctd.append(cspan);
                }
                ctr.append(ctd);
            } else if (params.paradetail[n].nodeType == '4') {
                var ctd = $("<td style='display:none'>" + data[i][cname] + "</td>");
                ctr.append(ctd);
            }
        }
        resultHtml.append(ctr);
    }
    return resultHtml.children();
}

/*
 创建表格
 参数：parentId：表格要插入的父元素id，
 tableId：自定义的表格id（用于同一页面上区分多个表格），
 tableTh：表头内容；
 content：调用createHtml（）方法生成的表格HTML内容
 */
function creatTable( parentId,tableId,tableTh,content) {
    $(("#"+parentId)).html('');
    var oDiv1=$("<div class='table_div'></div>");
    var oDiv2=$("<div class='table_div table_cont2'></div>");
    var oTable1 = $("<table class=\"table_cont\" id='"+tableId+"'></table>");
    var oTable2 = $("<table class=\"table_cont\" id='"+tableId+"'></table>");
    var oThead=$("<thead><tr></tr></thead>");
    var oTbody=$("<tbody></tbody>");

    for(var i=0;i<tableTh.length;i++){
        var oTh=$("<th></th>");
        oTh.text(tableTh[i]);
        oTh.appendTo(oThead.find("tr"));
    }
    content.appendTo(oTbody);

    oThead.appendTo(oTable1);
    oTbody.appendTo(oTable2);

    oTable1.appendTo(oDiv1);
    oTable2.appendTo(oDiv2);
    oDiv1.appendTo("#"+parentId);
    oDiv2.appendTo("#"+parentId);
}

/*
 * 生成分页部分
 * 参数：
 * parentId：分页部分要插入的父元素id（表格下方的分页部分，使用与表格相同的父元素id），
 *pageId：自定义的分页部分id（用于区分同一页面的多个分页），
 *page：分页部分数据（json）
 * */
function pagination(parentId,pageId,page) {
    if (page) {
        var pageCount = page.pageCount;//总页数
        var pageIndex = page.pageIndex;//当前页码
        var pageSize = page.pageSize;//每页行数
        var recCount = page.recCount;//总记录条数
        var oDiv = $("<div class='page_div' id=" + pageId + ">共</div>");
        var oPage1 = $('<span name="' + pageId + 'RecCount">' + recCount + '</span>条' +

            '<span class="padding-left"></span>第<span name="' + pageId + 'PageIndex">' + pageIndex + '</span>/<span name="' + pageId + 'PageCount">' + pageCount + '</span><span class="padding-right">页</span>' +
            '<a class="fa fa-step-backward" name="' + pageId + 'GoFristPage" href="javascript:void(0);"></a>' +
            '<a class="fa fa-backward" name="' + pageId + 'GoPreviousPage" href="javascript:void(0);"></a>');
        var oPage2 = $('<span class="page_link" name="' + pageId + 'PageLink"></span>');
        var teamPagesLink = $("<div></div>");
        for (var k = page.pageIndex - 2; k <= page.pageIndex + 2; k++) {
            if (k >= 1 && k <= page.pageCount) {
                if (k == page.pageIndex) {
                    $('<span class="red" name="' + k + '">' + k + '</span>').appendTo(teamPagesLink);
                } else {
                    $('<a href="javascript:void(0);" name="' + k + '">' + k + '</a>').appendTo(teamPagesLink);
                }
            }
        }
        teamPagesLink.children().appendTo(oPage2);
        var oPage3 = $('<a class="fa fa-forward" name="' + pageId + 'GoNextPage" href="javascript:void(0);"></a>' +
            '<a class="fa fa-step-forward" name="' + pageId + 'GoLastPage" href="javascript:void(0);"></a>' +
            '<span class="padding-left">跳转至</span><input type="text" name="go' + pageId + 'PageIndex">页' +
            '<span class="padding-left">每页</span><input type="text" name="go' + pageId + 'PageSize">行' +
            '<a class="btn btn1" href="javascript:void(0);" name="goGet' + pageId + 'List">确定</a>');

        oPage1.appendTo(oDiv);
        oPage2.appendTo(oDiv);
        oPage3.appendTo(oDiv);
        oDiv.appendTo("#" + parentId);

        //控制首尾页、上下页颜色等样式
        var currentPageCount = pageIndex;
        if (currentPageCount != '1' && currentPageCount != pageCount) {
            $(".fa-step-backward").addClass('fa_dark_grey');
            $(".fa-backward").addClass('fa_dark_grey');
            $(".fa-step-forward").addClass('fa_dark_grey');
            $(".fa-forward").addClass('fa_dark_grey');
        } else if (currentPageCount == '1') {
            $(".fa-step-forward").addClass('fa_dark_grey');
            $(".fa-forward").addClass('fa_dark_grey');
        } else if (currentPageCount == pageCount) {
            // alert("hh")
            $(".fa-step-backward").addClass('fa_dark_grey');
            $(".fa-backward").addClass('fa_dark_grey');
        }

        //行数不为默认值时，填入行数
        $("#" + pageId).find("[name='go" + pageId + "PageSize']").val(pageSize == basePageSize ? '' : pageSize);

        //点击页码,获取数字链接页码和行数
        $("#" + pageId).find("[name='" + pageId + "PageLink']").find("a").click(function () {
            var page = $(this).attr("name");//点击分页部分页码，获取页码数2,3,4...等
            var rows = $("#" + pageId).find("[name='go" + pageId + "PageSize']").val();//获取每页行数
            rows = rows != '' ? rows : basePageSize;//默认行数
            console.log(page);
            console.log(rows);
            doGetList(page, rows);
        });

        //点击确认跳转按钮，获取输入框页码和行数
        $("#" + pageId).find("[name=goGet" + pageId + "List]").click(function () {
            //submitPaged(pageId);//点击分页部分确定按钮，执行跳转前验证方法submitPaged（）
            var page = parseInt($("#" + pageId).find('[name="go' + pageId + 'PageIndex"]').val());
            var rows = parseInt($("#" + pageId).find('[name="go' + pageId + 'PageSize"]').val());
            if (isNaN(page)) {
                layer.alert("请填写跳转页数");
                return;
            }
            if (isNaN(rows)) {
                layer.alert("请填写每页展示行数");
                return;
            }
            console.log(page);
            console.log(rows);
            doGetList(page, rows);
        });

        //点击：上一页，下一页，首页，尾页，获取页码和行数
        $("#" + pageId).find(".fa_dark_grey").click(function () {
            console.log(this.name);
            var page = $(this).parent().find(".page_link span").text();
            var rows = $("#" + pageId).find("[name='go" + pageId + "PageSize']").val();//获取每页行数
            rows = rows != '' ? rows : basePageSize;//默认行数
            if (this.name == pageId + 'GoPreviousPage') {
                //上一页
                page = page - 1;
            }
            if (this.name == pageId + 'GoNextPage') {
                //下一页
                page = page - 0 + 1;
            }
            if (this.name == pageId + 'GoFristPage') {
                //首页
                page = '1';
            }
            if (this.name == pageId + 'GoLastPage') {
                //尾页
                page = pageCount;
            }
            console.log(page);
            console.log(rows);
            doGetList(page, rows);
        });
    }
}
//滑动、点击选择行变色，显示操作按钮
$(document).ready(function () {
    $('.table_cont tr').bind('click',function(){
        $(".table_cont tr").eq($(this).index()+1).addClass("success").siblings().removeClass("success");
    });
    $('.table_cont tr').bind({
        mouseenter:function(e){
            $(".table_cont tr").eq($(this).index()+1).find(".btn").addClass('big');
        },
        mouseleave:function(e){
            $(".table_cont tr").eq($(this).index()+1).find(".btn").removeClass('big');
        }
    });
});
