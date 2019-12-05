
/*
 * @page: 通过id获取协议模板
 * @Author: purpleZhao
 * @Date:   2017-06-08 16:42:39
 * @description:本页面逻辑是所有通过id查询协议的模板结果详情页
 *              要求：需要通过地址栏将id传过来
 *
 *
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-20 10:18:44
 * @description:恒小智，app里协议，需公募调用私募接口，这个接口需转发
 */
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');


$(function() {

    var model = {

        webInit: function() {

            var that = this;
            if (window.location.href.indexOf('id') == -1) {

                console.log("地址栏中没有带过id的值，请查看跳转前的链接");
                return false;

            } else {
                //发送ajax请求
                if(window.location.href.indexOf('rightsCenter') != -1) { //如果是权益中心页面单执行以下操作
                    var obj = [{
                        url: site_url.queryRightsByLevel_api, //协议接口
                        needLogin: true, //需要判断是否登陆
                        data: {
                            "id": splitUrl()['id'], //内容ID
                        },
                        callbackDone: function(json) { //成功后执行的函数

                            var result = json.data[0];
                            //给页面title赋值
                            window.document.title = result.rightName;
                            $(".content").html(result.content); //内容区
                        },
                    }]; 
                }else if(splitUrl()['cash'] == 'true'){  //现金产品的协议
                    var obj = [{
                        url: site_url.findProtocolContent_api, //协议接口
                        needLogin: true, //需要判断是否登陆
                        data: {
                            "hmac": "", //预留的加密信息
                            "params": { //请求的参数信息
                                "id": splitUrl()['id'], //内容ID
                            }
                        },
                        callbackDone: function(json) { //成功后执行的函数

                            var result = json.data;
                            //给页面title赋值
                            window.document.protocolName = result.protocolName;
                            $(".content").html(result.content); //内容区

                        },
                             
                    }]; 

                } else if(splitUrl()['financial'] == 'true'){ // 除权益中心页面执行以下操作
                    var obj = [{
                        url: site_url.findProtocolContent_api, //协议接口
                        needLogin: true, //需要判断是否登陆
                        contentTypeSearch: true,
                        data: {
                            "id": splitUrl()['id'], //内容ID
                        },
                        callbackDone: function(json) { //成功后执行的函数

                            var result = json.data;
                            //给页面title赋值
                            window.document.title = result.protocolName;
                            $(".content").html(result.content); //内容区

                        },
                             
                    }]; 
                }else{
                    var obj = [{
                        url: site_url.findInvestorClassification_api, //协议接口
                        needLogin: true, //需要判断是否登陆
                        contentTypeSearch: true,
                        data: {
                            "ids": splitUrl()['id'], //内容ID
                        },
                        callbackDone: function(json) { //成功后执行的函数

                            var result = json.data[0];
                            //给页面title赋值
                            window.document.title = result.title;
                            $(".content").html(result.content); //内容区

                        },
                             
                    }]; 
                }
                
                $.ajaxLoading(obj);
            }
        }
    };

    //调用数据
    model.webInit();
})