/*
* @page: 
* @Author: songxiaoyu
* @Date:   2019-04-02 17:43:44
* @Last Modified by:   songxiaoyu
* @description:
* 
*//**
 * 风险评测js文件
 * @author purpleZhao 2017-02-15
 */

require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');

var splitUrl = require('../../../common/js/components/splitUrl.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');

$(function() {
    //风险评估测试题 ，测试完成点击提交显示测试结果
    var risk = {

            testType: '',
            
            typeObj:{},
            
            getElements: {
                errorTip: $(".againEnter"), //错误提示
                reUrl: $('.risk .location'), //重新测评的按钮
                prUrl: $('.risk .product'), //返回首页按钮
            },
            //初始化 
            webinit: function() {
                var that = this;

                that.getData();
            },
            //数据初始化
            getData: function() { //事件 
                var that = this;
                var obj = [{ // 组合详情信息查询
                    url: site_url.login_url,
                    data:{"mobile":"13364639011", "password":"123456","accountType":1},
                    //async: false,
                    needDataEmpty: true,
                    callbackDone: function(json) {
                        debugger;
                    },
                    callbackFail: function(json) {
                        tipAction(json.msg);
                    }
                }];
                $.ajaxLoading(obj);
            },
            
        }
        //调用
    risk.webinit();
})
