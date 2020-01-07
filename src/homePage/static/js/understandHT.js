require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {
    var somePage = {
        //获取页面元素
        $e: {
            tab: $('.tabHeader .tab'),
            tabBody: $('.tabBody .tabContent'),
            contentWrap: $('#drapUpWrapper>div'),
            HeadBarpathName: $("#HeadBarpathName")
        },
        //全局变量
        gV: {
            articleBelong: splitUrl['articleBelong'],
            sortType: splitUrl['type'],
        },
        //页面初始化函数
        init: function() {
            var that = this;
            var sliderHeight = $(window).height() - $(".tabBar").height() - $("#HeadBarConfigBox").height();//获取tab切换内容区高度。
            if(splitUrl['hairHeight'] || splitUrl['isIphoneX']) {//重新设置高度，防止出现空白
            	$("#tabHT").css("top","1.53rem");
            	$("#drapUpWrapper .mui-slider-item").css("height",sliderHeight)
            }
            $(".tabBar b").eq(that.gV.sortType * 1).addClass('borderBottom');
            $(".tabBar a").eq(that.gV.sortType * 1).addClass('mui-active');
            that.getTemplateData(that.gV.articleBelong, that.gV.sortType);
            mui('.mui-slider').slider().gotoItem(that.gV.sortType * 1, 0) //默认点击
            mui('.mui-slider').slider().setStopped(true); //禁用左右滑动事件
            that.events()
            that.initMui()
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            that.getTitleData();
            mui.init();
            //模拟点击对应的type。定位到当前type下

            mui("body").on('mdClick', '.mui-slider .mui-control-item', function(e) {
                var $this = $(this),
                    index = $(this).index();
                $("b").removeClass('borderBottom');
                $(".tabBar b").eq(index).addClass('borderBottom');
                that.getTemplateData($this.attr("belong"), index)
            }, {
                'htmdEvt': 'understandTab_00'
            })
        },
        // 获取页面tab页title
        getTitleData: function() {
            var that = this;
            var obj = [{
                url: site_url.queryHtInformation_api,
                data: {},
                needDataEmpty: true,
                needLoading: true,
                callbackDone: function(json) {
                    var data = json.data.companyIntroductionList;
                    $.each(data, function(i, v) {
                        $(".tabBar a").eq(i)[0].childNodes[0].nodeValue = v.titleFst; //只修改父元素的文本，不修改其中的元素
                    })

                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.message);

                },
                callbackNoData: function(json) {

                }
            }];
            $.ajaxLoading(obj);
        },
        // 获取配置的图片
        getTemplateData: function(belong, num) {
            var that = this,
                belong = belong ? belong : splitUrl['articleBelong'];
            //          num = num ? num : splitUrl['type'] * 1;//首次进来请求用路径中的articleBelong，点击的时候使用对应的articleBelong。
            var obj = [{
                url: site_url.getArticle_api,
                data: {
                    articleBelong: belong,
                    applyType: 0, //0代表H5
                },
                needDataEmpty: true,
                needLoading: true,
                callbackDone: function(json) {
                    var resData = json.data;
                    if (!!resData.h5Title) { //标题
                        that.$e.HeadBarpathName.text(resData.h5Title);
                    }
                    that.$e.contentWrap.eq(num * 1).html(resData.content);



                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.message);

                },
                callbackNoData: function(json) {

                }
            }];
            $.ajaxLoading(obj);
        },
        //注册事件
        events: function() {

        }
    };
    somePage.init();
});