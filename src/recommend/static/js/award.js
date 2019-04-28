/** 
 * 荣耀月  js文件
 * @author  zhangyanping
 * @time 2017-11-21
 
 * @老带新抽奖活动
 * @author ping 2018-07-19

 */      

require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');

require('../../../include/js/vendor/zepto/fx.js'); 

//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');

 
$(function(){
	var award={

		dataTimes:null,
		startflag:null,
		token:null,
		bRotate:false,
		isRotate: false, //按钮是否一点击
		isLogin:1,// 1--初始化判断是否登录，2--点击开始抽奖按钮，3--点击我的中奖记录
		jumpParam:null, // 0--已登录  1--未登录

		isNum:1,

		source:null,   //信息来源

		startTime:null,  //活动开始时间
		endTime:null,    //活动结束时间
		code:null,
		prizeArr:[],//奖品数组
		angleArr:[],//角度arr
		warningUrl:"",//警告图片
		busyUrl:"",//系统繁忙图片
		noChanceUrl:"",//没有机会图片
		getElements:{
	
		},
		init:function(){
			var that = this;

			that.getData();

			that.events();
		},
		
		getData: function(){
			var that=this;

			that.checkLogin(true);
			// 中奖名单方法调用
			that.queryallrecordlist();
			that.getBg();
		},
		checkLogin:function(params,callback){
			var that = this;
			var obj = [
				{
					url: site_url.checkLogin_api,
					// async: true,
					needDataEmpty:false,
					loginNotJump:params, //true不跳，false--跳
					needLogin:true,//需要判断是否登录
            		// needCrossDomain: true,
					callbackDone: function(json){
						//that.code = json.code;
						if(that.isLogin==1){//初始化
							that.award();
							that.queryrecord();
						}else if(that.isLogin==2){//点击开始抽奖按钮

							// 每次点击抽奖次数查询一次接口
							that.award();
							
							if(that.dataTimes > 0){
								//如果抽奖次数大于0去调抽奖结果
								//获取token
								that.gettoken();
								if(window.currentIsApp){
									that.source = 'app';
								}else{
									that.source = 'wap';
								}
								if(that.startflag == 1 || that.startflag == 3){
									var src = that.warningUrl;
									$("#integralImg").attr("src", src);
									$('.award-mask').show();
									$(".integral").show();
									$(".noOpen").show();
									$(".noOpen .startTime").html(that.startTime);
									$(".noOpen .endTime").html(that.endTime);
								}else if(that.startflag == 2){
									var src = that.warningUrl;
									$("#integralImg").attr("src", src);
									$('.award-mask').show();
									$(".integral").show();
									$(".finish").show();
									$(".finish .startTime").html(that.startTime);
									$(".finish .endTime").html(that.endTime);
								}else{
									that.resultScores();
								}
								
							}
							else{//抽奖次数为0
								if(that.startflag == 1 || that.startflag == 3){
									var src = that.warningUrl;
									$("#integralImg").attr("src", src);
									$('.award-mask').show();
									$(".integral").show();
									$(".noOpen").show();
									$(".noOpen .startTime").html(that.startTime);
									$(".noOpen .endTime").html(that.endTime);
								}else if(that.startflag == 2){
									var src = that.warningUrl;
									$("#integralImg").attr("src", src);
									$('.award-mask').show();
									$(".integral").show();
									$(".finish").show();
									$(".finish .startTime").html(that.startTime);
									$(".finish .endTime").html(that.endTime);
								}else{
									var src = that.noChanceUrl;
									$("#integralImg").attr("src", src);
									$('.award-mask').show();
									$(".integral").show();
								}
								
								that.isRotate = false;
							}

						}else if(that.isLogin==3){//查看抽奖记录

							that.queryrecord();
							$('.award-mask').show();
							$('.five-pop').show();
							$('.closeTwo').show();

						}
						that.isLogin=null;
						jumpParam=true;
					},
					callbackFail:function(json){
						tipAction(json.message);
					},
					callbackNoData:function(){
						console.log('我在nodata里面')
					},
					callbackLoginFunc:function(){
						//未登录
						$('.award-02-inner .awardTimes').html('登录可见');
						$('.award-02-inner .awardTimes').css({'cursor':'pointer','border-color':'rgba(244, 207, 92,0.4)'});
						if(that.isLogin != 1){
							that.judge();
						}
						
					},	
				}
			];
			$.ajaxLoading(obj);
		},

		judge:function(){
			var that = this;
			if(that.jumpParam == "true"){ //已登录
				if( $("#script_login").length !=0 && $("#script_login").attr("src").indexOf("appLogOut") !=-1 ){//此时表示APP也是未登录
					return false;
				}
			}else{
				if(window.currentIsApp){
					return false;
				}else{
					window.location.href=site_url.login_html_url+'?originUrl=' + new Base64().encode(window.location.href);
				}
			}	
		},

		//抽奖次数查询
		award:function(){
			var that = this;
			var obj = [
				{ 
					url: site_url.award_api,
					data:{
					
					},
					needLogin:true,  //需要判断是否登陆
					callbackDone:function(json){
						that.dataTimes = json.data.times;
						that.startflag = json.data.startflag;
						that.startTime = json.data.startTime;
						that.endTime = json.data.endTime;
						$('.award-02-inner .awardTimes').html(json.data.times);

					},
					callbackFail: function (json) {
						tipAction(json.message);
					}
				}
			];
			$.ajaxLoading(obj);
		},

		//获取唯一的token
		gettoken:function(){
			var that = this;
			var obj = [
			//获取唯一的token
				{
					url: site_url.getToken_api,
					data: {
						
					},
					async:false,
					needLogin: true, //需要判断是否登陆
					callbackDone: function (json) {
						that.token = json.data.token;
						// console.log(that.token);
					},
					callbackFail: function (json) {
						tipAction(json.message);
						that.isRotate = false;
					}
				}
			];
			$.ajaxLoading(obj);
		},

		// 我的中奖记录
		queryrecord:function(){
			var that = this;
			var obj = [
				{
					url: site_url.getAwardRecords_api,
					data:{
						
					},
					needLogin:true,  //需要判断是否登陆
					callbackDone:function(json){
						//that.dataList = json.data;
						that.score(json.data);
						that.name(json.data);
						// $.each(json.data,function(i,j){
						// 	console.log(j);
						// 	that.formatTime(Number(j.datetime));
						// });
						// 我的中奖纪录模板数据
						var source =  $('#award_list_con').html(),
							Template = Handlebars.compile(source),
							html = Template(json.data);
							$('.award-list ul').html(html);

					},
					callbackFail: function (json) {
						tipAction(json.message);
						that.isRotate = false;
					}
				}
			];
			$.ajaxLoading(obj);
		},

		// 中奖名单查询方法
		queryallrecordlist:function(){
			var that = this;
			// console.log(that);
			var obj = [{
				url: site_url.getDrawRecords_api,
				data:{
					
				},
				callbackDone:function(json){
			
					award.score(json.data.recordlist);
					award.name(json.data.recordlist);
					// console.log(json.data);
					function winners(obj){


						$(".award-05-inner").find("ul").animate({  
							marginTop:"-1.5rem"
						},500,function(){
							// console.log("执行animate");
							// console.log($(this));
							$(this).css({marginTop : "0px"}).find("li:first-child").appendTo(this);  
						})

					}

					if(json.data.recordlist.length > 6){
						if(award.isNum !="1"){
							clearInterval(timeout);
						}else{
							award.isNum++;
						}
						timeout = setInterval(winners,1000); 
					}

					// setInterval(winners,2000);
					
					var source = $('#manage-template').html();
					//预编译模板
					var template = Handlebars.compile(source);
					//数据和模板绑定
					var html = template(json.data.recordlist);
					//把结果输出到页面上
					$('.innerList').html(html);

					$('.awardDate .startDate').html(json.data.starttime);
					$('.awardDate .endDate').html(json.data.endtime);

					award.timeFnc();

				},
				callbackFail: function (json) {
					tipAction(json.message);
				}
			}];
			$.ajaxLoading(obj);
		},

		//抽奖结果方法
		resultScores:function(){
			var that = this;
			var obj = [{
				url: site_url.draw_api,
				data: {
					token: that.token,
					source: that.source,  //信息的来
				},
				// dataType : 'jsonp',
				needLogin: true, //需要判断是否登录
				//async: false,
				callbackDone: function (data) {
					//var data = json.data;

					if (that.bRotate) return;
					var item = data.data.award;

					if(that.startflag == 3){
						var src = that.warningUrl;
							$("#integralImg").attr("src", src);
							$('.award-mask').show();
							$(".integral").show();
							$(".noOpen").show();
							$(".noOpen .startTime").html(that.startTime);
							$(".noOpen .endTime").html(that.endTime);
					}else{
						// console.log(award.startflag);
						if (that.startflag == 0) {
							var $index = Number(item)-1;
							that.rotateFn(that.prizeArr[$index],that.angleArr[$index]);
							
							/*switch (Number(item)) {
								case 1:
									//var angle = [137, 185, 235, 287];
									that.rotateFn(1, 180, '一等奖');
									break;
								case 2:
									//var angle = [137, 185, 235, 287];
									that.rotateFn(2, 240, '二等奖');
									break;
								case 3:
									//var angle = [88, 137, 185, 235, 287];
									that.rotateFn(3, 300, '三等奖');
									break;
								case 4:
									//var angle = [185, 235, 287];
									that.rotateFn(4, 360, '四等奖');
									break;
								case 5:
									//var angle = [36, 108, 180, 252, 324];
									that.rotateFn(5, 60, '五等奖');
									break;
								case 6:
									//var angle = [36, 108, 180, 252, 324];
									that.rotateFn(6, 120, '六等奖');
									break;
							}*/
							that.dataTimes = that.dataTimes - 1;
							$('.award-02-inner .awardTimes').html(award.dataTimes);
							
						} else if (that.startflag == 1) {
							var src = that.warningUrl;
							$("#integralImg").attr("src", src);
							$('.award-mask').show();
							$(".integral").show();
							$(".noOpen").show();
							$(".noOpen .startTime").html(that.startTime);
							$(".noOpen .endTime").html(that.endTime);
						} else if(that.startflag == 2) {
							var src = that.warningUrl;
							$("#integralImg").attr("src", src);
							$('.award-mask').show();
							$(".integral").show();
							$(".finish").show();
							$(".finish .startTime").html(that.startTime);
							$(".finish .endTime").html(that.endTime);
						}
					}

				},
				callbackFail: function (json) {
					tipAction(json.message);
					that.isRotate = false;
				}
				// console.log(item);
			}];
			$.ajaxLoading(obj);
		},
		rotateFn:function (awards, angles, img){
			var that = this;
			that.bRotate = !that.bRotate;

			jQuery('#rotate').stopRotate();
			
			// $('#rotate').stopRotate();
			jQuery('#rotate').rotate({
				angle:0,
				animateTo:angles+1800,
				duration:8000,
				callback:function (){
					// alert(txt);
					var src = awards;
					$("#integralImg").attr("src",src);
					jQuery("#integralImg").load(function(){
						$('.award-mask').show();
						$(".integral").show();
					})
					

					$('.integral .close').on('click','a',function(){
						$('.award-mask').hide();
						$('.integral').hide();
					});
					// console.log($('.integral .close'));
					// console.log(img);
					that.bRotate = !that.bRotate;

					that.isRotate = false;
				}
			})
		},
		events:function(){
			var that=this;
			var rotateTimeOut = function (){
				$('#rotate').rotate({
					angle:0,
					animateTo:2160,
					duration:8000,
					callback:function (){
						// alert('网络超时，请检查您的网络设置！');
						var src = that.busyUrl;
							$("#integralImg").attr("src",src);
							$('.award-mask').show();
							$(".integral").show();
					}
				});
			};
			that.bRotate = false;


			// 抽奖活动
			$('.pointer img').on('click',function(){
				that.isLogin=2;
				if( !!that.isRotate ){
					//如果that.isRotate = false;, 不请求接口
					return false;
				}

				that.isRotate = true;

				that.checkLogin(false)
			});

			// 登录可见
			$('.award-02-inner .awardTimes').on('click',function(){
				
				// if(that.code == 'CS0000'){
				// 	return false;
				// }else{
				// 	if(window.currentIsApp){
				// 		$('#script_login').attr('src', 'appHref://appLogOut');
				// 		return false;
				// 	}else{
				// 		window.location.href=site_url.login_html_url+'?originUrl=' + new Base64().encode(window.location.href);
				// 	}
				// }
				//  that.checkLogin(false, function() {
				// 	 debugger
                // 	// jsonp请求需放在回掉函数中
	            //     that.judge();
				// });
				 that.checkLogin(false);
				
			});


			$('.integral .close').on('click','a',function(){
				// $('.award-mask').hide();
				$('.integral').hide();
				$(".noOpen").hide();
				$(".finish").hide();
				that.isRotate = false;
			});

			// 活动规则关闭按钮点击事件
			$('.close').on('click','a',function(){
				$('.award-mask').hide();
				$('.pop').hide();
				$("body").css({"overflow-y":"inherit"});
			});

			//我的中奖记录
			$('.btns .btn-01').on('click',function(){
				if(that.isRotate == false){
					that.isLogin=3;
					that.checkLogin(false);
					$("body").css({"overflow-y":"hidden"});
				}else{
					return false;
				}
				
			});

			// 查看活动规则的点击事件
			$('.btns .btn-02').on('click',function(){
				if(that.isRotate == false){
					$('.award-mask').show();
					$('.popRule').show();
					$('.closeOne').show();
				}else{
					return false;
				}
				
			});
		},

		timeFnc:function(){
			var that = this;
			setTimeout(that.queryallrecordlist,60000);
		},

		score:function(arr){
			for(var i=0;i<arr.length;i++){
				var awardScore = $('.award-score li').filter(function(){
					return $(this).attr('num') == arr[i].award;
				}).html();
				arr[i].awardScore=awardScore;
			}
			// console.log(arr);
		},
		name:function(arr){
			for(var i=0;i<arr.length;i++){
				var awardName = $('.award-name li').filter(function(){
					return $(this).attr('num') == arr[i].award;
				}).html();
				arr[i].awardName=awardName;
			}
			// console.log(arr);
		},
		//获取页面背景及元素素材
		getBg:function(){
			var that = this;
			var obj = [{
				url: site_url.findBannerLikePosition_api,
				data:{
					adPosition :"LotteryWAP",//类型（标志位）【请参照备注】
					groupType:"bannerCategoryGF"//  组类型（非必填，默认明泽）		  	
				},
				needLogin:true,  //需要判断是否登陆
				callbackDone:function(json){
					var data=json.data;
					if($.util.objIsEmpty(data)){
			      		//data为空,返回
			      		return false;
			      	}
			      	$.each(data,function(i,el){
			      		switch (el.adPosition) {
							case 'LotteryWAPLayer1':
								$(".award-02").css({"background-image":"url("+el.imgUrl+")"});
								break;
							case 'LotteryWAPLayer2':
								$(".award-03").css({"background-image":"url("+el.imgUrl+")"});
								break;
							case 'LotteryWAPLayer3':
								$(".award-04").css({"background-image":"url("+el.imgUrl+")"});
								break;
							case 'LotteryWAPLayer4':
								$(".award-05").css({"background-image":"url("+el.imgUrl+")"});
								break;	
							case 'LotteryWAPRule':
								$(".popRule .rule").css({"background-image":"url("+el.imgUrl+")"});
								break;
							case 'LotteryWAPPop':
								$(".five-pop .award-pop").css({"background-image":"url("+el.imgUrl+")"});
								break;	
							case 'LotteryWAPPointer':
								$(".turntable-bg .pointer img").attr("src",el.imgUrl);
								break;
							case 'LotteryWAPTurntable':
								$(".turntable-bg .rotate img").attr("src",el.imgUrl);
								break;	
							case 'LotteryWAPListtitle':
								$(".award-05-inner .images img").attr("src",el.imgUrl);
								break;					
							case 'LotteryWAPClose':
								$(".close img").attr("src",el.imgUrl);
								break;
							case 'LotteryWAPWarning':
								that.warningUrl = el.imgUrl;
								break;	
							case 'LotteryWAPBusy':
								that.busyUrl = el.imgUrl;
								break;
							case 'LotteryWAPNoChance':
								that.noChanceUrl  = el.imgUrl;
								break;
							case 'LotteryWAPPrize':	
								that.prizeArr.push(el.imgUrl);
							    break;						
						}
				    });
					var l=Number(that.prizeArr.length);
				    var n=360/l;
				    for( var i = 1 ;i <= l ; i++ ){
				    	that.angleArr.push(n*i);
				    }
					

				},
				callbackFail: function(){

				}
			}];
			$.ajaxLoading(obj);

		},
	};
	function rnd(n, m){
		return Math.floor(Math.random()*(m-n+1)+n)
	}
	award.init(); 
})



