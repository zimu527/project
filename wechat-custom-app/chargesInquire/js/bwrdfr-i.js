/**
 * interface entrance
 */
if(typeof BWFRI != 'object'){
	BWFRI = {};
}

BWFRI.ALaShanSearchInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','ALaShanSearchInfoService.do',params,resultCallback);
};

BWFRI.JssdkSignatureService = function(params,resultCallback){
	new BWRDFRQuerior('','JssdkSignatureService.do',params,resultCallback);
};

BWFRI.XingAnSearchInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','XingAnSearchInfoService.do',params,resultCallback);
};

