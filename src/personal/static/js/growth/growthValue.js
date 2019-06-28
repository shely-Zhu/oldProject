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
//下拉加载
require('@pathCommonJsCom/goTopMui.js');
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

	var wrapHeight = $('.boxWrap').height(),
		wrapWidth = $('.boxWrap').width();

	var growthValue={

		page : 1,
        flag:false,//分页数据加载完毕参数
		//元素获取
		getElements: {
			pullUp : $("#pullUp"),//上拉加载按钮
			emptyBox : $('#emptyBox'),
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		}, 

		wrapNum: {
			height: wrapHeight ,
			width: wrapWidth ,
			r: ( Number( wrapWidth ) * 0.16) + (Number( $('.boxWrap .num').width() )/2) ,  //画圆半径 
			hr : Number( wrapHeight / 2 ),   //圆心位置y
			wr : Number( wrapWidth / 2 )  //圆心位置x
		},

		webinit:function(){  
			var that = this;

			var height = windowHeight -$('.boxWrap').height() - $('.title').height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }

            $('#xxb, #line').attr('height', that.wrapNum.height ).attr('width', that.wrapNum.width );

			//请求成长值数据
			that.getData();

			that.initMui();

			that.events();
		},

		getData: function(t){
			var that = this;

			
			var obj = [{ //成长值查询
			    url: site_url.queryGrowthValue_api,
			    data: {},
			    needLogin:true, //需要判断是否登陆
			    //needDataEmpty: false, //不需要判断data是否为空
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

						        		//重新计算圆圈半径
						        		that.wrapNum.r = ( Number( wrapWidth ) * 0.16) + (Number( $('.boxWrap .num').width() ) / 2 * 0.16);

						        		//角度计算
						        		var deg = (Number(num) - Number(el.valueDown))/(Number(el.valueUp) - Number(el.valueDown)),
						        			newDeg = 0.85 + (2.15-0.85)*(Number(deg));

						        		//原始角度0.85-2.15
						        		
						        		if( deg == 0 ){
						        			//为0时，不画黑线
						        			that.drawAction( 0 );
						        		}
						        		else{
						        			that.drawAction( newDeg );
						        		}

						        		//画线
						        		that.drawLine( );
						        	}
						        })
			                    
					    	}
					    }
					}]
					$.ajaxLoading(n_obj);
			    },
			    callbackNoData: function( json ){
			    	//数据为空
			    	
			    }
			}];


			$.ajaxLoading(obj);
		},
		getList:function(t){
			var that=this;
			var obj=[{ //成长值流水
					url: site_url.queryGrowthDetailList_api,
					data: {
						pageNo: that.page,
						pageSize: 10
					},
					needLogin:true, //需要判断是否登陆
					//needDataEmpty: false, //不需要判断data是否为空
					callbackDone: function(json){  //成功后执行的函数
	
						that.jsonData = json.data;

	                    if (!$.util.objIsEmpty(that.jsonData.pageList)) {
	                        //有数据，拼模板

	                        var source = $('#template-pot').html(),
	                            template = Handlebars.compile(source);
	                        
	                        that.html = template(that.jsonData.pageList);

	                        //setTimeout(function() {
	                            if (that.page == that.jsonData.pageItems.totalPages ) {
	                                //最后一页
	                                t.endPullupToRefresh(true);
	                            } else {
	                                t.endPullupToRefresh(false);
	                                //去掉mui-pull-bottom-pocket的mui-hidden
	                                //$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
	                            }
	                            that.page++;
								$('.list').find('.contentWrapper .mui-table-view-cell').append(that.html);
								$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
								$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
	                        //}, 2000)

	                    } else {
	                        //显示没有数据
	                        //没有数据
	                        if (that.page == 1) {
	                            //第一页时
	                            $('.list .mui-table-view-cell').html(that.getElements.noData).css("boxShadow", "none");
	                            $('.list').find('.noData').show();
	                        } else {
	                            //其他页
	                            t.endPullupToRefresh(true);
	                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
	                        }
	                    }
					},
				    callbackNoData: function( json ){
				    	//数据为空，显示暂无数据图标
				    	$('.without').show();
				    	$('.list').hide();
				    }

			}];
			$.ajaxLoading(obj);
		},
		//初始化mui的上拉加载
        initMui: function() {
			var that = this;
			
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {

                            //执行ajax请求
                            that.getList(this);
                        }
                    }
                }
            });

            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {

                //隐藏当前的加载中loading
                if (!$('.list').hasClass('hasPullUp')) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.getElements.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                setTimeout(function() {
                    that.getElements.listLoading.hide();
                }, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },

		drawAction:function( deg ) {
			var that = this;
			var bg = document.getElementById('xxb');
			var ctx = bg.getContext('2d');

			//线头变圆
			ctx.lineCap="round";

			//红色
			ctx.beginPath();
			ctx.lineWidth= 8;
			ctx.strokeStyle='#FFF3D1';
			var grd = ctx.createLinearGradient(0,0,100,0);//从左到右
			grd.addColorStop(0,"#E5942F"); //起始颜色
			grd.addColorStop(1,"#FFF3D1"); //终点颜色
			ctx.fillStyle=grd;
			ctx.arc(that.wrapNum.wr, that.wrapNum.hr + 20, that.wrapNum.r, 0.85*Math.PI,2.15*Math.PI,false);
			ctx.stroke();

			if( deg != 0){
				//黑色
				ctx.beginPath();
				ctx.lineWidth= 8;
				ctx.strokeStyle='#E5942F';
				var grd = ctx.createLinearGradient(0,0,100,0);//从左到右
				grd.addColorStop(0,"#E5942F"); //起始颜色
				grd.addColorStop(1,"#FFF3D1"); //终点颜色
				ctx.fillStyle=grd;
				ctx.arc(that.wrapNum.wr, that.wrapNum.hr + 20, that.wrapNum.r, 0.85*Math.PI, Number(deg)*Math.PI,false);
				ctx.stroke();
			}
			
		},

		//画转圈的直线
		drawLine: function(){
			var that = this;

			var bg = document.getElementById('line');
			var ctx = bg.getContext('2d');
			ctx.lineWidth = 7;
			var radius = bg.width / 2;

			ctx.translate(that.wrapNum.wr, that.wrapNum.hr + 20); // 改变旋转中心
			ctx.beginPath();
			// ctx.arc(0, 0, radius * 2 / 3, 0, Math.PI / 30);
			ctx.strokeStyle = '#E5942F';
			ctx.stroke();

			ctx.closePath();

			for (var i = 0; i < 60; i++) {
			    ctx.beginPath();
			    ctx.rotate(8 * Math.PI / 180);
			    ctx.arc(0, 0, that.wrapNum.r - 14, 0, Math.PI / 100);
			    ctx.strokeStyle = (i < 18 || i > 47) ? 'transparent' : '#E5942F';
			    ctx.stroke();
			    ctx.closePath();
			}
		},



		events:function(){
			var that=this;
			
			//点击成长值规则
			mui("body").on('tap', '.regSpan' , function() {
			    window.location.href = '/personal/views/growth/growthReg.html';
			})

		}
	};
	growthValue.webinit();
})


