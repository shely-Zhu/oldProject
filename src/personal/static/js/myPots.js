/***
*我的积分
*@author 2016-12-29 purpleZhao
*/
//ajax调用
require('../../../common/js/components/utils.js'); 
//ajax调用
require('../../../common/js/ajaxLoading.js'); 
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js'); 
//路径配置文件
require('../../../include/js/vendor/config.js'); 
//下拉加载更多
require('../../../common/js/scrollFullPage.js');

$(function(){
	var myPoint={

        uuid:'',
		page: 1 ,
		flag:false,
        //元素获取
        getElements: {
            pageLists:$("#pageLists"),//数据展示区域
            emptyBox : $('#emptyBox'), //没有数据默认显示区块
            pointsBalance : $('#pointsBalance'),//剩余积分
            toDuePoint : $('#toDuePoint'),//即将到期积分
            piontBtn : $("#piontBtn"),//立即兑换按钮
        }, 

		webinit:function(){  
			var that=this;  
		
			/*页面初始化加载数据ajax请求*/
			that.getList();
		},
		getList:function(){
			var that=this;
			
			//请求积分列表的入参
            var param1 = {    
                    hmac:"", //预留的加密信息    
                    params:{//请求的参数信息 
                        startDate:"" ,//开始日期【yyyy-MM-dd】 
                        endDate:"" ,//结束日期【yyyy-MM-dd】
                        pageNum:that.page,//页数
						pageSize:"10"//每页显示条数
                    }
            	};
            //请求当前积分和即将到期积分的入参
            var param2 = {    
                    hmac:"", //预留的加密信息    
                    params:{//请求的参数信息
                        //uuid:that.uuid//token  
                    }
            };

            var obj = [{
                url: site_url.myPoint_api,//积分列表
                data: param1,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数
                    
                    //积分列表数据请求成功
					
                    console.log(JSON.stringify(json));
                  
                    if( !$.util.objIsEmpty(json.data.pageList) ){
						
						Handlebars.registerHelper("add", function(operate,count) {  
						  	return operate+count;
						});
						
                        var tplm = $("#template-pot").html(),
						template = Handlebars.compile(tplm);
		            	html = template( json.data.pageList );
		            	//输入模板 
                        that.getElements.pageLists.append(html);
                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
                            console.log("加载结束最后一页");
                            that.flag = true;


                        }else{
                            that.page++ ;
                        }      

                        //$('#pullUp').css('visibility', 'visble'); 

                    }
                    else{                   
                		$(".list").hide();//展示数据区域隐藏
                    	that.getElements.emptyBox.show();//没有数据显示状态                  
                    }

                },
                callbackFail: function(json){  //失败后执行的函数

                    console.log(json.msg);

                },
                callbackNoData:function(json){
 
                }
            },{
                url: site_url.pOver_api,//剩余积分
                data: param2,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数

                    console.log(JSON.stringify(json)); 
                    that.getElements.pointsBalance.html(json.data.count);//剩余积分数据填充

                },
                callbackFail: function(json){  //失败后执行的函数

                    console.log(json.msg);

                },
                callbackNoData:function(json){

                    console.log(JSON.stringify(json));

                }
            },{
                url: site_url.pMature_api,//到期积分
                data: param2,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数

                    console.log(JSON.stringify(json)); 
                    that.getElements.toDuePoint.html(json.data.count);//剩余积分数据填充

                },
                callbackFail: function(json){  //失败后执行的函数

                    console.log(json.msg);
                    
                },
                callbackNoData:function(json){


                } 
            }];
            $.ajaxLoading(obj);
		},
		pageAction : function(){
            var that = this;

            //设置可拉动区域的高度
            //if(envOrigin == 1){
            	//var height = windowHeight - $('.banner').height() - $('.bottomNav').height()-$(".chtwm-pay").height() ;
            //}else{
            var height = windowHeight - $('.banner').height();
            //}
            $('.list').height(height).css('top', $('.banner').height() + 'px');
            //下拉加载更多
            var obj = {

                //isGoTop : false,//不显示回到顶部
                callback : function(){ //下拉分页的回调函数
                    that.upPage(); 
                } 

            }

            $.slideFullPage(obj);//初始化                  

        },
        upPage : function(){
            var that=this;

            if(that.flag == false){

                var obj = [{
                    url : site_url.myPoint_api,
                    data: {
                        hmac:"", //预留的加密信息    
	                    params:{//请求的参数信息 
	                        startDate:"" ,//开始日期【yyyy-MM-dd】 
	                        endDate:"" ,//结束日期【yyyy-MM-dd】
	                        pageNum:that.page,//页数
							pageSize:"10"//每页显示条数
	                    }
                    },
                    async:false, //同步
					
                    callbackDone : function(json){
 
                		Handlebars.registerHelper("add", function(operate,count) {  
						  	return operate+count;
						});
						
                        var tplm = $("#template-pot").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList); 
                        //输入模板 
                        that.getElements.pageLists.append(html);
                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
                            console.log("加载结束最后一页");
                            that.flag = true;


                        }else{
                            that.page++ ;
                        }      

                        $('#pullUp').css('visibility', 'hidden'); 
                    	
                    },
                    callbackFail:function(data){
						tipAction(data.msg);
					}
                }];
                $.ajaxLoading(obj);  
            }
            else{

                console.log("这是最后一页");
                console.log( $(".pullUpLabel").html());

                $("#pullUp").removeClass('loading');

                $(".pullUpIcon").html("");
               
                $(".pullUpLabel").html("没有更多了")
            }           
        },
        //事件
        event : function(){
            var that = this;

            that.getElements.piontBtn.on("click",function(){

            var obj = [{
                url : site_url.exchagePot_api,
                data: {
                    hmac:"", //预留的加密信息   
                    params:{//请求的参数信息 
                        //uuid:that.uuid//token
                    }
                },
                needDataEmpty: false,//不需要判断data是否为空

                callbackDone : function(json){

                //跳转到积分商城
                window.location.href = json.data.redirectUrl;

                                            
                }
            }];
            $.ajaxLoading(obj);

            });
        },
	}
	myPoint.webinit();//页面初始化
	myPoint.pageAction();//页面初始化	
    myPoint.event();//积分兑换事件

})