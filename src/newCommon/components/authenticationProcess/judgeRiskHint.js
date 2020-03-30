/**  
* @Page:  售前告知书弹框以及产品风险提示框的展示逻辑
* @Author: 闫瑞婷  
* @Date:   2020-03-20
* 参数：
* type // 1 客户预约确认  2 私募预约提示 区别在于预约确认提示框关闭需要返回上一页，以及阅读告知书后跳转页面不同
* projectId   // 项目id
* projectName // 项目名称
* isPopup     // 售前告知书是否展示 为""则不展示
* isRiskPopup // 产品期限不符弹框 为""则不展示
* isElecContract //  是否是电子合同产品【0.否 1.是】
* isAllowAppend // 是否可以进行追加操作【0.否 1.是】
* isSatisfied // 合格投资者认证是否满足产品策略限制，【0.否 1.是】，需要给app携带
* accreditedInvestor 合格投资者【空-未做过】【0-未通过】【1-已通过】【2-已过期】
* htmdEvt 代表埋点的属性，如当前页面只引用该组件一次，则htmdEvt的值为当前页面名，若多次引用，则需区分引用的场景，传入不同的值
* custType // 客户类型 1 个人 (预约私募产品时需要传)
* phoneCode   // 短信验证码（客户预约确认时需要传）
* reserveId // 预约id （客户预约确认时需要传）
* isPubToPri // 是否公转私 （客户预约确认时需要传）
*/

module.exports = function(params) {
	var type = params.type;
	var projectId = params.projectId;
	var projectName = params.projectName;
	var isPopup = params.isPopup;
	var isRiskPopup = params.isRiskPopup;
	var isElecContract = params.isElecContract;
	var isAllowAppend = params.isAllowAppend;
	var isSatisfied = params.isSatisfied;
	var accreditedInvestor = params.accreditedInvestor;
	var htmdEvt = params.htmdEvt;
	if(params.custType) {
		var custType = params.custType;
	}
	if(params.phoneCode) {
		var phoneCode = params.phoneCode;
		var reserveId = params.reserveId;
		var isPubToPri = params.isPubToPri;
	}
	var judge = {
		$e:{
            
        },
        data: {

		},
        init: function() {
            var that = this;
            that.judgeRiskHint()
        },
        // 售前告知书及产品期限提示框展示逻辑
        judgeRiskHint: function() {
            var that = this;
        	if (!!isPopup) { //如果弹出售前告知书或期限不符弹框
                //发送ajax请求
                var ReourceListobj = [{
                    url: site_url.queryReourceListNew_api,
                    data: {
                        projectId: projectId,
                        fileType: isPopup
                    },
                    contentTypeSearch: false,
                    needLoading: true,
                    needLogin: true, //需要判断是否登陆
                    callbackDone: function(json) { //成功后执行的函数
                        var data = json.data[0],
                            noticeObj = data;
                        if(!!isRiskPopup && !!isPopup){ // 产品期限风险弹框与售前告知书都展示
                            var objElasticLayer = {
                                title: '尊敬的客户',
                                id: 'sellPop',
                                p: '<p class="" style="font-weight:bold;text-align:center">您风险测评中所选计划投资期限少于产品期限存在匹配风险，请确认是否继续购买</p>',
                                yesTxt: '继续',
                                celTxt: '放弃',
                                htmdEvtYes: htmdEvt + '_a1',  // 埋点确定按钮属性
                                htmdEvtCel: htmdEvt + '_a2',  // 埋点取消按钮属性
                                zIndex: 1200,
                                callback: function(t) {
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'sellPop',
                                        p: '<p class="" style="font-weight:bold;text-align:center">你选择的产品与您现在的风险承受能力相匹配</p>' +
                                                '<p class="">请您认真阅读' + noticeObj.fileName + projectName + '并确认后继续购买该产品</p>',
                                        yesTxt: '去阅读',
                                        celTxt: '取消',
                                        htmdEvtYes: htmdEvt + '_a3',  // 埋点确定按钮属性
                                        htmdEvtCel: htmdEvt + '_a4',  // 埋点取消按钮属性
                                        zIndex: 1200,
                                        callback: function(t) {
                                        	that.readSaleNotice(noticeObj);
                                        },
                                        callbackCel: function() {
                                        	if(type == 1) {
                                            	location.href = "javascript:history.go(-1)";
                                        	}
                                        }
                                    };
                                    $.elasticLayer(obj)
                                },
                                callbackCel: function() { // // 预约确认点击放弃返回到上一页
                                    if(type == 1) {
                                    	location.href = "javascript:history.go(-1)";
                                	}
                                }
                            };
                        } else if(!isRiskPopup && !!isPopup){
                            var objElasticLayer = {
                                title: '尊敬的客户',
                                id: 'sellPop',
                                p: '<p class="" style="font-weight:bold;text-align:center">你选择的产品与您现在的风险承受能力相匹配</p>' +
                                        '<p class="">请您认真阅读' + noticeObj.fileName + projectName + '并确认后继续购买该产品</p>',
                                yesTxt: '去阅读',
                                celTxt: '取消',
                                htmdEvtYes: htmdEvt + '_a3',  // 埋点确定按钮属性
                                htmdEvtCel: htmdEvt + '_a4',  // 埋点取消按钮属性
                                zIndex: 1200,
                                callback: function(t) {
                                    that.readSaleNotice(noticeObj);
                                },
                                callbackCel: function() { // 放弃返回到上一页
                                    if(type == 1) {
                                    	location.href = "javascript:history.go(-1)";
                                	}
                                }
                            };
                        }
                        $.elasticLayer(objElasticLayer);
                    },
                    callbackNoData: function() {
                        $(".netLoading").hide();
                        var layer = {
                            title: '尊敬的客户',
                            id: 'sellPop',
                            p: '<p>售前风险告知书内容未显示，请联系您的理财师或拨打客服热线：400-8980-618进行咨询！</p>',
                            yesTxt: '确定',
                            htmdEvtYes: htmdEvt + '_a7',  // 埋点确定按钮属性
                            hideCelButton: true,
                            zIndex: 1200,
                            callback: function(t) {
                                if(type == 1) {
                                	location.href = "javascript:history.go(-1)";
                            	}
                            },
                        };
                        $.elasticLayer(layer);
                    },
                    callbackFail: function(json) { //失败后执行的函数
                        tipAction(json.message);
                        $(".netLoading").hide();
                    }
                }];
                $.ajaxLoading(ReourceListobj);
            } else if (!!isRiskPopup) {
                var objElasticLayer = {
                    title: '尊敬的客户',
                    id: 'sellPop',
                    p: '<p class="" style="font-weight:bold;text-align:center">您风险测评中所选计划投资期限少于产品期限存在匹配风险，请确认是否继续购买</p>',
                    yesTxt: '继续',
                    celTxt: '放弃',
                    htmdEvtYes: htmdEvt + '_a5',  // 埋点确定按钮属性
                    htmdEvtCel: htmdEvt + '_a6',  // 埋点取消按钮属性
                    zIndex: 1200,
                    callback: function(t) {
                        that.nextStep();
                    },
                    callbackCel: function() { // 预约确认点击放弃返回到上一页
                        if(type == 1) {
                            location.href = "javascript:history.go(-1)";
                        }
                    }
                };
                $.elasticLayer(objElasticLayer);
            } else {
                that.nextStep();
            }
        },
        // 点击去阅读后的跳转逻辑
        readSaleNotice: function(noticeObj) {
            if(custType == 1) {
                if(isElecContract == 1) { // 电子
                    var businessType = 'confirmation';
                    var isEle = "electronicContract";
                } else {
                    var businessType = 'confirmationNoele';
                    var isEle = "ordinaryProducts";
                }
            } else { // 机构用户预约电子产品（或确认预约电子产品）走非电子流程
                var businessType = 'confirmationNoele';
                var isEle = "ordinaryProducts";
            }
            if(type == 1) {
                window.location.href = site_url.downloadNew_api + "?filePath=" + noticeObj.fileUrl + "&fileName=" + new Base64().encode(noticeObj.fileName) + "&groupName=" +
                noticeObj.groupName + "&show=1&readComplete=true&showDownload=false&fundCode=" + projectId + "&isAllowAppend=" +
                isAllowAppend + '&accreditedInvestor=' + accreditedInvestor + '&businessType='+ businessType +'&phoneCode=' + phoneCode + '&projectName=' + projectName + '&isPubToPri=' + isPubToPri + '&isSatisfied=' + isSatisfied + '&reserveId=' + reserveId;
            } else if (type == 2) {
                window.location.href = site_url.downloadNew_api + "?filePath=" + noticeObj.fileUrl + "&fileName=" + new Base64().encode(noticeObj.fileName) + "&groupName=" +
                noticeObj.groupName + "&show=1&readComplete=true&showDownload=false&fundCode=" + projectId + "&isAllowAppend=" +
                isAllowAppend + '&accreditedInvestor=' + accreditedInvestor + '&businessType=' + isEle;
            }
        },
        // 满足条件后的跳转逻辑
        nextStep: function() {
            var that = this;
            // 客户为资管专业投资者，短信验证通过且投资期限与产品期限匹配后，不弹出阅读售前告知书弹框 
            if(type == 1) { // 预约确认
                if(custType == 1) {
                    if(isElecContract == 1) { // 电子
                        window.location.href = site_url.confirmationEle_url + '?projectId=' + projectId + '&projectName=' + projectName + '&reserveId=' + reserveId + '&isAllowAppend=' + isAllowAppend + '&isPubToPri=' + isPubToPri + '&isSatisfied=' + isSatisfied + '&phoneCode=' + phoneCode;
                    } else { // 非电子
                        window.location.href = site_url.confirmation_url + '?projectId=' + projectId + '&projectName=' + projectName + '&reserveId=' + reserveId + '&phoneCode=' + phoneCode;
                    }
                } else { // 机构用户不管预约什么产品都走非电子流程
                    window.location.href = site_url.confirmation_url + '?projectId=' + projectId + '&projectName=' + projectName + '&reserveId=' + reserveId + '&phoneCode=' + phoneCode;
                }   
            } else if (type == 2) { // 私募预约
                if (isElecContract == "1") { //电子合同逻辑
                    if (custType == "1") { //客户类型【0.机构 1.个人】
                        //跳转到电子合同预约页面
                        window.location.href = site_url.orderLimit_url + "?fundCode=" + projectId + "&isAllowAppend=" +
                            isAllowAppend + '&isSatisfied=' + isSatisfied;
                    } else {
                        //跳转到普通预约
                        window.location.href = site_url.registration_url + "?fundCode=" + projectId + "&isAllowAppend=" +
                            isAllowAppend;
                    }
                } else { //非电子合同
                    window.location.href = site_url.registration_url + "?fundCode=" + projectId + "&isAllowAppend=" +
                        isAllowAppend;
                }
            }
        },
        events: function () {
        	var that = this;
		},
	}
	judge.init();
}
