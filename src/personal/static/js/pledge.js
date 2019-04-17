/*
 * 定融及定投页面JS交互
 * @author 张卫鹏  2017/09/20
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
require('../../../common/js/components/bottomNav.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');

var pledge = {
    getElements: {
        gmBtn: $(".gmBtn"), //公募按钮
        smBtn: $(".smBtn"), //私募按钮
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
    },
    init: function() {
        var that = this;
        that.getData();
        that.event();
    },
    getData: function() {
        var that = this;

        var obj = [{
                url: site_url.totalAllAsset_api,
                data: {    
                    hmac: "",
                      //预留的加密信息   
                    params: { //请求的参数信息 

                    }
                },
                callbackDone: function(data) {
                    $(".totalNum").html(data.data.allTotalAssets);
                },
                     
            }, {
                url: site_url.JJSTotalAsset_api,
                data: {    
                    hmac: "",
                      //预留的加密信息   
                    params: { //请求的参数信息 

                    }
                },
                callbackDone: function(data) {
                    $(".introduce span").html(data.data.totalAssets);
                },
                     
            },
            {
                url: site_url.JJSDetail_api,
                data: {    
                    hmac: "",
                      //预留的加密信息   
                    params: { //请求的参数信息 
                        page_no : "1", // 当前页 
                        page_size: "1000", //每页记录数
                    }
                },
                needDataEmpty:false,
                callbackDone: function(data) {
                    var jsonData = data.data;
					
                    if ( data.data && !$.util.objIsEmpty(jsonData.pageList) ) {
                        var tplm = $("#list-template").html();
                        var template = Handlebars.compile(tplm);
                        var html = template(jsonData.pageList);
                        $(".without").before(html);
                    } else {
                        $(".without").show();
                    }
                },
                     
            }
        ]
        $.ajaxLoading(obj);
    },
    event: function() {
        var that = this;

        that.getElements.gmBtn.on('click', function() {
            that.getElements.listLoading.show();
            var obj = [{
                url: site_url.user_api,
                data: {
                    hmac: "", //预留的加密信息     
                    params: { //请求的参数信息 
                    }
                },
                needLogin: true,
                needDataEmpty: false,
                callbackDone: function(json) {
                    that.getElements.listLoading.hide();

                    var jsonData = json.data;


                    //判断私募是否已实名认证
                    if (jsonData.isCertification == 1 || !jsonData.clientId) {
                        if (envOrigin == 1) { //财富页面  4.0后改版直接跳转
                            window.location.href = site_url.htcf_asset_url;
                            return false;
                        } else {
                            //私募未做实名认证，或公募未开户
                            $('.openAccount').show();
                            return false;
                        }
                    }


                    //以上都通过，跳转到公募资产页面
                    window.location.href = "/pay/views/payThemeCash.html";
                },
                callbackFail: function(json) {
                    that.getElements.listLoading.hide();
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        });
        that.getElements.smBtn.on("click", function() {
            window.location.href = "/personal/views/myAsset.html";
        })
    }
}
pledge.init();