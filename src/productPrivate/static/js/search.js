/**
 * 私募产品列表查询
 * @author  zhangweipeng 2017-03-08
 */

require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js'); 
require('../../../include/js/vendor/zepto/deferred.js'); 
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/goTopMui.js');

var search={
	page:1,    //当前页
	key:null,  //输入的查询关键字
	getElements : {
		noData: $('.noData'), //没有数据的结构
 		listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
		closeBtn: $('.branchSearchArea .close'), //查询区域关闭按钮
	},


	init:function(){
		var that = this;

		that.beforeFunc();
		that.events();
	},


	beforeFunc: function(){
		var that = this;

		//设置切换区域的高度
        //计算节点高度并设置
        //if( !that.height ){
        var height =  windowHeight  - $('.branchHeader').height();        
        if( !$('.list .contentWrapper').hasClass('setHeight') ){
        	$('.list .contentWrapper').height( height ).addClass('setHeight');
        }
	},


	getData: function(key,t){
		var that = this;

		//重设ajaxFail
		that.ajaxFail = false;

		var obj = [{
			url: site_url.prvFundQuery_api,//私募产品列表
			data:{
			    hmac:"", //预留的加密信息
			    params:{//请求的参数信息
		          	pageNo: that.page,// 当前页
		          	pageSize: 10,//每页记录数
		          	fundName: key,//产品名称	
			    }
			},
			needDataEmpty: false,
			needLogin:true,
			callbackDone: function(json){
				
				that.jsonData = json.data;

				if( !$.util.objIsEmpty( that.jsonData.pageList) ){
					//有数据，拼模板
					
					$.each(that.jsonData.pageList,function(i,el){

						if(el.bonusTypeOri == "2"){
							el.solid = true; //类固收

						}else if(el.bonusTypeOri=="3"){
							el.solid = false; //浮收
						}
						if(el.netValueDate){
							el.netValueDate=el.netValueDate.substr(el.netValueDate.indexOf("-")+1);
						}
						if(Number(el.expectedProfitMax) <= Number(el.expectedProfitMin)){
							el.expectedProfitMax = 0;
						}
					})
					var tplm = $("#productList-template").html(),
						template = Handlebars.compile(tplm);

		            	that.html = template( that.jsonData.pageList );

		            	setTimeout(function(){	

							if( that.jsonData.pageList.length <  10 ){
			        			t.endPullupToRefresh(true);	

			        		}else{
			        			t.endPullupToRefresh(false);		        			
			        		}

			        		that.page++;	

			        		if( $('.list').hasClass('refresh') ){
			        			//当前为重新搜索，模板结构需要html进去
			        			$('.branchBody').find('.contentWrapper .mui-table-view-cell').html(that.html);	
			        			
			        			//去掉list的refresh class
			        			$('.list').removeClass('refresh');

	        					//隐藏回到顶部按钮
	        					$('.goTopBtn').hide();

	        				}else{
			        			//非重新搜索，即上拉发起的请求，结果append进去
			        			$('.branchBody').find('.contentWrapper .mui-table-view-cell').append(that.html);	
 
	        				}

			        		//$('.branchBody').find('.contentWrapper .mui-table-view-cell').html(that.html);	
			        		$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');							
			        	
			        	}, 200)

				}else{
					//没有数据
					
					if( that.page == 1){
        				//第一页时
    					$('.branchBody .mui-table-view-cell').html(that.getElements.noData);
			        	$('.branchBody').find('.noData').show();
						//t.disablePullupToRefresh();
						//此处不能使用disablePullupToRefresh，会导致上拉失去作用
						t.endPullupToRefresh(true);
						
						//隐藏回到顶部按钮
	        			$('.goTopBtn').hide();

					}else{
        				//其他页
        				t.endPullupToRefresh(true);
        				$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
        			}			   
				}

				//去掉loading
        		setTimeout(function(){
		      		that.getElements.listLoading.hide();
		      	}, 200);
			},
			callbackFail: function(json){
				tipAction(json.message);
			}
		}]  
		$.ajaxLoading(obj);
	},

	//初始化mui的上拉加载
	initMui: function(  ){
		var that = this;

		mui.init({
			pullRefresh: {
				container: '.contentWrapper',
				up: {
					//auto: false,
					contentrefresh: '拼命加载中',
					contentnomore:'没有更多了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			        callback : function(){

			        	//执行ajax请求
			        	that.getData( that.key, this );		        	
			        }
				}
			}
		});
	},

	events:function(){
		var that=this;

		//监听手机键盘的前往按钮
		$(".branchSearchInput").on('keydown',function(event){

			if(event.keyCode==13){

				var key = $.util.regList.removeAllSpace($(".branchSearchInput").val());
				that.key = key;

				if( that.key ){

					that.getElements.listLoading.show();
					
					if( !$('.list').hasClass('hasPullUp') ){
						//未初始化过

						that.initMui();

						//初始化后，隐藏上拉文字
						$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

						//请求第一次数据
						mui('.contentWrapper').pullRefresh().pullupLoading();

						$('.list').addClass('hasPullUp');
						
					}else{
						//已初始化，
						//refresh表示当前为搜索新数据，该class会在数据插入页面后去掉
						$('.list').addClass('refresh'); 

						//清空当前页面
						$('.branchBody .mui-table-view-cell').html('');

						//清空页面后重置上拉加载，使回到顶部
						mui('.contentWrapper').pullRefresh().refresh(true);

						//隐藏上拉文字
						$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

						//重设当前页码为1
						that.page = 1;

						//上拉，发送ajax请求
						mui('.contentWrapper').pullRefresh().pullupLoading();
					}
					

				}else{
					tipAction("搜索内容不能为空");
				}

				$(".branchSearchInput").blur();
			}		
		});

		//取消按钮
		that.getElements.closeBtn.on("click",function(){
			//window.location.href='/productPrivate/views/prdPrvLists.html';
			var key = $.util.regList.removeAllSpace($(".branchSearchInput").val());
			that.key = key;

			if( that.key ){

				that.getElements.listLoading.show();
				
				if( !$('.list').hasClass('hasPullUp') ){
					//未初始化过

					that.initMui();

					//初始化后，隐藏上拉文字
					$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

					//请求第一次数据
					mui('.contentWrapper').pullRefresh().pullupLoading();

					$('.list').addClass('hasPullUp');
					
				}else{
					//已初始化，
					//refresh表示当前为搜索新数据，该class会在数据插入页面后去掉
					$('.list').addClass('refresh'); 

					//清空当前页面
					$('.branchBody .mui-table-view-cell').html('');

					//清空页面后重置上拉加载，使回到顶部
					mui('.contentWrapper').pullRefresh().refresh(true);

					//隐藏上拉文字
					$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

					//重设当前页码为1
					that.page = 1;

					//上拉，发送ajax请求
					mui('.contentWrapper').pullRefresh().pullupLoading();
				}
				

			}else{
				tipAction("搜索内容不能为空");
			}

			$(".branchSearchInput").blur();
		});
		
		mui(".contentWrapper").on("tap",".mui-card",function(){
			window.location.href=$(this).attr("href");
		})
	}
}
search.init();
