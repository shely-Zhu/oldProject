
require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
			tab:$('.tabHeader .tab'),
			tabBody:$('.tabBody .tabContent'),			
			contentWrap:$('#drapUpWrapper>div'),
			HeadBarpathName:$("#HeadBarpathName")
		},
		//全局变量
		gV: {
			articleBelong:splitUrl['articleBelong'],
			sortType:splitUrl['type'],
		},
		//页面初始化函数
		init: function() {	
			var that = this;
			$(".tabBar b").eq(that.gV.sortType*1).addClass('borderBottom');
			$(".tabBar a").eq(that.gV.sortType*1).addClass('mui-active');
			that.getTemplateData(that.gV.articleBelong,that.gV.sortType)
			that.events()
			that.initMui()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			mui.init();
			//模拟点击对应的type。定位到当前type下
			
			mui("body").on('mdClick', '.mui-slider .mui-control-item' , function(e){
				var $this = $(this);
				$("b").removeClass('borderBottom');
				$(".tabBar b").eq($(this).index()).addClass('borderBottom');
				that.getTemplateData($this.attr("belong"),e.detail.slideNumber)
			},{
                'htmdEvt': 'understandTab_00'
            })
		},
		//获取数据函数
		getData: function(t) {
			var that = this;
			that.getTemplateData();//获取模板
		},
		// 获取配置的图片
        getTemplateData(belong,num) {
        	var that=this,
        	belong = belong ? belong : splitUrl['articleBelong'],
        	num = num ? num : splitUrl['type'] * 1;//首次进来请求用路径中的articleBelong，点击的时候使用对应的articleBelong。
            var obj=[{
                url: site_url.getArticle_api,
                data:{
                	articleBelong:belong,
                	applyType:0,//0代表H5
                },
                needDataEmpty: true,
                needLoading:true,
                callbackDone: function(json) {
                	var resData = json.data.data;
					if(!!resData.h5Title){//标题
						that.$e.HeadBarpathName.text(resData.h5Title);
					}
					that.$e.contentWrap.eq(num*1).html(resData.content);

					
            
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