/**
 * 会员俱乐部-活动列表-搜索无结果
 * @author  liuhongyu 2019-11-01
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
    var activityList={
        //元素类名
        $e:{
            //列表类名
            recordList:$('.activityNoList1'),
            //模板类名
            activityListTemp:$('#activityList-template'),
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
            startPage: 1, //当前页码，默认为1
            pageSize: 4,
            listLength: 0,
            actName:splitUrl['actName'], //活动名称
            actProvince:splitUrl['actProvince'], //活动省份名称
            actProvinceNO:splitUrl['actProvinceNO'], //活动省份编号
            actCity:splitUrl['actCity'], //活动城市名称
            actCityNO:splitUrl['actCityNO'], //活动城市编号
        },
        
        //初始化
        init:function(){
            var that = this;
            that.getData();
            that.events();
        },
        
        
        getData: function(t) {
            var that = this;
            //隐藏当前的加载中loading
            if (!$('.activityList').hasClass('hasPullUp')) {
                $('.activityList').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
            }

            //显示loading
            that.$e.listLoading.show();

            //这一句初始化并第一次执行mui上拉加载的callback函数
            // mui('.contentWrapper').pullRefresh().pullupLoading();

            //隐藏loading，调试接口时需要去掉
            //setTimeout(function(){
            that.$e.listLoading.hide();
            //}, 2000);


            //为$id添加hasPullUp  class
            $('.activityList').addClass('hasPullUp');
            var obj = [{ // 系统调仓记录列表
                url: site_url.activityList_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                        // "combCode": that.gV.groupCode, //组合代码 
                        // "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                        // "pageSize": "10" //非必须，默认为10
                        startPage:that.gV.startPage,
                        pageSize:that.gV.pageSize,
                        actName:that.gV.actName,
                        actProvince:that.gV.actProvince, //活动省份名称
                        actProvinceNO:that.gV.actProvinceNO,//活动省份编号
                        actCity:that.gV.actCity, //活动城市名称
                        actCityNO:that.gV.actCityNO, //活动城市编号
                    }
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;

                    if (json.data.pages == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = json.data.PageInfo.list;
                    }

                    // 判断调仓升降，添加颜色
                    // data = that.dealData(data);


                    setTimeout(function() {
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        generateTemplate(data,$('.activityList'),that.$e.activityListTemp)

                        // 第一个调仓记录默认展开
                        $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');

                    }, 200)

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        //操作事件
        events:function(){

        }
    }
    //调用初始化函数
    activityList.init();
})