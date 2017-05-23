/**
 * interface entrance
 */
if(typeof BWFRI != 'object'){
	BWFRI = {};
}

BWFRI.JssdkSignatureService = function(params,resultCallback){
	new BWRDFRQuerior('','JssdkSignatureService.do',params,resultCallback);
};

BWFRI.XingAnSearchInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','XingAnSearchInfoService.do',params,resultCallback);
};

