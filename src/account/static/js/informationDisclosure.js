/**
 * 产品材料
 * @author  zhangweipeng 2017-03-11
 */

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');

var prvMar = {
    getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        midContent: $('.midContent'), // 导航
    },
    setting: { //一些设置
        navAllList: ['风险揭示书', '产品信息', '管理报告', '资金分配', '重要公告及通知', '恒天简报'],
        ajaxParamList: ['19,20,10,22', '1', '12,13,28,14', '30', '16,17,31,32,29', '33,34,35,36,37'], // 请求参数
        navList: [], //导航
        list_template: '',
        html: '',
        pageSize: 10,
    },
    status: {
        projectId: splitUrl['projectId'], // 当前页面的基金代码
        current_index: 0, //左右滑动区域的索引
        current_label: 0, //标签对应的编号，ajax请求需要
    },
    init: function () { //初始化函数
        var that = this;
        that.getReourceLabels(); // 获取标签
        that.events();
    },
    getReourceLabels: function () { // 获取标签
        var that = this;

        var obj = [{
            url: site_url.queryReourceLabelsNew_api,
            data: {
                "projectId": that.status.projectId
            },
            needLogin: true, //需要判断是否登陆
            async: false,
            needDataEmpty: true, //需要判断data是否为空
            contentTypeSearch: false,
            callbackDone: function (json) {
                var labelArr = json.data;
                for (var i = 0; i < labelArr.length; i++) {
                    if (labelArr[i] == -1) {
                        labelArr.splice(i, 1);
                    }
                }

                if (labelArr.length == 0) {
                    $('.without.noData').show();
                } else {
                    labelArr.map(function (x) {
                        var ele = {};

                        ele.type = that.setting.navAllList[x];
                        ele.num = x;

                        that.setting.navList.push(ele);
                    });

                    that.beforeFunc(); //拼模板，初始化左右滑动mui组件
                    that.initMui($('#scroll1')); //初始化第一屏
                    // that.getData($('#scroll1'));
                }

            },
            callbackNoData: function () {
                $('.without.noData').show();

            }
        }]
        $.ajaxLoading(obj);
    },
    initMui: function ($id) { //$id   就是滑动区域的 id 节点
        var that = this;
        w = $id.attr('id'), //获取节点的 id
            s = '#' + w + ' .contentWrapper'; //id 拼接 查出content区域
        mui.init({
            pullRefresh: {
                container: s,
                up: {
                    contentrefresh: '拼命加载中',
                    contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        //执行ajax请求
                        that.getData($id, this, 'more');

                    }
                }
            }
        });
        mui.ready(function () { //init后需要执行ready函数，才能够初始化出来
            //隐藏当前的加载中loading
            if (!$id.hasClass('hasPullUp')) {
                $id.find('.mui-pull-bottom-pocket').addClass('mui-hidden'); //上拉显示更多
            }
            mui(".mui-slider").slider(); //就是左右切换 可以滑动的  初始化
            //显示loading
            that.getElements.listLoading.show();
            //这一句初始化并第一次执行mui上拉加载的callback函数
            mui(s).pullRefresh().pullupLoading();
            //为$id添加hasPullUp  class
            $($id).addClass('hasPullUp');
        });
        //无缝滚动
        /*setTimeout(function() {
            
        }, 1000)*/
    },
    beforeFunc: function () { //拼模板，初始化左右滑动mui组件
        var that = this,
            contentArr = [],
            obj = {},
            height = 0;

        // list内容模板
        var source = $('#prvMar-template').html(),
            template = Handlebars.compile(source),
            list_html = template();
        // debugger
        //将生成的模板内容存到that.list_template上
        that.setting.list_template = template;

        // 外容器优先加载
        var wrap_source = $('#wrap-template').html(),
            wrap_template = Handlebars.compile(wrap_source),
            wrap_html = wrap_template({ content: list_html });

        $.each(that.setting.navList, function (i, el) {

            //循环导航配置，contentArr的个数和导航个数应该是一样的
            contentArr.push({
                id: i,
                content: wrap_html
            })
        })

        obj = {
            wrapper: $('.midContent'), //存放整个组件的区域
            needNavAction: true,
            //needBlock: true,
            navList: that.setting.navList, //导航
            contentLength: that.setting.navList.length, //左右滑动的区域个数，即导航数组长度
            contentList: contentArr, //此时只有框架，实际列表内容还未请求
            callback: function (t) {
                //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点

                //data-scroll属性即当前左右切换区域的索引
                var index = t.attr('data-scroll');

                //data-scroll属性即当前左右切换区域的索引
                that.status.current_index = index;

                //判断当前区域是否已经初始化出来上拉加载
                if (t.hasClass('hasPullUp')) {
                    //有这个class，表示已经初始化，不再执行下一步
                    return false;
                }
                //没有初始化，请求第一次数据
                // that.getData(t);
                that.initMui(t);

            }
        }
        $.tabScroll(obj);

        //设置切换区域的高度
        //计算节点高度并设置
        var height = windowHeight - $(".nav-wrapper").height() - 1 - document.getElementById('scroll1').getBoundingClientRect().top;
        if (!$('.list').hasClass('setHeight')) {
            $('.list').height(height).addClass('setHeight');
        }
    },
    getData: function ($id, t) {

        var that = this,
            fileType = '',
            obj = {};

        fileType = that.getFileType();

        obj = [{ //获取产品列表
            url: site_url.queryReourceListNew_api, //私募产品列表  queryReourceListNew.action
            // data: {
            // hmac: "", //预留的加密信息 非必填项
            data: { //请求的参数信息
                projectId: that.status.projectId, // 产品代码
                fileType: fileType,
                // }
            },
            needLogin: true,
            needDataEmpty: true,
            async: false,
            contentTypeSearch: false,
            callbackDone: function (json) {
                var json = json.data;
                if (json.length == 0) {
                    //没有数据
                    $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                    $id.find('.noData').show();

                    setTimeout(function () {
                        that.getElements.listLoading.hide();
                    }, 100);
                } else {
                    $.each(json, function (i, el) {
                        el.name = el.fileName.substring(1, el.fileName.indexOf("】") + 1);
                        el.names = el.fileName.substring(1, el.fileName.indexOf("】"));
                        el.marName = el.fileName.substring(el.fileName.indexOf("】") + 1);
                        if (el.fileName.indexOf(".pdf") != -1) {
                            el.line = true; //线上可预览
                            el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName + "&show=1";
                        } else {
                            el.line = false; //需下载
                            el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName;
                        }
                    })

                    that.setting.html = that.setting.list_template(json);

                    $id.find('.contentWrapper .mui-table-view-cell').html(that.setting.html);
                    that.getElements.listLoading.hide();
                    $id.addClass('hasPullUp');

                }

            },
            callbackFail: function (json) {
                //请求失败，
                //隐藏loading
                //that.getElements.listLoading.hide();
                //显示错误提示
                tipAction(json.msg);

                // t.endPullupToRefresh(false);
                // $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                //隐藏loading，调试接口时需要去掉
                setTimeout(function () {
                    that.getElements.listLoading.hide();
                }, 100);
                //return false;
            },
            callbackNoData: function (json) {
                //没有数据
                $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                $id.find('.noData').show();

                setTimeout(function () {
                    that.getElements.listLoading.hide();
                }, 100);
            }

        }]
        $.ajaxLoading(obj);
    },
    getFileType: function () { //获取标签编号
        var that = this;
        that.status.current_label = that.getElements.midContent.find('.nav-wrapper .mui-control-item.mui-active').attr('num');
        return that.setting.ajaxParamList[that.status.current_label];
    },
    events: function () {
        mui("body").on("mdClick", ".mui-box", function () {
            // if(window.currentIsApp){
            window.location.href = $(this).attr("href");
            // }else{
            // window.open($(this).attr("href"));
            // }
            // debugger
            // var src=$(this).attr("href")
            // var form = document.createElement('form');
            // form.action = src;
            // document.getElementsByTagName('body')[0].appendChild(form);
            // form.submit();
        }, {
                'htmdEvt': 'informationDisclosure_0'
            })
    }
}
prvMar.init();