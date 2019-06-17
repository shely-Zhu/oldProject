// 我的成长值  zyping 2019-6-11

//ajax调用
require('@pathCommonJsCom/utils.js'); 
//ajax调用
require('@pathCommonJs/ajaxLoading.js'); 
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js'); 
//路径配置文件
require('@pathIncludJs/vendor/config.js'); 
//黑色提示条
var tipAction = require('@pathCommonJsCom/tipAction.js');
//画进度
//require('@pathIncludJs/vendor/circleProcess/circleProcess.min.js'); 

//echarts图表
// var echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/gauge');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend');
// require('zrender/lib/vml/vml');

$(function(){

	var growthValue={

		//元素获取
		getElements: {
		}, 

		webinit:function(){  
			var that = this;

			//请求成长值数据
			that.getData();

			

			that.events();
		},

		getData: function(){
			var that = this;

			
			var obj = [{ //成长值查询
			    url: site_url.queryGrowthValue_api,
			    data: {},
			    needLogin:true, //需要判断是否登陆
			    needDataEmpty: false, //不需要判断data是否为空
			    async: false,
			    callbackDone: function(json){  //成功后执行的函数

			    	var num = json.data.growthValue;

			    	var n_obj = [{ //成长值区间查询
					    url: site_url.selectCustomerGrowthTier_api,
					    data: {},
					    needLogin:true, //需要判断是否登陆
					    needDataEmpty: false, //不需要判断data是否为空
					    callbackDone: function(json){  //成功后执行的函数

					    	var data = json.data;

					    	if( data.length ){
						        //判断区间
						        $.each( data, function(i, el){
						        	if( num <= el.valueUp && num >= el.valueDown ){

						        		$('.num').html(num);

						        		//角度计算
						        		var deg = (Number(num) - Number(el.valueDown))/(Number(el.valueUp) - Number(el.valueDown));

						        		//原始角度0.85-2.15
						        		
						        		deg = 0.85 + (2.15-0.85)*(Number(deg));

						        		that.drawAction( deg );

						        		//画线
						        		that.drawLine( deg );

						        		//设置角度
						        		// var deg = (Number(num) - Number(el.valueDown))/(Number(el.valueUp) - Number(el.valueDown))

						        		// deg = Number(deg) * 180; 

						        		// deg = -135 + deg;

						        		// if( deg > -135 && deg <= 45 ){
						        		// 	//在这个角度内的时候旋转
						        		// 	$('.circleWrapper .leftcircle').css('-webkit-transform', 'rotate('+ deg + 'deg);')
						        		// }

						        		// if( deg <= -135){
						        		// 	//在这个角度内，表示为0
						        		// 	$('.circleWrapper .circleLeft').css('background', '#FFF3D1')
						        		// }

						        		

						        		//展示成长值并画图
						        		// CircleProcess(
						        		// 	document.getElementById("canvas"),{
						        		// 	"size": "half",
						        		//     "percent": 40,
						        		//     "process": 0, 
						        		//     "startSmallCircle":{"show": false},
						        		//     "endSmallCircle":{"show": false},
						        		//     "processText": {"show": true, }
						        		// });
						        	}
						        })
			                    
					    	}
					    }
					}]
					$.ajaxLoading(n_obj);
			    }
			},{ //成长值流水
			    url: site_url.queryGrowthDetailList_api,
			    data: {
			    	pageNo: 1,
			    	pageSize: 10
			    },
			    needLogin:true, //需要判断是否登陆
			    needDataEmpty: false, //不需要判断data是否为空
			    callbackDone: function(json){  //成功后执行的函数

			    	var data = json.data,
			    		pageList = data.growthDetailList;

			    	if( pageList.length ){
				        //展示列表
	                    var tplm = $("#template-pot").html(),
						template = Handlebars.compile(tplm);
		            	html = template( pageList );
		            	//输入模板 
	                    $('.list').append(html);
			    	}
			    }
			}];


			$.ajaxLoading(obj);
		},

		drawAction:function( deg ) {
			var that = this;
			var bg = document.getElementById('xxb');
			var ctx = bg.getContext('2d');

			//红色
			ctx.beginPath();
			//在(100,100)处逆时针画一个半径为50，角度从0到180°的弧线
			//ctx.arc(100,100,50,0*Math.PI,1*Math.PI,true);
			ctx.lineWidth= 8;
			ctx.strokeStyle='#FFF3D1';
			var grd = ctx.createLinearGradient(0,0,100,0);//从左到右
			grd.addColorStop(0,"#E5942F"); //起始颜色
			grd.addColorStop(1,"#FFF3D1"); //终点颜色
			//ctx.strokeStyle=grd;
			//ctx.stroke();
			//ctx.fillStyle='#00ff00';
			ctx.fillStyle=grd;
			//在(100,100)出逆时针画一个半径为50的实心圆
			//ctx.arc(100,100,50,0*Math.PI,2*Math.PI,true);
			//ctx.fill();
			//在(100,100)出顺时针画一个半径为50的3/4圆弧
			ctx.arc(100,100,52,0.85*Math.PI,2.15*Math.PI,false);
			//ctx.arc(100,75,50,0,1.5*Math.PI)
			ctx.stroke();

			//黑色
			ctx.beginPath();
			//在(100,100)处逆时针画一个半径为50，角度从0到180°的弧线
			//ctx.arc(100,100,50,0*Math.PI,1*Math.PI,true);
			ctx.lineWidth= 8;
			ctx.strokeStyle='#E5942F';
			var grd = ctx.createLinearGradient(0,0,100,0);//从左到右
			grd.addColorStop(0,"#E5942F"); //起始颜色
			grd.addColorStop(1,"#FFF3D1"); //终点颜色
			//ctx.strokeStyle=grd;
			//ctx.stroke();
			//ctx.fillStyle='#00ff00';
			ctx.fillStyle=grd;
			//在(100,100)出逆时针画一个半径为50的实心圆
			//ctx.arc(100,100,50,0*Math.PI,2*Math.PI,true);
			//ctx.fill();
			//在(100,100)出顺时针画一个半径为50的3/4圆弧
			
			ctx.arc(100,100,52,0.85*Math.PI, Number(deg)*Math.PI,false);
			
			//ctx.arc(100,75,50,0*Math.PI,1.5*Math.PI)
			ctx.stroke();


			// for(var i=0;i<12;i++){
			//     ctx.beginPath();
			//     ctx.moveTo(400+(Math.sin(i*30*deg)*200),400-(Math.cos(i*30*deg)*200));
			//     ctx.lineTo(400+(Math.sin(i*30*deg)*(200+20)),400-(Math.cos(i*30*deg)*(200+20)));
			//     ctx.stroke()
			//   } 
		},

		drawLine: function(){
			var that = this;

			var bg = document.getElementById('line');
			var ctx = bg.getContext('2d');
			ctx.lineWidth = 7;
			var radius = bg.width / 2;

			ctx.translate(radius, radius); // 改变旋转中心
			ctx.beginPath();
			// ctx.arc(0, 0, radius * 2 / 3, 0, Math.PI / 30);
			ctx.strokeStyle = '#E5942F';
			ctx.stroke();

			ctx.closePath();
			for (var i = 0; i < 60; i++) {
			    ctx.beginPath();
			    ctx.rotate(8 * Math.PI / 180);
			    ctx.arc(0, 0, radius / 3 + 6, 0, Math.PI / 100);
			    ctx.strokeStyle = (i < 18 || i > 47) ? 'transparent' : '#E5942F';
			    ctx.stroke();
			    ctx.closePath();
			}
		},



		events:function(){
			var that=this;
			
			//点击成长值规则
			$('.regSpan').on('click', function() {
			    window.location.href = '/personal/views/growth/growthReg.html';
			})

		}
	};
	growthValue.webinit();
})


