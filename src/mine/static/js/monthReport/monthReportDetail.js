/**
* 月度报告详情页我
* @author zhangyanping 2019-11-19
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/headBarConfig.js');

//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

//echarts图表
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');;
require('zrender/lib/vml/vml')


var monthReportDetail = {
	getElements: {
		noData: $('.noData'), //没有数据的结构
		listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
	},
	setting: {  //一些设置
		navList: [  //导航
			{type: '月末持仓总览',num: '0'}, //
			{type: '本月交易明细',num: '1'},
		],
		current_index: 0,  //左右滑动区域的索引
		list_template: '',  //列表的模板，生成后存放在这里
		ajaxArr: [],  //存放每一个ajax请求的传参数据
	},	 
	html: '',  //存放生成的html
	init: function(){  //初始化函数
		var that = this;
		
		//拼模板，初始化左右滑动mui组件
		// that.beforeFunc();

		//初始化第一屏区域的上拉加载
		// that.initMui( $('#scroll1') );

		//事件监听
		// that.events();
		that.bingtu();
	},

	beforeFunc: function(){  //拼模板，初始化左右滑动mui组件
		var that = this,
			contentArr = [];  //传给tabScroll组件的contentList参数的数组

		// list内容模板
		var source = $('#transaction-list-template').html(),
		 	template = Handlebars.compile(source),
		 	list_html = template();

	 	//将生成的模板内容存到that.list_template上
	 	that.setting.list_template = template;

		// 外容器优先加载
		var wrap_source = $('#transaction-template').html(),
		 	wrap_template = Handlebars.compile(wrap_source),
		 	wrap_html = wrap_template({content: list_html});
			
		$.each( that.setting.navList, function(i, el){
			that.setting.ajaxArr[el.num] = {
				pageNum: that.setting.ajaxParams.pageNo,  //当前第几页(默认为1) 非必填项, 默认设置成第一页
	            pageSize: that.setting.ajaxParams.pageSize,  //每页显示几条数据(默认10) 非必填项， 默认设置成20
			}

			if ( el.num == 0 ){
				that.setting.ajaxArr[el.num].tradeType = 1;  //买入
			} else if ( el.num == 1 ){
				that.setting.ajaxArr[el.num].tradeType = 2;  //赎回
			}
			else if ( el.num == 2 ){
				that.setting.ajaxArr[el.num].tradeType = 3;  //赎回
			}

			contentArr.push({
				id: i,
				content: wrap_html
			})
		})

        var obj = {
        	wrapper: $('.tradeList'), //存放整个组件的区域
        	needNavAction: false,
        	//needBlock: true,
        	navList: that.setting.navList, //导航
        	contentLength: that.setting.navList.length,  //左右滑动的区域个数，即导航数组长度
        	contentList: contentArr, //此时只有框架，实际列表内容还未请求
        	callback: function(t){  //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点

    			//data-scroll属性即当前左右切换区域的索引
        		var index = t.attr('data-scroll');

        		//data-scroll属性即当前左右切换区域的索引
        		that.setting.current_index = index;

        		//判断当前区域是否已经初始化出来上拉加载
        		if( t.hasClass('hasPullUp') ){
        			//有这个class，表示已经初始化，不再执行下一步
        			return false;
        		}

        		//没有hasPullUp class，表示没有初始化，调用initMui，进行初始化
        		//并请求第一次数据
        		that.initMui(t);
        	}
        }
        $.tabScroll(obj);

        //此时所有切换区域的内容都是空的
		//设置切换区域的高度
        //计算节点高度并设置
        if( !that.height ){

        	var height = windowHeight - document.getElementById('scroll1').getBoundingClientRect().top;
        	that.height = height - $('.tableHeader').height() - $('.bottomNav').height();
        }
        if( !$('.list').hasClass('setHeight') ){
        	$('.list').height( that.height ).addClass('setHeight');
        }


        // mui("body").on('tap', '#pullUp', function(){
        // 	//返回顶部
        // 	$('.mui-control-content.mui-active').find('.mui-table-view').css('transform', 'translate3d(0px, 0px, 0px) translateZ(0px)')

        // })
	},

	commonAjax: function( $id, t ){  // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
		var that = this;

		//获取产品列表
		var obj = [{
			url: site_url.recordList_api,
			data: that.setting.ajaxArr[that.setting.current_index] ,
			needLogin: true,
			needDataEmpty: true, 
			async: false, 
			callbackDone: function(json){
				var jsonData = json.data;

				var comRradeRecordList = jsonData.pageList;
				var data = {};

				if( !$.util.objIsEmpty(comRradeRecordList) ){
					
					jsonData.isIn = that.setting.current_index == 0 ? 1 : 0;
					jsonData.isOut = that.setting.current_index == 1 ? 1 : 0;
					jsonData.adjustment = that.setting.current_index == 2 ? 1 : 0;
					
					var list_html = that.setting.list_template(jsonData);

					//设置这两参数，在initMui()中使用
					//判断是否显示没有更多了等逻辑，以及插入新数据
					that.listLength = comRradeRecordList.length;
					that.html = list_html;

					//重设当前页码
					// var pageItems = jsonData.pageItems;
					if( !$.util.objIsEmpty(comRradeRecordList) ){
						//设置每个ajax传参数据中的当前页码
						that.setting.ajaxArr[that.setting.current_index].pageNum++;
					}
				}else{
					//没有数据
					that.listLength = 0;
					that.html = '';
				}

				//有数据
	        	setTimeout(function(){

	        		if( that.listLength <  that.setting.ajaxParams.pageSize ){

	        			if( that.setting.ajaxArr[that.setting.current_index].pageNum == 1){
	        				//第一页时
	        				if( that.listLength == 0 ){
	        					//没有数据
	        					$id.find('.list .mui-table-view-cell').html(that.getElements.noData.clone(false)).addClass('noCon');	
	        					$id.find('.noData').show();
    							//隐藏loading，调试接口时需要去掉
    					      	setTimeout(function(){
    					      		that.getElements.listLoading.hide();
    					      	}, 100);
    					      	t.endPullupToRefresh(true);

	        					return  false;
	        				}else{
	        					//有数据，没有更多了
	        					t.endPullupToRefresh(true);
	        				}
	        			}else{
	        				//其他页，没有更多了
	        				t.endPullupToRefresh(true);
	        			}
	        		}else{
	        			t.endPullupToRefresh(false);
	        		}

	        		$id.find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');

	        		if( that.setting.ajaxArr[that.setting.current_index].pageNum == 1 ){
	        			//第一屏
	        			$id.find('.contentWrapper .mui-table-view-cell').html(that.html);
	        		}else{
	        			$id.find('.contentWrapper .mui-table-view-cell').append(that.html);
	        		}

					//隐藏loading
			      	setTimeout(function(){
			      		that.getElements.listLoading.hide();
			      	}, 100);
	        		
	        	}, 200)
			},
			callbackFail: function(json){
				//请求失败，
				//隐藏loading
				//that.getElements.listLoading.hide();
				//显示错误提示
				tipAction( json.message );

				t.endPullupToRefresh(false);	
				$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

				//隐藏loading，调试接口时需要去掉
		      	setTimeout(function(){
		      		that.getElements.listLoading.hide();
		      	}, 100);
				//return false;
			},
			callbackNoData: function(json){
 
				//没有数据
				$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');	
				$id.find('.noData').show();

				setTimeout(function(){
		      		that.getElements.listLoading.hide();
		      	}, 100);
			}

		}]
		$.ajaxLoading(obj);
	},

	events: function(){  //绑定事件
		var that = this;

		//跳转到转入转出详情页
		mui("body").on('tap', '.goTradeDetail' , function(){

			if($(this).attr('tradeType') == 1){ //买入
				window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType');	
			} else if($(this).attr('tradeType') == 2){  //赎回
				window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType') + '&combinRedemRatio=' + $(this).attr('combinRedemRatio');
			} else if($(this).attr('tradeType') == 3) {
				window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType');
			}
		})

	},
	bingtu:function(){
        // app.title = '环形图';
        var pieChart = echarts.init($('.circle')[0]);
        // var pieChartOne = echarts.init($('.circleOne')[0]);
        // var colorArr=['#f4cf5c', '#7d7c7d','#bbb','#ec9b32','#f76a2c'];
        
        // 指定图表的配置项和数据
        option = {
            // tooltip: {
            //     // trigger: 'item',
            //     // formatter: "{a} <br/>{b}: {c} ({d}%)"
            // },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                icon: "roundRect",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

                itemWidth: 10,  // 设置宽度

				itemHeight: 10, // 设置高度
				itemGap: 5 //设置间距

            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['49%', '70%'],
                    // selectedMode: 'single',
                    avoidLabelOverlap: false,
                    hoverAnimation:false,
                    label: {
                        // normal: {
                        //     show: false,
                        //     position: 'center'
                        // },
                        // emphasis: {
                        //     show: true,
                        //     textStyle: {
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // }
                        normal: {
                            show:false, //去掉引导线
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        {offset: 0, color: '#182F7A'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#7286C1'}
                                    ]
                                )
                            }
                        }},
                        {value:310, name:'邮件营销',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        {offset: 0, color: '#FBE2BD'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#D69549'}
                                    ]
                                ),
                            }
                        }},
                        {value:234, name:'联盟广告',itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        {offset: 0, color: '#AA6545'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#EDA377'}
                                    ]
                                ),
                            }
                        }},

                    ]
                },
                {
                    name:'访问来源',
                    type:'pie',
                    hoverAnimation:false,
                    radius: ['40%', '50%'],
                    avoidLabelOverlap: false,
                    
                    label: {
                        // normal: {
                        //     show: false,
                        //     position: 'center'
                        // },
                        // emphasis: {
                        //     show: true,
                        //     textStyle: {
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // }
                        normal: {
                            show:false,
                            position: 'inner'
                        }

                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        {offset: 0, color: '#172c6f'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#4a5d96'}
                                    ]
                                )
                            }
                        }},
                        {value:310, name:'邮件营销',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        {offset: 0, color: '#dcc19b'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#c69152'},
                                    ]
                                ),
                            }
                        }},
                        {value:234, name:'联盟广告',itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        
                                        {offset: 0, color: '#a56747'},
                                        // {offset: 0.5, color: '#0CB9FF'},
                                        {offset: 1, color: '#cb8a64'}
                                    ]
                                ),
                            }
                        }},

                    ]
                }
            ]
        };
        // 绘制图表
        pieChart.setOption(option); 
    }
}

monthReportDetail.init();



