/**
* 财富学院早知道
* @author yanruiting 2019-11-25
*/


require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {
	var somePage = {
		//获取页面元素
		$e: {
			fortuneFlowListWrapper: $(".knownList"), // 财富流向早知道列表容器
			fortuneFlowListTemp: $("#fortuneFlowList-template"), // 财富流向早知道列表模板
            noData: $('.noData'), //没有数据的结构
			listLoading: $('.listLoading') //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV: {
            pageCurrent: 1,
            pageSize: 10,
			fortuneFlowList: [],
            // articleBelong : splitUrl['articleBelong'], // 文章类型
            wrapperName:null
		},
		//页面初始化函数
		init: function() {	
			var that = this;

			that.initMui(".list", ".contentWrapper");

            that.events();
		},

        dealTime: function(data) {
            $.each(data, function(a, b) {
                if(b.articleTimeStr && b.articleTimeStr!= '') {
                    b.articleTimeStr = b.articleTimeStr.split(" ")[0].split("-")[1] + "." + b.articleTimeStr.split(" ")[0].split("-")[2];
                } else {
                    b.articleTimeStr = "";
                }
            })
            return data;
        },
		//初始化mui的上拉加载
		initMui: function(listClassName, wrapperName) {
            var that = this;
            that.gV.wrapperName=wrapperName;

            var height = windowHeight - $(".HeadBarConfigBox").height();

            if (!$(listClassName).hasClass('setHeight')) {

                $(listClassName).height(height).addClass('setHeight');
            }

            $.pullRefresh({
                wrapper: $('.list'),
                class: 'knownList',
                template: that.$e.fortuneFlowListTemp, 
                callback: function(def, t){
                    var obj = [{
                        url: site_url.queryFortuneArticleList_api,
                        data: {
                            "pageNo": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize, //非必须，默认为10
                            "articleBelong": "5"//5为财富学院早知道
                        },
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {
                            $(".netLoading").hide();
                            
                            var data = json.data;

                            if( data.list && data.list.length ){
                                data = that.dealTime(data.list);
                            }

                            // 页面++
                            that.gV.pageCurrent++;
                            
                            // 将消息列表插入到页面上

                            def && def.resolve( data, that.gV.pageCurrent);

                        },
                        callbackNoData: function( json ){
                            //没有数据时展示暂无数据
                            // $(".list").hide()
                            // that.$e.noData.show();
                            
                            def && def.reject( json, that.gV.pageCurrent );
                        },
                        callbackFail: function(json) {

                            def && def.reject( json, that.gV.pageCurrent );

                        },
                    }];
                    $.ajaxLoading(obj); 
                }
            })

		},
		//注册事件
		events: function() {
            var that=this
            // 列表页跳转到详情页
			mui("body").on('mdClick', '.knownItem' , function(){
                var $this = $(this);
                if($this.attr("externalUrl")){
                    if($this.attr("externalUrl").indexOf("?") != -1) {
                        window.location.href = $this.attr("externalUrl") + "&isHtOuterLinkUniqueIdentification=true";
                    } else{
                        window.location.href = $this.attr("externalUrl") + "?isHtOuterLinkUniqueIdentification=true";
                    }
                }else{
                    var id = $this.attr("id");
                    window.location.href = site_url.articleTemplate_url + '?id=' + id + '&articleBelong=5';
                }
                
            },{
                'htmdEvt': 'fortune_09'
            })
		}
	};
    somePage.init();
    
});

