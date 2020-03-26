/**  
 * @Page:  新发基金
 * @Author: zhangyanping
 * @Date:   2019-12-16
 * 
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var moment = require('moment');
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');

$(function() {
    var newFundDetail = {
        getElements: {
            secuId: '', // 基金编码
            fmcComName: '', //基金公司 
            chiName: '', ///基金中文名称
            fundCode: splitUrl['fundCode'],
            productStatus: splitUrl['productStatus'], // productStatus=0 立即买入按钮可点击 productStatus=1 立即买入按钮置灰不可点击
        },
        gV: {
            singleaAuthenPath: "", //一键认证路径
            realLi: $('#real-condition>li'),
            tipsWrap: $("#tips-wrap"),
            isHighAgeStatus:true,  //投资者年龄默认小于60的状态为true  大于就位false
            accountType:null, //客户类型  0-机构 1-个人
            isWealthAccountStatus:"", //是否开通账户状态
            userStatus:"", // 为空则是新用户   为0普通投资者  为1专业投资者
            investorStatus: '' // 投资者状态
        },
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },
        getData: function() {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                data: {
                    fundCode: that.getElements.fundCode,
                },
                callbackDone: function(json) {
                    var jsonData = json.data;
                    //当前时间
                    var nowDate = new Date();
                    // var endDate = new Date(jsonData.issEndDt + ' 23:59:59');
                    var numTimer = jsonData.issEndDt + ' 15:00:00';//截止15点，基金购买时间
                    // 字符串转时间的方法
                    var endDate = new Date(Date.parse(numTimer.replace(/-/g, "/")));
                    var totalSeconds = parseInt((endDate - nowDate) / 1000); // 当前时间与募集截止日的日期相比
                    // var issBgnDt = new Date(jsonData.issBgnDt + ' 00:00:00');
                    var issBgnDtTime = jsonData.issBgnDt + ' 00:00:00';
                    var issBgnDt = new Date(Date.parse(issBgnDtTime.replace(/-/g, "/")))
                    var timeDiff = parseInt((issBgnDt - nowDate) / 1000); // 当前时间与募集起始日的日期相比
                    // 基金简称 + 基金编码
                    $("#HeadBarpathName").html("<span>" + jsonData.secuSht + "</span>" + "</br><span class='secuId'>" + jsonData.trdCode + "</span>");
                    // that.setHeadLineHeight()
                    // 认购期
                    $('.subscriptionDate').html(jsonData.issBgnDt + '-' + jsonData.issEndDt);
                    // 新发基金倒计时

                    if (totalSeconds > 0) {
                        that.TimeDown(endDate);
                        that.getElements.productStatus = 0;
                    } else if (totalSeconds <= 0 && jsonData.issBgnDt || timeDiff > 0) {
                        $('.subscriptionTime').html('<span>00</span>天<span>00</span>小时<span>00</span>分<span>00</span>秒');
                        $('.buyButton').attr("disabled", true).addClass('disable');
                    }
                    // 认购流程的募集期
                    $('.collectDate').html(jsonData.issEndDt.substring(5));
                    
                    // 当折扣率为0时，只显示黑色不带删除线的购买费率
                    if(jsonData.discount == 0) {
                        $('.discountRate').html(jsonData.purchaseRate + '%');
                    } else {
                        // 购买费率
                        $('.purchaseRate').html(jsonData.purchaseRate + '%');
                        $('.discountRate').html((jsonData.discountRate / 100).toFixed(2) + '%');
                    }
                    // 认购起点
                    $(".buyStart").html(jsonData.tradeLimitList[0].minValue);

                    that.getElements.secuId = jsonData.secuId;
                    // 基金经理
                    $('.fundManagerTxt').html(jsonData.fundManager?jsonData.fundManager:"--");
                    // 基金公司
                    $('.fundCompanyTxt').html(jsonData.fmcComName?jsonData.fmcComName:"--");
                    that.getElements.fmcComId = jsonData.fmcComId;

                    // if(that.getElements.productStatus == 1){
                    //  $('.buyButton').attr("disabled", true).addClass('disable'); 
                    // }
                    that.getElements.chiName = jsonData.chiName;
                },
                callbackNoData: function(json) {
                    $('.subscriptionTime').html('<span>00</span>天<span>00</span>小时<span>00</span>分<span>00</span>秒');
                },
            }]
            $.ajaxLoading(obj);
        },
        TimeDown: function(endDateStr) {
            var that = this;
            var endDate = new Date(endDateStr);
            //当前时间
            var nowDate = new Date();
            //相差的总秒数
            var totalSeconds = parseInt((endDate - nowDate) / 1000);
            //天数
            var days = Math.floor(totalSeconds / (60 * 60 * 24));
            //取模（余数）
            var modulo = totalSeconds % (60 * 60 * 24);
            //小时数
            var hours = Math.floor(modulo / (60 * 60));
            modulo = modulo % (60 * 60);
            //分钟
            var minutes = Math.floor(modulo / 60);
            //秒
            var seconds = modulo % 60;

            setTimeout(function() {
                that.TimeDown(endDateStr);
            }, 1000)

            $('.subscriptionTime').html('<span>' + days + '</span>天<span>' + hours + '</span>小时<span>' + minutes + '</span>分<span>' + seconds + '</span>秒')
        },
        setHeadLineHeight: function() {
            if ($("#HeadBarpathName").height() <= $(".backBtn").height()) {
                $("#HeadBarpathName").removeClass("doubleLines").addClass("singleLine")
            } else {
                $("#HeadBarpathName").removeClass("singleLine").addClass("doubleLines")
            }
        },
        events: function() {
            var that = this;
            // 基金档案
            mui("body").on('mdClick', ".fundFile", function(e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + that.getElements.secuId + '&fundCode=' + that.getElements.fundCode;
            }, {
                htmdEvt: 'newFundDetail_0'
            });

            // 基金经理
            mui("body").on('mdClick', ".fundManager", function(e) {
                if($(".fundManagerTxt").html() != "--"){
                    window.location.href = site_url.pofFundManager_url + '?fundCode=' + that.getElements.fundCode;
                }
            }, {
                htmdEvt: 'newFundDetail_1'
            });

            // 基金公司
            mui("body").on('mdClick', ".fundCompany", function(e) {
                if($(".fundCompanyTxt").html() != "--"){
                  window.location.href = site_url.pofFundCompany_url + '?fundComId=' + that.getElements.fmcComId;                  
                }
            }, {
                htmdEvt: 'newFundDetail_2'
            });

            // 买入
            mui("body").on('mdClick', ".buyButton", function(e) {
                var $this = $(this);
                if ($this.hasClass("disable")) {
                    return false;
                } else {
                    // 先判断是否司法冻结以及身份过期，再判断一键认证
                    var result = frozenAccount("buyFreeze", window.location.href, false,'newFundDetail_4');
                    if( !result ) {
                       var url = site_url.fundTransformIn_url + '?fundCode=' + that.getElements.fundCode + '&fundName=' + that.getElements.chiName+"&noReload=1";
                       authenticationProcess(that.getElements.fundCode, url, false,'newFundDetail')
                    };
                    //that.getConditionsOfOrder();
                }

            }, {
                htmdEvt: 'newFundDetail_3'
            });

        },
    }
    /*调用*/
    newFundDetail.init();
})