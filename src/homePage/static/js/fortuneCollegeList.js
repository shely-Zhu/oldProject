require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
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
        this.getFortuneForum()
        that.getWealthResearch()
        that.events();
    },
    getData:function(){
        var that =this;
        var obj=[{
             url: site_url.queryBanner_api,
             data: {    
                type:"8"
            },
            needDataEmpty: true,
            callbackDone: function(json){
                var imgArr = [];

                $.each(json.data.bannerList, function(i, el){
                    imgArr.push({imgUrl: el.imageUrlShowOnline, linkUrl:el.linkUrl});
                })
                Slider( $('.banner'), imgArr );
                
                //此时所有切换区域的内容都是空的
                //设置切换区域的高度
                //计算节点高度并设置
                // $(".banner img")[0].onload=function(){
                //     if( !that.height ){
                //         var height = windowHeight - document.getElementById('scroll1').getBoundingClientRect().top;
        
                //         if( window.currentIsApp ){
                //             //app，没有底部
                //             that.height = height - $('.tableHeader').height();
                //         }else{
                //             //非app
                //             that.height = height - $('.tableHeader').height() - $('.bottomNav').height();
                //         }
                        
                //     }
                //     if( !$('.list').hasClass('setHeight') ){
                //         $('.list').height( that.height ).addClass('setHeight');
                //     }
                // }			     						
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    //金牌翻译官
    getFortuneCollegeFir:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeFir_api,
             data: {    
                type:"26", //类型金牌翻译官
            },
            needDataEmpty: true,
            callbackDone: function(json){
                modelData=json.data.modelVO
                articleData=json.data.list
                console.log('我是什么',articleData)
                // 将列表插入到页面上
                generateTemplate(modelData,$('.translate .title'),$('#fortune-template'));
                generateTemplate(articleData,$('.translate .content'),$('#content-template'));     					
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    //财富早知道
    getFortuneCollegeFirCf:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeFir_api,
             data: {    
                type:"27", //类型财富早知道
            },
            needDataEmpty: true,
            callbackDone: function(json){
                modelData=json.data.modelVO
                articleData=json.data.list
                
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
    //财富讲堂
    getFortuneForum:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeSec_api,
             data: {    
                type:"28", //类型财富讲堂
            },
            needDataEmpty: true,
            callbackDone: function(json){
               listData=json.data.list
               console.log(listData)
               modelData=json.data.modelVO
             const listTitle = listData.map(d => {
                return {
                 sonModelName: d.sonModelName,
                }
              })
              const listContent=listData.map(d => {
                return {
                 listContent: d.list
                }
              })
              console.log('我是listtitle',listTitle)
              console.log('我是listContent',listContent)
              generateTemplate(modelData,$('.forum .title'),$('#forum-template'));     
              generateTemplate(listTitle,$('.broadcast'),$('#forumTitle'));
              generateTemplate(listContent,$('.forumList'),$('#forumContent'));	
              mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
              });		
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    //财富研究
    getWealthResearch:function(){
        var that =this;
        var obj=[{
             url: site_url.queryFortuneCollegeSec_api,
             data: {    
                type:"29", //类型财富研究
            },
            needDataEmpty: true,
            callbackDone: function(json){
               listData=json.data.list
               console.log('我是财富研究',listData)
               modelData=json.data.modelVO
             const listTitle = listData.map(d => {
                return {
                 sonModelName: d.sonModelName,
                }
              })
              const listContent=listData.map(d => {
                return {
                 listContent: d.list
                }
              })
              console.log(modelData)
               generateTemplate(modelData,$('.tabContent .title'),$('#tabContent-template'));     
               generateTemplate(listTitle,$('.tab-t ol'),$('#titleTab'));
               generateTemplate(listContent,$('.tab-b'),$('#listContent'));			
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    },
    //操作事件
    events:function(){
        //财富讲堂tab切换
        $('.broadcast').on('tap','span',function(){
            console.log($(this).index())
            $('.broadcast .bigspan').removeClass('getColor');
            $('.broadcast .bigspan').eq($(this).index()).addClass('getColor');
            $('.forumList .forumImg').css({"display":"none"});
            $('.forumList .forumImg').eq($(this).index()).css({"display":"block"});
        });
        //财富研究tab切换
        $('.tab').on('tap','.tab-t li',function(){
            console.log($(this).index())
            $('.tab .tab-t li a').removeClass('active');
            $('.tab .tab-t li a').eq($(this).index()).addClass('active');
            $('.tab .tab-b .tab-content').css({"display":"none"});
            $('.tab .tab-b .tab-content').eq($(this).index()).css({"display":"block"});
        });
    }
}
productPublic.init();

window.onload=function(){
    setTimeout(()=>{
        $('.tab-t ol li a').eq(0).addClass('active');
        $('.broadcast .bigspan').eq(0).addClass('getColor');
        $('.broadcast .bigspan').eq(0).css({"paddingLeft":0,"borderLeft":'none'});
    },800)
}