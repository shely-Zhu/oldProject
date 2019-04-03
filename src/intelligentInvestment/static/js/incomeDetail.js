/**
    * 恒小智收益明细
	* author:ping
	* time：2018-10-10
 */

 require('../../../include/js/vendor/config.js');

 //zepto模块
 require('../../../include/js/vendor/zepto/callback.js'); 
 require('../../../include/js/vendor/zepto/deferred.js'); 

 require('../../../common/js/components/utils.js');
 require('../../../common/js/ajaxLoading.js');

 require('../../../common/js/components/tabScroll.js');
 //黑色提示条的显示和隐藏
 var tipAction = require('../../../common/js/components/tipAction.js');

 require('../../../common/js/components/goTopMui.js');
 var splitUrl = require('../../../common/js/components/splitUrl.js');

 $(function(){ 

 	var hisValue = {

 		getElements: {
 			noData: $('.noData'), //没有数据的结构
 			listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
 		},

 		page: 1, //当前页码，默认为1


 		init: function(){
 			var that = this;

 			that.beforeFunc();
 			that.initMui();
 		},

 		beforeFunc: function(){
 			var that = this;

			//设置切换区域的高度
	        //计算节点高度并设置
	        //if( !that.height ){
	        var height =  windowHeight  - $('.nav').height();	     
	        if( !$('.list').hasClass('setHeight') ){
	        	$('.list').height(height).addClass('setHeight');
	        }
 		},
  
 		getData: function(t){
 			var that = this;

 			//重设ajaxFail
 			that.ajaxFail = false;

 			var obj = [{
 				url: site_url.incomeList_api,
 				data:{
				    hmac:"", //预留的加密信息
				    params:{//请求的参数信息
				        "pageCurrent":"1",//页码
				        "pageSize":"50"//每页记录数
				    }
				},
				needDataEmpty: true,
				callbackDone: function(json){
					
					that.jsonData = json.data;

					if( !$.util.objIsEmpty( that.jsonData.combinIncomeList) ){
						//有数据，拼模板

							var source = $('#productList-list-template').html(),
			            	template = Handlebars.compile(source);
			            	that.html = template( that.jsonData );
			            	
			            	setTimeout(function(){						
								if( that.jsonData.combinIncomeList.length <  20 ){
				        			//当数据少于that.setting.ajaxParams.pageSize时	
				        			t.endPullupToRefresh(true);	
				        		}else{
				        			t.endPullupToRefresh(false);
				        			//去掉mui-pull-bottom-pocket的mui-hidden
				        			//$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
				        		}
				        		that.page++;	
				        		$('.incomeDetail').find('.contentWrapper .mui-table-view-cell').append(that.html);	
				        		$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');								
				        	}, 2000)

					}else{
						//显示没有数据
						//没有数据
						if( that.page == 1){
	        				//第一页时
	    					$('.incomeDetail .mui-table-view-cell').html(that.getElements.noData).css("boxShadow","none");
				        	$('.incomeDetail').find('.noData').show();
	        			}else{
	        				//其他页
	        				t.endPullupToRefresh(true);
	        				$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
	        			}			        
					}
				},
				callbackFail: function(json){
					tipAction(json.msg);
				},
				callbackNoData: function(json){
					if( that.page == 1){
        				//第一页时
    					$('.incomeDetail .mui-table-view-cell').html(that.getElements.noData).css("boxShadow","none");
			        	$('.incomeDetail').find('.noData').show();
        			}else{
        				//其他页
        				t.endPullupToRefresh(true);
        				$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
        			}
				}
 			}]
 			$.ajaxLoading(obj);
 		},

 		//初始化mui的上拉加载
		initMui: function(){
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
							that.getData(this);			  
				        }
					}
				}
			});
	
			//init后需要执行ready函数，才能够初始化出来
		    mui.ready(function() {

		    	//隐藏当前的加载中loading
	        	if( !$('.list').hasClass('hasPullUp') ){
	        		$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
	        	}

		    	//显示loading
            	that.getElements.listLoading.show();

		    	//这一句初始化并第一次执行mui上拉加载的callback函数
		      	mui('.contentWrapper').pullRefresh().pullupLoading();

		      	//隐藏loading，调试接口时需要去掉
		      	setTimeout(function(){
		      		that.getElements.listLoading.hide();
		      	}, 2000);
				

		      	//为$id添加hasPullUp  class
		      	$('.list').addClass('hasPullUp');
		    });
		}

 	}

 	hisValue.init();

 })
