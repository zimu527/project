/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-02 23:04:35
 * @version $Id$
 */

$(document).ready(function(){
    //2.12. 用户最佳组合列表获取
    getPartnerTopList();

});

function getPartnerTopList(){
	
	var pid = $("#pid").val();
	var openid = $("#openid").val();
	
    var onResult = getPartnerTopListOnResult;
    var resultProcessor = {
        'onResult':onResult
    };
    BWFRI.PartnerATopListService({'pid':pid, 'openid':openid} , resultProcessor);
}
function getPartnerTopListOnResult(result){
    if(result.code != 0){
        alert('不给力，刷新重试~');
        var oTable = $('#tableId');
        oTable.empty();
        
       /* for( var i=0; i<5; i++){
            var oTr = $('<tr><td class="td1">'+ 1+'</td><td class="td2"><em id="trB"><img src="img/partner/hytx.png"></em></td><td class="td3">name</td><td class="td4">'+ 80 +'</td></tr>');
            oTable.append(oTr);
        }*/
        var pid = $("#pid").val();
        var url = "partner.do?op=join&pid=" + pid;
    	window.location.href = url;
        
    }else {
        // 新建整个表
        var oTable = $('#tableId');
        oTable.empty();
        if(result.data.gamelist.length){
            for( var i=0; i<result.data.gamelist.length; i++){
                var oTr = $('<tr><td class="td1">'+ result.data.gamelist[i].rank+'</td><td class="td2"><em id="trB"><img src="'+ result.data.gamelist[i].b.imageurl +'"></em></td><td class="td3">'+ result.data.gamelist[i].b.name +'</td><td class="td4">'+ result.data.gamelist[i].scores +'</td></tr>');
                oTable.append(oTr);
            }
        }else{
        	var pid = $("#pid").val();
        	var url = "partner.do?op=join&pid=" + pid;
        	window.location.href = url;
        }
    }
}
