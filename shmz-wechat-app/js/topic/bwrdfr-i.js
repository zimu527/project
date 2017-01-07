/**
 * interface entrance
 */
if(typeof BWFRI != 'object'){
	BWFRI = {};
}

BWFRI.TopicCurrentService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicCurrentService.do',params,resultCallback);
};

BWFRI.TopicMyThreadLikePageServie = function(params,resultCallback){
	new BWRDFRQuerior('','TopicMyThreadLikePageServie.do',params,resultCallback);
};

BWFRI.TopicMyThreadLikeServie = function(params,resultCallback){
	new BWRDFRQuerior('','TopicMyThreadLikeServie.do',params,resultCallback);
};

BWFRI.TopicMyThreadPageService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicMyThreadPageService.do',params,resultCallback);
};

BWFRI.TopicMyThreadService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicMyThreadService.do',params,resultCallback);
};

BWFRI.TopicRankService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicRankService.do',params,resultCallback);
};

BWFRI.TopicReplyToMePageService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicReplyToMePageService.do',params,resultCallback);
};

BWFRI.TopicReplyToMeService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicReplyToMeService.do',params,resultCallback);
};

BWFRI.TopicService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicService.do',params,resultCallback);
};

BWFRI.TopicThreadCommentReplyService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadCommentReplyService.do',params,resultCallback);
};

BWFRI.TopicThreadCommentService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadCommentService.do',params,resultCallback);
};

BWFRI.TopicThreadDeleteService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadDeleteService.do',params,resultCallback);
};

BWFRI.TopicThreadLikeService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadLikeService.do',params,resultCallback);
};

BWFRI.TopicThreadLikeSubmitService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadLikeSubmitService.do',params,resultCallback);
};

BWFRI.TopicThreadListPageService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadListPageService.do',params,resultCallback);
};

BWFRI.TopicThreadListService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadListService.do',params,resultCallback);
};

BWFRI.TopicThreadOneCommentPageService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadOneCommentPageService.do',params,resultCallback);
};

BWFRI.TopicThreadOneService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadOneService.do',params,resultCallback);
};

BWFRI.TopicThreadReportService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadReportService.do',params,resultCallback);
};

BWFRI.TopicThreadSubmitService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicThreadSubmitService.do',params,resultCallback);
};

BWFRI.TopicTopService = function(params,resultCallback){
	new BWRDFRQuerior('','TopicTopService.do',params,resultCallback);
};

BWFRI.UserMessageNotifyService = function(params,resultCallback){
	new BWRDFRQuerior('','UserMessageNotifyService.do',params,resultCallback);
};

