$(function() {
    //banner修改
    $("#bannerlist").delegate("td span[name='bedit']", 'click', function() {
        var id = $(this).parent().parent().find("td:eq(1)").html();
        var sort = $(this).parent().parent().find("td:eq(7)").html();
        //组装弹窗对应值
        $("#banner #curid").html(id);
        $("#banner #sort").html(sort);
        $("#banner").find("input[name='name']").val($(this).parent().parent().find("td:eq(2)").html());
        $("#banner").find("input[name='url']").val($(this).parent().parent().find("td:eq(5)").find("img").attr("src"));
        var radioid = $(this).parent().parent().find("td:eq(8)").html();
        $("#banner").find("input[name='type']").eq(radioid - 1).prop("checked", "checked");
        if (radioid == '4') {
            $("#banner td").find("input[name='linkurl']").show().val($(this).parent().parent().find("td:eq(4)").html());
            $("#banner td").find("input[name='linkid']").hide();
            $("#banner .banner-div").hide();
        } else {
            var ltext = $(this).parent().parent().find("td:eq(4)").html();
            $("#banner .banner-div").eq(radioid - 1).show();
            $("#banner .banner-div").eq(radioid - 1).find("label").each(function(index, el) {
                if ($(this).text() == ltext) {
                    $("#banner td").find("input[name='linkid']").show().val($(this).find("input").val());
                    $(this).find("input").prop("checked", "checked");
                }
            });
            $("#banner td").find("input[name='linkurl']").hide();
            $("#banner td").find("input[name='linkid']").show();
        }
        $(".boxContentbg").show();
        $("#banner").find(".mark").html("banner修改").end().show();
    });
    //新增banner弹窗选择类型
    $("#banner .banner-div").delegate("input[type='radio']", 'click', function() {
        $("#banner input[type='text'][name='linkid']").val(this.value);
    });
    //banner新增
    $(".boxContent").find("span[name='submit']").click(function() {
        var pid = $(this).parents(".boxContent").attr("id");
        var sid = $("#" + pid + "list").find("label[name='sid']").text();
        var id = $("#" + pid).find("#curid").html();
        var sort = $("#" + pid).find("#sort").html();
        var datas = $(this).parent().parent().find("form").serializeArray();
        var params = {};
        if (sid) {
            params.sid = sid;
        };
        params.id = id;
        params.sort = sort;
        for (var i = 0; i < datas.length; i++) {
            params[datas[i].name] = datas[i].value;
        }
        params.file = $("#banner").find("[name='picurlfile']")[0];
        //判断非空
        if (validate("banner")) {
            //调用方法
            $(".boxContentbg").hide();
            $(this).parents(".boxContent").hide();
            updatebannerlist(params);
        } else {
            alert("有必填项未填！");
        }

    });
    //删除方法
    $(".content").delegate("td span[name='delbtn']", "click", function() {
        var flag = window.confirm("删除不可恢复，确定删除该数据吗？");
        if (flag) {
            var delid = $(this).parent().parent().find("td:eq(1)").text();
            deletebannerlist(delid);
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
        sortbannerlist(params);
    });
    //banner列表查询
    function BannerServiceOnResult(result) {
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
                    'vname': 'typestring',
                    'nodeType': '1'
                }, {
                    'vname': 'forshow',
                    'nodeType': '1'
                }, {
                    'vname': 'url',
                    'nodeType': '2'
                }, {
                    'vname': '排序',
                    'nodeType': '4'
                }, {
                    'vname': 'sort',
                    'nodeType': '5'
                }, {
                    'vname': 'type',
                    'nodeType': '5'
                }, {
                    'vname': [{
                        'classname': 'btn',
                        'btnname': 'bedit',
                        'vtext': '修改'
                    }, {
                        'classname': 'btn',
                        'btnname': 'delbtn',
                        'vtext': '删除'
                    }],
                    'nodeType': '3'
                }]
            };
            var trshtml = createHtml(result.data.bannerlist, params, '1', '1');
            //更新分页
            changePage(result, 'bannerlist', trshtml);
            //调用banner类型方法，组装弹窗
            showaddbanner();
        }
    }
    //banner新增、修改、删除
    function BannerOnResult(result) {
        var params = {};
        //关掉弹窗中的弹窗 和单选
        $("#banner .banner-div").hide().find("input[type='radio']").prop("checke", '');
        getbannerlist(params);
        if (!result.data.success) {
            //新增失败
            $("#bannerllist .msg").html("操作失败");
        } else {
            $("#bannerlist .msg").html("操作成功");
        }
    }
    //banner类型
    function ShowAddBannerOnResult(result) {
        //banner类型
        var clist = $("#banner").find(".clist");
        var slist = $("#banner").find(".slist");
        var tlist = $("#banner").find(".tlist");
        clist.find("label").remove();
        slist.find("label").remove();
        tlist.find("label").remove();
        //COS列表选项
        for (var i = 0; i < result.data.clist.length; i++) {
            //单选
            var label = $("<label><input type='radio' name='linkids' value='" + result.data.clist[i].id + "'>" + result.data.clist[i].name + "</label>");
            clist.append(label);
        }
        //剧集列表选项
        for (var m = 0; m < result.data.slist.length; m++) {
            var label = $("<label><input type='radio' name='linkids' value='" + result.data.slist[m].id + "'>" + result.data.slist[m].name + "</label>");
            slist.append(label);
        }
        //专题列表选项
        for (var n = 0; n < result.data.tlist.length; n++) {
            var label = $("<label><input type='radio' name='linkids' value='" + result.data.tlist[n].id + "'>" + result.data.tlist[n].name + "</label>")
            tlist.append(label);
        }
        $("#banner").find("[name='type']").click(function() {
            $(".banner-div").hide();
            if (this.value == '1') {
                slist.show();
                $("input[name='linkurl']").val('').hide();
                $("input[name='linkid']").show();
            }
            if (this.value == '2') {
                tlist.show();
                $("input[name='linkurl']").val('').hide();
                $("input[name='linkid']").show();
            }
            if (this.value == '3') {
                clist.show();
                $("input[name='linkurl']").val('').hide();
                $("input[name='linkid']").show();
            }
            if (this.value == '4') {
                $("input[name='linkid']").val('').hide();
                $("input[name='linkurl']").show();
            }
        });
    }

    function getbannerlist(params) {
        var onResult = BannerServiceOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.GetBannerService({
            'sname': params.sname
        }, resultProcessor);
    };

    function updatebannerlist(params) {
        var onResult = BannerOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.UpdateBannerService({
            'banner': {
                'id': params.id,
                'name': params.name,
                'url': params.url,
                'type': params.type,
                'linkid': params.linkid,
                'linkurl': params.linkurl,
                'sort': params.sort
            },
            file: params.file
        }, resultProcessor);
    };

    function deletebannerlist(delid) {
        //UpdateEpisodeService
        var onResult = BannerOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.DeleteBannerService({
            'id': delid
        }, resultProcessor);
    };

    function sortbannerlist(params) {
        //UpdateEpisodeService
        var onResult = BannerOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.SortBannerService({
            'id': params.id,
            'type': params.type
        }, resultProcessor);
    };

    function showaddbanner(params) {
        var onResult = ShowAddBannerOnResult;
        var resultProcessor = {
            'onResult': onResult
        };
        BWFRI.ShowAddBannerService({}, resultProcessor);
    };
    getbannerlist({});
});
