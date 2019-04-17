/**
 * 账户冻结弹框提示
 * @author  sunfuping 2019-1-2
 *
 * 私募预约、私募赎回、公募买入、公募赎回、购买，赎回的详情页面初始化调用
 *
 *value买入传buyFreeze  卖出传saleFreeze 
 *
 *url 调用的方法的当前页面 
 *
 * custType  机构客户和个人  如果拿不到传false   能拿到传具体的值
 * 
 */
var tipAction = require('./tipAction.js');
function isCustTypeOne(outdateFreezeStatus, lawFreezeStatus, url, custType) {
    var f = false;
    var userObj = [{
            url: site_url.user_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                }
            },
            async: false,
            riskIsData: true,
            appRisk: true,
            needDataEmpty: false,
            needLogin: true,
            callbackDone: function(data, fnc) {
                
                var jsonData = data.data;
                // 获取客户是机构客户还是个人客户
                f = elasticLayer(outdateFreezeStatus, lawFreezeStatus, url, jsonData.accountType); // 调用弹框
            },
             
        }]
        $.ajaxLoading(userObj);
        return f;
};

function elasticLayer(outdateFreezeStatus, lawFreezeStatus, url, custType) {

    var custType = (custType == "0" || custType == "2") ? true : false;  //机构为true

	if(lawFreezeStatus == 1) {
		$.elasticLayerTypeTwo({
			id: "tip",
			title: '温馨提示',
			p: '<p>因司法原因该账户被冻结，请联系客服咨询！客服电话：400-8980-618！</p>',
			buttonTxt: '确认',
			zIndex: 100,
			callback: function() {}
		});
    	return true;
	} else if(outdateFreezeStatus == 1) {
        var idDateObj = {
            title: '温馨提示',
            p: '您的证件已过期，补充证件信息后才可能继续交易',
            yesTxt: custType ? '确认' : '完善资料', // 机构展示确认   个人展示完善资料
            celTxt: '取消',
            yesButtonPosition: 'right',
            callback: function(t) {
                if( custType ){
                    t.hide();
                }else{
                    t.hide();
                    window.location.href = site_url.perBass_url + '?originUrl=' + new Base64().encode(url); // 点击完善资料跳转到基本信息页
                }
            },

        }
        $.elasticLayer(idDateObj);
        return true;
    }
};

module.exports = function(value, url, custType) {
	var r = false;

	var alterMsgStatus = [{
        url: site_url.queryFreezeStatus_api,
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息

            }
        },
        async: false,
        needLogin: true,
        callbackDone: function(data) {
        	var data = data.data,
        		buyFreeze = data.buyFreeze,
        		saleFreeze = data.saleFreeze;
        	if( (value == "buyFreeze" && buyFreeze == 1) || (value == "saleFreeze" && saleFreeze == 1) ) {
                if(custType) { // 如果传客户类型调用弹框的方法
                    r = elasticLayer(data.outdateFreezeStatus, data.lawFreezeStatus, url, custType);
                } else{ // 如果没传调用getuserinfo接口获取客户类型
                    r = isCustTypeOne(data.outdateFreezeStatus, data.lawFreezeStatus, url, custType);
                }
        		
        	}
	
        },
        callbackFail: function(json) {
            tipAction(json.message);
            r = true;
        }
    }];
    $.ajaxLoading(alterMsgStatus);

    return r;
}