// 公共接口  /apis/common/


module.exports = function() {

    //查询字典，比如职业类型
    // this.queryDataDictionary_api = http_url.joint_url + '/protocol/queryDataDictionary.action';
    //全平台协议查询
    this.findProtocolById_api = http_url.joint_url + '/protocol/findProtocolById.action';
    //协议查询
    this.queryProtocols_api = http_url.joint_url + '/protocol/queryProtocols.action';
    //协议id查询模板
    // this.queryModel_api = http_url.joint_url + '/protocol/findProtocolById.action';  //重复接口
    //图片拼接查询模板
    this.imgModel_api = http_url.joint_url + '/banner/findBannerByPosition.action';
    // 内容管理接口
    this.findContentByCategory_joint_api = http_url.joint_url + '/content/findContentByCategory.action'

    //消息平台
    this.message_api = http_url.joint_url + '/message/productMessageQueue.action'
    //crm字典查询
    this.queryCrmDataDictionary_api = http_url.joint_url + '/crm/queryCrmDataDictionary.action';

    // this.queryReourceLabels_api = http_url.joint_url +"/product/details/queryReourceLabels.action"; //获取私募产品材料标签

    //老带新微信
    this.share_api = http_url.joint_url + '/weixin/share.action';

    //举贤荐才专题
    this.talentRecommend_api = http_url.joint_url + "/account/topicality/talentRecommend.action";

    // 上传图片
    this.uploadApi = http_url.joint_url + '/image/upload.action';
    // 图片下载
    this.downloadApi = http_url.joint_url + '/image/download.action';
    // 图片删除
    this.removeApi = http_url.joint_url + '/image/remove.action';
    
    //webviews接口
    this.h5FindContentDetailById_api = http_url.joint_url + "/content/h5/h5FindContentDetailById.action";
    this.h5FindLatestContentByCategory_api = http_url.joint_url + "/content/h5/h5FindLatestContentByCategory.action";
    this.RRById_api = http_url.joint_url +"/ginkgo/RRById.action";//这个接口挪到了公募的api下面了，可以去publicApi中找

    //抽奖活动专题
    this.award_api = http_url.joint_url + "/activity/querytimes.action"; // 抽奖次数查询
    this.queryallrecordlist_api = http_url.joint_url + "/activity/queryallrecordlist.action"; // 抽奖流水接口查询
    this.queryrecord_api = http_url.joint_url + "/activity/queryrecord.action"; // 我的抽奖记录查询
    this.drawintegral_api = http_url.joint_url + "/activity/drawintegral.action"; // 抽奖借口
    this.gettoken_api = http_url.joint_url + "/activity/gettoken.action"; //获取唯一的token值

    
    // 附件上传（暂时用于投资者分类、合格投资者、可多文件上传）
    this.upload_api = http_url.joint_url + '/file/upload.action';
    // 附件下载（暂时用于投资者分类、合格投资者）
    this.download_api = http_url.joint_url + '/file/download.action';


    /*---------------------------------------------------投资者分类 start-------------------------------------------------*/
    //  投资者分类申请  
    this.applyForClassification_api = http_url.joint_url + '/account/investor/applyForClassification.action';
    //  投资者分类查询
    // this.queryClassification_api = http_url.joint_url + '/account/investor/queryClassification.action';
    //  投资者分类撤销
    this.repealForClassification_api = http_url.joint_url + '/account/investor/repealForClassification.action';
    
    // 获取投资者知识问卷
    this.queryInvestmentKnowledge_api = http_url.joint_url + '/account/investor/queryInvestmentKnowledge.action';
    // 投资知识测试提交
    this.answerSubmit_api = http_url.joint_url + '/account/investor/answerSubmit.action';
    //  投资知识问卷结果查询
    this.querytInvestmentKnowledgeQuestionnaire_api = http_url.joint_url + '/account/investor/querytInvestmentKnowledgeQuestionnaire.action';
    /*---------------------------------------------------投资者分类 end-------------------------------------------------*/


    /*---------------------------------------------------风险测评 start-------------------------------------------------*/
    // 风险测评调查问卷接口
    this.questionnaire_api = http_url.joint_url + '/account/appraisal/questionTopicQuery.action';
    // 问卷提交
    this.questionnaire_score_api = http_url.joint_url + "/account/appraisal/answerSubmit.action"; 
    //风险评测结果
    this.test_result_api = http_url.joint_url + "/account/appraisal/getAppraisalResult.action"; 
    /*---------------------------------------------------风险测评 end-------------------------------------------------*/

    // 全平台协议ID查询
    this.list_api = http_url.joint_url + "/protocol/list.action"; 

    /*---------------------------------------------------银行卡相关 start-------------------------------------------------*/
    //实名认证，银行列表
    this.bankInfoList_api = http_url.joint_url + "/bank/queryBankList.action"; 
    //实名认证，省份及下属区域
    this.provinceList_api = http_url.joint_url + '/bank/queryProvinceAndCityInfo.action';
    //实名认证，支行列表
    this.branchInfoList_api = http_url.joint_url + '/bank/queryBranchBankInfo.action';
    /*---------------------------------------------------银行卡相关 end-------------------------------------------------*/

    // 协议预览下载接口
    this.fileDownLoadOrDisplay_api = http_url.joint_url + "/files/resource/fileDownLoadOrDisplay.action"; 

    //私募接口改造
    this.prvFundQuery_api = http_url.joint_url + '/product/list/fundQuery.action'; //私募列表查询
    this.prvApplyForRedemption_api = http_url.joint_url + '/account/redemption/redemptionApply.action';  //产品赎回申请
    // this.prvReource_api = http_url.joint_url + '/product/details/queryReourceList.action'; //产品材料接口


    // 中秋活动 我已完成学习按钮点击请求的接口
    this.eBusinessRecord_api = http_url.joint_url + '/index/communityActivitiesEnroll/eBusinessRecord.action';
    //鉴权/开户接口整合
    this.sms_two_api = http_url.joint_url + '/account/certification/pefFirstAuthForSmsCode.action';
    //实名认证，第二步页面提交数据
    this.realNameSubmit_api = http_url.joint_url + '/account/certification/pefAuthTrueIdentity.action';
   
    //实名认证-设置网站交易密码（公募开户）
    this.directOpenAcct_api = http_url.joint_url + '/account/certification/directOpenAcct.action';


    // 人工客服-token获取
    this.getToken_api = http_url.joint_url + '/staffservice/getToken.action';

    // 会员卡片图片文案
    this.findBannerLikePosition_api = http_url.joint_url + '/banner/findBannerLikePosition.action';

    // 会员权益查询
    this.queryRightsByLevel_api = http_url.joint_url + '/account/gingkoRights/queryRightsByLevel.action';

    // 未读消息数量
    this.unreadMsgCount_api = http_url.joint_url + '/account/myMessage/unreadMsgCount.action';

    // 设置消息状态(未读变已读)
    this.alterMsgStatus_api = http_url.joint_url + '/account/myMessage/alterMsgStatus.action';

    // 我的消息查询
    this.getMessageByPages_api = http_url.joint_url + '/account/myMessage/getMessageByPages.action';

    // 未读消息数量
    // this.queryFreezeStatus_api = http_url.joint_url + '/account/freezeStatus/queryFreezeStatus.action';

    // 先校验验证码，后校验手机号
    this.phoneCodeCheckout_api = http_url.joint_url + '/verify/phoneCodeCheckout.action';

    // 产品协议ID查询
    this.queryProIDsByCode_api = http_url.joint_url + '/protocol/queryProIDsByCode.action';
    // 查询理顾信息
    this.getBrokerInfo_api = http_url.joint_url + '/broker/getBrokerInfo.action';
    // 查询理顾图片接口
    this.getImage_api = http_url.joint_url + '/broker/getImage.action';


}   