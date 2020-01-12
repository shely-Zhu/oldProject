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

* @author zhangyanping  2020-01-12
* 添加组件的埋点的相关的代码
* 
*/

module.exports = function(fundCode, url,htmdEvt) {
	var auth = {
		$e:{
            
        },
        data: {
			tipsWrap:$("#tips-wrap"),
			realLi: $('#real-condition>li'), // 条件下的五条
			singleaAuthenPath : "", //一键认证跳转链接
			privatePlacementDetail: '',
			investorStatus: "", // 审核状态
			isWealthAccount: '' // 账户状态
		},
        gV: {
        	isWealthAccountStatus: '',// 是否开通财富账户
        	userStatus: '', // '' 新用户 0-普通投资者;1-专业投资者；2-已过期；
            accountType: '', // 用户类型 1 个人
        	isHighAgeStatus:true,  //投资者年龄默认小于60的状态为true  大于就位false
        },
        init: function() {
            var that = this;
            // 获取用户状态以及用户类型
            that.getUserInfo();
            that.events();
        },
        getUserInfo: function() {
        	var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserAuthInfo_api,
                data: {
                },
                callbackDone: function (json) {
                    var data = json.data
                    that.gV.accountType = data.accountType
                    that.gV.userStatus = data.investFavour
                    // 获取用户各审核情况，共5条
        			that.initAuth();
                },
                callbackNoData:function(json){
					tipAction(json.message);
				},
            }]
            $.ajaxLoading(obj);
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
						that.data.investorStatus = jsonData.investorStatus
						that.data.isWealthAccount = jsonData.isWealthAccount
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
							/*if(jsonData.isWealthAccount == "6"){
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
                            }*/
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
							//先判断是否进行投资者分类，没有则显示未认证，如果是再判断投资者状态
							that.data.realLi.eq(3).show() 
							if(jsonData.investorStatus =="0"&&that.gV.userStatus=="") {
								that.data.realLi.eq(3).find(".bank-status").html("未审核")
							}
						}else{
							that.data.realLi.eq(3).hide()
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
						// 个人 根据账户的不同状态跳转到相对应的页面 
						switch(String(that.data.isWealthAccount)) {
							// 身份证上传
							case '1': window.location.href = site_url.realName_url;break;
							// 人脸识别
							case '2': window.location.href = site_url.realFaceCheck_url;break;
							// 3a 进线下申请状态-视频双录
							case '3a': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
							// 3b 进线下申请状态-影像采集
							case '3b': window.location.href = site_url.realOffline_url;break;
							// 4 视频双录
							case '4': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
						}
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
						if(that.data.investorStatus =="0"&&that.gV.userStatus==""){
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
				'htmdEvt': htmdEvt + '_001'
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
                        // 个人 根据账户的不同状态跳转到相对应的页面 
						switch(String(that.data.isWealthAccount)) {
							// 身份证上传
							case '1': window.location.href = site_url.realName_url;break;
							// 人脸识别
							case '2': window.location.href = site_url.realFaceCheck_url;break;
							// 3a 进线下申请状态-视频双录
							case '3a': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
							// 3b 进线下申请状态-影像采集
							case '3b': window.location.href = site_url.realOffline_url;break;
							// 4 视频双录
							case '4': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
						}
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
                        if(that.data.investorStatus =="0"&&that.gV.userStatus==""){
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
				'htmdEvt': htmdEvt + '_002'
			});
        	//风险等级匹配失败
			mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
			  // that.gV.isRiskMatchBox.hide();
			},{
				'htmdEvt': htmdEvt + '_003'
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
                    that.initAuth(that.gV.singleaAuthenType)
                }else if(type == "isZdTaLimit"){
                     //跳理财首页
                    window.location.href = site_url.wealthIndex_url
                }else if(type = "overdue"){
                    //身份证过期
                    window.location.href = site_url.completeInfoEditModify_url
                }
			},{
				'htmdEvt': htmdEvt + '_004'
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
				
			},{
				'htmdEvt': htmdEvt + '_005'
			})
        	// 点击弹窗或关闭按钮隐藏
            var  maskheight =  window.innerHeight - $('.tips-content').height();
            $('.tips-mask').height(maskheight)
            mui("body").on('mdClick',".icontips-close",function(){
				$('.tips').css('display', 'none')
            },{
            	'htmdEvt': htmdEvt + '_006'
            })
            mui("body").on('mdClick',".tips-mask",function(){
				$('.tips').css('display', 'none')
            },{
            	'htmdEvt': htmdEvt + '_007'
            })
			// $('body').on('tap', '.icontips-close', function () {
			// })
			// $('body').on('tap', '.tips-mask', function () {
			// 	$('.tips').css('display', 'none')
			// })
		},
	}
	auth.init();
}
