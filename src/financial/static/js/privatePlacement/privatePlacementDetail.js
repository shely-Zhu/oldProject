//  私募基金产品详情
//  @author zhangyanping 2019-11-25

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/headBarConfig.js');

//黑色提示条的显示和隐藏
// var tipAction = require('@pathCommonJsCom/tipAction.js');

// var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
    var  privatePlacementDetail = {
        //获取页面元素
        $e:{
            
        },
        //页面初始化函数
        init:function(){
            var that=this;
            that.events()
        },
        //请求七日年化/万份收益数据
		getTypeOneData: function( num ){
			var that = this;
			num = num ? num : 0;
			var newData = {
				sevenIncomeRate: [], //存放折线图七日年化
				profitThoudDate: [], //存放折线图收益日期
				profitThoudValue: [] //存放折线图万份收益
			}
			// //判断当前画的是七日年化还是万份收益
			// if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
			// 	//七日年化
			// 	var type = 'qrnh';
			// }
			// else{
			// 	var type = 'wfsy';
			// }
			//判断是否已经有数据了，有的话不再请求接口
			if( num == 0 && that.data['qrnhWfsy'].oneMonth.profitThoudDate && that.data['qrnhWfsy'].oneMonth.profitThoudDate.length){
	       		//请求的是近一个月的数据
	       		that.drawLine( type, that.data['qrnhWfsy'].oneMonth );
	       		return false;
	       	}
	       	else if( num == 1 && that.data['qrnhWfsy'].threeMonth.profitThoudDate && that.data['qrnhWfsy'].threeMonth.profitThoudDate.length){
	       		//近三个月
	       		that.drawLine( type, that.data['qrnhWfsy'].threeMonth );
	       		return false;
	       	}
	       	else if( num == 3 && that.data['qrnhWfsy'].oneYear.profitThoudDate && that.data['qrnhWfsy'].oneYear.profitThoudDate.length ){
	       		//近一年
	       		that.drawLine( type, that.data['qrnhWfsy'].oneYear );
	       		return false;
	       	}
	       	else if( num == 4 && that.data['qrnhWfsy'].sinceNow.profitThoudDate && that.data['qrnhWfsy'].sinceNow.profitThoudDate.length){
	       		//成立至今
	       		that.drawLine( type, that.data['qrnhWfsy'].sinceNow );
	       		return false;
	       	}
			//没有数据，请求接口
			var obj = [{
			    url: site_url.queryFundDetailV2_api, 
			    data: {
			    	projectId: '1312',
			    },
			    contentTypeSearch: true,
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;

			    	//拼数据
			       	$.each( jsonData, function(i, el){
			       		newData.sevenIncomeRate.push( el.sevenIncomeRate);
			       		newData.profitThoudDate.push( el.profitThoudDate);
			       		newData.profitThoudValue.push( el.profitThoudValue);
			       	})
			       	if( num == 0){
			       		//请求的是近一个月的数据
			       		that.data['qrnhWfsy'].oneMonth = newData ;
			       	}
			       	else if( num == 1){
			       		//近三个月
			       		that.data['qrnhWfsy'].threeMonth = newData ;
			       	}
			       	else if( num == 3){
			       		//近一年
			       		that.data['qrnhWfsy'].oneYear = newData ;
			       	}
			       	else if( num == 4){
			       		//成立至今
			       		that.data['qrnhWfsy'].sinceNow = newData ;
			       	}
			       	that.drawLine( type, newData);			       	
			    },
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( type, data) {
			var that = this;
			console.log($('#qrnhLine')[0])
			if( type == 'qrnh'){
				//画的是七日年化折线图
				var chartId = $('#qrnhLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.sevenIncomeRate;
			}
			else if( type == 'wfsy'){
				//画的是万份收益折线图
				var chartId = $('#wfsyLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.profitThoudValue;
			}
			var myChart = echarts.init( chartId );
			myChart.setOption({
			    tooltip: {
			    	trigger: 'axis',
			    	formatter: '<p style="font-size:0.36rem;color: #DAB57C;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
			    	backgroundColor: 'rgba(218,181,124, 0.1)',
			    	// renderMode : 'richText', 
			    	extraCssText: [7, 15, 15, 15],
			    	textStyle: {
			    		color:  '#FADFBB'
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
		    				        offset: 0.5, color: '#F1CDA8' // 0% 处的颜色
		    				    },{
		    				        offset: 1, color: '#D2B280' // 0% 处的颜色
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
			        data: xAxisData,
			        axisLine: {
			        	lineStyle: {
			        		color: '#FADFBB'
			        	}
			        },
			        axisLabel: {
                        show: true,
                        color: '#9B9B9B',   //这里用参数代替了
                        margin: 20
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
			    			color: '#FADFBB'
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
			    		color: '#FADFBB'
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
			    			        offset: 0, color: '#F2E3CA' // 0% 处的颜色
			    			    }, {
			    			        offset: 1, color: '#fff' // 100% 处的颜色
			    			    }],
			    			    global: false // 缺省为 false
			    			}
			    		}
			    	},
			        data: seriesData
			    }]
			});

		},
        events: function(){
            var that = this;
            //tab点击切换
            mui("body").on('tap', '.tabs>li' , function(){
                $(this).addClass('active').siblings().removeClass('active');
                $(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
            })
        }
    };
    privatePlacementDetail.init();
});
