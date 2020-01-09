/**  
* @Page:  私募一键认证弹框
* @Author: 闫瑞婷  
* @Date:   2020-01-08
* 参数：
* type: info 买入
* fundCode 基金编号
* userStatus 为空则是新用户   为0普通投资者  为1专业投资者
* accountType  客户类型  0-机构 1-个人
*
* url 认证成功跳转页面
* 
*/

module.exports = function(type, fundCode, userStatus, accountType, url) {
	var auth = {
		$e:{
            
        },
        data: {
			tipsWrap:$("#tips-wrap"),
			realLi: $('#real-condition>li'), // 条件下的五条
			singleaAuthenPath : "", //一键认证跳转链接
			privatePlacementDetail: ''
		},
        gV: {
        	isWealthAccountStatus: '',// 是否开通财富账户
        	userStatus: userStatus,
        	accountType: accountType
        },
        init: function() {
            var that = this;
            // 获取用户各审核情况，共5条
            that.initAuth();
            that.events();
        },
        initAuth: function() {
        	var that = this;
            var type = type;
            //发送ajax请求
            var obj = [{
                url: site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode: fundCode,
                },
                //contentTypeSearch: true,
                //needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数
                    //that.data.canClick = true; //变为可点击
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
						// 当满足四个条件之后
						if(jsonData.isWealthAccount == "0"&&jsonData.isRiskEndure == "1"&&jsonData.isPerfect == "1"&&jsonData.isInvestFavour=="1"){
							that.data.tipsWrap.hide()
							that.data.realLi.hide();
                            $(".isRiskMatch_mask").show();
							$(".isRiskMatchBox").show();
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
                            if(jsonData.isRiskMatch == "1"){
                                //风险等级匹配
                                $(".isRiskMatchBox_match").show()
								$(".isRiskMatchBox_noMatch").hide()
								$(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                            }else if(jsonData.isRiskMatch == "0"){
                                $(".isRiskMatchBox_noMatch").show()
								$(".isRiskMatchBox_match").hide()
								$(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                                $(".isRiskMatchResult").html("查看评测结果")
                                $(".isRiskMatchResult").attr("type","noRisk")
                            }else if(jsonData.isRiskMatch == "2"){
                                $(".isRiskMatchBox_noMatch").show()
								$(".isRiskMatchBox_match").hide()
								$(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                                $(".isRiskMatchResult").html("重新风测")
                                $(".isRiskMatchResult").attr("type","repeatRisk")
                            }
 
							that.gV.singleaAuthenType = type
							
						}else{
							that.data.tipsWrap.show()
							that.data.realLi.show();
						}
						that.data.singleaAuthenPath = that.getSingleaAuthenPath(jsonData);
						if(jsonData.isWealthAccount=="0"){
							//是否开通财富账户   0开通  非0 没有开通  6
							that.gV.isWealthAccountStatus = true
							that.data.realLi.eq(0).hide()  
						}else{
							that.gV.isWealthAccountStatus = false
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
							that.data.realLi.eq(0).show()
                        }
						if(jsonData.isRiskEndure=="0"||jsonData.isRiskEndure == null){
							//是否风测
							that.data.realLi.eq(1).show()  
						}else{
							that.data.realLi.eq(1).hide()
						}
						if(jsonData.isPerfect=="0" ||jsonData.isPerfect== null){
							//是否完善资料  isWealthAccount 用户过期
							that.data.realLi.eq(2).show()  
						}else{
							that.data.realLi.eq(2).hide()
						}
						if(jsonData.isInvestFavour=="0" || jsonData.isInvestFavour == null){
							//是否投资者分类
							that.data.realLi.eq(3).show()  
						}else{
							that.data.realLi.eq(3).hide()
                        }
						if(jsonData.isRiskMatch=="0" || jsonData.isRiskMatch == null){
							//是否风险等级
							that.data.realLi.eq(4).show()  
						}else{
							that.data.realLi.eq(4).hide()
						}
						if(jsonData.investorStatus =="0"&&that.gV.userStatus==""){
                            //直接申请为专业投资者
                            that.gV.tipsWrap.show()
                            that.gV.realLi.show();
                            that.gV.realLi.eq(3).show()  
                        }
						that.data.realLi.eq(4).hide() 

                },
                callbackFail: function(json) { //失败后执行的函数
                   tipAction(json.message);

                },
                callbackNoData:function(argument) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        },
        // 获取。。。
        getSingleaAuthenPath:function(data){
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
		},
        events: function () {
        	var that = this;
        	    //认证
			mui("body").on('mdClick', ".tips-li .tips-li-right", function (e) {
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

					case 1:   //私募风险评测  type=private type=asset 资管风测
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
						if(jsonData.investorStatus =="0"&&that.gV.userStatus==""){
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
				'htmdEvt': 'optionalPublicDetail_14'
			});
				//一键认证
			mui("body").on('mdClick', ".tips .tips-btn", function (e) {
				var key = that.data.singleaAuthenPath;
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

					case "isRiskEndure":   //风险评测
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
                        if(jsonData.investorStatus =="0"&&that.gV.userStatus==""){
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
				'htmdEvt': 'optionalPublicDetail_15'
			});
        	//风险等级匹配失败
			mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
			  // that.gV.isRiskMatchBox.hide();
			},{
				'htmdEvt': 'optionalPublicDetail_12'
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
				'htmdEvt': 'optionalPublicDetail_13'
			})
        	//风测等级匹配成功
        	mui("body").on('mdClick',".isRiskMatchBox_match",function(){
				var type = that.gV.singleaAuthenType;
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
				if(!that.gV.isWealthAccountStatus||that.gV.accountType == 0|| that.gV.accountType == 2){
					//未开通账户
					return false
				}
				window.location.href = url
				/*if(type == "into"){
					//买入一键认证
					window.location.href = site_url.fundTransformIn_url+"?fundCode="+that.data.fundCode+"&noReload=1";
			   }else if(type == "investement"){
					//定投一键认证
					window.location.href = site_url.ordinarySetThrow_url+"?fundCode="+that.data.fundCode+'&type=add';			
			   }*/
			},{
				'htmdEvt': 'optionalPublicDetail_11'
			})
        	// 点击弹窗或关闭按钮隐藏
            var  maskheight =  window.innerHeight - $('.tips-content').height();
            $('.tips-mask').height(maskheight)
			$('body').on('tap', '.icontips-close', function () {
				$('.tips').css('display', 'none')
			})
			$('body').on('tap', '.tips-mask', function () {
				$('.tips').css('display', 'none')
			})
		},
	}
	auth.init();
}
