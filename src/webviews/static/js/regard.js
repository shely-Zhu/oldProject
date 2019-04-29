/*app端引入的关于页面，从as.chtfund.com页面迁移过来的
suthor：purpleZhao
time：20180511*/


require('../../../include/js/vendor/config.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js'); 
//校验
require('../../../common/js/input.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();
require('../../../common/js/components/elasticLayer.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');

$(function(){

    var regard = {     

        init : function(){            
            var that = this;

            //页面初始化
            that.getData();
 
        },
        getData:function(){
        	var that = this;

        	//赋值版本号到页面
        	$("#num").html(splitUrl['version']);
            //请求页面数据
            var obj = [{
                url: site_url.findLatestContentByCategory_api,
                data: {
                    "category":"appaboutht",//新手必读 appmustread 注册开户：appregister 投资操作：appinvest
                },
                needDataEmpty: false, //不判断data是否为空
                contentTypeSearch: false,
                callbackDone: function(json){

                	var json = json.data;

                	//给title赋值
                    $(".title").html(json.title);
                    //赋值内容区域
                    $(".appaboutht").html(json.content);//content
                },
                callbackFail: function(json){
                   	tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);

        }

    }

    /*调用*/
    regard.init(); 
 
})