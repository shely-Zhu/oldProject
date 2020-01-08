/**  
* @Page:  私募一键认证弹框
* @Author: 闫瑞婷  
* @Date:   2020-01-08
* 
*/

module.exports = function(type, fundCode) {
	var auth = {
		$e:{
            
        },
        gV: {
        	isWealthAccountStatus: ''// 是否开通财富账户
        },
        init: function() {
            var that = this;
            // 获取用户各审核情况，共5条
            that.initAuth();
            that.event();
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
                    that.data.canClick = true; //变为可点击
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
					//that.data.canClick = true; //变为可点击

                },
                callbackNoData:function(argument) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function () {
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
