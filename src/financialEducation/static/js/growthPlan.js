/*
 * @page: 财商教育专属成长计划详情页
 * @Author: songxiaoyu
 * @Date:   2018-05-07 14:31:44
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-24 18:11:30
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');

$(function() {

    var somePage = {
        ele: {
            partOne: $('.part_one'), // 孩子信息部分
            partTwo: $('.part_two'), // 总资产
            investmentFund: $('.investment_fund'), // 已投资基金
            fundRecommend: $('.fund_recommend'), // 已投资基金
            layerWrap: $('.layer_wrap'), // 已投资基金
            kidInfo: $('.part_one .kid_info'), // 信息
            kidMessage: $('.part_one .kid_message'), // 成长寄语
            kidEdit: $('.part_one .kid_edit'), // 编辑
            investmentAmount: $('.part_two .investment_amount'), // 投资金额
            fundList: $('.investment_fund .fund_list_wrap'), // 已持仓金额
            recommendList: $('.fund_recommend .recommend_list'), // 推荐基金
            kidTemplate: $('#kid_template'), // 孩子信息模板
            amoutTemplate: $('#investment_amout_template'), // 投资金额
            listTemplate: $('#fund_list_template'), // 投资金额
            recommendTemplate: $('#recommend_list_template'), // 投资金额
        },
        init: function() {
            var that = this;
            // 请求获取用户信息接口
            that.getUserData();
            // 获取财商教育基金接口
            that.getMyFinancialEducationInfo();
            that.events();
        },
        getUserData: function() {
            var that = this;

            var obj = [{
                url: site_url.findApi,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                    }
                },
                //async: false,
                needLogin: true,
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;

                    if (data.imgUrl) { //用户已填表单

                        if (data.kidGender == 0) { // 女孩
                            data.kidGender = false
                        }
                        // 孩子信息
                        that.generateTemplate(data, that.ele.kidInfo, that.ele.kidTemplate);
                        that.ele.partOne.find('.kid_img').attr('src', site_url.downloadApi + '?fileName=' + data.imgUrl);
                        that.ele.partOne.find('.kid_message').append(data.kidMessage);
                    } else { //用户已初始化，未填表单
                        that.ele.partOne.find('.kid_have').hide()
                        that.ele.partOne.find('.kid_no').show()
                        that.ele.partTwo.find('.kid_no').show()
                    }
                },
                callbackNoData: function() { // 没有初始化用户，去初始化
                    window.location.href = site_url.guidePageUrl;
                },
                     
            }];
            $.ajaxLoading(obj);
        },
        getMyFinancialEducationInfo: function() {
            var that = this;

            var obj = [{
                url: site_url.myFinancialEducationInfoApi,
                data: {
                    hmac: "" //预留的加密信息
                },
                //async: false,
                needLogin: true,
                // needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data;

                    // 投资金额
                    that.generateTemplate(data, that.ele.partTwo, that.ele.amoutTemplate);

                    // 已投资基金列表
                    if (data.fundPositionList.length != 0) {
                        $.each(data.fundPositionList, function(e, el) {
                            if (el.invTypCom == '10300') { // 货币基金，展示七日年华，万份收益
                                el.isMoneyFund = true;
                            } else { // f非货币，展示最新净值 日涨幅
                                el.isMoneyFund = false;
                            }
                        })
                        that.generateTemplate(data.fundPositionList, that.ele.fundList, that.ele.listTemplate);
                    } else {
                        that.ele.investmentFund.hide();
                    }

                    // 推荐基金
                    if (data.recommendFundList) {
                        that.generateTemplate(data.recommendFundList, that.ele.recommendList, that.ele.recommendTemplate);
                    } else {
                        that.ele.fundRecommend.hide();
                    }
                },
                     
            }];
            $.ajaxLoading(obj);
        },
        generateTemplate: function(data, $ele, $id) { //生成模板
            // 模板
            var that = this,
                source = $id.html(),
                template = Handlebars.compile(source),
                html = template(data);

            $ele.append(html);

            $.util.numberAddColor($ele.find(".income"));
        },
        events: function() {
            var that = this;
            // 编辑按钮,创建宝宝专属计划按钮
            mui("body").on('tap', '.part_one .kid_edit', function() {
                window.location.href = site_url.createPlanUrl
            })

            // 点击查看教程
            mui("body").on("tap", '.kid_tutorial', function() {
                that.ele.layerWrap.show();
            })


            // 点击蒙层消失
            mui("body").on("tap", '.close_layer', function() {
                that.ele.layerWrap.hide();
            })

            // 点击总资产
            mui("body").on("tap", '.investment_total ', function() {
                window.location.href = site_url.payThemeCash_url;
            })

            // 存一笔按钮
            mui("body").on('tap', '.buy_btn', function(e) {
                window.location.href = site_url.productPublicDetail_url + '?fundCode=' + $(this).attr('fund-code');
            })

            // 取出按钮
            mui("body").on('tap', '.sale_btn', function(e) {
                window.location.href = site_url.payThemeCash_url;
            })

            // 推荐基金点击
            mui("body").on('tap', '.fund_detail', function(e) {
                window.location.href = site_url.productPublicDetail_url + '?fundCode=' + $(this).attr('fund-code');
            })
        },
    };
    somePage.init();
});