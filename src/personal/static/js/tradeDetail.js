
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

require('../../../common/js/scrollFullPage.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
//恒天财富部分组件判断显示与隐藏
require('../../../common/js/components/chtwm/ifChtwm.js');
//弹窗
require('../../../common/js/components/elasticLayerTypeTwo.js');
$(function(){

    var dataLists={

        page : 1,

        uuid : "",

        flag:false,//分页数据加载完毕参数

        //元素获取
        getElements: {
            pageLists:$("#pageLists"),//数据展示区域
            emptyBox : $('#emptyBox'), //没有数据默认显示区块
            totalCount : $("#totalCount"),//总金额
            container : $(".container"),
            pullUp : $("#pullUp"),//上拉加载按钮
        }, 

        webinit:function(){  
            var that=this;  

            //从localstarage中获取uuid用于入参使用
            //that.uuid = sessionStorage.getItem("uuid");

            /*页面初始化加载数据ajax请求*/
            that.getList();
            //事件加载
            that.events();

        },
        getList:function(){
            var that=this;

            //请求赎回明细的入参
            var param = {
                    hmac:"", //预留的加密信息   
                    params:{//请求的参数信息 
                        page_no :"1",// 当前页 
                        page_size:"10",//每页记录数
                        order_date_max:"" ,//预约日期（大） 
                        order_date_min:"" ,//预约日期（小）
                        //uuid:that.uuid//token
                    }
            };

            var obj = [{
                url: site_url.payDetail_api,//持仓明细列表
                data: param,
                needLogin:true,//需要判断是否登陆
                needDataEmpty: true,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数
                    
                    //列表数据请求成功

                    console.log(JSON.stringify(json.data.pageList));

                    if( !$.util.objIsEmpty(json.data.pageList) ){
						
						$.each(json.data.pageList,function(i,el){
							if(el.businName.indexOf('赎回') != -1){
								if(!!el.benefitsFormula){
									el.showIncome=true;
								}
							}
						})
						
						
                        var tplm = $("#dataLists").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList);
                        $("#pageLists").html(html);

                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
                            console.log("加载结束最后一页");

                            that.flag = true;

                        }else{

                            //$("#pullUp").show();//实现下拉加载条
                            that.page++ ;
                        }

                    }
                    else{
                        that.getElements.pullUp.hide();//上拉加载区域隐藏
                        that.getElements.pageLists.hide();//展示数据区域隐藏
                        that.getElements.emptyBox.show();//没有数据显示状态
                    }

                },
                callbackFail: function(json){  //失败后执行的函数

                    tipAction(json.msg);

                }
            }];
            $.ajaxLoading(obj);
        },
        pageAction : function(){
            var that=this;			
			if(envOrigin == 1){
				$(".upTop").addClass("chtwm-upTop");
            	var height = windowHeight -$(".chtwm-pay").height() ;
            }else{
            	var height = windowHeight;
            }
            $('#wrapper').height(height).css('top', $('.banner').height() + 'px');
            var obj = {

                       callback : function(){ //下拉分页的回调函数
                            that.upPage(); 
                       } 

                      }

            $.slideFullPage(obj);//弹出层初始化                

            //下拉加载更多

        },
        upPage : function(){
            var that=this;

            if(that.flag == false){

                var obj = [{
                    url : site_url.payDetail_api,
                    data: {
                        hmac:"", //预留的加密信息   
                        params:{//请求的参数信息 
                            page_no :that.page,// 当前页 
                            page_size:"10",//每页记录数
                            order_date_max:"" ,//预约日期（大） 
                            order_date_min:"" ,//预约日期（小）
                            //uuid:that.uuid//token
                        }
                    },
                    //async:false, //同步

                    callbackDone : function(json){
                    	$.each(json.data.pageList,function(i,el){
							if(el.businName.indexOf('赎回') != -1){
								if(!!el.benefitsFormula){
									el.showIncome=true;
								}
							}
						})
                        var tplm = $("#dataLists").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList); 
                        //输入模板 
                        $("#pageLists").append(html);
                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
                            console.log("加载结束最后一页");

                            that.flag = true;

                        }else{
                            that.page++ ;
                        }                          
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

    	events:function(){
    		var that=this;
    		
    		$(document).on('click','.datalist .date .text',function(){
    			if($(this).find('.iconfont').length != 0){
    				$.elasticLayerTypeTwo({
    					title: '收益计算公式', //如果不传默认为'尊敬的用户'
                        p: '计算公式：'+$(this).find('.iconfont').attr('description'),
                        buttonTxt: '知道了', //
                        //yesTxt : '确定' , //确定按钮的文案，不传默认为确定
                        //celTxt : '取消', //返回按钮的文案，不传默认为返回
                        zIndex: 100, //该弹层的z-index，因为不知道有几个弹层和弹层顺序，不传默认为100
                        //yesButtonPosition: 'left', //确定按钮在左边还是在右边，不传的话，默认为'left'，在左边，如果在右边，传'right'
                        //callbackCel: $.noop, //取消按钮的回调函数，默认为空
                        callback: $.noop, //确定按钮的回调函数，默认为空(jQuery的空函数，仅仅想要传递一个空函数的时候可以使用)
                        //iconTxt: '', //icon的值
                        isHide: true, //弹窗是否隐藏,默认隐藏
    				})
    			}
    		})
    	}
    };
    dataLists.webinit();
    dataLists.pageAction();

})

