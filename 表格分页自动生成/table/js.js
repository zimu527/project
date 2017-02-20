/*表格组装配置：
 *tableTh：表头
 * params：组合格式：
 {paradetail:[{'vname':'与json对应的参数名称',nodeType:'类型'},
 {'vname':[{'classname':'class类名','btnname':'按钮name属性值','vtext':'按钮名称'},{'classname':'btn','btnname':'bname','vtext':'修改'}],nodeType:'3'}]},顺序按照表格顺序
 nodeType:1,文本；2，图片；3,操作按钮；4，隐藏类型
 */
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

//传入页码和每页行数，获取表格数据
function doGetList(page,rows){
    getList();//传入页码和每页行数，获取表格数据
}
function getList(){
    //调用createHtml()、creatTable()、pagination()方法，生成表格和分页
    var trshtml = createHtml(result.data.teamlist, params);//调用组装方法createHtml（）组装表格，result.data.teamlist是要填充的json数据，params是组装配置参数
    creatTable('main',"tableCont",tableTh,trshtml);//表格要插入的父元素（div）id、自定义表格id、表头、data(注：同一页面内多个表格，id不能重复)
    pagination("main","pageCont",result.data.pager);//分页要插入的父元素（div，可以与表格的父元素相同）id、自定义分页部分id、page数据(注：同一页面内多个表格，id不能重复)
}





