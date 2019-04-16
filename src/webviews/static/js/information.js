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
//app下载条
require('../../../common/js/components/app/requireAppDown.js');
$(function(){

    var information = {     

        init : function(){            
            var that = this;

            //页面初始化
            that.getData();
 
        },
        getData:function(){
            var that = this;

            //请求页面数据
            var obj = [{
                url: site_url.findContentDetailById_api,
                data: {
                    "contentId":splitUrl['id'],//内容ID
                },
                needDataEmpty: false, //不判断data是否为
                contentTypeSearch: true,
                callbackDone: function(json){

                    var json = json.data;

                    $(".title").html(json.title);//title
                    $("#time").html(json.releaseDate);//releaseDate
                    $("#resource").html(json.reportSource);//source
                    $(".content").html(json.content);//内容区
                },
                callbackFail: function(json){
                    tipAction(json.message);
                }
            }]
            $.ajaxLoading(obj);

        }

    }

    /*调用*/
    information.init(); 
 
})