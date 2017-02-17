/**
 * interface entrance
 */
if(typeof BWFRI != 'object'){
	BWFRI = {};
}

BWFRI.ADGetService = function(params,resultCallback){
	new BWRDFRQuerior('','ADGetService.do',params,resultCallback);
};

BWFRI.BookingGetAreaListService = function(params,resultCallback){
	new BWRDFRQuerior('','BookingGetAreaListService.do',params,resultCallback);
};

BWFRI.BookingProductService = function(params,resultCallback){
	new BWRDFRQuerior('','BookingProductService.do',params,resultCallback);
};

BWFRI.BusinessGetListService = function(params,resultCallback){
	new BWRDFRQuerior('','BusinessGetListService.do',params,resultCallback);
};

BWFRI.BusinessGetPromoteDataService = function(params,resultCallback){
	new BWRDFRQuerior('','BusinessGetPromoteDataService.do',params,resultCallback);
};

BWFRI.DiscountGetCampusListService = function(params,resultCallback){
	new BWRDFRQuerior('','DiscountGetCampusListService.do',params,resultCallback);
};

BWFRI.DiscountGetListService = function(params,resultCallback){
	new BWRDFRQuerior('','DiscountGetListService.do',params,resultCallback);
};

BWFRI.ExamGetLastTopService = function(params,resultCallback){
	new BWRDFRQuerior('','ExamGetLastTopService.do',params,resultCallback);
};

BWFRI.ExamGetPeopleNumService = function(params,resultCallback){
	new BWRDFRQuerior('','ExamGetPeopleNumService.do',params,resultCallback);
};

BWFRI.ExamGetQuestionsService = function(params,resultCallback){
	new BWRDFRQuerior('','ExamGetQuestionsService.do',params,resultCallback);
};

BWFRI.ExamGetReportService = function(params,resultCallback){
	new BWRDFRQuerior('','ExamGetReportService.do',params,resultCallback);
};

BWFRI.ExamSubmitService = function(params,resultCallback){
	new BWRDFRQuerior('','ExamSubmitService.do',params,resultCallback);
};

BWFRI.JssdkSignatureService = function(params,resultCallback){
	new BWRDFRQuerior('','JssdkSignatureService.do',params,resultCallback);
};

BWFRI.MemberGetCreditService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberGetCreditService.do',params,resultCallback);
};

BWFRI.MemberGetInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberGetInfoService.do',params,resultCallback);
};

BWFRI.MemberGetSignInService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberGetSignInService.do',params,resultCallback);
};

BWFRI.MemberSignInService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberSignInService.do',params,resultCallback);
};

BWFRI.MemberSwitchConfigService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberSwitchConfigService.do',params,resultCallback);
};

BWFRI.MemberUploadQrcodeService = function(params,resultCallback){
	new BWRDFRQuerior('','MemberUploadQrcodeService.do',params,resultCallback);
};

BWFRI.PosterGetPromotionListService = function(params,resultCallback){
	new BWRDFRQuerior('','PosterGetPromotionListService.do',params,resultCallback);
};

BWFRI.PosterGetRankService = function(params,resultCallback){
	new BWRDFRQuerior('','PosterGetRankService.do',params,resultCallback);
};

BWFRI.PosterGetRewardService = function(params,resultCallback){
	new BWRDFRQuerior('','PosterGetRewardService.do',params,resultCallback);
};

BWFRI.PosterGetUserInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','PosterGetUserInfoService.do',params,resultCallback);
};

BWFRI.ResearchAnswerService = function(params,resultCallback){
	new BWRDFRQuerior('','ResearchAnswerService.do',params,resultCallback);
};

BWFRI.ResearchGetMyAnswerService = function(params,resultCallback){
	new BWRDFRQuerior('','ResearchGetMyAnswerService.do',params,resultCallback);
};

BWFRI.RouletteDrawService = function(params,resultCallback){
	new BWRDFRQuerior('','RouletteDrawService.do',params,resultCallback);
};

BWFRI.RouletteGetDrawNumService = function(params,resultCallback){
	new BWRDFRQuerior('','RouletteGetDrawNumService.do',params,resultCallback);
};

BWFRI.RouletteGetFansInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','RouletteGetFansInfoService.do',params,resultCallback);
};

BWFRI.RouletteGetPrizeRecordService = function(params,resultCallback){
	new BWRDFRQuerior('','RouletteGetPrizeRecordService.do',params,resultCallback);
};

BWFRI.ShareStatisticService = function(params,resultCallback){
	new BWRDFRQuerior('','ShareStatisticService.do',params,resultCallback);
};

BWFRI.TrafficRedBonusService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedBonusService.do',params,resultCallback);
};

BWFRI.TrafficRedGetActivityService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedGetActivityService.do',params,resultCallback);
};

BWFRI.TrafficRedGiveRedService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedGiveRedService.do',params,resultCallback);
};

BWFRI.TrafficRedLinkAddressService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedLinkAddressService.do',params,resultCallback);
};

BWFRI.TrafficRedOrderService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedOrderService.do',params,resultCallback);
};

BWFRI.TrafficRedReceiveRedService = function(params,resultCallback){
	new BWRDFRQuerior('','TrafficRedReceiveRedService.do',params,resultCallback);
};

BWFRI.UniversityGetInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','UniversityGetInfoService.do',params,resultCallback);
};

BWFRI.VoteGetJoinInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteGetJoinInfoService.do',params,resultCallback);
};

BWFRI.VoteGetOptionsService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteGetOptionsService.do',params,resultCallback);
};

BWFRI.VoteGetVoteInfoService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteGetVoteInfoService.do',params,resultCallback);
};

BWFRI.VoteJoinService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteJoinService.do',params,resultCallback);
};

BWFRI.VoteJoinTextService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteJoinTextService.do',params,resultCallback);
};

BWFRI.VoteOptionDetailService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteOptionDetailService.do',params,resultCallback);
};

BWFRI.VoteSearchOptionService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteSearchOptionService.do',params,resultCallback);
};

BWFRI.VoteSingleService = function(params,resultCallback){
	new BWRDFRQuerior('','VoteSingleService.do',params,resultCallback);
};

