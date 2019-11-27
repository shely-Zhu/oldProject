/**
* 自选公募-超宝详情
* @author wangjiajia 2019-11-20
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

//引入 ECharts 主模块
//var echarts = require('echarts/lib/echarts');

$(function() {

    var privateDetail = {
        gL: {
			shuju:[],
			time:[]
        },
        init:function(){
            var that = this;
            //事件绑定
            that.event();	
			that.getData()
			that.getTimeReq()
			that.ruleReq()
        },
        drawLine:function(){
            var that = this;
            // 基于准备好的dom，初始化echarts实例
            // console.log($('#qrnhLine'))
            var myChart = echarts.init($("#qrnhLine")[0]);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    // text: 'ECharts 入门示例'
                },
                tooltip: {
			    	trigger: 'axis',
			    	formatter: '<p style="font-size:0.36rem;color: #364D97;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
			    	backgroundColor: 'rgba(218,181,124, 0.1)',
			    	// renderMode : 'richText', 
			    	extraCssText: [7, 15, 15, 15],
			    	textStyle: {
			    		color:  '#5B83FF'
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
		    				        offset: 0, color: '#fff' // 0% 处的颜色
		    				    }, {
		    				        offset: 0.5, color: '#081F6B' // 0% 处的颜色
		    				    },{
		    				        offset: 1, color: '#5B83FF' // 0% 处的颜色
		    				    }],
		    				    global: false // 缺省为 false
			    			}
			    		}
			    	}
			    },
                grid:{
			    	top: '10%',
			    	left: '5%',
			    	right: '5%',
			    	bottom: '10%',
			    	containLabel: true
                },
                xAxis: {
			    	type: 'category',
			        data: that.gL.time,
			        axisLine: {
			        	lineStyle: {
			        		color: '#e5e5e5'
			        	}
			        },
			        axisLabel: {
                        show: true,
                        color: '#9B9B9B',   //这里用参数代替了
						margin: 20,
                    },
			        axisTick: {
			        	show: false
			        }
			    },
			    yAxis: {
			    	axisTick:{
			    		show: false
			    	},
			    	axisLine: {
			    		show: false
			    	},
			    	splitLine:{
			    		lineStyle: {
			    			color: '#e5e5e5'
			    		}
			    	},
			    	axisLabel:{
			    		show: true,
			    		color:  '#9B9B9B',
			    		formatter: '{value}%',
			    	},
			    },
                series: [{
			    	type: 'line',
			    	lineStyle: {
			    		color: '#677EC4'
			    	},
			    	itemStyle: {
			    		show: false
			    	},
			    	symbol: 'none',
			    	areaStyle: {
			    		normal: {
			    			color: {
			    			    type: 'linear',
			    			    x: 0,
			    			    y: 0,
			    			    x2: 0,
			    			    y2: 1,
			    			    colorStops: [{
			    			        offset: 0, color: '#5B83FF' // 0% 处的颜色
			    			    }, {
			    			        offset: 1, color: '#fff' // 100% 处的颜色
			    			    }],
			    			    global: false // 缺省为 false
			    			}
			    		}
			    	},
			        data:that.gL.shuju
			    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },

        //获取初始数据
		getData: function(){
			var that = this;
			//产品详情接口
			var obj = [{
			    url: site_url.getTotalAssetsCash_api, 
			    data: {
			    	
			    },
			    needLogin: true,
			    callbackDone: function(json) {
					var jsonData = json.data;
			    	$(".totalM").text(jsonData.	totalMoneyMask)
			    	$(".incomeMask").text(jsonData.incomeMask)
			    	$(".addupIncomeMask").text(jsonData.addupIncomeMask)
			    },
			}];
			$.ajaxLoading(obj);			
		},
	
		getTimeReq:function(t){
			var that = this;
	        var obj = [{
			    url: site_url.fundNetWorthTrendChart_api, 
			    data: {
					fundCode:"000847",
					dataRange:t||1,
			    },
			    needLogin: true,
			    callbackDone: function(json) {
					var jsonData = json.data.pageList;
					that.gL.time = [];
					that.gL.shuju= [];
					for(var i =0;i<jsonData.length;i++){
						that.gL.time.push(jsonData[i].trdDt)
						that.gL.shuju.push(jsonData[i]. annYldRat)
					}
					that.drawLine()
				},
			}];
			$.ajaxLoading(obj);	
		},
		ruleReq:function(){
			var that = this;
	        var obj = [{
			    url: site_url.findProtocolBasic_api, 
			    data: {
					code:"",
					template:"0",
			    },
			    needLogin: true,
			    callbackDone: function(json) {
					var data = json.data;
					generateTemplate(data,$(".rulestestWrap"), $('#adjustment-template'));
				},
			}];
			$.ajaxLoading(obj);	
		},
        event:function(){
			var that = this;
            //选项卡切换
            $(document).on('click', '.lineDraw .time', function(e) {
                $('.lineDraw .time').removeClass('active');
				$(this).addClass('active');
				that.getTimeReq($(this).attr('num'))
			})
			$(document).on('click', '.materialContent', function(e) {
				console.log($(this).attr('data-id'))
			

            })
        }

    } 
    privateDetail.init()
})