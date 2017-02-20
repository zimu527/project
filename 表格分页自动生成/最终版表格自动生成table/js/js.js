/*表格组装配置：
 *tabParentId:表格要插入的父元素（div）id，
 *tableId:自定义表格id，
 *pageParentId:分页要插入的父元素id（div，可与表格的父元素相同），
 *pageId:自定义的分页部分id
 *tableTh：表头
 * params：表格组装配置参数,
	params组合格式：
	{paradetail:[{'vname':'与json对应的参数名称',nodeType:'类型'},
	{'vname':[{'classname':'class类名','btnname':'按钮name属性值','vtext':'按钮名称'},{'classname':'btn','btnname':'bname','vtext':'修改'}],nodeType:'3'}]},
	顺序按照表格顺序nodeType:1,文本；2，图片；3,操作按钮；4，隐藏类型
 */
//定义表格及分页部分id
var tabParentId='main';
var tableId='tableCont';
var pageParentId='main';
var pageId='pageCont';
//定义表头
var tableTh=["序号","id","标题","操作"];
//定义表格组装配置参数（参数对应值、类型、按钮名称等）
var params = {
    paradetail: [{
        'vname': 'id',
        'nodeType': '1'
    }, {
        'vname': 'name',
        'nodeType': '1'
    }, {
        'vname': [{
            'classname': 'btn beditbtn',
            'btnname': 'bedit',
            'vtext': '修改'
        }, {
            'classname': 'btn delbtnbtn',
            'btnname': 'delbtn',
            'vtext': '删除'
        }],
        'nodeType': '3'
    }]
};
//定义默认行数
var basePageSize=10;

//页面加载完成后，获取表格
$(document).ready(function(){
	doGetList(basePageSize,'1');
});


//调用接口，传入页码和每页行数，获取表格数据
function doGetList(page,rows){
    //var onResult = getListDataOnResult;
    //var resultProcessor = {
    //    'onResult':onResult
    //};
    //BWFRI.getListDataService({'openid':opId} , resultProcessor);
//}
//function getListDataOnResult(result) {
    //if (result.code != 0) {
		//错误
     //} else {
		//if(result.data.result==0){
			//绘制表格
			creatList(result.data.teamlist,tabParentId,tableId,result.data.page,pageParentId,pageId)
		//}
    //}
}






