/**
 * 权益中心
 * @author sunfuping 2018-12-5
 */

//接口及静态资源路径
require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
//底层封装方法组件
require('../../../common/js/components/utils.js');
require('../../../common/js/components/app/ifApp.js');
//ajax封装
require('../../../common/js/ajaxLoading.js');
//ajax封装
require('../../../common/js/components/elasticLayer.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
//Base64封装加密或解密
var Base64 = require('../../../include/js/vendor/base64/base64.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');

$(function(){

    var rightsCenter = {

    	cardLenght: '',
			nowRank: splitUrl()['adPosition'],

        webinit:function(){  
            var that=this;  
            /*页面初始化加载数据ajax请求*/
            that.getList();
        },

        getList:function(){
            var that=this;
            var obj = [{
                url: site_url.findBannerLikePosition_api, //会员卡片图片文案
                data: {//请求的参数信息
										adPosition :"vip",//类型（标志位）
										seqNo:"4",//显示顺序
										limitCount:"7",//展示幅数
                },
                //needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){//成功后执行的函数
                    var data = json.data;
                    that.cardLenght = data.lenght;
                    // 根据adPosition展示不同级别会员
                   	Handlebars.registerHelper("transformat",function(value){
												if(value == "vip1") {
													return "银杏级会员";
												}else if(value == "vip2") {
													return "白银级会员";
												}else if(value == "vip3") {
													return "黄金级会员";
												}else if(value == "vip4") {
													return "白金级会员";
												}else if(value == "vip5") {
													return "黑金级会员";
												}else if(value == "vip6") {
													return "钻石级会员";
												}else if(value == "vip7") {
													return "黑钻级会员";
												}
										});
				    
										// 当前等级卡片提示语
										Handlebars.registerHelper("compare",function(value,options) {
												if(value == that.nowRank) {
													return options.fn(this);
												}else{
													return options.inverse(this);
												}
										});

										Handlebars.registerHelper("compareOne",function(value,options) {
										// 已超过的等级卡片提示语
												if(value < that.nowRank) {
													return options.fn(this);
												}else{
											// 未达到的等级卡片提示语
													return options.inverse(this);
												}
										});
										// 已超过的等级卡片提示具体是什么等级会员
										Handlebars.registerHelper("transformatOne",function(value) {
											
												if(that.nowRank == "vip1") {
														return "银杏级会员";
													}else if(that.nowRank == "vip2") {
														return "白银级会员";
													}else if(that.nowRank == "vip3") {
														return "黄金级会员";
													}else if(that.nowRank == "vip4") {
														return "白金级会员";
													}else if(that.nowRank == "vip5") {
														return "黑金级会员";
													}else if(that.nowRank == "vip6") {
														return "钻石级会员";
													}else if(that.nowRank == "vip7") {
														return "黑钻级会员";
													}
											
										});
										

										Handlebars.registerHelper("compareTwo",function(value,options) {
												if(value == 1) {
													return options.fn(this);
												}else{
													return options.inverse(this);
												}
										});

										var myTemplate = Handlebars.compile($("#scroll_box_template").html());
														$('#scroll_box').html(myTemplate(data));

														// 根据卡片加载对应权益
										$.each(data,function(i,el) {
											(function(i){
												that.rightsFunction(i)
											})(i);
											
										});
								}
								
            }];

            $.ajaxLoading(obj);
        },
        rightsFunction: function(i) {
        	var that=this;
        	var obj = [{
            	url: site_url.queryRightsByLevel_api, //会员权益查询
                data: {//请求的参数信息    
										level: i+1 ,//会员等级
                },
                callbackDone: function(json){//成功后执行的函数
                    var data = json.data;
                    // 把这个data赋值给findBannerLikePosition_api的data
                    //el.levelRights = data;
                    
				    //if(i == 6) {
				    	var listTemplate = Handlebars.compile($("#scroll_box_list_template").html());
                    	$('.rights[num="'+i+'"]').html(listTemplate(data));
                    	// 设置展示当前等级
			            // var $muiItem = $(".mui-control-item");
			            var $muiItem = $(".mui-control-item").eq(1).width();
			            // var boxWidth = $muiItem.eq(1).width() + $muiItem.eq(1).css('margin-left');
			            var p = document.getElementsByClassName("mui-control-item")[1];
						var style = p.currentStyle || window.getComputedStyle(p);
			            switch (that.nowRank)
						{			
							case "vip1":
							  var x = 0;
							  break;
							case "vip2":	
								var x = $muiItem + parseInt(style.marginLeft) * 2 - 30;
							  break;
							case "vip3":
								var x = $muiItem * 2 + parseInt(style.marginLeft) * 3 - 30;
							  break;
							case "vip4":
								var x = $muiItem * 3 + parseInt(style.marginLeft) * 4 - 30;
							  break;
							case "vip5":
								var x = $muiItem * 4 + parseInt(style.marginLeft) * 5 - 30;
							  break;
							case "vip6":
								var x = $muiItem * 5 + parseInt(style.marginLeft) * 6 - 30;
							  break;
							case "vip7":
								var x = $muiItem * 6 + parseInt(style.marginLeft) * 7 - 30;
							  break;
						};
						mui('.mui-scroll-wrapper').scroll().scrollTo(-x,0,0);
					 //};
				   
         
                    
                }
            }];
            $.ajaxLoading(obj);
        },

    };
    rightsCenter.webinit();//页面数据初始化


});