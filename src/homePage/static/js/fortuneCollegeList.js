//  财富讲堂
// @author liliang 2019-11-20 
/*

update chentiancheng 2020年1月9日23:58:11

*/

require('@pathCommonBase/base.js');
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
// 切换
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
Slider = require('@pathCommonJs/components/sliderMui.js'); // 轮播
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');


$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData1: $('.tab-b .noData')
        },
        gV: { //一些设置
            aP: {
                pageCurrent: 1,
                pageSize: 10,
            },
            current_index: 0, //左右滑动区域的索引
            list_template: '', //列表的模板，生成后存放在这里
            ajaxArr: [], //存放每一个ajax请求的传参数据
            // 存放ajax请求地址  已持仓  待确认
            siteUrlArr: [site_url.queryFortuneArticleList_api, site_url.queryFortuneArticleList_api, site_url.queryFortuneArticleList_api, site_url.queryFortuneArticleList_api],
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            navHeight: '', // nav高度
            ul2NoData: [], //财富研究没有数据存储下标

        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;


            that.getTabsListData(); //获取tabs标签
            that.getDataBanner();
            that.getFortuneCollegeFir();
            that.getFortuneCollegeFirCf();
            that.getFortuneForum();
            //事件监听
            that.events();
        },
        getDataBanner: function() {
            var that = this;
            var obj = [{
                url: site_url.queryBanner_api,
                data: {
                    type: "25"
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var imgArr = [];

                    $.each(json.data.bannerList, function(i, el) {
                        imgArr.push({ imgUrl: el.imageUrlShowOnline, linkUrl: el.linkUrl,externalUrl:el.externalUrl,linkType:el.linkType });
                    });
                    Slider($('.banner'), imgArr);
                }
            }]
            $.ajaxLoading(obj);
        },
        //金牌翻译官
        getFortuneCollegeFir: function() {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneCollegeFir_api,
                data: {
                    type: "26", //类型金牌翻译官
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.data && json.data.list && json.data.list.length > 0) {
                        $('.translate').removeClass('hide');
                        modelData = json.data.modelVO;
                        articleData = json.data.list;
                        console.log('我是什么', articleData);
                        // 将列表插入到页面上
                        generateTemplate(modelData, $('.translate .title'), $('#fortune-template'));
                        generateTemplate(articleData, $('.translate .content'), $('#content-template'));
                    }
                }
            }]
            $.ajaxLoading(obj);
        },
        //财富早知道
        getFortuneCollegeFirCf: function() {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneCollegeFir_api,
                data: {
                    type: "27", //类型财富早知道
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.data && json.data.list && json.data.list.length > 0) {
                        $(".fortuneVideo").removeClass('hide');
                        modelData = json.data.modelVO;
                        articleData = json.data.list;

                        // 将列表插入到页面上
                        generateTemplate(modelData, $('.fortuneVideo .title'), $('#fortuneCf-template'));
                        generateTemplate(articleData, $('.fortuneVideo ul'), $('#video-template'));
                        $(".lazyload").lazyload();
                    }
                }
            }]
            $.ajaxLoading(obj);
        },
        //财富讲堂
        getFortuneForum: function() {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneCollegeSec_api,
                data: {
                    type: "28", //类型财富讲堂
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.data && json.data.list && json.data.list.length > 0) {
                        $(".forum").removeClass('hide');
                        listData = json.data.list;
                        console.log(listData);
                        modelData = json.data.modelVO;
                        var listTitle = [];
                        var listContent = [];
                        for (var i = 0; i < listData.length; i++) {
                            listTitle.push({ sonModelName: listData[i].sonModelName })
                            listContent.push({ listContent: listData[i].list })
                        };
                        console.log('我是listtitle', listTitle);
                        console.log('我是listContent', listContent);
                        generateTemplate(modelData, $('.forum .title'), $('#forum-template'));
                        generateTemplate(listTitle, $('.broadcast'), $('#forumTitle'));
                        generateTemplate(listContent, $('.forumList'), $('#forumContent'));
                        $(".lazyload").lazyload();
                        setTimeout(function() {
                            $('.broadcast').find('.bigspan').eq(0).addClass('getColor');
                            $('.broadcast').find('.bigspan').eq(0).css({ "paddingLeft": 0, "borderLeft": 'none' });
                        }, 100);
                        mui('.mui-scroll-wrapper').scroll({
                            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
                        });
                    }
                }
            }]
            $.ajaxLoading(obj);
        },
        beforeFunc: function() { //拼模板，初始化左右滑动mui组件
            var that = this,
                contentArr = []; //传给tabScroll组件的contentList参数的数组

            // list内容模板
            var source = $('#second-template').html(), //获取 整个模板的html
                template = Handlebars.compile(source), //转换成方法
                list_html = template(); //方法执行

            //将生成的模板内容存到that.list_template上
            that.gV.list_template = template;



            // 外容器优先加载
            var wrap_source = $('#first-template').html(),
                wrap_template = Handlebars.compile(wrap_source),
                wrap_html = wrap_template({ content: list_html }); //模板生成
            $.each(that.gV.navList, function(i, el) {

                that.gV.ajaxArr[i] = {
                    articleBelong: el.num, //请求类型
                    pageNo: that.gV.aP.pageCurrent, //当前第几页(默认为1) 非必填项, 默认设置成第一页
                    pageSize: that.gV.aP.pageSize, //每页显示几条数据(默认10) 非必填项， 默认设置成20
                }
                contentArr.push({
                    id: i,
                    content: wrap_html
                })
            });

            var obj = {
                wrapper: $('.myAsset'), //存放整个组件的区域
                needNavAction: false,
                //needBlock: true,
                navList: that.gV.navList, //导航
                contentLength: that.gV.navList.length, //左右滑动的区域个数，即导航数组长度
                contentList: contentArr, //此时只有框架，实际列表内容还未请求
                callback: function(t) { //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
                    //data-scroll属性即当前左右切换区域的索引
                    var index = t.attr('data-scroll');
                    //data-scroll属性即当前左右切换区域的索引
                    that.gV.current_index = index;

                    //判断当前区域是否已经初始化出来上拉加载
                    if (t.hasClass('hasPullUp')) {

                        return false;
                    }

                    //没有hasPullUp class，表示没有初始化，调用initMui，进行初始化
                    //并请求第一次数据
                    // that.initMui(t);
                    that.getData(t);
                }
            };
            $.tabScroll(obj);

            //此时所有切换区域的内容都是空的
            //设置切换区域的高度
            //计算节点高度并设置
            if (!that.height) {

                that.gV.listToTop = document.getElementById('scroll1').getBoundingClientRect().top;
                that.gV.navToTop = document.getElementById('slider').getBoundingClientRect().top;
                that.gV.navHeight = that.gV.listToTop - that.gV.navToTop;
                that.htmlHeight = windowHeight - that.gV.listToTop;

                that.htmlHeight = windowHeight - $('.nav-wrapper').height();

                console.log('距顶部距离：' + that.gV.listToTop);

                that.highHeight = windowHeight - that.gV.listToTop;
            }

            // 为实现滚动区域滚动到顶部，定位，添加遮罩层
            $('.scroll_mask').css('top', that.gV.listToTop)
        },

        initMui: function($id) { //$id   就是滑动区域的 id 节点

            that.getData($id);

        },
        // 财富研究
        getTabsListData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneCollegeSec_api,
                data: {
                    type: 29
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.data && json.data.list && json.data.list.length > 0) {
                        $('.tabContent').removeClass("hide");
                        that.gV.navList = [];
                        listData = json.data.list;
                        console.log('我是财富研究', listData);
                        modelData = json.data.modelVO;
                        for (var i = 0; i < json.data.list.length; i++) {
                            (function(i) {
                                that.gV.navList[i] = {
                                    type: json.data.list[i].sonModelName,
                                    num: json.data.list[i].sonModelType,
                                    htmdEvt: 'fortuneCollegeList_' + i,
                                }
                            })(i);
                        };
                        generateTemplate(modelData, $('.tabContent .title'), $('#tabContent-template'));
                        //拼模板，初始化左右滑动mui组件
                        that.beforeFunc();

                        //初始化第一屏区域的上拉加载
                        // that.initMui($('#scroll1'));
                        that.getData($('#scroll1'));
                    }
                }
            }];
            $.ajaxLoading(obj);
        },
        getData: function($id, t) { // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
            var that = this;
            if ($id.find(".mui-table-view-cell").height() > 0) {
                $("#slider").height($id.find(".mui-table-view-cell").height() + $(".mui-slider .nav-wrapper").height());
            }
            if (!$id.find('.list_item').length > 0) {
                mui(".mui-slider").slider(); //就是左右切换 可以滑动的  初始化
            } else {
                return false;
            }

            //获取产品列表
            var obj = [{
                url: site_url.queryFortuneCollegeSec_api,
                data: {
                    type: "29", //类型财富研究
                },
                needLogin: true,
                needLoading: true,
                callbackDone: function(json) {
                    console.log(json.data)
                    var jsonData = json.data.list[that.gV.current_index].list,
                        pageList = jsonData;

                    if (!$.util.objIsEmpty(pageList)) {

                        var list_html = that.gV.list_template(jsonData); //  把内容  放到  模板里   
                        //设置这两参数，在initMui()中使用
                        //判断是否显示没有更多了等逻辑，以及插入新数据
                        that.listLength = pageList.length;
                        that.html = list_html;
                        
                    } else {
                        //没有数据
                        $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                        $id.find('.noData').show();
                    }


                    $id.find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // if (that.gV.ajaxArr[that.gV.current_index].pageCurrent == 1) {
                    //第一屏
                    $id.find('.contentWrapper .mui-table-view-cell').html(that.html);
                    // } else {
                    //     $id.find('.contentWrapper .mui-table-view-cell').append(that.html);
                    // }

                    //获取当前展示的tab的索引
                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                        $list = $("#move_" + index + " .list");

                    //隐藏loading
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                        $('.lazyload').lazyload();

                    }, 100);
                },
                callbackFail: function(json) {
                    //请求失败，
                    //隐藏loading
                    //that.getElements.listLoading.hide();
                    //显示错误提示
                    tipAction(json.message);

                    t.endPullupToRefresh(false);
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);
                },
                callbackNoData: function(json) {
                    t.endPullupToRefresh(false);

                    //没有数据
                    if (that.gV.ajaxArr[that.gV.current_index].pageCurrent == 1) {
                        $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                        $id.find('.noData').show();
                    }

                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);

                    //获取当前展示的tab的索引
                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                        $list = $("#move_" + index + " .list");

                    $list.height(that.highHeight).addClass('noMove');

                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;
            //财富讲堂tab切换
            mui("body").on('mdClick', '.broadcast span', function() {
                $('.broadcast .bigspan').removeClass('getColor');
                $('.broadcast .bigspan').eq($(this).index()).addClass('getColor');
                $('.forumList .forumImg').css({ "display": "none" });
                $('.forumList .forumImg').eq($(this).index()).css({ "display": "block" });
            }, {
                'htmdEvt': 'fortune_04'
            });
            // 列表页跳转到详情页
            mui("body").on('mdClick', '.list_item', function() {
                var id = $(this).attr("id");
                var articleBelong = $(this).attr("articleBelong");
                var applyType = $(this).attr("applyType");
                if ($(this).attr("externalUrl")) {
                    if ($(this).attr("externalUrl").indexOf("?") != -1) {
                        window.location.href = $(this).attr("externalUrl") + "&isHtOuterLinkUniqueIdentification=true";
                    } else {
                        window.location.href = $(this).attr("externalUrl") + "?isHtOuterLinkUniqueIdentification=true";
                    }
                } else {
                    window.location.href = site_url.articleTemplate_url + '?id=' + id + '&articleBelong=' + articleBelong;
                }
            }, {
                'htmdEvt': 'fortune_07'
            })
            mui("body").on('mdClick', '.whereGo', function() {
                if ($(this).attr("externalUrl")) {
                    if ($(this).attr("externalUrl").indexOf("?") != -1) {
                        window.location.href = $(this).attr("externalUrl") + "&isHtOuterLinkUniqueIdentification=true";
                    } else {
                        window.location.href = $(this).attr("externalUrl") + "?isHtOuterLinkUniqueIdentification=true";
                    }
                } else {
                    window.location.href = site_url.articleTemplate_url + '?id=' + $(this).attr("id") + '&articleBelong=' + $(this).attr("articleBelong");
                }

            }, {
                'htmdEvt': 'fortune_02'
            })
            mui("body").on("mdClick", '.interpreter', function() {
                if ($(this).attr("externalUrl")) {
                    if ($(this).attr("externalUrl").indexOf("?") != -1) {
                        window.location.href = $(this).attr("externalUrl") + "&isHtOuterLinkUniqueIdentification=true";
                    } else {
                        window.location.href = $(this).attr("externalUrl") + "?isHtOuterLinkUniqueIdentification=true";
                    }
                } else {
                    window.location.href = site_url.articleTemplate_url + '?id=' + $(this).attr("id") + '&articleBelong=' + $(this).attr("articleBelong");
                }

            },{
                'htmdEvt': 'fortune_13'
            })
            // 财富学院的banner的跳转  需判断是否跳转到外部链接
            //当有externalUrl的时候先跳转externalUrl配置的连接
            //当linkType为1（外部链接）的时候跳转外链否则跳转内置文章模板
            mui("body").on("mdClick", '.banner .mui-slider-item div', function() {

                var $this = $(this);
                if ($this.attr("externalUrl")) {
                    if ($(this).attr("externalUrl").indexOf("?") != -1) {
                        window.location.href = $(this).attr("externalUrl") + "&isHtOuterLinkUniqueIdentification=true";
                    } else {
                        window.location.href = $(this).attr("externalUrl") + "?isHtOuterLinkUniqueIdentification=true";
                    }
                } else {
                    if($this.attr("linkType") == 1){
                        window.location.href = $this.attr("href") + "?isHtOuterLinkUniqueIdentification=true";
                    }else{
                        window.location.href = $this.attr("href");
                    }
                }

            },{
                'htmdEvt': 'fortune_14'
            })
        }
    };
    data.init();
});