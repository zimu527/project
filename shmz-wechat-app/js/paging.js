// JavaScript Document
//分页
function Page(countRecord , pageSize , obj1 , obj2 , obj , data , imgRootUrl){
	this.countPage = (countRecord % pageSize == 0 ? countRecord / pageSize: Math.ceil(countRecord / pageSize));//总页数
	this.nowPage = 1;//当前页码
	this.startIndex = 0;//当前页 开始记录标志
	this.endIndex;//当前页 结束记录标志点	
	
	//上一页
	this.prev = function(){
		if(this.nowPage - 1 > 1){
			obj.find(".prev").show();
			obj.find(".next").show();
			//$(".prev").show();
			//$(".next").show();
			this.nowPage -= 1;
			this.startIndex = (this.nowPage - 1) * pageSize;
			//alert(this.nowPage);
		}else{//首页
			obj.find(".prev").hide();
			obj.find(".next").show();
			//$(".prev").hide();
			//$(".next").show();
			this.nowPage = 1;
			this.startIndex = 0;
			//alert(this.nowPage);
		}
		this.endIndex = this.startIndex + pageSize;
		bulidList(this.startIndex , this.endIndex , obj1 , obj2 , data , imgRootUrl);
	};
	
	//下一页
	this.next = function(){
		if(this.nowPage + 1 >= this.countPage){//最后一页
			obj.find(".prev").show();
			obj.find(".next").hide();
			//$(".prev").show();
			//$(".next").hide();
			this.nowPage = this.countPage;
			this.startIndex = (this.nowPage - 1) * pageSize;
			this.endIndex = countRecord;
			//alert(this.nowPage);
		}else{
			obj.find(".prev").show();
			obj.find(".next").show();
			//$(".prev").show();
			//$(".next").show();
			this.nowPage += 1;
			this.startIndex = (this.nowPage - 1) * pageSize;
			this.endIndex = this.startIndex + pageSize;
			//alert(this.nowPage);
		}
		bulidList(this.startIndex , this.endIndex , obj1 , obj2 , data , imgRootUrl);
	};
}



























