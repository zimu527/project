
function compareDateDiff(start, end) {
	var regS = new RegExp("-","gi");
	
	var startTime = start;
	var endTime = end;
	startTime = startTime.replace(regS,"/");
	endTime = endTime.replace(regS,"/");
	
	var bd = new Date(Date.parse(startTime)); 
	var ed = new Date(Date.parse(endTime));

	//计算出相差天数
	var timeSpace = ed.getTime() - bd.getTime();
	var days = Math.floor(timeSpace/(24*3600*1000))
	
	return Number(days);
}

/**
 * 根据时间获取 周几
 * @param {} _date  时间  格式为 2013-3-10
 */
function _getWeekDay(_date){
	var tmp = _date.split("-");  //日期为输入日期，
	if(tmp.length >2){
		var newDate=new Date(tmp[0],parseInt(tmp[1]-1),tmp[2]);
		var dayNames = ['日','一','二','三','四','五','六'];
		return dayNames[newDate.getDay()];
	}else{
		return "";
	}
}

/**
 * 根据日期推算 前后n天的日期
 * @param {} _date  时间  格式为 2013-3-10
 * @param {} _diff  前后推算的天数（>0 后一天，<0 前一天）
 */
function _getNextDate(_date, _diff) {
	var tmp = _date.split("-");
	var y = parseInt(tmp[0], 10);
	var m = parseInt(tmp[1], 10) - 1;
	var t = parseInt(tmp[2], 10);
	var d = new Date(y, m, t);
	d.setDate(d.getDate() + _diff);

	return d.format('yyyy-MM-dd');
}


/** 
*转换long值为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 

function getFormatDateByLong(l, pattern) {
    return _getFormatDate(new Date(l), pattern);
}

/** 
*转换日期对象为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 
function _getFormatDate(date, pattern) {
    if (date == undefined) {
        return "";
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}


Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(),	//day
		"h+" : this.getHours(),  //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}