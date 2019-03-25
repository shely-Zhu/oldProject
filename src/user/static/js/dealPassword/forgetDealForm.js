/**
 * 忘记网站交易密码的表单页面js
 * @author yangjinlai 2017-02-24
 */

/*
* @page: 忘记网站交易密码的表单页面js
* @Author: yangjinlai
* @Date:   2017-02-24
* 
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-11-12 11:20:56
* @description: 新增汇付支付渠道，重新鉴权，接口入参添加capitalMode等参数
*/
require('../../../../include/js/vendor/config.js');
//zepto模块
require('../../../../include/js/vendor/zepto/callback.js');
require('../../../../include/js/vendor/zepto/deferred.js');

//确认是否离开当前页面的函数
require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');

//黑色提示条的显示和隐藏
var tipAction = require('../../../../common/js/components/tipAction.js');
//弹出层
require('../../../../common/js/components/elasticLayer.js');
var Base64 = require('../../../../include/js/vendor/base64/base64.js');


$(function() {

    var formCommit = {

        getElements: {
            nextBtn: '.nextBtn', //下一步

        },

        //初始化函数
        init: function() {
            var that = this;

            that.getData();

            //页面打开后最先执行
            that.beforeSetFunc();

            //调用绑定事件函数
            that.eventsFunc();
        },

        getData: function() {
            var that = this;

            var obj = [{
                url: site_url.changeDealBankList_api,
                data: {
                    hmac: "", //预留的加密信息 非必填项
                    params: {
                        fundType: "00000",
                        type: "2", // 0:全部 1:私募 2:公募
                        bankAccountSecret: "", //银行卡号base64加密字段，查询所有银行卡传递“”
                        pageNum: 1, // 当前页
                        pageSize: "", //每页条目数,""为空查询1000条
                    } //请求的参数信息
                },
                needLogin: true,
                needDataEmpty: false,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    if (!$.util.objIsEmpty(jsonData.bankList)) {
                        var bankList = jsonData.bankList;

                        //循环，拼模板
                        var source = $('#branchList-template').html();
                        var template = Handlebars.compile(source);
                        var html = template(bankList);
                        $('.branchList').append(html);

                    }
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);

        },


        //页面打开后最先执行的逻辑
        beforeSetFunc: function() {
            var that = this;

            //初始化mui
            mui.init();



        },


        //该函数里绑定事件
        eventsFunc: function() {
            var that = this;

            //选中银行卡
            mui("body").on('tap', '.forgetAction .form-wrap .mui-radio', function() {
                //window.location.href = '/user/views/dealPassword/forgetDealForm.html?bankIdNo='+ $(this).attr('bankIdNo');
                $('.selectBank').hide();
                $('.forgetForm').show();

                var $this = $(this);

                //回显数据
                $('.forgetForm').find('input[check=name]').val($this.attr('accountName')).attr('disabled', 'disabled')
                    .attr('accountName', $this.attr('accountName'))
                    .removeAttr('needCheck');

                $('.forgetForm').find('input[check=num_1]').val($this.attr('idNoMask')).attr('disabled', 'disabled')
                    .attr('idNoMask', $this.attr('idNoMask'))
                    .removeAttr('needCheck');

                $('.forgetForm').find('input[check=bankNum]').val($this.attr('bankAccountMask')).attr('disabled', 'disabled')
                    .attr('bankAccount', $this.attr('bankAccount'))
                    .attr('bankIdNo', $this.attr('bankNo'))
                    .attr('tradeAcco', $this.attr('tradeAcco'))
                    .attr('capitalMode', $this.attr('capitalMode'))
                    .attr('branchNo', $this.attr('branchNo'))
                    .removeAttr('needCheck');

            })

            //下一步
            mui("body").on('tap', '.forgetAction .nextBtn', function() {

                var result = $.checkInput('.forgetForm');
                if (!result) {
                    //校验未通过
                    return false;
                }

                var $this = $(this);

                //按钮变色
                $this.attr("disabled", true).addClass('disable');

                var bankNum = '',
                    bankPhone = '',
                    dxyzm = '',
                    twyzm = '';

                $.each(result, function(i, el) {
                    if (el.check == 'bankNum') {
                        bankNum = el.result;
                    } else if (el.check == 'bankPhone') {
                        bankPhone = el.result;
                    } else if (el.check == 'dxyzm') {
                        dxyzm = el.result;
                    } else if (el.check == 'twyzm') {
                        twyzm = el.result;
                    }
                })

                if (!!$('.forgetForm').find('input[check=bankNum]').attr('bankAccount')) {
                    //此属性有值
                    bankNum = $('.forgetForm').find('input[check=bankNum]').attr('bankAccount');
                }


                //校验通过
                var obj = [{
                    url: site_url.setPasswordForPaySecond_api, // 重置密码第二步
                    data: {
                        hmac: "", //预留的加密信息 非必填项
                        params: {
                            bankIdNo: $('.forgetForm').find('input[check=bankNum]').attr('bankIdNo'), //发卡银行代码 必填项
                            capitalMode: $('.forgetForm').find('input[check=bankNum]').attr('capitalMode'), //资金方式 必填项
                            branchNo: $('.forgetForm').find('input[check=bankNum]').attr('branchNo'),  //联行号 非必填项
                            bankCardNo: bankNum, //银行卡号 必填项
                            mobileNo: bankPhone, //手机号码 必填项
                            oldSerialNo: $('body').attr('serialNo'), //原流水号(第一步返回的serialNo)必填项
                            smsCode: dxyzm //手机验证码 必填项
                        } //请求的参数信息
                    },
                    needLogin: true,
                    needDataEmpty: false,
                    callbackDone: function(json) {
                        //将协议号和流水号设置到body上
                        //$('body').attr('serialNoSecond', json.data.serialNo)
                        //.attr('protocolNo', json.data.protocolNo);

                        //显示密码输入区域
                        $('.forgetAction').hide();
                        $('.nextAction').show();
                    },
                    callbackFail: function(json) {

                        //2s后改变按钮样式
                        tipAction(json.msg, function() {
                            $this.removeAttr("disabled").removeClass('disable');
                        });
                    }
                }]
                $.ajaxLoading(obj);
            })


            //密码填写区域，提交按钮点击
            mui("body").on('tap', '.nextAction .sureBtn', function() {

                var result = $.checkInput('.nextAction');
                if (!result) {
                    //校验未通过
                    return false;
                }

                var $this = $(this);

                //按钮变色
                $this.attr("disabled", true).addClass('disable');

                var newDealPassword = '';

                $.each(result, function(i, el) {
                    if (el.check == 'newDealPassword') {
                        newDealPassword = el.result;
                    }
                })

                //校验通过
                var obj = [{
                    url: site_url.setPasswordForPayThird_api,
                    data: {
                        hmac: "", //预留的加密信息 非必填项
                        params: {
                            tradeAcco: $('.forgetForm').find('input[check=bankNum]').attr('tradeAcco'), //发卡银行代码 必填项
                            password: newDealPassword, //新密码

                        } //请求的参数信息
                    },
                    needLogin: true,
                    needDataEmpty: false,
                    callbackDone: function(json) {

                        tipAction('您已成功修改网站交易密码', function() {
                            $this.removeAttr("disabled").removeClass('disable');
                            //跳转到设置页面
                            window.location.href = site_url.mySetUp_url;

                        });
                    },
                    callbackFail: function(json) {

                        //2s后改变按钮样式
                        tipAction(json.msg, function() {
                            $this.removeAttr("disabled").removeClass('disable');
                        });
                    }
                }]
                $.ajaxLoading(obj);

            })

        }
    }

    formCommit.init();
})