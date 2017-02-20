$(function() {
    //弹窗新增剧集
    $("#episodeadd").click(function() {
        var datas = $(this).parent().parent().find("form").serializeArray();
        var params = {};
        if ($("#episode #curid").html()) {
            params.id = $("#episode #curid").html();
        }
        params.tagids = [];
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].name == 'tag') {
                params.tagids.push(datas[i].value);
            } else {
                params[datas[i].name] = datas[i].value;
            }
        }
        //添加上传文件
        params.file = $("#episode").find("[name='picurlfile']")[0];
        //判断非空
        if (validate("episode")) {
            updateepisodelist(params);
            $("#episode").hide();
        } else {
            alert("有必填项未填！");
        }
    });
    //剧集修改episodeedit
    $("#episodelist").delegate("td span[name='episodeedit']", 'click', function() {
        var id = $(this).parent().parent().find("td:eq(1)").html();
        var intro = $(this).parent().parent().find("td:eq(3)").find("div").length > 0 ? $(this).parent().parent().find("td:eq(3)").find("div").html() : $(this).parent().parent().find("td:eq(3)").html();
        //组装弹窗对应值
        $("#episode #curid").html(id);
        $("#episode").find("input[name='epicount']").val($(this).parent().parent().find("td:eq(8)").html());
        $("#episode").find("input[name='sort']").val($(this).parent().parent().find("td:eq(12)").html());
        $("#episode").find("input[name='contentid']").val($(this).parent().parent().find("td:eq(14)").html());
        //$("#episode").find("input[name='froms']").val($(this).parent().parent().find("td:eq(13)").html());
        $("#episode").find("input[name='status']").val($(this).parent().parent().find("td:eq(15)").html());
        $("#episode").find("input[name='name']").val($(this).parent().parent().find("td:eq(2)").html());
        $("#episode").find("input[name='keyword']").val($(this).parent().parent().find("td:eq(6)").html());
        $("#episode").find("input[name='visitcount']").val($(this).parent().parent().find("td:eq(7)").html());
        $("#episode").find("input[name='picurl']").val($(this).parent().parent().find("td:eq(4)").find("img").attr("src"));
        $("#episode").find("textarea[name='intro']").val(intro);
        $("#episode").find("#addcheckbox").val($(this).parent().parent().find("td:eq(5)").html().replace(/,/g, ' '));

        var tagnames = $("#episode").find("#addcheckbox").val().split(' ');
        //勾选对应标签
        $("#episode .checkbox-div label").each(function() {
            for (var i = 0; i < tagnames.length; i++) {
                if (tagnames[i] === $(this).text()) {
                    $(this).find("input").prop("checked", "cheked");
                }
            }
        });
        //勾选对应来源
        if ($(this).parent().parent().find("td:eq(13)").html() == '1') {
            $("#from-div").html('基地');
            $("#from-div").append("<input type='text' name='froms' value='1' style='display:none'>");

        } else {
            if ($(this).parent().parent().find("td:eq(13)").html() == '2') {
                $("#from-div").html("<label><input type='radio' name='froms' value='2' checked='checked'>自有</label><label><input type='radio' name='froms' value='3'>第三方</label>");
            }
            if ($(this).parent().parent().find("td:eq(13)").html() == '3') {
                $("#from-div").html("<label><input type='radio' name='froms' value='2'>自有</label><label><input type='radio' name='froms' value='3' checked='checked'>第三方</label>");
            }
        }
        $(".boxContentbg").show();
        $("#episode").find(".mark").html("修改剧集").end().show();
    });
    //剧集弹窗打开
    $("#episodelist .add").click(function() {
        $(".boxContentbg").show();
        //清除id和集数,弹窗值
        $("#episode #curid").html('');
        $("#episode").find("input[type='text'],textarea").val('');
        $("#episode :checked").prop("checked", "");
        $("#episode").find(".mark").html("新增剧集").end().show();
        $("#from-div").html("<label><input type='radio' name='froms' value='2'>自有</label><label><input type='radio' name='froms' value='3'>第三方</label>");
    });
    //剧集添加标签
    $("#addcheckbox").focus(function() {
        $(".checkbox-div").show();
    });
    $(".checkbox-div").delegate(':checkbox', 'click', function() {
        var checks = '';
        $(".checkbox-div :checked").each(function() {
            checks = checks + $(this).attr("tagtxt") + " ";
        });
        $("#addcheckbox").val(checks);
    });
    //添加热搜
    $("#episodelist").delegate("span[name='addhot']", 'click', function(event) {
        addhotlist($(this).parent().parent().find("td:eq(1)").text());
    });
    //添加原创
    $("#episodelist").delegate("span[name='addoriginal']", 'click', function(event) {
        addoriginallist($(this).parent().parent().find("td:eq(1)").text());
    });
    //通用删除方法
    $("#episodelist").delegate("td span[name='delbtn']", "click", function() {
        var flag = window.confirm("删除不可恢复，确定删除该数据吗？");
        if (flag) {
            var delid = $(this).parent().parent().find("td:eq(1)").text();
            deleteepisodelist(delid);
        }
    });
    $("#singlelist").delegate("td span[name='delbtn']", "click", function() {
        var flag = window.confirm("删除不可恢复，确定删除该数据吗？");
        if (flag) {
            var delid = $(this).parent().parent().find("td:eq(1)").text();
            deletesinglelist(delid);
        }
    });
    //通用查询
    $(".content").find("span.query").click(function() {
        var sname = $(this).parent().find("input[name='querytext']").val();
        // var sid = $(this).parent().parent().find("td:eq(1)").text();
        var sid = $("[name='sid']").html();
        var pname = $(this).parent().parent().find("td:eq(2)").text();
        var funname = 'get' + $(this).parents(".content").attr("id");
        var paras = {
            "sid": sid,
            "sname": sname,
            "pname": pname
        };
        if (funname == 'getepisodelist') {
            getepisodelist(paras);
        } else {
            getsinglelist(paras);
        }
    });
    //单集修改
    $("#singlelist").delegate("td span[name='edit']", 'click', function() {
        if ($(this).text() == '修改') {
            $(this).parent().parent().find("td[isedit='edit']").each(function(index, el) {
                if ($(this).has("img").length) {
                    //图片
                    $(this).html("<input type='text' isimg='1' value='" + $(this).find("img").attr("src") + "' name='" + $(this).attr("name") + "'>");
                } else { //纯文字
                    $(this).html("<input type='text' value='" + $(this).text() + "' name='" + $(this).attr("name") + "'>");
                }
            });
            $(this).html("保存");
        } else {
            //传参
            var typeName = $(this).parents(".content").attr("id");
            var cid = $(this).parent().parent().find("td:eq(1)").text();
            var params = {};
            //单集要加一个sid
            var sid = $(this).parents(".content").find("label[name='sid']").text();
            params.sid = sid;
            params.id = cid;
            var datas = $(this).parents(".content").find("form").serializeArray();
            for (var i = 0; i < datas.length; i++) {
                params[datas[i].name] = datas[i].value;
            }
            params.sequence = $(this).parent().parent().find("td:eq(7)").text();
            params.contentid = $(this).parent().parent().find("td:eq(8)").text();
            //params.isfree = $(this).parent().parent().find("td:eq(9)").text();
            updatesinglelist(params);
            $(this).html("修改");
        }
    });
    //单集新增
    $("#single").find("span[name='submit']").click(function() {
        var pid = $(this).parents(".boxContent").attr("id");
        var sid = $("#" + pid + "list").find("label[name='sid']").text();
        var id = $("#" + pid).find("#curid").html();
        var datas = $(this).parent().parent().find("form").serializeArray();
        var params = {};
        params.sid = sid;
        params.id = id;
        for (var i = 0; i < datas.length; i++) {
            params[datas[i].name] = datas[i].value;
        }
        //判断非空
        if (validate("single")) {
            //调用方法
            $(this).parents(".boxContent").hide();
            $(".boxContentbg").hide();
            updatesinglelist(params);
        } else {
            alert("有必填项未填！");
        }
    });
    //上一页，下一页，首页，尾页
    $(".pagediv").find("a[name]").click(function() {
        console.log(this.name);
        var pageindex = $(this).parent().find("[name='livePagesLink']").text();
        var goLivePageIndex = $(this).parent().find("[name='goLivePageIndex']").val();
        var goLivePageSize = $(this).parent().find("[name='goLivePageSize']").val();
        var pagemax = $(this).parent().find("[name='liveRecCount']").html();
        var sid = $(this).parents(".content").find("label[name='sid']").html();
        var params = {};
        var funname = "get" + $(this).parents(".content").attr("id");
        if (this.name == 'goPreviousPage') {
            //上一页
            pageindex = pageindex - 1;
        }
        if (this.name == 'goNextPage') {
            //下一页
            pageindex = pageindex - 0 + 1;
        }
        if (this.name == 'goFristPage') {
            //首页
            pageindex = '1';
        }
        if (this.name == 'goLastPage') {
            //尾页
            pageindex = $(this).parent().find("[name='livePageCount']").html();
        }
        if (this.name == 'goto') {
            //跳转
            pageindex = goLivePageIndex || '1';
        }
        if ($(this).parents(".content").find("label[name='sid']").length && sid) {
            params.sid = sid;
        }
        params.pageindex = pageindex;
        params.pagesize = goLivePageSize;
        if (funname == 'getepisodelist') {
            getepisodelist(params);
        } else {
            getsinglelist(params);
        }
    });
    //排序，上一级，下一级，置顶，末尾  
    $(".content").delegate('.arrow-first,.arrow-up,.arrow-down,.arrow-last', 'click', function() {
        var params = {
            'id': $(this).parent().parent().find("td:eq(1)").text()
        };
        if ($(this).attr("class") == 'arrow-first') {
            params.type = '1';
        }
        if ($(this).attr("class") == 'arrow-up') {
            params.type = '2';
        }
        if ($(this).attr("class") == 'arrow-down') {
            params.type = '3';
        }
        if ($(this).attr("class") == 'arrow-last') {
            params.type = '4';
        }
        sortepisodelist(params);
    });
    //查询剧集列表
    function SeriesServiceOnResult(result) {
        if (!result) {
            //请求失败
            alert(result.message);
        } else {
            if (!result.data.session) {
                //跳转至登陆页
                parent.location.href = 'login.html';
            }
            //调用组装方法createHtml
            var params = {
                paradetail: [{
                    'vname': 'id',
                    'nodeType': '1'
                }, {
                    'vname': 'name',
                    'nodeType': '1'
                }, {
                    'vname': 'intro',
                    'nodeType': '1'
                }, {
                    'vname': 'picurl',
                    'nodeType': '2'
                }, {
                    'vname': 'tags',
                    'nodeType': '1'
                }, {
                    'vname': 'keyword',
                    'nodeType': '1'
                }, {
                    'vname': 'visitcount',
                    'nodeType': '1'
                }, {
                    'vname': 'epicount',
                    'nodeType': '1'
                }, {
                    'vname': 'fromstring',
                    'nodeType': '1'
                }, {
                    'vname': 'datestring',
                    'nodeType': '1'
                }, {
                    'vname': '排序',
                    'nodeType': '4'
                }, {
                    'vname': 'sort',
                    'nodeType': '5'
                }, {
                    'vname': 'froms',
                    'nodeType': '5'
                }, {
                    'vname': 'contentid',
                    'nodeType': '5'
                }, {
                    'vname': 'status',
                    'nodeType': '5'
                }, {
                    'vname': [{
                        'classname': 'btn',
                        'btnname': 'addhot',
                        'vtext': '热搜'
                    }, {
                        'classname': 'btn',
                        'btnname': 'addoriginal',
                        'vtext': '原创'
                    }, {
                        'classname': 'btn',
                        'btnname': 'episodeedit',
                        'vtext': '修改'
                    }, {
                        'classname': 'btn',
                        'btnname': 'delbtn',
                        'vtext': '删除'
                    }, {
                        'classname': 'btn',
                        'btnname': 'single',
                        'vtext': '进入单集'
                    }],
                    'nodeType': '3'
                }]
            };
            var trshtml = createHtml(result.data.seriesList, params, result.data.pager.pageIndex, result.data.pager.pageCount);
            changePage(result, 'episodelist', trshtml);
            //添加进入单集列表
            $("#episodelist tr").find("td:last").delegate("span[name='single']", 'click', function() {
                $(".content").hide();
                var sid = $(this).parent().parent().find("td:eq(1)").text();
                var pname = $(this).parent().parent().find("td:eq(2)").text();
                $("#singlelist").show();
                $("#singlelist").find("label[name='sid']").html(sid);
                //如果来源类型为1基地，没有新增按钮
                if ($(this).parent().parent().find("td:eq(9)").html() == '1') {
                    $("#singlelist").find("span[name='single']").hide();
                }
                var params = {
                    "sid": sid,
                    'pname': pname
                };
                //调用获取单集方法  
                getsinglelist(params);
            });
            //组装标签列表
            var taglist = $("#episode .checkbox-div");
            taglist.find("label").remove();
            for (var i = 0; i < result.data.tagList.length; i++) {
                var clabel = $("<label></label>");
                clabel.html("<input type='checkbox' name='tag' tagtxt='" + result.data.tagList[i].name + "' value='" + result.data.tagList[i].id + "'>" + result.data.tagList[i].name);
                taglist.append(clabel);
            }
        }
    }
    //剧集操作
    function UpdateServiceOnResult(result) {
        var params = {"pageindex":$("#episodelist span[name='livePageIndex']").html()};
        getepisodelist(params);
        if (!result.data.success) {
            //新增失败
            $("#episodelist .msg").html("操作失败");
        } else {
            $("#episodelist .msg").html("操作成功");
        }
    }
    //删除剧集
    function DeleteSeriesOnResult(result) {
        SeriesServiceOnResult(result);
    }
    //查询单集列表
    function EpisodeServiceOnResult(result) {
        if (!result) {
            //请求失败
            alert(result.message);
        } else {
            //调用组装方法createHtml
            var params = {
                paradetail: [{
                    'vname': 'id',
                    'nodeType': '1'
                }, {
                    'vname': 'name',
                    'nodeType': '1',
                    'isedit': 'edit'
                }, {
                    'vname': 'videourl',
                    'nodeType': '1',
                    'isedit': 'edit'
                }, {
                    'vname': 'posturl',
                    'nodeType': '1',
                    'isedit': 'edit'
                }, {
                    'vname': 'datestring',
                    'nodeType': '1'
                }, {
                    'vname': [{
                        'classname': 'btn',
                        'btnname': 'edit',
                        'vtext': '修改'
                    }, {
                        'classname': 'btn',
                        'btnname': 'delbtn',
                        'vtext': '删除'
                    }],
                    'nodeType': '3'
                }, {
                    'vname': 'sequence',
                    'nodeType': '5'
                }, {
                    'vname': 'contentid',
                    'nodeType': '5'
                }]
            };
            var trshtml = createHtml(result.data.episodeList, params, result.data.pager.pageIndex, result.data.pager.pageCount);
            //更新分页
            changePage(result, 'singlelist', trshtml);
        }
    }
    //单集操作新增，修改，删除
    function EpisodeOnResult(result) {
        var params = {
            "sid": result.data.sid,
            'pname': result.data.sname
        };
        getsinglelist(params);
        if (!result.data.success) {
            //新增失败
            $("#singlelist .msg").html("操作失败");
        } else {
            $("#singlelist .msg").html("操作成功");
        }
    }
    //取消热搜,添加热搜
    function hotOnResult(result) {
        var params = {};
        if (!result.data.success) {
            //新增失败
            $("#hotlist .msg").html("操作失败");
        } else if (result.data.success == '2') {
            $("#episodelist .msg").html("该剧集已设定过热搜！");
        } else {
            $("#hotlist .msg,#episodelist .msg").html("操作成功");
        }
    }
    //取消原创,添加原创
    function originalOnResult(result) {
        var params = {};
        if (!result.data.success) {
            //新增失败
            $("#hotlist .msg").html("操作失败");
        } else if (result.data.success == '2') {
            $("#episodelist .msg").html("该剧集已设定过原创！");
        } else {
            $("#hotlist .msg,#episodelist .msg").html("操作成功");
        }
    }

    function getepisodelist(params) {
        var onResult = SeriesServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.GetSeriesService({
            'sname': params.sname,
            'type': '1',
            'pageIndex': params.pageindex || '1',
            'pageSize': params.pagesize || '10'
        }, resultProcessor);
    }

    function updateepisodelist(params) {
        var onResult = UpdateServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.UpdateSeriesService({
            'series': {
                'id': params.id,
                'name': params.name,
                'tagids': params.tagids,
                'keyword': params.keyword,
                'visitcount': params.visitcount,
                'picurl': params.picurl,
                'intro': params.intro,
                'froms': params.froms,
                'sort': params.sort,
                'type': '1',
                'epicount': params.epicount,
                'contentid': params.contentid ? params.contentid : 0,
                'status': params.status
            },
            file: params.file
        }, resultProcessor);
    }

    function deleteepisodelist(delid) {
        var onResult = UpdateServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.DeleteSeriesService({
            'sid': delid
        }, resultProcessor);
    }

    function getsinglelist(params) {
        var onResult = EpisodeServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.GetEpisodeService({
            'sid': params.sid,
            'sname': params.sname,
            'pageIndex': params.pageindex || '1',
            'pageSize': params.pagesize || '10'
        }, resultProcessor);
        //设置新增弹窗剧集名称
        $("#single").find("td[name='pname']").html(params.pname);
    }

    function updatesinglelist(params) {
        //UpdateEpisodeService
        var onResult = EpisodeOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.UpdateEpisodeService({
            'episode': {
                'sid': params.sid,
                'id': params.id,
                'name': params.name,
                'videourl': params.videourl,
                'posturl': params.posturl,
                'sequence': params.sequence ? params.sequence : 0,
                'contentid': params.contentid ? params.contentid : 0
            }
        }, resultProcessor);
    }

    function deletesinglelist(delid) {
        //UpdateEpisodeService
        var onResult = EpisodeOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.DeleteEpisodeService({
            'eid': delid
        }, resultProcessor);
    }

    function addhotlist(sid) {
        //UpdateEpisodeService
        var onResult = hotOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.AddPopularService({
            'sid': sid
        }, resultProcessor);
    }

    function addoriginallist(sid) {
        var onResult = originalOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.AddOriginalService({
            'sid': sid
        }, resultProcessor);
    }
    //剧集排序
    function sortepisodelist(params) {
        //UpdateEpisodeService
        var onResult = UpdateServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.SortSeriesService({
            'id': params.id,
            'type': params.type,
            't': '1'
        }, resultProcessor);
    };
    getepisodelist({});
});
