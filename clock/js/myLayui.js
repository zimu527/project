//1.tab切换效果
layui.use('element', function(){
  var element = layui.element();
	element.on('nav(filter)', function(elem){
	  console.log(elem.index()); //得到当前点击的nav序号
	  loadHtmlFile(elem.index());
	});
});
  

//2.表单
layui.use('form', function(){
  var form = layui.form();
  //2.1自定义表单验证,把key赋值给输入框的 lay-verify 属性
form.verify({
  username: function(value){
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }
    if(/^\d+\d+\d$/.test(value)){
      return '用户名不能全为数字';
    }
  }
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] 
}); 
  //2.2提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    alert(';;')
    return false;
  });
});
