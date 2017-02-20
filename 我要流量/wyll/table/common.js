  //弹窗关闭function
  $(".boxContent .close,.boxContent .btn01[name='cancel']").click(function() {
      $(this).parent().parent().hide();
      $(".boxContentbg").hide();
  });
  //弹窗打开function不包括剧集，专题剧集
  $(".content:not(#episodelist,#feaepisodelist) .add").click(function(event) {
      $(".boxContentbg").show();
      //清理弹窗数据
      $("#" + $(this).attr("name")).find("input[type='text'],textarea").val('');
      $("#" + $(this).attr("name")).find("input[type='radio']").prop("checked", '');
      //获取对应弹窗
      $("#" + $(this).attr("name")).show();
      //banner特殊处理
      $("#banner").find(".mark").html("banner新增");
      $("#banner").find(".banner-div").hide();
      $(".boxContent").find("#curid").html('');
  });
  $(".checkbox-div").find("input:checked").prop("checked", "").end().find("input").each(function(index, el) {
      //$(this).attr("tagtxt")
      for (var i = 0; i < tagnames.length; i++) {
          if (tagnames[i] == $(this).attr("tagtxt")) {
              this.checked = 'checked';
          }
      }
  });
  $(".checkbox-close").click(function() {
      $(this).parent().hide();
      $(".boxContentbg").hide();
  });
  /*组合表格html
      data:数据
      params：组合格式
      {paradetail:[{'vname':'name',nodeType:'1'},
      {'vname':'name2',nodeType:'2'},
      {'vname':[{'classname':'btn','btnname':'bname','vtext':'新增'},{'classname':'btn','btnname':'bname','vtext':'修改'}],nodeType:'3'}]},顺序按照表格顺序
      nodeType:1,文本；2，图片;3,操作按钮；4，排序;5，隐藏类型
      */
  function createHtml(data, params, pindex, pcount) {
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
                  var ctd = $("<td class='txt-c'></td >");
                  // if (i == 0) {
                  //     ctd.html("<span class='arrow-down' title='向下' > </span> <span class='arrow-last' title='末尾'></span>");
                  // } else if (i == (data.length - 1)) {
                  //     ctd.html("<span class='arrow-first' title ='置顶'></span><span class='arrow-up' title='向上'></span>");
                  // } else {
                  //     ctd.html("<span class='arrow-first' title ='置顶'></span><span class='arrow-up' title='向上'></span><span class='arrow-down' title='向下' > </span> <span class='arrow-last' title='末尾'></span>");
                  // }
                  if (pindex == '1' && i == 0) {
                      ctd.html("<span class='arrow-down' title='向下' > </span> <span class='arrow-last' title='末尾'></span>");
                  } else if (pindex == pcount && i == data.length - 1) {
                      ctd.html("<span class='arrow-first' title ='置顶'></span><span class='arrow-up' title='向上'></span>");
                  } else {
                      ctd.html("<span class='arrow-first' title ='置顶'></span><span class='arrow-up' title='向上'></span><span class='arrow-down' title='向下' > </span> <span class='arrow-last' title='末尾'></span>");
                  }
                  ctr.append(ctd);
              } else if (params.paradetail[n].nodeType == '5') {
                  var ctd = $("<td style='display:none'>" + data[i][cname] + "</td>")
                  ctr.append(ctd);
              }
          }
          resultHtml.append(ctr);
      }
      return resultHtml.children();
  }
  //更新页面表格和分页
  function changePage(result, vid, content) {
      $("#" + vid + " table tr:gt(0)").remove();
      $("#" + vid + " tr:eq(0)").after(content);
      //更新分页
      if (result.data.pager) {
          var pageCount = result.data.pager.pageCount;
          var pageIndex = result.data.pager.pageIndex;
          var pageSize = result.data.pager.pageSize;
          var recCount = result.data.pager.recCount;
          $("#" + vid + " .pagediv").find("span[name='liveRecCount']").html(recCount);
          $("#" + vid + " .pagediv").find("span[name='livePageIndex']").html(pageIndex);
          $("#" + vid + " .pagediv").find("span[name='livePageCount']").html(pageCount);
          $("#" + vid + " .pagediv").find("span[name='livePagesLink']").html(pageIndex);
          $("#" + vid + " .pagediv").find("[name='goLivePageIndex']").val('');
          $("#" + vid + " .pagediv").find("[name='goLivePageSize']").val(pageSize == '10' ? '' : pageSize);
      }
      var frameheight = $("#" + vid).height() < 550 ? 550 : $("#" + vid).height();
      // var frameheight = $(window).height()<550?550:$(window).height();
      $(window.parent.document).find("#framediv").css({
          "height": frameheight + 100
      });
  }
  //页面判断非空
  function validate(objid) {
      var flag = true;
      $("#" + objid).find(".request").each(function() {
          $(this).parent().next().find("[name]:not(:hidden)").each(function(index, el) {
              if (this.nodeName.toLowerCase() == "input") {
                  if (this.type == "text" && !$(this).val()) {
                      flag = false;
                  }
                  if (this.type == "radio") {
                      // var cflag = true;
                      // $(this).parent().parent().find("[name='" + this.name + "']").each(function(index, el) {
                      //     if (!this.checked) {
                      //         cflag = false;
                      //     }
                      // });
                      // flag = cflag;
                      var a = $(this).parent().parent().find("[name='" + this.name + "']:checked").length;
                      if(!a){flag = false;}
                  }
                  // if(this.type == "file"){

                  // }
              }
              if (this.nodeName.toLowerCase() == "textarea" && !$(this).val()) {
                  //textarea类型的
                  flag = false;
              }
          });
      });
      return flag;
  }
