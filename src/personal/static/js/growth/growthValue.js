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

	var growthValue={

		page : 1,
        flag:false,//分页数据加载完毕参数
		//元素获取
		getElements: {
			pullUp : $("#pullUp"),//上拉加载按钮
			emptyBox : $('#emptyBox'),
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

		}, 

		webinit:function(){  
			var that = this;

			var height = windowHeight -$('.boxWrap').height() - $('.title').height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }

			//请求成长值数据
			that.getData();

			//
			//that.drawAction();

			that.initMui();
			that.events();
		},

		getData: function(t){
			var that = this;

			
			var obj = [{ //成长值查询
			    url: site_url.queryGrowthValue_api,
			    data: {},
			    needLogin:true, //需要判断是否登陆
			    needDataEmpty: false, //不需要判断data是否为空
			    async: false,
			    callbackDone: function(json){  //成功后执行的函数

			    	var num = json.data;

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
						        		//展示成长值并画图
						        		CircleProcess(
						        			document.getElementById("canvas"),{
						        			"size": "half",
						        		    "percent": 40,
						        		    "process": 0, 
						        		    "startSmallCircle":{"show": false},
						        		    "endSmallCircle":{"show": false},
						        		    "processText": {"show": true, }
						        		});
						        	}
						        })
			                    
					    	}
					    }
					}]
					$.ajaxLoading(n_obj);
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
					needDataEmpty: false, //不需要判断data是否为空
					callbackDone: function(json){  //成功后执行的函数
	
						that.jsonData = json.data;

                    if (!$.util.objIsEmpty(that.jsonData.pageList)) {
                        //有数据，拼模板

                        var source = $('#template-pot').html(),
                            template = Handlebars.compile(source);
                        that.html = template(that.jsonData.pageList);

                        setTimeout(function() {
                            if (that.jsonData.pageList.length < 20) {
                                //当数据少于that.setting.ajaxParams.pageSize时	
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
                        }, 2000)

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

		drawAction:function() {
			var that = this;
			var timeTicket;

			// var name = '单位净值';

			// 基于准备好的dom，初始化echarts实例 
			var myChart = echarts.init($('.lineWrapper')[0]);

			var option = {

				tooltip : {
					formatter: "{a} <br/>{b} : {c}%"
				},
				 toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				series : [
					{
						name:'成长值',
						type:'gauge',
						splitNumber: 10,       // 分割段数，默认为5
						radius:'75%',          //仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
						min:'0',
						max:'800',
						axisLine: {            // 坐标轴线
							lineStyle: {       // 属性lineStyle控制线条样式
								color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
								width: 8
							}
						},
						axisTick: {            // 坐标轴小标记
							splitNumber: 10,   // 每份split细分多少段
							length :12,        // 属性length控制线长
							lineStyle: {       // 属性lineStyle控制线条样式
								color: 'auto'
							}
						},
						axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
							textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								color: 'auto'
							},
						},
						splitLine: {           // 分隔线
							show: true,        // 默认显示，属性show控制显示与否
							length :30,         // 属性length控制线长
							lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							}
						},
						pointer : {
							width : 5
						},
						title : {
							show : true,
							offsetCenter: [0, '-40%'],       // x, y，单位px
							textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder'
							}
						},
						detail : {
							formatter:'{value}%',
							textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								color: 'auto',
								fontWeight: 'bolder'
							}
						},
						emphasis: {
							borderWidth: 5,
						},
						data:[{value:20, name: '完成率'}]
					}
				]
			};
			clearInterval(timeTicket);

			timeTicket = setInterval(function (){
			    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
			    myChart.setOption(option,true);
			},2000)
				                 
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


