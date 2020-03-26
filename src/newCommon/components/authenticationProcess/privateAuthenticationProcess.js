/**  
* @Page:  私募一键认证条件框展示逻辑
* @Author: 闫瑞婷  
* @Date:   2020-03-17
* 参数：
* type: 1 客户预约确认 2 私募产品预约
* projectId: 项目id
* isPubToPri 是否公转私(客户预约确认时需要传)
* reserveId 预约id(客户预约确认时需要传)
* projectName 项目名称（私募产品预约时需要传）
* isElecContract 是否是电子合同产品【0.否 1.是】 （私募产品预约时需要传）
* isAllowAppend // 是否可以进行追加操作【0.否 1.是】 （私募产品预约时需要传）
* htmdEvt 代表埋点的属性，如当前页面只引用该组件一次，则htmdEvt的值为当前页面名，若多次引用，则需区分引用的场景，传入不同的值
*/

var judgeRiskHint = require('@pathCommonCom/authenticationProcess/judgeRiskHint.js');

module.exports = function(params) {
    var type = params.type;
    var projectId = params.projectId;
    if(params.isPubToPri) {
        var isPubToPri = params.isPubToPri;
        var reserveId = params.reserveId;
    }
    var htmdEvt = params.htmdEvt;
    if(params.projectName) {
        var projectName = params.projectName;
        var isElecContract = params.isElecContract;
        var isAllowAppend = params.isAllowAppend;
    }
    var privateAuth = {
        $e:{
            realLi: $('#real-condition>li'), // 条件下的五条
        },
        data: {
            custType: "", //客户类型
            buyFreeze: "", //是否买入冻结
            isRiskEndure: '', // 是否风险测评 0-否 1-是
            endurePubIsold: '', // 公募风险评测是否过期 0:否 1:是
            endurePriIsold: '', // 私募风险测评是否过期0:否 1:是
            isSatisfied:'',  //合格投资者认证是否满足，需要给app携带
            isOpenWealth:"1",//是否开通财富账户。0未开通，1已开通 
        },
        gV: {
            
        },
        init: function() {
            var that = this;
            // 获取用户信息（用户类型，冻结状态等）
            that.getUserInfo();
            that.events();
        },
        getUserInfo: function() {
            var that = this;
            // 获取用户信息
            var obj = [{
                url: site_url.queryUserAuthInfo_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: {}
                },
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    that.data.custType = jsonData.accountType; // 客户类型【0.机构 1.个人】
                    that.data.buyFreeze = jsonData.buyFreeze; // 是否冻结买入：0-否；1-是；
                    that.data.lawFreezeStatus = jsonData.lawFreezeStatus; // 是否司法冻结：0-否；1-是；
                    that.data.isRiskEndure = jsonData.isRiskEndure; // 是否风险测评 0-否 1-是
                    that.data.accreditedInvestor = jsonData.accreditedInvestor;   //合格投资者【空-未做过】【0-未通过】【1-已通过】【2-已过期】
                    
                    if (that.data.buyFreeze == "1" && that.data.lawFreezeStatus == "1") { //如果禁止买入且司法冻结，首先提示
                        $(".netLoading").hide();
                        var obj = {
                            title: '温馨提示',
                            id: 'buyFreeze',
                            p: '因司法原因该账户被冻结，请联系客服咨询！客服电话：400-8980-618',
                            yesTxt: '确认',
                            htmdEvtYes: htmdEvt + '_0001',  // 埋点确定按钮属性
                            hideCelButton: true, //为true时隐藏cel按钮，仅使用yes按钮的所有属性
                            zIndex: 100,
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj)
                    } else {
                        that.getConditionsOfOrder()
                    }
                },
                callbackNoData: function() {
                    $(".netLoading").hide()
                },
                callbackFail: function(json) {
                    tipAction(json.message)
                    $(".netLoading").hide()
                }
            }]
            $.ajaxLoading(obj);
        },
        getConditionsOfOrder: function() {
            var that = this;

            //发送ajax请求
            var obj = [{
                url: site_url.conditionsOfOrder_api,
                data: {
                    projectId: projectId,
                },
                contentTypeSearch: true,
                needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数
                    $(".netLoading").hide(); // loading框的显示隐藏代表了按钮的单点
                    var jsonData = json.data,
                        notice = "",
                        noticeObj = "",
                        isPopup = "", //弹框售前告知书
                        isRiskPopup = "", //期限不符弹框
                        PopupElasticLayer = "",
                        objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                        isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                        isCompOri = "", //是否完善信息，因为如果机构切一键认证是完善信息，点击需要提示弹框。
                        singleaAuthenPath = "", //一键认证跳转链接
                        singleaAuthen = false; //条件框是否展示
                    that.$e.realLi.hide();
                    if(jsonData[0].show == 1 || jsonData[1].show == 1 || jsonData[2].show == 1 || jsonData[3].show == 1) {
                        $.each(jsonData, function(e, v) {
                            var jumpUrl = "";
                            if (v.conditionType == 4 && !!v.isPopup) { //是否弹出售前告知书。售前告知书与风险等级匹配一起提示
                                isPopup = v.isPopup;
                            }
                            if (v.conditionType == 1 && !v.isSatisfied) { //财富账户是否开通，需要给app携带，0未开通，1开通
                                that.data.isOpenWealth = 0;
                            }
                            if (v.conditionType == 5 && v.isSatisfied) { //合格投资者认证是否满足，需要给app携带
                                that.data.isSatisfied = v.isSatisfied;
                            }
                            if (v.conditionType == 6 && !!v.isPopup) { //是否弹出期限不符弹框
                                isRiskPopup = v.isPopup;
                            }
                            if (v.show == "1") { //如果显示。show=1
                                $("#tips-wrap").show(); //显示预约条件
                                singleaAuthen = true;
                                if (!singleaAuthenPath) { //获取一键认证的链接。有值的第一个
                                    singleaAuthenPath = that.getJumpUrl(v);
                                    if (v.conditionType == 1) { //下面一键认证如果是实名认证且机构需要点击需要弹框提示，这里记录。且不能覆盖
                                        isReal = true; //判断
                                    }
                                    if (v.conditionType == 3) { //下面一键认证如果是完善信息且机构需要点击需要弹框提示，这里记录。且不能覆盖
                                        isCompOri = true; //判断
                                    }
                                }
                                that.$e.realLi.eq(Number(e)).show();
                                that.$e.realLi.eq(Number(e)).find(".bank-status").html(v.statusDesc);
                                jumpUrl = that.getJumpUrl(v); //获取跳转Url。
                                that.$e.realLi.eq(e * 1).find(".tips-li-right").attr("jumpUrl",jumpUrl);
                                that.$e.realLi.eq(e * 1).find(".tips-li-right").attr("conditionType",v.conditionType);
                                that.$e.realLi.eq(e * 1).find(".tips-li-right").attr("conditionJump",v.conditionJump);
                            }
                            //对应的条件认证到哪里
                            that.$e.realLi.eq(e * 1).find(".tips-li-right").on('click', function() {
                                if($(this).attr('conditionJump')!=that.$e.realLi.eq(0).find(".tips-li-right").attr("conditionJump")&&that.$e.realLi.eq(0).find(".tips-li-right").attr("conditionType")==1&&that.$e.realLi.eq(2).find(".tips-li-right").attr("conditionjump")!=8){
                                        // $("#tips-wrap").hide();
                                        var obj = {
                                            title: '尊敬的客户',
                                            id: 'realOrg3',
                                            p: '请您先开通恒天账户',
                                            yesTxt: '确认',
                                            celTxt: "取消",
                                            htmdEvtYes: htmdEvt + '_0002',  // 埋点确定按钮属性
                                            htmdEvtCel: htmdEvt + '_0003',  // 埋点取消按钮属性
                                            zIndex: 6001,
                                            callback: function(t) {
                                                window.location.href =that.$e.realLi.eq(0).find(".tips-li-right").attr("jumpUrl")
                                            }
                                        };
                                        $.elasticLayer(obj);
                                        return
                                }
                                if (v.conditionType == "1" && that.data.custType != "1") { //如果是实名认证跳转，机构不支持线上开户，弹框提示
                                    $("#tips-wrap").hide();
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'realOrg2',
                                        p: '机构客户需联系您的理财师，进行线下开户',
                                        yesTxt: '确认',
                                        celTxt: "取消",
                                        htmdEvtYes: htmdEvt + '_0004',  // 埋点确定按钮属性
                                        htmdEvtCel: htmdEvt + '_0005',  // 埋点取消按钮属性
                                        zIndex: 100,
                                        callback: function(t) {}
                                    };
                                    $.elasticLayer(obj);

                                } else if(v.conditionType == "3" && that.data.custType != "1"){//完善信息和税收声明未完成时，机构客户不支持线上完善资料
                                    $("#tips-wrap").hide();
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'realOrg2',
                                        p: '机构客户完善资料请联系您的理财师',
                                        yesTxt: '确认',
                                        celTxt: "取消",
                                        htmdEvtYes:htmdEvt + '_0006',  // 埋点确定按钮属性
                                        htmdEvtCel:htmdEvt + '_0007',  // 埋点取消按钮属性
                                        zIndex: 100,
                                        callback: function(t) {}
                                    };
                                    $.elasticLayer(obj);
                                }else {
                                    window.location.href = jumpUrl;
                                }
                                $("#tips-wrap").hide();//点击跳转关闭弹窗
                                window._submitMd && window._submitMd( 3, htmdEvt + '_0008' );
                            })
                                //一键认证调往哪里
                            mui("body").on('mdClick', '.tips-btn', function() {
                                if (isReal && that.data.custType != "1") { //如果是实名认证跳转，机构不支持线上开户，弹框提示,一键认证正好也是链接也是实名认证也弹框
                                    $("#tips-wrap").hide();
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'realOrg1',
                                        p: '机构客户需联系您的理财师，进行线下开户',
                                        yesTxt: '确认',
                                        celTxt: "取消",
                                        htmdEvtYes:htmdEvt + '_0010',  // 埋点确定按钮属性
                                        htmdEvtCel:htmdEvt + '_0011',  // 埋点取消按钮属性
                                        zIndex: 100,
                                        callback: function(t) {}
                                    };
                                    $.elasticLayer(obj)
                                } else if(isCompOri && that.data.custType != "1"){//完善信息和税收声明未完成时，机构客户不支持线上完善资料
                                    $("#tips-wrap").hide();
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'realOrg2',
                                        p: '机构客户完善资料请联系您的理财师',
                                        yesTxt: '确认',
                                        celTxt: "取消",
                                        htmdEvtYes:htmdEvt + '_0012',  // 埋点确定按钮属性
                                        htmdEvtCel:htmdEvt + '_0013',  // 埋点取消按钮属性
                                        zIndex: 100,
                                        callback: function(t) {}
                                    };
                                    $.elasticLayer(obj);
                                } else {
                                    window.location.href = singleaAuthenPath;//
                                }
                            }, {
                                htmdEvt: htmdEvt + '_0009'
                            })
                        });
                    } else {
                        isPopup = jsonData[3].isPopup; //是否弹出售前告知书。售前告知书与风险等级匹配一起提示
                        that.data.isSatisfied = jsonData[4].isSatisfied;//合格投资者认证是否满足，需要给app携带
                        if(jsonData.length > 5 && jsonData[5].isPopup) {
                            isRiskPopup = jsonData[5].isPopup
                        }
                        if(type == 1) {
                            // 四个条件都满足则跳转短信认证页面
                            window.location.href = site_url.SMSVerification_url + '?projectId=' + projectId + '&accountType=' + that.data.custType + '&isPopup=' + isPopup + '&isRiskPopup=' + isRiskPopup + '&accreditedInvestor=' + that.data.accreditedInvestor + '&isSatisfied=' + that.data.isSatisfied + '&isPubToPri=' + isPubToPri + '&reserveId=' + reserveId;
                        } else if (type == 2) {
                            // 当不展示一键认证弹框时，看是否需要弹出售前告知书或产品期限匹配弹框
                            var obj = {
                                type: 2,
                                projectId: projectId,
                                projectName: projectName,
                                isPopup: isPopup,
                                isRiskPopup: isRiskPopup,
                                isElecContract: isElecContract,
                                isAllowAppend: isAllowAppend,
                                isSatisfied: that.data.isSatisfied,
                                accreditedInvestor: that.data.accreditedInvestor,
                                htmdEvt: "privatePlacementDetail",
                                custType: that.data.custType
                            }
                            judgeRiskHint(obj);
                        }
                    }
                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.message);
                    $(".netLoading").hide();
                },
                callbackNoData:function(argument) {
                    tipAction(argument.message);
                    $(".netLoading").hide();
                }
            }];
            $.ajaxLoading(obj);
        },
        getJumpUrl: function(v) { //获取跳转链接
            var that = this;
            var jumpUrl = ""; //跳转链接
            if (v.conditionJump == 1) { //跳转到认证中心页面
                jumpUrl = site_url.realName_url;
            } else if (v.conditionJump == 2) { //跳转到完善信息页面
                jumpUrl = site_url.completeInformation_url;
            } else if (v.conditionJump == 3) { //跳转到专项风测页面
                jumpUrl = site_url.riskAppraisal_url + "?type=asset";
            } else if (v.conditionJump == 4) { //跳转到投资者分类申请页面
                jumpUrl = site_url.investorClassification_url+ "?isOpenAcc=" + that.data.isOpenWealth;
            } else if (v.conditionJump == 5) { //跳转到投资者分类结果页页面
                jumpUrl = site_url.investorClassificationResult_url;
            } else if (v.conditionJump == 6) { //跳转到合格投资者申请 页面
                jumpUrl = site_url.chooseQualifiedInvestor_url + "?isOpenAcc=" + that.data.isOpenWealth;
            } else if (v.conditionJump == 7) { //跳转到合格投资者结果页面
                jumpUrl = site_url.qualifiedInvestorResult_url;
            }else if (v.conditionJump == 8) { //信息查看（修改证件有效期）
                jumpUrl = site_url.completeInfoEditModify_url;
            }else if (v.conditionJump == 9) { //跳转到普通风测
                jumpUrl = site_url.riskAppraisal_url + '?type=private';
            }else if(v.conditionJump == 10){//跳转到进身份证上传页面无开户流程
                jumpUrl = site_url.realIdcard_url + "?type=alone";
            }else if (v.conditionJump == 11) { //跳转到进身份证上传页面
                jumpUrl = site_url.realIdcard_url;
            } else if (v.conditionJump == 12) { //跳转到人脸识别页面
                jumpUrl = site_url.realFaceCheck_url;
            } else if (v.conditionJump == "13b") { //跳转到线下申请状态页面
                jumpUrl = site_url.realOffline_url;
            } else if (v.conditionJump == 14 || v.conditionJump == "13a") { //跳转到视频双录状态页面
                jumpUrl = site_url.realVideoTranscribe_url + '?type=default';
            }
            return jumpUrl;
        },
        events: function () {
            var that = this;
            var  maskheight =  window.innerHeight - $('.tips-content').height();

            $('.tips-mask').height(maskheight)

            // 点击关闭按钮隐藏一键认证弹框
            mui("body").on('mdClick','.icontips-close',function(e){
                $('.tips').css('display', 'none');
            }, {
                'htmdEvt': htmdEvt + '_0014'
            })
            mui("body").on('mdClick','.tips-mask',function(e){
                $('.tips').css('display', 'none');
            }, {
                'htmdEvt': htmdEvt + '_0015'
            })
        },
    }
    privateAuth.init();
}