//$(document).ready(function(){
	function XingAnSearch(){
		var phone = $('#phone').val();
		if(phone==undefined||phone==''||phone.length!=11){
		popBoxAlert('请输入11位手机号码！');
		return;
	}else if(!checkPhoneNumValid(phone)){
		popBoxAlert('手机号码输入错误！');
		return;	
	}else{
		 _showPopBoxById("loadingToast");
		var onResult = XingAnSearchResult;
		var resultProcessor = {
			'onResult':onResult
			};
		BWFRI.XingAnSearchInfoService({'phone':phone} , resultProcessor);
	}
}
	function XingAnSearchResult(result){
		$(".age_wd").text("");
		$(".star_wd").text("");
		$(".net_age_wd").text("");
		$(".cycle_wd").text("");
		$(".consumption_wd").text("");
		$(".terminal_wd").text("");
		$(".month_wd").text("");
		$(".time_wd").text("");
		$(".totalTraffic_wd").text("");
		$(".card_wd").text("");
		$(".g4Network_wd").text("");
		$(".votle_wd").text("");
		$(".volteVoice_wd").text("");
		$(".customer_label p").empty();
		$(".customer_label ul").empty();
		$(".average_wd").text("");
		
		hiddenBox("loadingToast");//loading
		
		if(result.code != 0){
			popBoxAlert("",result.message);
			return false;
		}else{
			if(result.data.result!=0){
				popBoxAlert("","暂无数据");
				return false;
			}else{
					$(".phone_mb").text($('#phone').val());
					$(".age_wd").text(result.data.age);
					$(".star_wd").text(result.data.starRating);
					if(judgment(result.data.intime)){
						$(".net_age_wd").text(result.data.intime+"年");
					}
					if(judgment(result.data.replaceCycle)){
						$(".cycle_wd").text(result.data.replaceCycle+"月");
					}
					if(judgment(result.data.consume)){
						$(".consumption_wd").text(result.data.consume+"元");
					}
					
					$(".terminal_wd").text(result.data.terminal);
					$(".month_wd").text(result.data.month);
					$(".time_wd").text(result.data.callTime);
					if(judgment(result.data.totalTraffic)){
						$(".totalTraffic_wd").text(result.data.totalTraffic+"M");
					}
					$(".card_wd").text(result.data.g4Card);
					$(".g4Network_wd").text(result.data.g4Network);
					$(".votle_wd").text(result.data.volteTerminal);
					$(".volteVoice_wd").text(result.data.volteVoice);
					if(judgment(result.data.threeMonthsOnAverage)){
						$(".average_wd").text(result.data.threeMonthsOnAverage+"元");
					}
					
					
					if(result.data.tagList==null||result.data.tagList==undefined||result.data.tagList==""){
//						$(".customer_label p").empty();
						var list="暂无标签";
						$(".customer_label p").text(list);
					}else{
//						$(".customer_label ul").empty();
						if(judgment(result.data.tagList)){
							for(var i=0;i<result.data.tagList.length;i++){
								var list="<li>"+result.data.tagList[i]+"</li>";
								$(".customer_label ul").append(list);
							}
						}
					}
			}
		}
	}
		function checkPhoneNumValid(_phoneNum) {
			if (_phoneNum.trim() == "") {
				return false;
			}
			if (_phoneNum.trim().length != 11) {
				return false;
			}
			var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			return reg.test(_phoneNum.trim());
		}
		
		function judgment(res){
			if(res!=null&&res!=undefined&&res!=""){
				return true;
			}else{
				return false;
			}
		}
//});
