
var BWRDFRUploadContainer = {};

var BWRDFRQuerior = function(prefixPath,serviceLabel,params,resultCallback)
{
	if(typeof params != "object")
		throw new Error("The params must be an object!");
	if(resultCallback == null || typeof resultCallback != "object")
	 	throw new Error("The resultCallback must be a object!");
	
	this.statusServPath = prefixPath + "BWRDFRUploadStatusService.do";
	this.servicePath = prefixPath + serviceLabel;
	this.params = params;
	this.isCbRsValid = typeof resultCallback.onResult != "undefined" && resultCallback.onResult != null;
	this.isCbUpgValid = typeof resultCallback.onUploadProgress != "undefined" && resultCallback.onUploadProgress != null;
	this.resultCallback = resultCallback;
	this.files = new Array();
	this.checkData('',this.params);
	
	if(this.files.length>0)
	{
		this.requestHttp(this.statusServPath,{opCode:1},this.onCreateTask,'createUploadTask');
	}else{
		this.requestHttp(this.servicePath,this.params,this.onResult,'normalRequest');
	}	
}

BWRDFRQuerior.prototype.uploadData = function()
{
	dataDiv = document.createElement("div");
    dataDiv.style.display = "none";
    document.body.appendChild(dataDiv);
    	
    iframeLabel = "BWRDFRIfr"+this.taskId;
    formLabel = "BWRDFRForm"+this.taskId;
    dataDiv.innerHTML = "<iframe id=\""+iframeLabel+"\" name=\""+iframeLabel+"\"></iframe>"
    	                  + "<form name=\""+formLabel+"\" id=\""+formLabel+"\" action=\""+this.servicePath+"?BWRDFR_UPLOAD_FILE_STATUS_KEY="+this.taskId+"\" method=\"post\" enctype=\"multipart/form-data\" target=\""+iframeLabel+"\"></form>";
    	
    dataForm = document.getElementById(formLabel);
    json_data = document.createElement("input");
    json_data.id="json-data";
    json_data.name="json-data";
    json_data.type="text";
    json_data.value=this.params.toJSONString();
    dataForm.appendChild(json_data);
    
    for(i=0;i<this.files.length;i++)
    {
    	f = this.files[i];
    	f.orgName = f.file.name;
    	f.parentNode = f.file.parentNode;
    	f.file.name = f.id;
    	dataForm.appendChild(f.file);
    }
    
    dataForm.submit();    
    this.setQueryTimer();

    for(i=0;i<this.files.length;i++)
    {
   		f = this.files[i];
    	f.file.name = f.orgName;
    	f.parentNode.appendChild(f.file);
    }   
}
BWRDFRQuerior.prototype.setQueryTimer = function()
{
	this.clearQueryTimer();
	this.qTimer = setTimeout("BWRDFRQueryTimer('"+this.taskId+"');",500);
}
BWRDFRQuerior.prototype.clearQueryTimer = function()
{
	if(typeof this.qTimer != 'undefined')
	{
		clearTimeout(this.qTimer);
		this.qTimer = undefined;
	}
}
BWRDFRQuerior.prototype.queryStatus = function()
{
	this.requestHttp(this.statusServPath,{opCode:2,id:this.taskId},this.onQueryStatus,'queryStatus');
}
BWRDFRQuerior.prototype.requestHttp = function (path,reqDataObj,resProc,reqLabel)
{
	var req;
	if (window.XMLHttpRequest)
	{// code for all new browsers
		req = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE5 and IE6
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}else{       
		throw new Error("Your browser does not support XMLHTTP.");
		return;
	}
	req.parentObj = this;
	req.onreadystatechange = BWRDFRHttpStatChange;
	req.open("POST",path,true);
	req.setRequestHeader('Content-Type','application/json');
	this.resProc = resProc;
	this.reqLabel = reqLabel;
	req.send(reqDataObj.toJSONString());
}


BWRDFRQuerior.prototype.checkData = function (identifier,toChkObj)
{
	for(var p in toChkObj)
	{
		obj = toChkObj[p];
		if(typeof obj == 'object')
		{
			var id = identifier+p;
			if(typeof obj.nodeName!='undefined' && typeof obj.nodeType != 'undefined' && obj.nodeName=='INPUT' && obj.nodeType=='1' && obj.type=='file')
			{				
				this.files.push({id:id,file:obj});
				toChkObj[p] = undefined;
			}else{
				this.checkData(id+'.',obj);
			}
		}
	}
}

BWRDFRQuerior.prototype.onResult = function(result)
{
	if(this.isCbRsValid)this.resultCallback.onResult(result);
}
BWRDFRQuerior.prototype.onUploadProgress = function(current,total)
{
	if(this.isCbUpgValid)this.resultCallback.onUploadProgress(current,total);
}

BWRDFRQuerior.prototype.onCreateTask = function(rs)
{
	if(rs.code == 0)
	{
		this.taskId = rs.data.id;
		BWRDFRUploadContainer[this.taskId] = this;
		this.uploadData();
	}else{
		this.onResult({code:2005,message:"Fail to create upload task. Error code is '"+rs.code+"'"});
	}
}
BWRDFRQuerior.prototype.onQueryStatus = function(rs)
{
	if(rs.data.status<5)
	{
		this.onUploadProgress(rs.data.currentRead,rs.data.totalLength);
		this.setQueryTimer();
	}else if(rs.data.status==5)
	{
		this.onResult(rs.data.respData);
	}else
	{
		this.onResult({code:2006,message:"Invalid upload status!"});
	}
}

function BWRDFRQueryTimer(taskId)
{
	q = BWRDFRUploadContainer[taskId];
	if(typeof q != 'undefined' && q!= null)
	{
		q.queryStatus();
	}
}
function BWRDFRHttpStatChange()
{
	if (this.readyState==4)
	{// 4 = "loaded"
		if (this.status==200)
		{// 200 = OK
			this.parentObj.resProc(this.responseText.parseJSON());
		}else{
			this.parentObj.onResult({code:2001,message:"Error http response code '"+this.status+"'. Current requester is '"+this.parentObj.reqLabel+"'."});
		}
	}
}
