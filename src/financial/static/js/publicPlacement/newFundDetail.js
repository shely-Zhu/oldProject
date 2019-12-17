/**  
 * @Page:  新发基金
 * @Author: zhangyanping
 * @Date:   2019-12-16
 * 
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function () {
    var newFundDetail = {
        getElements: {
            secuId:'',  // 基金编码
            fmcComName:'',  //基金公司 
            chiName:'',  ///基金中文名称
            fundCode:splitUrl['fundCode'],
            productStatus:splitUrl['productStatus'],  // productStatus=0 立即买入按钮可点击 productStatus=1 立即买入按钮置灰不可点击
        },
        init: function () {
            var that = this;
            that.getData();

            that.events();
        },
        getData: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                data: {
                    fundCode: that.getElements.fundCode,
                },
                callbackDone: function (json) {
                    var jsonData = json.data;
                    //当前时间
		    		var nowDate = new Date();
		    		var endDate = new Date(jsonData.issEndDt);
		    		var totalSeconds = parseInt((endDate - nowDate) / 1000);

                    $('#HeadBarpathName').html(jsonData.chiName + jsonData.secuId);
                    // 认购期
                    $('.subscriptionDate').html(jsonData.issBgnDt + '-' + jsonData.issEndDt);
                    // 新发基金倒计时

                    if(totalSeconds > 0){
                    	that.TimeDown(jsonData.issEndDt);
                    }else{
                    	$('.subscriptionTime').html('<span>00</span>天<span>00</span>小时<span>00</span>分<span>00</span>秒')
                    }

                    // 认购流程的募集期
                    $('.collectDate').html(jsonData.issEndDt.substring(5));
                    // 购买费率
                    $('.buyRateTip').html(jsonData.purchaseRate + '%');
                    $('.buyRate span').html(jsonData.purchaseRate + '%');
                    // 认购起点
                    $(".buyStart").html(jsonData.tradeLimitList[0].minValue);

                    that.getElements.secuId = jsonData.secuId;
                    // 基金经理
                    $('.fundManagerTxt').html(jsonData.fundManager);
                    // 基金公司
                    $('.fundCompanyTxt').html(jsonData.fmcComName);
                    that.getElements.fmcComId = jsonData.fmcComId;

                    if(that.getElements.productStatus == 1){
                    	$('.buyButton').attr("disabled", true).addClass('disable');	
                    }
                    that.getElements.chiName = jsonData.chiName;
                },
                callbackFail: function (json) {
                    tipAction(json.message);
                },
                callbackNoData:function(json){
					tipAction(json.message);
				},
            }]
            $.ajaxLoading(obj);
        },
        TimeDown:function(endDateStr){
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

	        setTimeout(function () {
		        that.TimeDown(endDateStr);
		    }, 1000)

            $('.subscriptionTime').html('<span>'+days+'</span>天<span>'+hours+'</span>小时<span>'+minutes+'</span>分<span>'+seconds+'</span>秒')
        },
        events: function () {
        	var that = this;
        	// 基金档案
            mui("body").on('mdClick', ".fundFile", function (e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + that.getElements.secuId + '&fundCode=' + that.getElements.fundCode;
            },{
            	htmdEvt: 'newFundDetail_0'
            });

            // 基金经理
            mui("body").on('mdClick', ".fundManager", function (e) {
                window.location.href = site_url.pofFundManager_url + '?fundCode=' + that.getElements.fundCode;
            },{
            	htmdEvt: 'newFundDetail_1'
            });

            // 基金公司
            mui("body").on('mdClick', ".fundCompany", function (e) {
                window.location.href = site_url.pofFundCompany_url + '?fundComId=' + that.getElements.fmcComId;
            },{
            	htmdEvt: 'newFundDetail_2'
            });

             // 买入
            mui("body").on('mdClick', ".buyButton", function (e) {
            	var $this = $(this);
            	if($this.hasClass("disable")){
            		return false;
            	}else{
                	window.location.href = site_url.fundTransformIn_url + '?fundCode=' + that.getElements.fundCode + '&fundName=' + that.getElements.chiName;
            	}
               
            },{
            	htmdEvt: 'newFundDetail_3'
            });
         
        },

    }
    /*调用*/
    newFundDetail.init()
})