//  查看已签署材料
// @author caoqihai 2019-11-28

require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');

//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();


$(function () {
    var regulatory = {
        $e: {
            listSlot: $('.contentWrap'), // 列表
            listTemp: $('#list-template'), // 模板赋值
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            search: false, // 搜索
            reserveId: splitUrl['reserveId']
        },
        init: function () {
            var that = this;


            that.getData();
            //
            that.events();

        },


        //数据初始化
        getData: function (t) {

            var that = this

            var obj = [{
                url: site_url.querySignedContract_api, //查询已签署活动
                data: {
                    // "reserveId": "31504"
                    "reserveId": that.gV.reserveId
                },
                needDataEmpty: false,
                contentTypeSearch:true,
                callbackDone: function (json) {
                    var dataList;

                    // 待定
                    if (json.data == '') { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        dataList = json.data;
                    }

                    setTimeout(function () {
                        generateTemplate(dataList, that.$e.listSlot, that.$e.listTemp);
                    }, 200)

                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                },
                callbackNoData: function (json) {
                    that.$e.listLoading.hide();
                    that.$e.noData.show();

                },
            }]
            $.ajaxLoading(obj);

        },
        events: function (targetUrl) {
            var that = this;

        },
    }
    //调用函数
    regulatory.init();
})