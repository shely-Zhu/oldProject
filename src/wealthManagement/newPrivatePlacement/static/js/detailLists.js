//路径配置文件
require('@pathIncludJs/vendor/config.js');
//ajax调用
require('@pathCommonJsCom/utils.js'); 
//ajax调用
require('@pathCommonJs/ajaxLoading.js'); 
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js'); 
//下拉加载
require('@pathCommonJs/scrollFullPage.js');
//黑色提示条
var tipAction = require('@pathCommonJsCom/tipAction.js');
//恒天财富部分组件判断显示与隐藏
require('@pathCommonJsCom/chtwm/ifChtwm.js');

$(function(){

    var dataLists={

        page : 1,

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

            /*页面初始化加载数据ajax请求*/
            that.getList();

        },


        getList:function(){
            var that=this;

            // 请求赎回明细的入参
            var param = {
                hmac:"", //预留的加密信息   
                params:{//请求的参数信息 
                    page_no :"1",// 当前页 
                    page_size:"10",//每页记录数
                }
            };

            var obj = [{
                url: site_url.ransom_api,//持仓明细列表
                data: param,
                type: 'POST',
                needLogin: true,
                callbackDone: function(json){//成功后执行的函数
                    //列表数据请求成功
                    console.log(JSON.stringify(json.data.pageList));

                    if( !$.util.objIsEmpty(json.data.pageList) ){

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

                            that.page++ ;
                        }

                    }
                    else{
                        that.getElements.pullUp.hide();//上拉加载区域隐藏
                        that.getElements.pageLists.hide();//展示数据区域隐藏
                        that.getElements.emptyBox.show();//没有数据显示状态
                    }

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

        },
        upPage : function(){
            var that=this;

            if(that.flag == false){

                var obj = [{
                    url : site_url.ransom_api,
                    data: {
                        hmac:"", //预留的加密信息   
                        params:{//请求的参数信息 
                            page_no :that.page,// 当前页 
                            page_size:"10",//每页记录数
                        }
                    },
                    needLogin: true,
                    callbackDone : function(json){
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

                            that.page++ ;//页码+1
                        }                         
                    }
                }];
                $.ajaxLoading(obj);

            }
            else{

                $("#pullUp").removeClass('loading');//去掉上拉条中对应的class类

                $(".pullUpIcon").html("");//删除icon
               
                $(".pullUpLabel").html("没有更多了");//显示没有数据提示
            }
            
        }

    };
    dataLists.webinit();//页面数据初始化
    dataLists.pageAction();//分页加载

})

