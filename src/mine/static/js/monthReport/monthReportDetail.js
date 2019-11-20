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

require('@pathCommonJsCom/tabScroll.js');

//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


var monthReportDetail = {
	getElements: {
		noData: $('.noData'), //没有数据的结构
		listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
		reportId:splitUrl['reportId'],   //活动的id
	},
	setting: {  //一些设置
		navList: [  //导航
			{type: '月末持仓总览',num: '0'}, //
			{type: '本月交易明细',num: '1'},
		],
		current_index: 0,  //左右滑动区域的索引
		list_template: '',  //列表的模板，生成后存放在这里
		ajaxArr: [site_url.queryInvestProdHoldShareList_api, site_url.queryInvestTradeDetail_api],  //存放每一个ajax请求的传参数据
	},
	html: '',  //存放生成的html
	init: function(){  //初始化函数
		var that = this;
		
		//拼模板，初始化左右滑动mui组件
		that.beforeFunc();

		//初始化第一屏区域的上拉加载
		that.getData($('#scroll1'));

		//事件监听
		that.events();
	},

	beforeFunc: function(){  //拼模板，初始化左右滑动mui组件
		var that = this,
			contentArr = [];  //传给tabScroll组件的contentList参数的数组

		// list内容模板
		var source = $('#second-template').html(),
			template = Handlebars.compile(source),
			list_html = template();

		//将生成的模板内容存到that.list_template上
		that.setting.list_template = template;

		// 外容器优先加载
		var wrap_source = $('#transaction-template').html(),
			wrap_template = Handlebars.compile(wrap_source),
			wrap_html = wrap_template({content: list_html});
			
		$.each( that.setting.navList, function(i, el){

			contentArr.push({
				id: i,
				content: wrap_html
			})
		})

		var obj = {
			wrapper: $('.reportContainer'), //存放整个组件的区域
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
				if (t.hasClass('hasPullUp')) {
					//有这个class，表示已经初始化，不再执行下一步
					return false;
				}
				//没有初始化，请求第一次数据
				that.commonAjax(t);
			}
		}
		$.tabScroll(obj);

		//设置切换区域的高度
		//计算节点高度并设置
		// var height = windowHeight - document.getElementById('scroll1').getBoundingClientRect().top;
		// if (!$('.list').hasClass('setHeight')) {
		// 	$('.list').height(height).addClass('setHeight');
		// }
	},
	getData: function($id, t) {

		var that = this;

		var obj = [{
			url: site_url.queryInvestProdHoldShareList_api,   // 持仓总览
			data: {
				reportId: that.getElements.reportId
			},
			needLogin: true,
			needDataEmpty: true,
			contentTypeSearch: true,
			async: false,
			callbackDone: function(json) {
				var jsonData = json.data;

				var pefSaleList = jsonData.pefSaleList;

				if(!$.util.objIsEmpty(pefSaleList)){
					jsonData.flag1 = true;
					jsonData.flag2 = false;
					jsonData.flag3 = false;

					that.setting.html = that.setting.list_template(jsonData);

					$id.find('.contentWrapper .mui-table-view-cell').html(that.setting.html);
				}
				if(!$.util.objIsEmpty(jsonData.pofList)){
					jsonData.flag2 = true;
					jsonData.flag1 = false;
					jsonData.flag3 = false;
					that.setting.html = that.setting.list_template(jsonData);

					$id.find('.contentWrapper .mui-table-view-cell').append(that.setting.html);
				}
				if(!$.util.objIsEmpty(jsonData.generalModelList)){
					jsonData.generalModelList.flag3 = true;
					jsonData.flag1 = false;
					jsonData.flag2 = false;
					that.setting.html = that.setting.list_template(jsonData.generalModelList);

					$id.find('.contentWrapper .mui-table-view-cell').append(that.setting.html);
				}

                that.getElements.listLoading.hide();
                $id.addClass('hasPullUp');

			},
			callbackFail: function(json) {
				//请求失败，
				//隐藏loading
				//that.getElements.listLoading.hide();
				//显示错误提示
				tipAction(json.message);

				//隐藏loading，调试接口时需要去掉
				setTimeout(function() {
					that.getElements.listLoading.hide();
				}, 100);
				//return false;
			},
			callbackNoData: function(json) {
				//没有数据
				$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
				$id.find('.noData').show();

				setTimeout(function() {
					that.getElements.listLoading.hide();
				}, 100);
			}

		}]
		$.ajaxLoading(obj);
	},
	commonAjax: function( $id, t ){  // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
		var that = this;
		//获取产品列表
		var obj = [{
			url: that.setting.ajaxArr[that.setting.current_index],
			data:{
				reportId: that.getElements.reportId
			} ,
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
					
					var list_html = that.setting.list_template(jsonData);

					//设置这两参数，在initMui()中使用
					//判断是否显示没有更多了等逻辑，以及插入新数据
					that.listLength = comRradeRecordList.length;
					that.html = list_html;

				}else{
					//没有数据
					that.listLength = 0;
					that.html = '';
				}

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

	}
}

monthReportDetail.init();



