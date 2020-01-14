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

        // setting: {
        //     //导航
        //     navList: [],
        //     //每条列表的模板，生成后存放在这里，方便后面ajax请求新的数据时重复使用
        //     con_template: '',
        // },

        //页面初始化函数
        init: function() {
            var that = this;
                //处理7p 8p页面初始底部白条
                var wHeight = window.screen.height;
                if( $('html').height() < wHeight ){
                    $('html').height( wHeight );
                }


             // $("body").height( $(window).height() );
             
            // $('html').height( window.screen.height ).width( window.screen.width );

            // $('body').css({
            //     position: 'fixed',
            //     '-webkit-overflow-scrolling': 'auto',
            //     top: 0,
            //     right:0,
            //     left: 0,
            //     bottom:0,
            //     height: '100%',
            //     width: '100%'
            // })

            // var height = windowHeight - $('.tabImg')[0].getBoundingClientRect().top;
            
            




//          var sliderHeight = $(window).height() - $(".tabBar").height() - $("#HeadBarConfigBox").height();//获取tab切换内容区高度。
            // 安卓IOS刘海屏适配
//          $("#drapUpWrapper .mui-slider-item").css("height",sliderHeight)
    		// if (splitUrl['hairHeight'] || "true" == splitUrl['isIphoneX']){//重新设置高度，防止出现空白
      //       	$("#tabHT").css("top","1.52rem");//防止出现白线
      //       }
            // $(".tabBar b").eq(that.gV.sortType * 1).addClass('borderBottom');
            // $(".tabBar a").eq(that.gV.sortType * 1).addClass('mui-active');

            // that.getTemplateData(that.gV.articleBelong, that.gV.sortType);
            // mui('.mui-slider').slider().gotoItem(that.gV.sortType * 1, 0) //默认点击
            // mui('.mui-slider').slider().setStopped(true); //禁用左右滑动事件
            
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

                    // $('.tabBar .tabA').eq(3).html(  window.screen.height + ' ' + window.screen.availHeight  );

                    

                    // $('.tabBar .tabA.active').html( $('body').height() + ' ' +  document.documentElement.clientHeight  );

                    // $('.tabBar .tabA.active').next().html( windowHeight + ' ' + window.innerHeight);

                    // $('.tabBar .tabA.active').next().next().html( $('.tabImg')[0].getBoundingClientRect().top);

                    // var height = $('body').height() - $('.tabImg')[0].getBoundingClientRect().top;

                    // $('.tabImg').html()
                    
                    // $('.tabImg').html( '<div>'+height+'</div>' + '<div>'+window.screen.height+'</div>' + '<div>'+document.documentElement.clientHeight+'</div>' + '<div>'+$('body').height()+'</div>' + wrap_html);

                    // $('.list').height(height);
                    
                    // $('.tabImg').height(height);

                    // $.each( data, function(i, el){
                    //     that.setting.navList.push({
                    //         type: el.titleFst
                    //     })
                    // })

                    // // that.setting.navList = data.concat([]);

                    // that.setting.navList[0].code = '101';
                    // that.setting.navList[1].code = '102';
                    // that.setting.navList[2].code = '103';
                    // that.setting.navList[3].code = '104';
                    
                    // that.initMui();

                    // $.each(data, function(i, v) {
                    //     $(".tabBar a").eq(i)[0].childNodes[0].nodeValue = v.titleFst; //只修改父元素的文本，不修改其中的元素
                    // })

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

                        // t.addClass('hasPullUp').find('.img').html(resData.content);

                        // that.$e.contentWrap.eq(num * 1).html(resData.content);

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
            //          num = num ? num : splitUrl['type'] * 1;//首次进来请求用路径中的articleBelong，点击的时候使用对应的articleBelong。
            
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



        //初始化mui的上拉加载
        // initMui: function() {
        //     var that = this;

        //     var contentArr = [];

        //     $.each(that.setting.navList, function(i, el) {

        //         //循环导航配置，contentArr的个数和导航个数应该是一样的
        //         contentArr.push({
        //             id: i,
        //             content: '<div class="img"></div>'
        //         })
        //         //填充ajaxArr，生成所有类型的ajax请求的传参
        //         //pageCurrent默认为that.setting.pageCurrent
        //         //pageSize默认为that.setting.pageSize
        //         //在切换区域，或者上拉加载时，修改对应的参数值
        //         // that.ajaxArr[el.code] = {
        //         //     channel: "app", //来源（PC端：“pc”； APP或WAP端：“app”）
        //         //     pageNo: that.ajaxParams.pageNo,
        //         //     pageSize: that.ajaxParams.pageSize, //每页记录数 
        //         //     investDirection: el.code, //产品投向
        //         // }
        //     })


        //     var obj = {
        //         wrapper: $('.muiSlider'),
        //         navList: that.setting.navList,
        //         contentList: contentArr,
        //         contentLength: that.setting.navList.length,
        //         // activeList: 1,
        //         callback: function(t) {

        //             var index = t.attr('data-scroll');

        //             // that.ajaxParams.publicFundsType = that.setting.navList[index].code;
        //             //重设当前上拉组件的区域索引
        //             // that.index = index;

        //             //判断当前区域是否已经初始化出来上拉加载
        //             if (t.hasClass('hasPullUp')) {
        //                 //有这个class，表示已经初始化，不再执行下一步
        //                 return false;
        //             }

        //             var code = $('.nav-wrapper .mui-control-item').eq(index).attr('code');

        //             //请求第一次数据
        //             that.getTemplateData( code, t);
        //         }
        //     }
        //     $.tabScroll(obj);

        //     // 需要对每个tab重设scroll高度

        //     var height = windowHeight - $('.tab-scroll-action')[0].getBoundingClientRect().top;

        //     // $('.list').height(height);
            
        //     $('.tab-scroll-action').height(height);

        //     // if (!$(list).hasClass('setHeight')) { 
        //     //     that.setHeight($id, list);
        //     // }
            
        //     $('body').css({
        //                     position: 'fixed',
        //                     top: 0,
        //                     right:0,
        //                     left: 0,
        //                     bottom:0
        //                 })

        //     // mui('.mui-scroll-wrapper').scroll({
        //     //     bounce: false //是否启用回弹 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        //     // });

        //     mui('.mui-slider').slider().gotoItem( that.gV.sortType, 0);

        //     // mui('.mui-slider').slider().setStopped(true);

        //     // mui.init();
        //     //模拟点击对应的type。定位到当前type下

        //     // mui("body").on('mdClick', '.mui-slider .mui-control-item', function(e) {
        //     //     var $this = $(this),
        //     //         index = $(this).index();
        //     //     $("b").removeClass('borderBottom');
        //     //     $(".tabBar b").eq(index).addClass('borderBottom');
        //     //     that.getTemplateData($this.attr("belong"), index)
        //     // }, {
        //     //     'htmdEvt': 'understandTab_00'
        //     // })
        // },

        
        
    };
    somePage.init();
}); 