/**
 * 获取发卡银行列表，并转换成mui所用格式
 * @author yangjinlai 2017-02-15

 * 鉴权需要传的capitalMode对应的是银行列表里的bankChanel字段
 */

require('../js/components/utils.js');
require('../js/ajaxLoading.js');
var tipAction = require('../js/components/tipAction.js');

var list = [];

if (window.location.href.indexOf('realNameStepOne') != -1) {
    var obj = [{
        url: site_url.bankInfoList_api,
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息
                type: "1"  // 是否支持鉴权 0：否 1：是 ,不传查询全部
            }
        },
        needLogin: true,
        async: false,
        callbackDone: function(json) {
            //保存获取到的银行信息    
            var jsonData = json.data;
            if (!$.util.objIsEmpty(jsonData.pageList)) {
                var pageList = jsonData.pageList;
                $.each(pageList, function(i, el) {
                    list.push({
                        value: el.bankIdNo,
                        text: el.bankName,
                        sonDicNo: el.bankChanel,
                    })

                })
            }
        },
        callbackFail: function(json) {

        }
    }];
    $.ajaxLoading(obj);
}



module.exports = list;