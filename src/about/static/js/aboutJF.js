/*<!--
*关于金服
*author:purpleZhao
*time：2017/2/21
-->*/

/**
 * 风险评测js文件
 * @author purpleZhao 2017-02-15
 */

require('@pathInclude/js/vendor/config.js');
 
//zepto模块
require('@pathInclude/js/vendor/zepto/callback.js'); 
require('@pathInclude/js/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js'); 
require('@pathCommonJs/ajaxLoading.js');
//黑色提示条
var tipAction = require('@pathCommonJsCom/tipAction.js');



$(function(){
    //风险评估测试题 ，测试完成点击提交显示测试结果
    var about={
        
        //初始化 
        webinit:function(){   
            var that=this;  
            
            that.getData();

        },

        //数据初始化
        getData:function(){//事件 
            var that=this;
                
                if( envOrigin == 1 ){//恒天财富
                	document.title="关于恒天";
                	var param = {    

                        hmac:"", //预留的加密信息     
						
                        params:{//请求的参数信息 
                            category:"HTstockAbout ",//类型（标志位）【请参照备注】
                            groupType:"contentCategoryGF",
							
                        }

                    };
                }else{
                	//请求入参
	                var param = {    
	
	                        hmac:"", //预留的加密信息     
							
	                        params:{//请求的参数信息 
	                            category:"HTabout",//类型（标志位）【请参照备注】
								groupType:"contentCategory",
	                        }
	
	                    };
                }
    
                var obj = [{
                    url: site_url.content_url,//内容管理
                    data: param,
                    needLogin:true,//需要判断是否登陆
                    //needDataEmpty: false,//不需要判断data是否为空
                    callbackDone: function(json){  //成功后执行的函数

                        var result = json.data;
                        
                        $("#title").html(result.title);//标题
                        $("#appaboutht").html(result.content);//富文本内容
                        
                    },
                    callbackFail: function(json){  //失败后执行的函数
    
                        tipAction(json.msg);
    
                    }
                }];
                $.ajaxLoading(obj);

            
        },

    }
    //调用
    about.webinit();
})




 
