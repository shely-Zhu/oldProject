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

//require('../../../common/js/components/openOrClose.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');

$(function(){

    var helpful = {    
        getElements : {
            btn       : $(".slide_title"),//注册按钮 
        }, 

        init : function(){            
            var that = this;

            //页面初始化
            that.getData();

            //that.event();
 
        },
        getData:function(){
        	var that = this;

            that.sendAjax("appmustread");
            that.sendAjax("appregister");
            that.sendAjax("appinvest");

        },
        sendAjax:function(param){
            var that = this;

            //请求页面数据
            var obj = [{
                url: site_url.findLatestContentByCategory_api,
                data: {
                    "category":param,//新手必读 appmustread 注册开户：appregister 投资操作：appinvest
                },
                needDataEmpty: false, //不判断data是否为空
                contentTypeSearch: true, 
                callbackDone: function(json){

                    var json = json.data;

                    //给title赋值
                    $(".title").html(json.title);
                    //赋值内容区域
                    $('.'+param).html(json.content);//content
                },
                callbackFail: function(json){
                    tipAction(json.message);
                }
            }]
            $.ajaxLoading(obj);
        },
        event:function(){
            var that = this;
            that.getElements.btn.bind('touchstart', function(){
                var $this = $(this);

                if( $this.hasClass('active') ){
                    //有active class时，说明是打开状态，需要隐藏
                    $this.removeClass('active');
                    $this.next().hide();
                }else{
                    //隐藏状态，需要打开

                    $this.addClass('active');
                    $this.next().hide();

                }
            })
        },

    }

    /*调用*/
    helpful.init(); 
 
})