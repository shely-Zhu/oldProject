require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
Slider = require('@pathCommonJs/components/sliderMui.js'); // 轮播
var productPublic = {
    getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
    },

    //初始化函数
    init: function(){
        var that = this;
        //轮播图
        that.getData();
        //翻译早知道
        that.getFortuneCollegeFir()
        that.getFortuneCollegeFirCf()
        this.getWealthResearch()
        that.events();
    },
    getData:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneBanner_api,
             data: {    
                hmac:"", //预留的加密信息    
                params:{//请求的参数信息 
                    adPosition : "appWapPofIndexTop",//类型（标志位）【请参照备注】 
                    limitCount: "5",//展示幅数    
                }
            },
            needDataEmpty: true,
            callbackDone: function(json){
                console.log(json)
                var imgArr = [];

                $.each(json.data.bannerList, function(i, el){
                    console.log(el)
                    imgArr.push({imgUrl: el.imgUrl, linkUrl:el.linkUrl});
                })
                Slider( $('.banner'), imgArr );
                
                //此时所有切换区域的内容都是空的
                //设置切换区域的高度
                //计算节点高度并设置
                $(".banner img")[0].onload=function(){
                    // if( !that.height ){
                    //     var height = windowHeight - document.getElementById('scroll1').getBoundingClientRect().top;
        
                    //     if( window.currentIsApp ){
                    //         //app，没有底部
                    //         that.height = height - $('.tableHeader').height();
                    //     }else{
                    //         //非app
                    //         that.height = height - $('.tableHeader').height() - $('.bottomNav').height();
                    //     }
                        
                    // }
                    // if( !$('.list').hasClass('setHeight') ){
                    //     $('.list').height( that.height ).addClass('setHeight');
                    // }
                }			     						
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    getFortuneCollegeFir:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeFir_api,
             data: {    
                type:"25", //类型金牌翻译官
            },
            needDataEmpty: true,
            callbackDone: function(json){
                modelData=json.data.ModelVO
                articleData=json.data.ArticleVO
                
                // 将列表插入到页面上
                generateTemplate(modelData,$('.translate'),$('#fortune-template'));     					
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    getFortuneCollegeFirCf:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeFir_api,
             data: {    
                type:"26", //类型财富早知道
            },
            needDataEmpty: true,
            callbackDone: function(json){
                modelData=json.data.ModelVO
                articleData=json.data.ArticleVO
                
                // 将列表插入到页面上
                generateTemplate(modelData,$('.fortuneVideo .title'),$('#fortuneCf-template'));     
                generateTemplate(articleData,$('.fortuneVideo ul'),$('#video-template'));						
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    getWealthResearch:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeSec_api,
             data: {    
                type:"28", //类型财富研究
            },
            needDataEmpty: true,
            callbackDone: function(json){
               console.log(json)					
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    //操作事件
    events:function(){
        //财富研究tab切换
        $('.tab').on('tap','.tab-t li',function(){
            console.log($(this).index())
            $('.tab .tab-t li a').removeClass('active');
            $('.tab .tab-t li a').eq($(this).index()).addClass('active');
            $('.tab .tab-b .tab-content').removeClass('show');
            $('.tab .tab-b .tab-content').eq($(this).index()).addClass('show');
        });
    }
}
productPublic.init();