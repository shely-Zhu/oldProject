/**
* 月度报告列表页
* @author zhangyanping 2019-11-01
*/


require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
// require('@pathCommonCom/pullRefresh/pullRefresh.js');


$(function() {

	var somePage = {
		$e: {
			adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
			recordList: $('.recordList'), // 调仓记录
			adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
			noData: $('.noData'), //没有数据的结构
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		},
		gV: { // 全局变量
			groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
			pageCurrent: 1, //当前页码，默认为1
			pageSize: 10,
			listLength: 0,
		},
		init: function() {
			var that = this;
			that.getUserInfo();
			that.events();
		},
		getUserInfo:function(){
			var that = this;
			var Obj=[{ // 是否新手账号
				url: site_url.queryUserBaseInfo_api,
				data: {},
				needLogin: true, //判断登录是否过期
				callbackDone: function(json) { //成功后执行的函数
					var jsonData = json.data;

					//判断已成交客户
					if( jsonData.newComer == '0'){
						//已成交客户
						that.queryMonthlyReport();
					}
					else{
						$('.noneList').show();
					}
				},
				callbackFail: function(json) { //失败后执行的函数
					return false;
				}
			}];
			$.ajaxLoading(Obj);

		},
		
		// 月度报告列表页数据的获取
		queryMonthlyReport:function(){
			var that = this;
			var Obj=[{ // 是否新手账号
				url: site_url.queryMonthlyReport_api,
				data: {},
				needDataEmpty: true,
				needLogin: true, //判断登录是否过期
				callbackDone: function(json) { //成功后执行的函数
					var jsonData = json.data;
					if(jsonData.length == 0){
						$(".list").css("display", "none")
						that.$e.noData.show();
						$('body').css('background','#ffffff');
					}
					else{
                        var template = Handlebars.compile($("#adjustment-template").html());
						//匹配json内容
						var html = template(jsonData);
						//输入模板
						$('.list').html(html);

                        // 第一个调仓记录默认展开
                        $('.list').find('ul').eq(0).find('.latestAdjustment').css("display", "block");
					}
					
				},
				callbackNoData: function( json ){  
                    if(that.gV.pageCurrent == 1) {
                        $(".list").css("display", "none")
                    }
                },
                callbackFail: function(json) {
                	tipAction(json.message);
                },
			}];
			$.ajaxLoading(Obj);
		},


		events: function() {
			var that = this;

			mui("body").on('mdClick', '.monthlyReport', function() {
				var $this = $(this);
				window.location.href = site_url.monthReportDetail_url + '?reportId=' + $this.attr('reportId');
				
			},{
			'htmdEvt': 'monthReportList_01'
			})

			mui("body").on('mdClick', '.productBtn', function() {
				var $this = $(this);
				window.location.href = site_url.wealthIndex_url;
			},{
				'htmdEvt': 'monthReportList_02'
			})

			mui("body").on('mdClick', '.spread', function() {
				var $this = $(this);
				if($this.parent().find('.latestAdjustment').css('display') == 'none'){
					$this.parent().find('.latestAdjustment').show();
					$this.html('<span class="iconfont">&#xe62a;</span>')

				}else{
					$this.parent().find('.latestAdjustment').hide();
					$this.html('<span class="iconfont">&#xe609;</span>')
				}


				
			},{
				'htmdEvt': 'monthReportList_03'
			})

		}
	};
	somePage.init();
});