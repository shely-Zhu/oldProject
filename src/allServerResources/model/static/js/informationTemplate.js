/**
 * 产品材料
 * @author  zhubingshuai 2020-04-09
 */

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var Base64 = require('@pathIncludJs/vendor/base64/base64.js');

var prvMar = {
    getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        midContent: $('.midContent'), // 导航
    },
    
    init: function () { //初始化函数
        var that = this;
        that.getData(); // 获取标签
        // that.events();
        // 获取url地址参数
        var titleChange = splitUrl['viewpoint'] // 1:市场观点
        if (titleChange == 1) {
            $("#HeadBarpathName").html("<span>证券市场观点</span>");
        } else {
            $("#HeadBarpathName").html("<span>证券产品观点</span>");
        }
        // console.log(splitUrl['projectId'])
    },
    getData: function () { // 获取标签
        var that = this;
        var obj = [{
            url: site_url.getInformationWeeklyPosition_api,
            callbackDone: function (json) {
                console.log(json)
            },
            callbackNoData: function () {
                $('.without.noData').show();

            }
        }]
        $.ajaxLoading(obj);
    }
}
prvMar.init();