
//wxShare(registerTitle , registerDesc , registerImg , registerUrl);

var images = {
	localId: [],  //选定照片的本地ID列表
	serverId: []  //图片的服务器端ID
};
var campusId = [];
var campusName = [];
var campusParent = [];
var departmentId = [];
var departmentName = [];
var departmentParent = [];

$(document).ready(function() {
	//新建入学时间列表
	for(var j=2000; j<2017; j++){
		var oP = $('<option value="'+ j +'">'+ j +'</option>');
		$('#enterTime').append(oP);
	}
	//2.31. 获取学校/校区/院系列表
	UniversityInfo();

});
//2.31. 获取学校/校区/院系列表
function UniversityInfo(){
	var onResult = UniversityInfoOnResult;
	var resultProcessor = {
		'onResult':onResult
	};
	BWFRI.UniversityGetInfoService({} , resultProcessor);
}
function UniversityInfoOnResult(result){
	if(result.code != 0){
		alert('不给力，刷新重试~');
	}else {
		if(result.data.univList.length > 0){
			for(var i=0; i<result.data.univList.length; i++){
				//类型 1-学校，2-校区，3-院系。
				if(result.data.univList[i].type == 1){
					var newOption = $('<option value='+ result.data.univList[i].areacode +'>'+ result.data.univList[i].areaname +'</option>');
					$('#school').append(newOption);
				}else if(result.data.univList[i].type == 2){
					campusId.push(result.data.univList[i].areacode);
					campusName.push(result.data.univList[i].areaname);
					campusParent.push(result.data.univList[i].parentcode);
				}else if(result.data.univList[i].type == 3){
					departmentId.push(result.data.univList[i].areacode);
					departmentName.push(result.data.univList[i].areaname);
					departmentParent.push(result.data.univList[i].parentcode);
				}
			}
		}
	}
}
function selectA(){
	$('#campus').html('<option>选择校区</option>');
	$('#department').html('<option>选择院系</option>');
	for(var j=0; j<campusId.length; j++){
		if($('#school option:selected').attr('value') == campusParent[j]) {
			var newOptionA = $('<option value='+ campusId[j] +'>'+ campusName[j] +'</option>');
			$('#campus').append(newOptionA);
		}
	}
	for(var m=0; m<departmentId.length; m++){
		if($('#school option:selected').attr('value') == departmentParent[m]) {
			var newOptionB = $('<option value='+ departmentId[m] +'>'+ departmentName[m] +'</option>');
			$('#department').append(newOptionB);
		}
	}
}

//点击绑定会员
function bindMember(){
	var sex = $('input:radio:checked').val();
	var enterTime = $('#enterTime option:selected').val();//入学时间
	var school = $('#school option:selected').val();//学校
	var campus = $('#campus option:selected').val();//校区
	var department = $('#department option:selected').val();//院系
	var major = $('#major').val();
	var chatName = $('#chatName').val();//微信号
	var qrCode = images.serverId;//二维码
	$('[name="qrcode"]').val(qrCode);

	if(enterTime == "undefined" || enterTime == null || enterTime == ""){
		alert("请输入入学时间");
		return false;
	}
	if(school == "undefined" || school == null || school == ""){
		alert("请输入学校");
		return false;
	}
	if(campus == "undefined" || campus == null || campus == ""){
		alert("请输入校区");
		return false;
	}
	if(department == "undefined" || department == null || department == ""){
		alert("请输入院系");
		return false;
	}
	if(chatName == "undefined" || chatName == null || chatName == ""){
		alert("请输入微信号");
		return false;
	}
	//if(qrCode == "undefined" || qrCode == null || qrCode == ""){
	//	alert("请上传照片");
	//	return false;
	//}
	//_showPopBoxById("loadingToast");//loading
	window.bindForm.submit();
	//hiddenBox("loadingToast");//loading
}

var upImgCount = 1;//总共可以上传照片张数

//添加照片
function addImg(){
	if(images.serverId.length == "undefined" || images.serverId.length == null || images.serverId.length == ""){
		images.serverId.length = 0;
	}
	if(upImgCount - images.serverId.length <= 0){
		alert("只能上传一张照片哟~");
		return false;
	}

	//拍照或从手机相册中选图接口
	wx.chooseImage({
		count: upImgCount - images.serverId.length, // 默认9
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
			images.localId = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

			var i = 0;
			var length = images.localId.length;

			var upload = function(){
				wx.uploadImage({
					localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						images.serverId.push(res.serverId);

						$('.addImg').before('<img id="showImg" src="'+ images.localId[i] +'" style="width:2rem;">')

						//$("#showImg").attr('src' , );

						i++;
						if(i < length){
							upload();
						}
					},
					fail: function () {
						alert("上传失败");
					}
				});
			};
			upload();
		}
	});
}