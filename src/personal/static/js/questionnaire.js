/*
 * @page: 风险评测，投资者知识测试答题页
 * @Author: purpleZhao
 * @Date:   2017-02-15
 * 
 * @Author: songxiaoyu
 * @Date:   2017.11.29
 * @description:增加投资者知识测试答题功能
 *               url参数中    type类型新增  priInvestor
 *               
 * @Author: sunfuping
 * @Date:   2018-07-16
 * @description:风险测评公私募合并
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-08 17:54:55
 * @description:  投资者知识测试公私募合并
 * 
 * @description： 1.因页面判断多次需要区分 per个人，org机构，priInvestor私募投资者测试
 *                  故提出dealSwitch方法，分别处理3种情况下的逻辑
 *                2.url参数：type=priInvestor（投资者测试页）from(投资者分类上传页面需要)
 *                3.从结果页返回时，跳过本页面，直接go(-1)
 *      
 */
require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/mui/mui.picker.min.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
//require('../../../common/js/components/elasticLayer.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayer.js');

//确认是否离开当前页面的函数
var ConfirmAwayNowPage = require('../../../common/js/components/ConfirmAwayNowPage.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');

//风险评估测试题 ，测试完成点击提交显示测试结果
$(function() {
    var question = {
        getElements: {
            onBtn: $('#submit'), //提交按钮
            sequence: $(".sequence"), //题目序列表
            alertBox: $(".alertBox"), //评测结果弹层
            linkBtn: $("#linkBtn"), //评测弹层确定按钮
            knowBtn: $(".knowBtn"),
            idTypeBtn: 'ul.idTypeSelect', //证件类型点击下拉 
            errorTip: $(".againEnter"), //错误提示
            type: splitUrl()['type'], //机构或者个人或者公募-----主要用来监听地址栏的type参数确定是什么类型
            investorSubmit: $('.investorSubmit'), // 投资者测试，提交按钮
            investorCancel: $('.investorCancel'), // 投资者测试，取消按钮
            investorTip: $('.investorTip'), //投资者错误提示
            tipNum: $('.investorTip .tipNum'), //投资者错误提示
        },
        urlValue: {
            from: splitUrl()['from'], //投资者页面需要
            investType: splitUrl()['investType'], //投资者页面需要
        },
        webinit: function() { //初始化 
            var that = this;

            // 页面打开后最先执行--根据不同状态，添加浏览器返回按钮处理逻辑
            that.beforeSetFunc();

            //数据回显页面数据初始化
            that.getData();

            that.click(); //事件处理
        },
        /**
         * [beforeSetFunc 页面打开后最先执行--根据不同状态，添加浏览器返回按钮处理逻辑]
         * @author songxiaoyu 2018-07-24
         */
        beforeSetFunc: function() {
            var that = this;
            // 浏览器返回需处理事件
            var switchF = {
                per: function() { // 风险测评相关页面
                    ConfirmAwayNowPage('您是否确定要放弃风险测评？', that.originUrl, that.getElements.type);
                },
                priInvestor: function() { // 投资者知识测试相关页面
                    if (window.history.state && window.history.state.isPass) {
                        window.history.go(-1)
                    }
                },
            };

            //初始化mui 
            mui.init();

            that.originUrl = splitUrl()['originUrl'];

            // 分别为风险测评，投资者分类--浏览器返回按键---注册事件
            that.dealSwitch(1, switchF.per, switchF.per, switchF.priInvestor);
        },
        /**
         * [dealSwitch 根据url中type参数决定执行页面中哪部分逻辑]
         * @author songxiaoyu 2018-07-24
         * @param  {[type]} id          [第几个dealSwitch标识--方便调试定位]
         * @param  {[type]} per         [私募个人风险测评--逻辑处理]
         * @param  {[type]} org         [私募机构风险测评--逻辑处理]
         * @param  {[type]} priInvestor [投资者分类知识测试--逻辑处理]
         */
        dealSwitch: function(id, per, org, priInvestor) {
            var that = this;
            console.log('这是第' + id + '个switch,方便定位');
            switch (that.getElements.type) {
                case "per":
                    per();
                    break;
                case "org":
                    org();
                    break;
                case "priInvestor":
                    priInvestor();
                    break;
                default:
                    throw new Error('页面需要type');
            }
        },
        /**
         * [getData 根据url参数，判断页面所属类型，分情况请求接口数据，拼接答题页面]
         * @author songxiaoyu 2018-07-24
         * @return {[type]} [description]
         */
        getData: function() { //数据初始化
            var that = this,
                ajaxUrl = '',
                obj = [];

            var param = {
                hmac: "", //预留的加密信息     
                params: {} //请求的参数信息 
            };

            // 页面不同情况需注册逻辑--
            var switchF = {
                per: function() { //个人私募风测处理逻辑
                    $(".noticePer").show();
                    ajaxUrl = site_url.questionnaire_api;
                },
                org: function() { // 机构私募风测逻辑处理
                    $(".noticeOrg").show();
                    ajaxUrl = site_url.questionnaire_api;
                },
                priInvestor: function() { //投资知识问卷处理逻辑
                    $('.noticeInvestor').show();
                    $('#submit').hide();
                    $('.testInvestor').show();
                    ajaxUrl = site_url.queryInvestmentKnowledge_api;
                },
            };

            // 根据类型--请求测试题目url设置
            that.dealSwitch(2, switchF.per, switchF.org, switchF.priInvestor)

            //发送ajax请求
            obj = [{
                url: ajaxUrl, //问卷题目
                data: param,
                needLogin: true, //需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json) { //成功后执行的函数

                    //子模版--题目答案选项列表
                    $.each(json.data, function(i, el) {
                        var arr = {},
                            tplm = '',
                            template = '',
                            html = '';

                        // 页面不同情况需
                        var switchF = {
                            per: function() { // 私募相关接口题目处理
                                arr = {
                                    "optionInfo": el.optionInfo,
                                };
                            }
                        };

                        el.number = i + 1; //赋值题号

                        // 对题目做相关处理---私募用一套处理逻辑
                        that.dealSwitch(3, switchF.per, switchF.per, switchF.per);

                        // 模板拼接
                        tplm = $("#question-list-con-template").html();
                        template = Handlebars.compile(tplm);
                        html = template(arr);
                        el.content = html;
                    })

                    //父模板--题目列表
                    var tplmParent = $("#question-list-template").html();
                    var templateParent = Handlebars.compile(tplmParent);
                    var htmlParent = templateParent(json.data);
                    $(".queryQuestion").html(htmlParent);
                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        /**
         * [isCheck 判断是否有题目没有选择]
         * @author songxiaoyu 2018-07-24
         * @return {Boolean} [true or false]
         */
        isCheck: function() {
            var that = this,
                retFlag = true;

            //校验题目是否全部选择
            $('.queryQuestion .choice').each(function() {
                var ischecked = $(this).find('input[type=radio]:checked').length;

                if (ischecked == '0') {
                    var indexNo = $(this).find('.index').text();
                    //跳转到我的账户页面
                    window.isHref = true;

                    window.location.href = "#type" + indexNo;

                    tipAction("请选择第" + indexNo + "题答案");

                    retFlag = false;

                    //返回上一个页面，即未定位的页面
                    window.history.go(-1);

                    return false;
                } else {
                    console.log("全部选择完毕");
                }
            });
            return retFlag;
        },
        /**
         * [jsonArrResult 获取选择题答案,拼接传参形式,--所有情况处理形式一样]
         * @author songxiaoyu 2018-07-24
         * @return {[type]} [拼接好的答案形式]
         */
        jsonArrResult: function() {
            var that = this;
            var jsonArr = "",
                questionId = "",
                optionNo = "";

            $('.queryQuestion').find('input[type=radio]:checked').each(function(index, e) {

                questionId = $(this).parents('.choice').attr('id'); //选中id父元素list的id
                optionNo = $(this).attr('optionNo');
                jsonArr += questionId + ":" + optionNo + "$";
            });

            return jsonArr;
        },
        /**
         * [sendAjax 根据页面不同情况，发送提交答案请求]
         * @author songxiaoyu 2018-07-24
         * @param  {[type]} param [接口答案参数]
         * @param  {[type]} $ele  [当前操作按钮dom结构]
         * @return {[type]}       [description]
         */
        sendAjax: function(param, $ele) { //发送ajax请求
            var that = this,
                sendUrl = '',
                obj = [];

            var switchF = {
                per: function() { // 私募风测逻辑
                    //如果是个人和机构用户url是questionnaire_api
                    sendUrl = site_url.questionnaire_score_api; //私募风测接口路径
                    $(".noticePer").show();
                },
                priInvestor: function() { // 私募投资知识测试逻辑
                    sendUrl = site_url.answerSubmit_api; // answerSubmit.action,私募投资知识测试提交
                },
            };

            // 不同情况请求接口url设置
            that.dealSwitch(6, switchF.per, switchF.per, switchF.priInvestor);

            //发送ajax请求
            obj = [{
                url: sendUrl, //打分
                data: param,
                needLogin: true, //需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json) { //成功后执行的函数
                    var data = json.data;
                    var switchF = {};

                    //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
                    Handlebars.registerHelper("addOne", function(index, options) {
                        return parseInt(index) + 1;
                    });

                    switchF = {
                        per: function() { // 个人私募逻辑处理
                            $("#endScore").html(data.totalScore); //总分
                            $("#endScore").html(data.optionScore); //最终得分
                            $("#grade").html(data.grade); //风险等级

                            if (!!data.productList && data.productList.length != 0) { //存在风险不匹配的产品
                                $('.gomine').show();
                                $('#textPd').show();
                            } else {
                                $('.goback').show();
                            }

                            var tplmParent = $("#prvDetail-list-template").html();
                            var templateParent = Handlebars.compile(tplmParent);
                            var htmlParent = templateParent(data);
                            $(".pdDetail").html(htmlParent);

                            //var mask = mui.createMask(callback);//callback为用户点击蒙版时自动执行的回调；
                            $(".mask").show(); //显示遮罩
                            that.getElements.alertBox.show();
                        },
                        priInvestor: function() { // 私募投资者知识测试处理
                            var isPass = data.isPass, //0 否  1  是
                                errorCount = data.errorCount,
                                pass = 0,
                                stateObj = {
                                    isPass: true
                                };

                            pass = (Number(isPass) == 1 ? 1 : 0);

                            if (pass) {
                                window.history.replaceState(stateObj, '', '');

                                that.getElements.investorTip.hide();

                                tipAction('恭喜您通过测试！正在为您跳转页面……', function() {
                                    window.location.href = site_url.uploadMaterial_url + '?from=' + that.urlValue.from;
                                }, 3000)
                            } else {
                                that.getElements.tipNum.html(errorCount)
                                that.getElements.investorTip.show();
                                $ele.removeAttr("disabled").removeClass('disable');
                            }
                        }
                    };

                    // 接口请求成功，页面展示逻辑处理
                    that.dealSwitch(7, switchF.per, switchF.per, switchF.priInvestor);

                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.msg);
                    $ele.removeAttr("disabled").removeClass('disable').addClass('on');
                }
            }];
            $.ajaxLoading(obj);
        },
        click: function() { //事件 
            var that = this;

            // 点击提交按钮,（风测，投资者测试）
            $('#submit, .investorSubmit').on('tap', function() {
                var param = '', // 提交答案接口参数
                    jsonArrString = ''; // 所有答案拼接后的字符串

                //判断是否有题目没有选
                if (!that.isCheck()) {
                    return false;
                }

                $(this).attr("disabled", true).removeClass("on").addClass('disable');

                //获取选择题答案---公私募通过type参数做区分来达到入参内容不一致的效果
                jsonArrString = that.jsonArrResult();

                //接口需要的参数
                param = {
                    hmac: "",
                    params: {
                        questionnaireAnswers: jsonArrString,
                    }
                };

                //发送ajax请求
                that.sendAjax(param, $(this));
            });

            // 点击弹层确定按钮
            that.getElements.linkBtn.on('tap click', function() {

                window.isHref = true;

                $(".mask").hide(); //显示遮罩

                if (that.getElements.type == "pub") { //公募
                    window.location.href = site_url.payThemeCash_url;
                } else if (that.getElements.type == "per" || that.getElements.type == "org") {
                    window.location.href = site_url.smMyAsset_url;
                }
            });

            // 点击弹层我知道了按钮
            that.getElements.knowBtn.on('tap', function() {

                window.isHref = true;

                $(".mask").hide(); //隐藏遮罩

                window.location.href = new Base64().decode(that.originUrl);
            });

            // 点击投资者取消按钮
            that.getElements.investorCancel.on('tap', function() {
                window.history.go(-1);
            });
        },
    }
    //调用
    question.webinit();

})