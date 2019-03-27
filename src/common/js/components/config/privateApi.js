/**
 * 私募接口
 */


//获取当前页面地址
var pathname = window.location.href;

module.exports = function() {
    //检查是否登录,sso后换成jsonp
    this.checkUserInfo_api = http_url.sso_url + '/checkUserInfo.action';
    // app内检测登录状态接口
    this.checkLogin_api = http_url.pef_url + '/isLogin.action';

    //接口API
    this.login_api = http_url.pef_url + '/user/login.action'; //登录并绑定salesForce账户
    this.login_mall_api = http_url.pef_url + '/points/login.action'; //积分商城登录
    this.reg_api = http_url.pef_url + '/account/user/custRegist.action'; //用户注册
    //readyPer_api=       http_url.htjf_url +'/apis/wx/account/user/findUserByOpenId.action';  //判断用户是否为新用户

    //prdRec_url=         http_url.htjf_url +'/apis/pc/account/recommand/recommandByLevel.action';  //产品推荐接口
    //unbind_api=         http_url.htjf_url + "/apis/wx/user/unwrapAccount.action";//解除绑定

    /***************获取会员等级*******************/
    this.memberLevel_api = http_url.pef_url + '/points/memberLevel.action';

    this.payDetail_api = http_url.pef_url + '/detailed/queryTradesByPages.action'; //交易明细接口
    this.appDetail_api = http_url.pef_url + '/detailed/queryOrdersByPages.action'; //预约明细接口
    this.ransom_api = http_url.pef_url + '/detailed/queryRedemptionByPages.action'; //赎回明细接口

    this.pOver_api = http_url.pef_url + '/points/pointsBalance.action'; //剩余积分接口
    this.pMature_api = http_url.pef_url + '/points/toDuePoints.action'; //到期积分接口 
    this.myPoint_api = http_url.pef_url + '/points/queryPointsByDate.action'; //积分明细
    this.exchagePot_api = http_url.pef_url + '/points/exchangePoints.action'; //积分兑换 

    

    this.content_url = http_url.pef_url + "/index/content/findLatestContentByCategory.action"; //内容管理


    /*********************忘记密码，进行手机验证*******************/
    //客户联系人手机号查询
    this.userPhone_api = http_url.pef_url + '/user/getUserRealityPhone.action';
    //校验验证码
    this.checkSms_api = http_url.pef_url + '/user/checkSms.action';

    /********************重设密码******************************/
    //重置密码
    this.resetPwd_api = http_url.pef_url + '/user/resetPwd.action';

    //发送短信验证码，都是apis开头
    this.sms_api = http_url.pef_url + '/textmsg/messageCertSend.action';
    //获取图文验证码
    this.getTwyzm_api = http_url.pef_url + '/ImageVerify/generateValidateCode.action?uid=';
    //校验图文验证码 
    this.checkTwyzm_api = http_url.pef_url + '/ImageVerify/checkValidateCode.action';

    //发送语音验证码
    this.voice_api = http_url.pef_url + '/voicemsg/voiceMsgVerify.action';

    //获取客户信息
    this.user_api = http_url.pef_url + '/account/user/getUserInfo.action';
    // app里面公募调用私募getuserinfo接口
    this.user_api_two = http_url.pub_pri_url + '/account/user/getUserInfo.action';

    //退出登录
    this.logout = http_url.pef_url + '/user/logout.action';
    //查询当前是否为工作日
    this.checkWorkDate_api = http_url.pef_url + '/account/redemption/checkWorkDate.action';
    //查询T+N日
    this.TNDay_api = http_url.pef_url + '/account/redemption/queryTNDay.action';


    this.prvDetail_api = http_url.pef_url + '/product/details/queryProductDetail.action'; //私募详情查询
    // this.prvNewValue_api = http_url.pef_url + '/product/details/queryNetValue.action'; //最新净值查询
    this.prvLight_api = http_url.pef_url + '/product/details/queryProductImage.action'; //产品亮点查询
    this.prvLevel_api = http_url.pef_url + '/product/details/queryBenefitLevel.action'; //受益级别查询
    this.prvHisValue_api = http_url.pef_url + '/product/details/queryHistoryNetValue.action'; //历史净值查询
    this.prvResCancel_api = http_url.pef_url + '/product/trade/fundReserveCancel.action'; //取消预约接口

    this.prvReserve_api = http_url.pef_url + '/product/trade/fundReserve.action'; //确定预约接口
    this.custBro_api = http_url.pef_url + '/account/broker/custBroRelQuery.action'; //理财师查询与客户关系接口
    //私募首页--检查是否登录
    //私募首页--产品推荐
    this.recommend_api = http_url.pef_url + '/index/recommand/recommand.action';
    
    //鉴权时私募客户信息回显及客户基本信息完善查询接口
    this.queryUserInfoToAuth_api = http_url.pef_url + '/account/certification/queryUserInfoToAuth.action';
    //客户信息修改提交接口
    this.supplyUserInfo_api = http_url.pef_url + '/account/user/supplyUserInfo.action';
    //私募绑定或者解绑理财师
    this.planner_bind_api = http_url.pef_url + "/account/broker/appointBroker.action";

    //设置--修改联系人手机号
    this.modifyContactPhone_api = http_url.pef_url + '/account/user/modifyContactPhone.action';
    //设置--修改登录密码
    this.modifyPassword_api = http_url.pef_url + '/account/user/modifyPassword.action';

    //公私募账户合并
    this.accountMerge_api = http_url.pef_url + '/account/certification/accountMerge.action';
    //我的私募资产总金额
    this.totalNum_url = http_url.pef_url + '/detailed/getAllAssets.action';
    //所有资产
    this.totalAllAsset_api = http_url.pef_url +"/account/jjs/getTotalAssets.action";
    //金交所总资产
    this.JJSTotalAsset_api = http_url.pef_url + '/account/jjs/getJJSTotalAssets.action';
    //私募金交所持仓明细查询
    this.JJSDetail_api = http_url.pef_url + '/account/jjs/queryAssetsDetailByPages.action';
    //获取联系人手机号接口 获取赎回页面信息
    this.prvRedemptionInfo_api = http_url.pef_url + '/account/redemption/queryRedemptionInfo.action';
    //取消预约接口
    this.prvFundReserveCancel_api = http_url.pef_url + '/product/trade/fundReserveCancel.action';


    // 首页
    this.findBannerByPosition_api = http_url.pef_url + '/index/banners/findBannerByPosition.action';
    // 内容管理接口
    this.findContentByCategory_api = http_url.pef_url + '/index/content/findContentByCategory.action';

    //明细
    this.posDetail_api = http_url.pef_url + '/account/detailed/queryAssetsDetailByPages.action'; //持仓明细接口
    this.totalNum_api = http_url.pef_url + '/account/detailed/getAllAssets.action'; //我的资产总金额
    //中融货币E产品协议接口
    this.cashXml_api = http_url.pef_url + '/index/productProtocol/findProductProtocolById.action'; //我的资产总金额

    
    
    //产品专题
    this.activity_api = http_url.pef_url + '/index/special/getSpecialById.action';


    //老带新
    this.oldRecommendNew_api = http_url.pef_url + '/user/oldRecommendNew.action';
    //
    this.oldAndNewRegist_api = http_url.pef_url + '/account/user/oldAndNewRegist.action';

    //资讯详情
    this.findContentDetailById_api = http_url.pef_url + '/index/content/findContentDetailById.action';

    //恒天财富首页
    this.findDataByType_api = http_url.pef_url + '/index/dataManager/findDataByType.action';

    

    
    //百度推广页
    this.baiduPromotion_api =  http_url.pef_url + '/index/baiduPromotion/enroll.action';



    //基民教育记录
    this.fundEducationRecord_api = http_url.pef_url +'/index/communityActivitiesEnroll/fundEducationRecord.action';

    // 二维码计数接口
    this.qrCodeDetails_api = http_url.pef_url + '/qrcode/qrCodeDetails.action';
};