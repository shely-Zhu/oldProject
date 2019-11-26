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

    //一些设置
    setting: {
        //导航
        navList: [
            {type: '全部',code: ''}, //code是当前类型对应的基金类型的代码
            {type: '货币型',code: '10300'},
            {type: '债券型',code: '10200'},
            {type: '混合型',code: '10400'},
            {type: '股票型',code: '10100'},
            {type: '指数型',code: '10905'},
            {type: 'QDII',code: '10901'}
        ],

        //产品列表的表头
        listName: {
            currencyType: [  //货币型
                {txt: '基金名称'},
                {sortColumn: 'tenThousandEarnings',txt: '万份收益(元)'},
                {sortColumn: 'sevenDayYield',txt: '七日年化(%)', select: 1}
            ],
            otherType: [ //非货币型
                {txt: '基金名称'},
                {sortColumn: 'unitNav',txt: '最新净值(元)'},
                {sortColumn: 'oneDayGains',txt: '日涨幅(%)', select: 1}
            ]
        },

        //请求基金列表所需的参数，公用的在这里设置默认值
        ajaxParams : {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 20,  //每页显示几条数据，根据需求为20
            publicFundsType:"",   //基金类型(默认全部)
        },

        //每条列表的模板，生成后存放在这里，方便后面ajax请求新的数据时重复使用
        con_template: '',

        //左右拉动时，存放数据的区域的索引，默认为 0，第一个区域
        //上拉加载mui组件，在切换区域，且第一次请求数据前初始化
        current_index: 0,
    },	 


    //初始化函数
    init: function(){
        var that = this;
        //轮播图
        that.getData();
        //翻译早知道
        that.getFortuneCollegeFir()
        
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
                    if( !that.height ){
                        var height = windowHeight - document.getElementById('scroll1').getBoundingClientRect().top;
        
                        if( window.currentIsApp ){
                            //app，没有底部
                            that.height = height - $('.tableHeader').height();
                        }else{
                            //非app
                            that.height = height - $('.tableHeader').height() - $('.bottomNav').height();
                        }
                        
                    }
                    if( !$('.list').hasClass('setHeight') ){
                        $('.list').height( that.height ).addClass('setHeight');
                    }
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
                type:"25", //类型
            },
            needDataEmpty: true,
            callbackDone: function(json){
                modelData=json.data.ModelVO
                // 将列表插入到页面上
                generateTemplate(modelData,$('.translate'),$('#fortune-template'));     						
            },
            callbackFail: function(json){
                console.log(json)
            },
         }]
        $.ajaxLoading(obj);
    }
}
productPublic.init();