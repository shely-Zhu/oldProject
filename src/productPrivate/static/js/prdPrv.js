/**
 * 私募产品列表
 * @author  zhangweipeng 2017-03-07

 * 私募接口改造
 * @time 2018-09-25  ping

 */

require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/app/ifApp.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/tabScroll.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/goTopMui.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
require('../../../common/js/components/bottomNav.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/userCheck.js');
//判断是否为APP
require('../../../common/js/components/app/ifApp.js');
var prdPrv = {
    html: null,
    index: 0,
    //请求基金列表所需的参数，公用的在这里设置默认值
    ajaxParams: {
        pageNo: 1, //当前页码，默认为1
        pageSize: 10, //每页显示几条数据，根据需求为20
        publicFundsType: "7", //基金类型(默认全部)
    },
    getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        searchicon: $(".mui-icon-search"), //搜索按钮
        gmBtn: $(".gmBtn"), //公募按钮
        $prdPrvList: $('.prdPrvList'), //列表页
    },
    page: 1, //当前页码，默认为1
    jsonData: null, //数据存放
    setting: {
        //导航
        navList: [
            { type: "债权投资", code: 7 },
            { type: "股权投资", code: 9 },
            { type: "二级市场", code: 8 },
            // { type: "海外投资", code: 10 },
            { type: "其他投资", code: 13 }
        ],
        //每条列表的模板，生成后存放在这里，方便后面ajax请求新的数据时重复使用
        con_template: '',
    },
    //初始化函数
    init: function() {
        var that = this;

        //拼模板，初始化左右滑动mui组件---这个必须放到usercheck(跨域请求)之前，否则mui会监测到页面状态变更，先去执行mui.ready
        that.beforeFunc();

        //检查是否登录及风险测评
        $.userCheck(true, function() {

            //初始化第一屏区域的上拉加载
            that.initMui($('#scroll' + Number(that.getName() + 1)));

            that.events();
        });
    },
    beforeFunc: function() {
        var that = this;
        //设置切换区域的高度
        //计算节点高度并设置
        var con_source = $('#productList-template').html(),
            con_template = Handlebars.compile(con_source);
        var html = con_template({ list: [] });

        //列表外容器优先加载
        var list_source = $('#productList-list-template').html(),
            list_template = Handlebars.compile(list_source);
        //全部及非货币型
        var other_list_html = list_template({ content: [] });

        //将生成的模板内容存到that.list_template上
        that.setting.con_template = con_template;

        var contentArr = [];
        //存放每一个基金类型对应的ajax请求的传参数据
        that.ajaxArr = [];
        $.each(that.setting.navList, function(i, el) {

            //循环导航配置，contentArr的个数和导航个数应该是一样的
            contentArr.push({
                id: i,
                content: other_list_html
            })
            //填充ajaxArr，生成所有类型的ajax请求的传参
            //pageCurrent默认为that.setting.pageCurrent
            //pageSize默认为that.setting.pageSize
            //在切换区域，或者上拉加载时，修改对应的参数值
            that.ajaxArr[el.code] = {
                channel: "app", //来源（PC端：“pc”； APP或WAP端：“app”）
                pageNo: that.ajaxParams.pageNo,
                pageSize: that.ajaxParams.pageSize, //每页记录数 
                investDirection: el.code, //产品投向
            }
        })

        var obj = {
            wrapper: $('.prdPrvList'),
            navList: that.setting.navList,
            contentList: contentArr,
            contentLength: that.setting.navList.length,
            activeList: that.getName(),
            callback: function(t) {
                var index = t.attr('data-scroll');
                that.ajaxParams.publicFundsType = that.setting.navList[index].code;
                //重设当前上拉组件的区域索引
                that.index = index;

                //判断当前区域是否已经初始化出来上拉加载
                if (t.hasClass('hasPullUp')) {
                    //有这个class，表示已经初始化，不再执行下一步
                    return false;
                }

                //没有hasPullUp class，表示没有初始化，调用initMui，进行初始化
                //并请求第一次数据
                that.initMui(t);
            }
        }
        $.tabScroll(obj);
    },
    initMui: function($id, currentType) {
        var that = this,
            w = $id.attr('id'),
            s = '#' + w + ' .contentWrapper',
            list = $id.find('.list')[0];

        that.index = $id.attr('data-scroll');

        if (that.index == 0) {
            that.getNewProduct($id);
        }

        if (!$(list).hasClass('setHeight')) { // 需要对每个tab重设scroll高度
            that.setHeight($id, list);
        }

        mui.init({
            pullRefresh: {
                container: s,
                up: {
                    //auto: false,
                    contentrefresh: '拼命加载中',
                    contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function() {
                        that.commonAjax($id, this);
                    }
                }
            }
        });

        //init后需要执行ready函数，才能够初始化出来
        mui.ready(function() {

            //隐藏当前的加载中loading
            if (!$id.hasClass('hasPullUp')) {
                $id.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
            }

            //显示loading
            that.getElements.listLoading.show();

            //这一句初始化并第一次执行mui上拉加载的callback函数
            mui(s).pullRefresh().pullupLoading();

            //隐藏loading，调试接口时需要去掉
            setTimeout(function() {
                that.getElements.listLoading.hide();
            }, 200);


            //为$id添加hasPullUp  class
            $($id).addClass('hasPullUp');
        });
    },
    //获取产品数据的公用ajax方法
    //$id为各区域的 scroll+num id
    commonAjax: function($id, t) {
        var that = this;

        //获取产品列表
        var obj = [{
            url: site_url.prvFundQuery_api, //私募产品列表  fundQuery.action
            data: {
                hmac: "", //预留的加密信息   
                params: that.ajaxArr[that.ajaxParams.publicFundsType]
            },
            needDataEmpty: false,
            needLogin: true,
            callbackDone: function(json) {
                var jsonData = json.data;

                var pageList = jsonData.pageList;

                if (!$.util.objIsEmpty(pageList)) {
                    //有数据，生成模板                  
                    $.each(pageList, function(i, el) {
                        if (el.bonusTypeOri == "2") {
                            el.solid = true; //类固收
                            //2019-02-25修改
                            //判断el.expectedProfitMin字段是否为空，排除el.expectedProfitMin为0的情况
                            if( !el.expectedProfitMin && el.expectedProfitMin !== 0){
                                el.expectedProfitMin = '--';
                            }
                        } else if (el.bonusTypeOri == "3") {
                            el.solid = false; //浮收
                            //2019-02-25修改
                            //判断el.netValue字段是否为空，排除el.netValue为0的情况
                            if( !el.netValue && el.netValue !== 0){
                                el.netValue = '--';
                            }
                            //判断el.netValueDate字段是否为空，排除el.netValueDate为0的情况
                            if( !el.netValueDate && el.netValueDate !== 0){
                                el.netValueDate = '--';
                            }
                        }

                        if (el.netValueDate) {
                            el.netValueDate = el.netValueDate.substr(el.netValueDate.indexOf("-") + 1, );
                        }
                        if (Number(el.expectedProfitMax) <= Number(el.expectedProfitMin)) {
                            el.expectedProfitMax = 0;
                        }
                    })
                    var html = that.setting.con_template(pageList);
                    //设置这两参数，在initMui()中使用
                    //判断是否显示没有更多了等逻辑，以及插入新数据
                    that.listLength = pageList.length;
                    that.html = html;

                    //重设当前页码
                    var pageItems = jsonData.pageItems;
                    if (pageItems.totalPages == that.ajaxArr[that.ajaxParams.publicFundsType].pageNo) { //当前最后一页
                        t.endPullupToRefresh(true);
                        $id.find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    } else {
                        if (!$.util.objIsEmpty(pageList)) {
                            //设置每个当前基金的ajax传参数据中的当前页码
                            that.ajaxArr[that.ajaxParams.publicFundsType].pageNo++;
                        }
                    }
                    //有数据的时候            
                    setTimeout(function() {

                        if (that.listLength < that.ajaxParams.pageSize) {
                            //其他页
                            t.endPullupToRefresh(true);
                        } else {
                            t.endPullupToRefresh(false);
                        }
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $id.find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        //将列表插入到页面上
                        $id.find('.contentWrapper .mui-table-view-cell').append(that.html);
                    }, 200)
                } else {
                    //没有数据
                    if (that.ajaxArr[that.ajaxParams.publicFundsType].pageNo == 1) {
                        //第一页时
                        $id.find('.list .mui-table-view-cell').append(that.getElements.noData.clone()).css("boxShadow", "none");
                        $id.find('.noData').show();
                    } else {
                        //其他页
                        t.endPullupToRefresh(true);
                        $id.find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    }
                }

            },
            callbackFail: function(json) {
                //请求失败，
                //隐藏loading
                that.getElements.listLoading.hide();
                //显示错误提示
                tipAction(json.msg);
            }
        }]
        $.ajaxLoading(obj);
    },
    getName: function() {
        var that = this,
            name = Number(decodeURIComponent(splitUrl()["name"])),
            arr = [];

        $.each(that.setting.navList, function(i, j) {
            arr.push(i)
        })

        var num = $.inArray(name, arr);


        if (num != -1) {
            that.ajaxParams.publicFundsType = that.setting.navList[num].code;
            return num
        } else {
            return 0;
        }
    },
    getNewProduct: function($id) {
        var that = this;

        //获取产品列表
        var obj = [{
            url: site_url.prvLight_api, //新手产品  queryProductImage.action
            data: {
                hmac: "", //预留的加密信息
                params: { //请求的参数信息
                    limitNum: "1", // 限制数（只显示N张）
                    productModule: "newGuestEnjoyAPP"
                }
            },
            async: false,
            callbackDone: function(json) {
                var jsonData = json.data[0],
                    imgPath = jsonData.imgPath,
                    productCode = jsonData.productCode;

                that.createImage($id, imgPath, productCode);
            },
            callbackFail: function(json) {
                //请求失败，
                //显示错误提示
                tipAction(json.msg);
            }
        }]
        $.ajaxLoading(obj);
    },
    createImage: function($id, imgPath, productCode) {
        var that = this,
            list = $id.find('.list')[0];

        $id.find('.mui-other-area').html('<img src="' + imgPath + '" id="newImage" data-code=' + productCode + '>');

        var img = document.getElementById("newImage");

        img.onload = function() {
            that.setHeight($id, list);
        }

    },
    setHeight: function($id, list) {
        var height = windowHeight - list.getBoundingClientRect().top;

        height = height - $('.bottomNav').height();
        $(list).height(height).addClass('setHeight');
    },
    events: function() {
        var that = this;

        that.getElements.searchicon.on("click", function() {
            window.location.href = "/productPrivate/views/search.html";
        });
        mui(".contentWrapper").on("tap", ".mui-card", function() {
            window.location.href = $(this).attr("href");
        })
        that.getElements.gmBtn.on("tap", function() {
            window.location.href = "/productPublic/views/publicList.html";
        });

        $(".productInput").on("click", function() {
            window.location.href = "/productPrivate/views/search.html";
        });
        mui('.prdPrvList').on('tap', '.mui-other-area', function() {
            var fundCode = $(this).find('img').attr('data-code');
            window.location.href = site_url.productPrvDetail_url + '?fundCode=' + fundCode;
        })
    }
}
prdPrv.init();