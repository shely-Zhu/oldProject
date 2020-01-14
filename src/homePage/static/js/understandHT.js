/*
<!--了解恒天-->
<!--author:caiwenqi-->
<!--time：2019-11-15-->
update：chentiancheng 2020年1月10日14:55:45

*/ 


require('@pathCommonBase/base.js');
require('@pathCommonCom/tabScroll/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {
    var somePage = {
        //获取页面元素
        $e: {
            tab: $('.tabHeader .tab'),
            tabBody: $('.tabBody .tabContent'),
            // contentWrap: $('#drapUpWrapper>div'),
            HeadBarpathName: $("#HeadBarpathName")
        },
        //全局变量
        gV: {
            articleBelong: splitUrl['articleBelong'],
            sortType: splitUrl['type'] ? splitUrl['type'] * 1 : 0,
            belong: ['101', '102', '103', '104'],  //按导航顺序从左到右的位置，写死的
            // content: {} , //保存各个tab请求过来的数据
        },

        //页面初始化函数
        init: function() {
            var that = this;
                //处理7p 8p页面初始底部白条
                var wHeight = window.screen.height;
                if( $('html').height() < wHeight ){
                    $('html').height( wHeight );
                }
            
            that.getTitleData();

            that.getTemplateData( that.gV.belong[ that.gV.sortType ], that.gV.sortType );

            that.events();
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

                    
                    var wrap_source = $('#title-template').html(),
                        wrap_template = Handlebars.compile(wrap_source),
                        wrap_html = wrap_template(data); //模板生成

                    $('.tabBar').html( wrap_html);

                    //定位到第二个
                    $('.tabBar .tabA').eq( that.gV.sortType ).addClass('active');

                },
                callbackNoData: function(json) {

                }
            }];
            $.ajaxLoading(obj);
        },


        // 获取配置的图片
        getTemplateData: function(belong, index) {
            var that = this,
                belong = belong ? belong : splitUrl['articleBelong'];

            if( !$('.tabImg').eq(index).html().length ){
                //没有数据的时候请求接口
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

                        if (!!resData.h5Title) { 
                            //标题
                            that.$e.HeadBarpathName.text(resData.h5Title);
                        }

                        // that.gV.content[belong] = resData;
                        $('.tabImg').hide();
                        $('.tabImg').eq(index).show().html(resData.content);
                        window.scrollTo(0, 0);


                    },
                    callbackNoData: function(json) {

                    }
                }];
                $.ajaxLoading(obj);
            }
            else{
                //有数据的时候直接显示
                $('.tabImg').hide();
                $('.tabImg').eq(index).show();
                window.scrollTo(0, 0);
            }
            
        },

        //注册事件
        events: function() {

            var that = this;

            mui("body").on('mdClick', '.tabA', function(e) {
                var $this = $(this),
                    index = $(this).index();
                $(this).siblings('.tabA').removeClass('active');

                $(this).addClass('active');
                // $("b").removeClass('borderBottom');
                // $(".tabBar b").eq(index).addClass('borderBottom');
                that.getTemplateData( that.gV.belong[index], index);
                that.$e.HeadBarpathName.text($this.text());
            }, {
                'htmdEvt': 'understandTab_00'
            })
        }
        
    };
    somePage.init();
}); 