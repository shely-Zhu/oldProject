/**
 * 公募资产详情页
 *
 * @author shiyunrui 20191123
 * update:chentiancheng
 *
 * 具体可以参考 privateDetail.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');
//是否大于0的判断器 用于设置涨红跌绿 可以参考publicAssets.js
Handlebars.registerHelper("if_than_0", function (value, options) {
    if (value > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//获取地址栏参数
getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}
$(function () {
    var fundCode
    var regard = {
        gV: {
            fundBusinCode:'022',
            json: {},
            type: '1',//'1'七年 '2'万份
            time: 1,// 1月份 3 季度 6半年 12 一年 0成立以来
            idnoCheckflagArr: ['未认证', '已认证'],//是否实名认证 0-否 1-是 
            isRiskEndureArr: ['未风测', '已风测'],//是否风险测评 0-否 1-是    endurePubIsold 公募风险评测是否过期 0-否 1-是
            isPerfectArr: ['未完善', '已完善'],//是否完善个人信息 0-否 1-是 
            accreditedInvestorArr: ['未通过', '已通过', '已过期', '未做'],//是否合格投资者 空-未做； 0-未通过；1-已通过； 2-已过期 
            invTypCom:'' ,  // 基金类型
            secuSht:'',   // 基金名简写
            accountType:null,   //客户类型  0-机构 1-个人
            realLi: $('#real-condition>li'), // 条件下的五条
            tipsWrap:$("#tips-wrap"),
            singleaAuthenPath : "", //一键认证跳转链接
            fixedInvestementBtn:$(".fixed_investement_btn"), //定投按钮
            fixedInvestementBtnStatu:true,
            fundName:"",
            isRiskMatchStatus:false,
            isRiskMatchBox:$(".isRiskMatchBox"),
            isRiskMatchBoxMatch:$(".isRiskMatchBox_match"),
            isRiskMatchBoxNoMatch:$(".isRiskMatchBox_noMatch"),
            isRiskMatchBoxHeader:$(".isRiskMatchBox_header"),
            singleaAuthenType:"",  //认证类型  买入into  定投 investement
            isHighAgeStatus:true,  //投资者年龄默认小于60的状态为true  大于就位false
            discountStatus:"", //有无费率
            echartsData: {
                oneMonth : {},
                threeMonth: {},
                sixMonth: {},
                oneYear: {},
                sinceNow: {}
            },
            symboltype : 'none',	//echarts 节点样式
            isWealthAccountStatus:"", //是否开通账户状态
            userStatus:"", // 为空则是新用户   为0普通投资者  为1专业投资者
            investorStatus: '' // 投资者状态
        },
        fundType: splitUrl['fundType'] == '10300'||splitUrl['fundType'] == '10800' ? 1 : 0, //10300 货币基金类型，其余为普通基金类型
        fundComId: '',   //基金公司ID
        secuId:'', // 基金编码
        chiName:'', // 基金名称
        init: function () {
            var that = this;
            that.getData(); // 获取基金详情

            /*that.getUserInfo();  //获取用户类型
            that.getUserInfo_1(); //用户身份信息*/
            that.events();
            // that.getData1(); // 查询基金的历史收益（货币基金）/历史净值（普通基金）
            $('.tips').hide()
        },
        changeVal: function (prop, num, isfalse) {
            isfalse = isfalse === undefined ? true : false
            key = this.gV.json[prop]
            var value = key.toFixed(num)
            if (isfalse) {
                if (key > 0) {
                }
            }
            this.gV.json[prop] = value
        },
        // 获取基金详情
        getData: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                
                data: {
                    fundCode: splitUrl['fundCode'],
                    // fundCode:"000847",
                },
                callbackDone: function (json) {

                    that.fundComId = json.data.fmcComId ? json.data.fmcComId : 'gz04tVwXga';
                    that.secuId = json.data.secuId ? json.data.secuId : '000846.OF';
                    that.chiName = json.data.chiName ? json.data.chiName : '中融货币市场基金';

                    that.gV.json = json.data;
                    that.gV.json.fundType = that.fundType;
                    that.gV.json.chgRat1d = that.gV.json.chgRat1d.toFixed(2);
                    if(that.gV.json.chgRat1d > 0){
                        that.gV.json.chgRat1d_s  = '+' + Number(that.gV.json.chgRat1d).toFixed(2)
                    }
                    if(that.gV.json.annYldRat > 0){
                        that.gV.json.annYldRat_s  = '+' +Number(that.gV.json.annYldRat).toFixed(2)
                    }
                    that.gV.json.tradeLimitList.forEach(function(item){
                        if(item.fundBusinCode == that.gV.fundBusinCode){
                            that.gV.json.minValue = item.minValue
                        }
                    })
                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    that.changeVal('annYldRat', 4)
                    that.changeVal('unitYld', 4, false)
                    that.changeVal('chgRat1w', 2)
                    that.changeVal('chgRat3m', 2)
                    that.changeVal('chgRat1y', 2)
                    that.changeVal('chgRatBgn', 2)
                    that.gV.json.trDate = that.gV.json.trDate.slice(5)
                    that.gV.json.fundType = that.fundType
                    that.gV.invTypCom = json.data.invTypCom
                    that.gV.secuSht = json.data.secuSht
                    //test
                   // that.gV.json.tradeLimitFlag2 = true
                    if(that.gV.json.tradeLimitFlag == "1"){
                        that.gV.json.tradeLimitFlag2 = true
                    }else{
                        that.gV.json.tradeLimitFlag2 = false
                    }
                    var html = template(that.gV.json); (html, "00");
                    if(!that.gV.json.discount){
                        that.gV.discountStatus = false
                    }else{
                        that.gV.discountStatus = true
                    }
                    
                    $(".tplBox").html(html); 
                    that.getFundCollectionInit() //收藏管理--判断是否被收藏
                    that.getData1();
                    that.getData2('1', 1); // 获取echarts数据
                    var historyStr = that.fundType ? '<div class="item_name">日期</div><div class="item_name">七日年化</div><div class="item_name">万份收益(元)</div>' : '<div class="item_name">日期</div><div class="item_name">单位净值</div><div class="item_name">累计净值</div><div class="item_name">日涨幅</div>'
                    $('.history_area >.history_item').html(historyStr);

                    var redeemNavArr = that.fundType ? ['七日年化', '万份收益'] : ['单位净值', '累计净值']
                    $($('#redeemNav span')[0]).text(redeemNavArr[0])
                    $($('#redeemNav span')[1]).text(redeemNavArr[1])
                    $.each($(".net_worth_area .net_worth_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) >= 0) {
                            $(v).addClass('value_red')
                        } else if(Number($(v).text().slice(0, $(v).text().length - 1)) == 0) {
                            $(v).addClass('value_c')
                        } else {
                            $(v).addClass('value_green')
                        }
                    });
                    $("#HeadBarpathName").html("<span>"+that.gV.json.secuSht+"</span>"+"</br><span>"+that.gV.json.trdCode+"</span>");
                    var saleFee = json.data.fundPurchaseFeeRate.detailList[0].fundFeeRate;
                    var discount = Number(json.data.fundPurchaseFeeRate.detailList[0].fundFeeRate.split("%")[0])*json.data.discount/100 + '%'
                    if(that.gV.discountStatus){
                        $(".divider-top").html(json.data.purSt + '、' + json.data.redemSt + '、' + '买入费率' + '(<span class="line-rate">' + saleFee + '</span>' + ' <span class="discount">' + discount + '</span>)')
                    }else{
                        $(".divider-top").html(json.data.purSt + '、' + json.data.redemSt + '、' + '买入费率' + '(<span>' + saleFee + '</span>)')
                    }
                 
                    
                    //定投按钮的展示问题
                    var supportFixedFlag = that.gV.json.supportFixedFlag;
                    if(supportFixedFlag == true){
                        $(".footer .fixed_investement_btn").css({"display":"block"})
                        that.gV.fixedInvestementBtnStatu = true
                        if(that.gV.json.cashTreasure == "1"){
                            $(".footer .fixed_investement_btn").attr("disabled",true)
                            that.gV.fixedInvestementBtnStatu = false
                        }
                        if(that.gV.json.fundStatus=="3"||that.gV.json.fundStatus=="5"){
                            $(".footer .fixed_investement_btn").attr("disabled",true)
                            that.gV.fixedInvestementBtnStatu = false
                        }
                       // that.gV.fixedInvestementBtn.show()
                    }else if(supportFixedFlag == false){
                        $(".footer .fixed_investement_btn").css({"display":"none"})
                       // that.gV.fixedInvestementBtn.hide()
                    }
                    if(!json.data.isBuyFlag){//不可买入
                        $(".footer .buy_btn").addClass("disable").html("暂不可售")
                   }
                  
                },
                callbackNoData:function(json){
					tipAction(json.message);
				},
            }]
            $.ajaxLoading(obj);
        },
        //获取用户信息
		getUserInfo_1:function(){
			var that = this;
			var obj = [{
				url:site_url.user_api,
				data:{

				},
				callbackDone:function(json){
					var data = json.data
				    that.gV.userStatus = data.investFavour
				}
			}];
			$.ajaxLoading(obj);
		},
        // 获取客户类型
        getUserInfo: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {
                },
                needLogin: false,
                callbackDone: function (json) {
                    var data = json.data
                    that.gV.accountType = data.accountType
                },
                callbackNoData:function(json){
					tipAction(json.message);
				},
            }]
            $.ajaxLoading(obj);
        },
        	 // 客户预约产品所需条件
		 /*getConditionsOfOrder: function(type) {
            var type = type;
            var that = this;

            //发送ajax请求
            var obj = [{
                url: site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                },
                //contentTypeSearch: true,
                //needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数
                    var jsonData = json.data,
                        notice = "",
                        noticeObj = "",
                        isPopup = "", //弹框售前告知书
                        isRiskPopup = "", //期限不符弹框
                        PopupElasticLayer = "",
                        objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                        isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                        singleaAuthenPath = "", //一键认证跳转链接
                        singleaAuthen = false; //条件框是否展示
                        that.gV.investorStatus = jsonData.investorStatus || ''
                            if(jsonData.isWealthAccount == "0"&&jsonData.isRiskEndure == "1"&&jsonData.isPerfect == "1"&&jsonData.isInvestFavour=="1"){
                                that.gV.realLi.hide();
                                that.gV.tipsWrap.hide();
                                if(jsonData.isIdnovalid=="1"){
                                    //证件已过期
                                    tipAction('因过期原因该账户被冻结，请联系理财师或咨询客服！客服电话：400-8980-618');
                                    return false;
                                }

                                if(jsonData.isHighAge=="1"&&that.gV.isHighAgeStatus){
                                   //年龄校验
                                    //that.gV.isHighAgeStatus = false;
                                    $(".isRiskMatchBox_match").hide()
                                    $(".isRiskMatchBox_noMatch").show()
                                    $(".isRiskMatchBox_header").html("您认/申购的基金产品风险等级为成长级/进取级，属中高/高风险产品，投资该产品可能产生较大损失。基于您的年龄情况，我司建议您综合考虑自身的身心承受能力、资金承受能力、风险承受能力及控制能力，审慎选择。")
                                    $(".isRiskMatchResult").html("继续购买")
                                    $(".isRiskMatchResult").attr("type","isHighAge")
                                    return false;
                                }
                                if(jsonData.isZdTaLimit == "1"){
                                    //中登校验
                                    $(".isRiskMatchBox_match").hide()
                                    $(".isRiskMatchBox_noMatch").show()
                                    $(".isRiskMatchBox_header").html("检测到您的证件类型无法购买该基金，请选购其他基金")
                                    $(".isRiskMatchResult").html("选购其他基金")
                                    $(".isRiskMatchResult").attr("type","isZdTaLimit")
                                    return false;
                                }

                                $(".isRiskMatchBox").show();
                                $(".isRiskMatch_mask").show();

                                if(jsonData.isRiskMatch == "1"){
                                    //风险等级匹配
                                    $(".isRiskMatchBox_match").show()
                                    $(".isRiskMatchBox_noMatch").hide()
                                    // $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                    $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                                }else if(jsonData.isRiskMatch == "0"){
                                    $(".isRiskMatchBox_noMatch").show()
                                    $(".isRiskMatchBox_match").hide()
                                    // $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                    $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                                    $(".isRiskMatchResult").html("查看评测结果")
                                    $(".isRiskMatchResult").attr("type","noRisk")
                                }else if(jsonData.isRiskMatch == "2"){
                                    $(".isRiskMatchBox_noMatch").show()
                                    $(".isRiskMatchBox_match").hide()
                                    // $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                    $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                                    $(".isRiskMatchResult").html("重新风测")
                                    $(".isRiskMatchResult").attr("type","repeatRisk")
                                }
    
                                that.gV.singleaAuthenType = type
                            
                            }else{
                                that.gV.tipsWrap.show()
                                that.gV.realLi.show();    
                            }
                        that.gV.singleaAuthenPath = that.getSingleaAuthenPath(jsonData);              
						if(jsonData.isWealthAccount=="0"){
                            //是否开通财富账户   0开通  非0 没有开通  6
                            that.gV.isWealthAccountStatus = true
							that.gV.realLi.eq(0).hide()  
						}else{
                            that.gV.isWealthAccountStatus =false
                            if(jsonData.isWealthAccount == "6"){
                                //司法冻结
                                that.gV.tipsWrap.hide()
                                that.gV.realLi.hide(); 
                                $("#tips-wrap").hide()
                                $(".isRiskMatchBox").show();
                                $(".isRiskMatch_mask").show();
                                $(".isRiskMatchBox_match").show()
                                $(".isRiskMatchBox_noMatch").hide()
                                $(".isRiskMatchBox_header").html("因司法原因该账户被冻结，请联系客服咨询，客服电话：400-8980-618")
                            }

                            if(jsonData.isWealthAccount == "5"){
                                //身份过期
                                that.gV.tipsWrap.hide()
                                that.gV.realLi.hide(); 
                                $("#tips-wrap").hide()
                                $(".isRiskMatchBox").show();
                                $(".isRiskMatch_mask").show();
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_cancel").html("取消")
                                $(".isRiskMatchResult").html("完善资料")
                                $(".isRiskMatchResult").attr("type","overdue")
                                $(".isRiskMatchBox_header").html("您的证件已过期，补充证件信息后才可以继续交易")
                            }
							that.gV.realLi.eq(0).show()
                        }
						if(jsonData.isRiskEndure=="0"||jsonData.isRiskEndure == null){
							//是否风测
							that.gV.realLi.eq(1).show()  
						}else{
							that.gV.realLi.eq(1).hide()
						}
						if(jsonData.isPerfect=="0" ||jsonData.isPerfect== null){
							//是否完善资料   
							that.gV.realLi.eq(2).show()  
						}else{
							that.gV.realLi.eq(2).hide()
						}
						if(jsonData.isInvestFavour=="0" || jsonData.isInvestFavour == null){
							//是否投资者分类
							that.gV.realLi.eq(3).show()  
						}else{
							that.gV.realLi.eq(3).hide()
                        }
						if(jsonData.isRiskMatch=="0" || jsonData.isRiskMatch == null){
							//是否风险等级
							that.gV.realLi.eq(4).show()  
						}else{
							that.gV.realLi.eq(4).hide()
                        }
                        if(that.gV.investorStatus =="0"&&that.gV.userStatus==""){
                            //直接申请为专业投资者
                            that.gV.tipsWrap.show()
                            that.gV.realLi.show();
                            that.gV.realLi.eq(3).show()  
                        }
                        that.gV.realLi.eq(4).hide()
                },
                callbackNoData:function(argument) {
                    tipAction(json.message);
					that.data.canClick = true; //变为可点击
                }
            }];
            $.ajaxLoading(obj);

        },*/
        /*getSingleaAuthenPath:function(data){
           var that = this;
           var singleaAuthenPath="";
           if(data.isWealthAccount != "0"){
             return singleaAuthenPath = "isWealthAccount"
           }else if(data.isRiskEndure !="1"){
            return singleaAuthenPath = "isRiskEndure"
           }else if(data.isPerfect != "1"){
            return  singleaAuthenPath = "isPerfect"
           }else if(data.isInvestFavour != "1"){
            return  singleaAuthenPath = 'isInvestFavour'
           }
        },*/
        events: function () {
            var that = this;
            var fundCode = splitUrl['fundCode']
            // 基金经理
            mui("body").on('mdClick', ".fundManager", function (e) {
                if(that.gV.json.fundManager!=""){
                    window.location.href = site_url.pofFundManager_url + '?fundCode=' + fundCode;
                }
            },{
                htmdEvt: 'publicDetail_01'
            });
            // 基金公司
            mui("body").on('mdClick', ".fundCompany", function (e) {
                if(that.gV.json.fmcComName!=""){
                    window.location.href = site_url.pofFundCompany_url + '?fundComId=' + that.fundComId;
                }
            },{
                htmdEvt: 'publicDetail_02'
            });
            // 基金档案
            mui("body").on('mdClick', ".fundFile", function (e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + that.secuId + '&fundCode=' + fundCode;
            },{
                htmdEvt: 'publicDetail_03'
            });
            // 历史净值查看更多
            mui("body").on('mdClick', ".history_area .history_more", function (e) {
                window.location.href = site_url.mineHistoryDetail_url + '?fundCode=' + fundCode+"&fundType="+that.fundType
            },{
                htmdEvt: 'publicDetail_04'
            });
           
            // 交易规则
            mui("body").on('mdClick', ".dealRegArea .rule", function (e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + fundCode
            },{
                htmdEvt: 'publicDetail_05'
            });

            // 定投
            mui("body").on('mdClick', ".footer .fixed_investement_btn", function (e) {
                that.getUserInfo();
                that.getUserInfo_1();
                //定投一键认证
                if(that.gV.accountType === 0 || that.gV.accountType === 2){
                    tipAction('暂不支持机构客户进行交易');
                }else{
                    // 先判断是否司法冻结以及身份过期，再判断一键认证
                    var result = frozenAccount("buyFreeze", window.location.href, that.gV.accountType);
                    if( !result ) {
                      var fundCode = splitUrl['fundCode']
                      var url = site_url.pofOrdinarySetThrow_url + '?fundCode=' + fundCode + '&fundName=' + that.gV.secuSht + '&type=add';
                      authenticationProcess("", fundCode, that.gV.userStatus, that.gV.accountType, url)
                    };
                }
                /*that.getConditionsOfOrder("investement");
                that.gV.singleaAuthenType = "investement"*/
            },{
                htmdEvt: 'publicDetail_06'
            });
            // 买入
            mui("body").on('mdClick', ".footer .buy_btn", function (e) {
                that.getUserInfo();
                that.getUserInfo_1();
               if($(this).hasClass("disable")){
                   return false
               }
               // 先判断是否司法冻结以及身份过期，再判断一键认证
               var result = frozenAccount("buyFreeze", window.location.href, that.gV.accountType);
               if( !result ) {
                var fundCode = splitUrl['fundCode']
                  var url = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + that.gV.secuSht+"&noReload=1";
                  authenticationProcess("", fundCode, that.gV.userStatus, that.gV.accountType, url)
                };
                /*that.getConditionsOfOrder("into");
                that.gV.singleaAuthenType = "into"*/
               // window.location.href = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
               
            },{
                htmdEvt: 'publicDetail_07'
            });
            //认证
            /*mui("body").on('mdClick', ".tips-li .tips-li-right", function (e) {
                var type = $(this).parent().index()
                switch (type) {
                    case 0:   //开通账户
                        if(that.gV.accountType == 0|| that.gV.accountType == 2){
                            //机构
                            $("#tips-wrap").hide()
                            $(".isRiskMatchBox").show();
                            $(".isRiskMatch_mask").show();
                            $(".isRiskMatchBox_match").show()
                            $(".isRiskMatchBox_noMatch").hide()
                            $(".isRiskMatchBox_header").html("请联系您的理财师或者拨打客服电话 400-8980-618 进行线下开户")
                        }else{
                            //个人
                            window.location.href = site_url.realName_url

                        }
                        break;

                    case 1:   //风险评测
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                        break;

                    case 2:   //完善基本信息
                        if(that.gV.accountType == 0|| that.gV.accountType == 2){
                            //机构
                            $("#tips-wrap").hide()
                            $(".isRiskMatchBox").show();
                            $(".isRiskMatch_mask").show();
                            $(".isRiskMatchBox_match").show()
                            $(".isRiskMatchBox_noMatch").hide()
                            $(".isRiskMatchBox_header").html("机构客户如需调整基本信息请联系您的理财师")
                        }else{
                            //个人
                            window.location.href = site_url.completeInformation_url

                        }
                        break;

                    case 3:  //投资者分类
                        if(that.gV.isWealthAccountStatus){
                            //开通了账户
                            if(that.gV.investorStatus =="0"&&that.gV.userStatus==""){
                                //申请为投资者
                                window.location.href = site_url.investorClassificationResult_url
                            }else{
                                window.location.href = site_url.investorClassification_url
                            }
                           
                        }else{
                            $("#tips-wrap").hide()
                            $(".isRiskMatchBox").show();
                            $(".isRiskMatch_mask").show();
                            $(".isRiskMatchBox_match").show()
                            $(".isRiskMatchBox_noMatch").hide()
                            $(".isRiskMatchBox_header").html("您尚未进行身份认证,认证完成后才可进行投资者分类认证")
                        }
                        
                        break;
                    case 4:  //合格投资者认证
                        window.location.href = site_url.chooseQualifiedInvestor_url
                        break;

                    default:
                        break;
                }
            },{
                htmdEvt: 'publicDetail_08'
            });
            //一键认证
            mui("body").on('mdClick', ".tips .tips-btn", function (e) {
               
                var key = that.gV.singleaAuthenPath;
                switch (key) {
                    case "isWealthAccount":   //开通账户
                    if(that.gV.accountType == 0|| that.gV.accountType == 2){
                        //机构
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show()
                        $(".isRiskMatchBox_noMatch").hide()
                        $(".isRiskMatchBox_header").html("请联系您的理财师或者拨打客服电话 400-8980-618 进行线下开户")
                    }else{
                        //个人
                        window.location.href = site_url.realName_url

                    }
                    break;
                    case "isRiskEndure":   //私募风险评测  type=private type=asset 资管风测
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                        break;

                    case "isPerfect":   //完善基本信息
                    if(that.gV.accountType == 0|| that.gV.accountType == 2){
                        //机构
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show()
                        $(".isRiskMatchBox_noMatch").hide()
                        $(".isRiskMatchBox_header").html("机构客户如需调整基本信息请联系您的理财师")
                    }else{
                        //个人
                        window.location.href = site_url.completeInformation_url

                    }
                    break;
                    case "isInvestFavour":  //投资者分类
                    if(that.gV.isWealthAccountStatus){
                        //开通了账户
                        if(that.gV.json.investorStatus =="0"&&that.gV.userStatus==""){
                            //申请为投资者
                            window.location.href = site_url.investorClassificationResult_url
                        }else{
                            window.location.href = site_url.investorClassification_url
                        }
                    }else{
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show()
                        $(".isRiskMatchBox_noMatch").hide()
                        $(".isRiskMatchBox_header").html("您尚未进行身份认证,认证完成后才可进行投资者分类认证")
                    }
                    
                    break;
                    case "isRiskMatch":  //合格投资者认证
                        window.location.href = site_url.chooseQualifiedInvestor_url
                        break;

                    default:
                        break;
                }
            },{
                htmdEvt: 'publicDetail_09'
            });

             //风测等级匹配成功
            mui("body").on('mdClick',".isRiskMatchBox_match",function(){
                 var type = that.gV.singleaAuthenType;
                 $(".isRiskMatch_mask").hide();
                 $(".isRiskMatchBox").hide();
                 if(!that.gV.isWealthAccountStatus||that.gV.accountType == 0|| that.gV.accountType == 2){
                     //未开通账户
                     return false
                 }
                 if(type == "into"){
                    //买入一键认证
                    window.location.href = site_url.fundTransformIn_url + '?fundCode=' + splitUrl['fundCode'] + '&fundName=' + that.gV.secuSht+"&noReload=1";
                }else if(type == "investement"){

                    //定投一键认证
                    if(!that.gV.fixedInvestementBtnStatu){
                        return
                    }
                    if(that.gV.accountType === 0 || that.gV.accountType === 2){
                        tipAction('暂不支持机构客户进行交易');
                    }else{
                        window.location.href = site_url.pofOrdinarySetThrow_url + '?fundCode=' + splitUrl['fundCode'] + '&fundName=' + that.gV.secuSht + '&type=add';
                    }

                }
            },{
                htmdEvt: 'publicDetail_15'
            })

            //风险等级匹配失败
            mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
               // that.gV.isRiskMatchBox.hide();
            },{
                htmdEvt: 'publicDetail_16'
            })

             //风险等级匹配失败结果跳转
            mui("body").on("mdClick",".isRiskMatchResult",function(){
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
                var type = $(this).attr("type");
                if(type == "noRisk"){
                    //未风测
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                }else if(type == "repeatRisk"){
                    //风测过期
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                }else if(type == "isHighAge"){
                    that.gV.isHighAgeStatus = false;
                    that.getConditionsOfOrder(that.gV.singleaAuthenType)
                }else if(type == "isZdTaLimit"){
                     //跳理财首页
                    window.location.href = site_url.wealthIndex_url
                }else if(type = "overdue"){
                    //身份证过期
                    window.location.href = site_url.completeInformation_url
                }
               
            },{
                htmdEvt: 'publicDetail_17'
            })*/

            // 七日年华 万份收益
            mui("body").on('mdClick', "#redeemNav .navSpan ", function (e) {
                $(this).addClass('active').siblings().removeClass('active');
                var divs = $('.lineWrap .line_area>div')
                var index = $(this).index()
                $(divs[index]).show().siblings().hide()
                var type = Number($(this).attr('type'))
                var time = that.gV.time

                var myDate = new Date();
                myDate.getYear(); //获取当前年份(2位)
                myDate.getMonth(); //获取当前月份(0-11,0代表1月)
                myDate.getDate(); //获取当前日(1-31)
                var end =  myDate.getYear()+'-'+ parseInt(myDate.getMonth()+1)+'-'+myDate.getDate();
                that.gV.type = type
                if (time) {
                    that.getData2(type, time);
                } else {
                    that.getData2(type, time, end);
                }
            },{
                htmdEvt: 'publicDetail_10'
            });
            //月 季 本年 一年 成立以来
            mui("body").on('mdClick', ".lineWrap .tab span ", function (e) {
                $(this).addClass('active').siblings().removeClass('active');
                var time = Number($(this).attr('time'))
                var myDate = new Date();
                myDate.getYear(); //获取当前年份(2位)
                myDate.getMonth(); //获取当前月份(0-11,0代表1月)
                myDate.getDate(); //获取当前日(1-31)
                var end =  myDate.getYear()+'-'+ parseInt(myDate.getMonth()+1)+'-'+myDate.getDate();
                that.gV.time = time
                if (time) {
                    that.getData2(that.gV.type, time);
                } else {
                    that.getData2(that.gV.type, time, end);
                }
            },{
                htmdEvt: 'publicDetail_11'
            });
            //人工服务
            // mui("body").on('mdClick', ".customerService", function (e) {
            //     window.location.href = 'http://zxkf.chtwm.com/webchat/jsp/standard/interfacePools.jsp?queue=105&device=mobile'
            // },{
            //     htmdEvt: 'publicDetail_12'
            // });
            //分享  -- 跳往原生页面
            mui("body").on('mdClick', ".share_area", function (e) {
                var shareObj = {
                    'type':'auto',
                    'businessType':'publicProductShare',
                    'title': that.gV.secuSht,
                    'des': '一日托付,一心呵护',
                    'link': site_url.productPublicShare_url + splitUrl['fundCode'],
                    'img': ''
                }
                if (window.isAndroid){
                    window.jsObj.wxShare(JSON.stringify(shareObj));
                }
                if (window.isIOS){
                    window.webkit.messageHandlers.wxShare.postMessage(JSON.stringify(shareObj));
                }
            },{
                htmdEvt: 'publicDetail_13'
            });
            //加自选  
            mui("body").on('mdClick', ".selected_area", function (e) {
                var prams ={
                    fundCode:fundCode,
                    collected:'',
                    fundNameShort:that.gV.secuSht,
                    invTypCom:that.gV.invTypCom,
                }
                if($(this).hasClass('active')){
                    $(this).removeClass('active') 
                    prams.collected = '0'
                }else{
                    $(this).addClass('active')
                    prams.collected = '1'
                }
                that.getFundCollection(prams)
            },{
                htmdEvt: 'publicDetail_14'
            });

        },
        //收藏管理--判断是否被收藏
        getFundCollectionInit: function () {
            var that = this;
            var deviceId ;
            if(splitUrl['deviceId']){
                if(splitUrl['deviceId'].includes("cookie")){
                    deviceId = splitUrl['deviceId'].split("cookie")[0];
                }else{
                    deviceId = splitUrl['deviceId'];
                }
            }
            
            // 请求页面数据
            var obj = [{
                url: site_url.prfFundCollectionQueryCode_api,
                data: {
                    publicFundsKeyWords:splitUrl['fundCode'],
                    deviceId:deviceId
                },
                needLogin: false,
                callbackDone: function (json) {
                   var fundCode = splitUrl['fundCode'];
                   if(!!json.data&&json.data.length>0){
                    $(".selected_area").addClass('active')
                   }
                },
            }]
            $.ajaxLoading(obj);
        },
        //收藏管理
        getFundCollection: function (prams) {
            var that = this;
            var deviceId ;
            if(splitUrl['deviceId']){
                if(splitUrl['deviceId'].includes("cookie")){
                    deviceId = splitUrl['deviceId'].split("cookie")[0];
                }else{
                    deviceId = splitUrl['deviceId'];
                }
            }
            var manageList = [];
            manageList.push(prams)
            // 请求页面数据
            var obj = [{
                url: site_url.collectFund_api,
                data: {
                    feedback:'',
                    deviceId:deviceId,
                    manageList:manageList 
                },
                callbackDone: function (json) {
                    if(prams.collected == '1'){
                        tipAction('添加自选成功');
                    }else{
                        tipAction('删除自选成功');
                    }
                    
                }
            }]
            $.ajaxLoading(obj);
        },
        getData1: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.fundNetWorthList_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                    pageCurrent: 1,
                    pageSize: 4,
                },
                callbackDone: function (json) {
                    json = json.data
                    var tplm = $("#dataLists1").html();
                    if(that.fundType){
                        $("#history_tital").html("历史收益")
                            //货币 
                    }else{
                        $("#history_tital").html("历史净值")
                    }
                    var template = Handlebars.compile(tplm);
                    $.each(json.pageList, function (i, v) {
                    })
                    json.fundType = that.fundType
                    var html = template(json);
                    $(".tplBox1").html(html);
                    $.each($(".history_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) > 0) {
                            $(v).addClass('value_red')
                        } else if(Number($(v).text().slice(0, $(v).text().length - 1)) == 0) {
                            $(v).addClass('value_c')
                        }else{
                            $(v).addClass('value_green')
                        }
                    });
                }
            }]
            $.ajaxLoading(obj);
        },
        getData2: function (type, time, end) {
            time = time === 0 ? "" : time
            var that = this;
            //判断是否已经有数据了，有的话不再请求接口
            if( time == '' && that.gV['echartsData'].sinceNow.date && that.gV['echartsData'].sinceNow.date.length){
                // 成立至今
                that.drawLine( type, that.gV['echartsData'].sinceNow );
                return false;
            } else if( time == 1 && that.gV['echartsData'].oneMonth.date && that.gV['echartsData'].oneMonth.date.length){
                //月
                that.drawLine( type, that.gV['echartsData'].oneMonth );
                return false;
            } else if( time == 3 && that.gV['echartsData'].threeMonth.date && that.gV['echartsData'].threeMonth.date.length ){
                // 季
                that.drawLine( type, that.gV['echartsData'].threeMonth );
                return false;
            } else if( time == 6 && that.gV['echartsData'].sixMonth.date && that.gV['echartsData'].sixMonth.date.length){
                //半年
                that.drawLine( type, that.gV['echartsData'].sixMonth );
                return false;
            } else if( time == 12 && that.gV['echartsData'].oneYear.date && that.gV['echartsData'].oneYear.date.length){
                //一年
                that.drawLine( type, that.gV['echartsData'].oneYear );
                return false;
            }
            var dataOpt = {
                fundCode: splitUrl['fundCode'],
                dataRange: time,
                end: end || ""
            };
            var newData = {
                date: [], //存放折线图收益日期
                seven: [], //存放折线图七日年化  单位净值
                big: [],//存放折线图万份收益  累计净值
            }
            // 请求页面数据
            var obj = [{
                url: site_url.prfFundNetWorthTrendChart_api,
                data: dataOpt,
                callbackDone: function (json) {
                    json = json.data.pageList
                    //拼数据
                    $.each( json, function(i, v){
                        newData.date.push(v.trdDt)
                        if (that.fundType) {
                            newData.seven.push(v.annYldRat)
                            newData.big.push(v.unitYld)
                        } else {
                            newData.seven.push(v.unitNav)
                            newData.big.push(v.accuUnitNav)
                        }
                    })
                    switch(Number(time)) {
                        case 0: that.gV['echartsData'].sinceNow = newData;break; // 成立至今
                        case 1: that.gV['echartsData'].oneMonth = newData;break; // 月
                        case 3: that.gV['echartsData'].threeMonth = newData;break; // 季
                        case 6: that.gV['echartsData'].sixMonth = newData;break; // 半年
                        case 12: that.gV['echartsData'].oneYear = newData;break; // 近一年
                    }
                    
                    /*var newData = {
                        date: [], //存放折线图收益日期
                        seven: [], //存放折线图七日年化  单位净值
                        big: [],//存放折线图万份收益  累计净值
                    }
                    $.each(json, function (i, v) {
                        newData.date.push(v.trdDt)
                        if (that.fundType) {
                            newData.seven.push(v.annYldRat)
                            newData.big.push(v.unitYld)
                        } else {
                            newData.seven.push(v.unitNav)
                            newData.big.push(v.accuUnitNav)
                        }
                    })*/
                    // newData.date = [json[0].trdDt, json[Math.ceil(json.length / 2)].trdDt, json[json.length - 1].trdDt]
                    // newData.seven = [json[0].annYldRat, json[Math.ceil(json.length / 2)].annYldRat, json[json.length - 1].annYldRat]
                    // newData.big = [json[0].unitYld, json[Math.ceil(json.length / 2)].unitYld, json[json.length - 1].unitYld]

                    that.drawLine(type, newData)

                }
            }]
            $.ajaxLoading(obj);
        },
        //画折线图
        //type必传
        drawLine: function (type, data) {
            var that = this;
            //判断有多少数据 只有一个值时 symbol 为circle 多组值时 symbol为 none
			if(data.date.length == 1 ){
				that.gV.symboltype = 'circle'
			}	
            if (type == '1') {
                //画的是七日年化折线图 或者单位净值
                var chartId = document.getElementById("line1"),
                    xAxisData = data.date,
                    seriesData = data.seven;
            } else if (type == '2') {
                //画的是万份收益折线图 或者累计净值
                var chartId = document.getElementById("line2"),
                    xAxisData = data.date,
                    seriesData = data.big;
            }
            var myChart = echarts.init(chartId,{},{width:$(".line_area").width(),height:$(".line_area").height()});
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '<p style="font-size:0.36rem;color: #4A61A9;">{c}</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
                    backgroundColor: 'rgba(218,181,124, 0.1)',
                    // renderMode : 'richText', 
                    extraCssText: [7, 15, 15, 15],
                    textStyle: {
                        color: '#5B83FF'
                    },
                    confine: true,
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 0.5,
                                    color: '#081F6B' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#5B83FF' // 0% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                },
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '11%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',   //这里用参数代替了
                        margin: 20,
                        // align: 'right',
                        showMaxLabel:true,
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',
                        formatter: '{value}',
                    },
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                       color: '#677EC4'
                    },
                    itemStyle: {
						normal: {
							color: "#677EC4",
						}
			    	},
                    symbol: that.gV.symboltype,
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#dfe7ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#fafbfe' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: seriesData
                }]
            });
        },

    }
    /*调用*/
    regard.init()
})