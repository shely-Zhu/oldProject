/**
* 会员权益详情
* @author liuhongyu 2019-11-12
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
	let somePage = {
		//获取页面元素
		$e:{
            membershipDetailsSilderBox:$('.membershipDetailsSilderBox'),//swiper会员权益盒子
            membershipDetailsList:$('#membershipDetailsList-template'),//swiper会员权益模板Id
		},
		//全局变量
		gV:{},
		//页面初始化函数
		init:function(){
            var that=this;
            that.events();
            
            that.getMembershipDetailsData();
        },
        //滑动初始化
        swiperInit(n){
            var xPX=100*($('body').width()/750)*0.5;
            // $('.swiper-wrapper').css('transform','translate3d('+xPX+'px, 0px, 0px)');
            var marW=100*($('body').width()/750)*0.4;
            // $('.swiper-slide').css('margin-right',marW);
            swiperShow = new Swiper(".show-swiper", {
                slidesPerView: "auto",
                watchSlidesProgress: !0,
                slidesOffsetBefore: xPX,
                spaceBetween: marW,
                resistanceRatio: 1,
                loop : true,
                initialSlide:n,
                on: {
                    progress: function(b) {
                        
                        for(i = 0; i < this.slides.length; i++){
                            slide = this.slides.eq(i);
                            slideProgress = this.slides[i].progress;
                            prevIndent = 4 == i ? .3228 : .0898;
                            scale = 1 > Math.abs(slideProgress + prevIndent) ? .4 * (1 - Math.abs(slideProgress + prevIndent)) + 1 : 1;
                            slide.find(".goods").transform("scale3d(" +scale + "," + scale + ",1)");
                            
                        }
                        
                    },
                    setTransition: function(b) {
                        for(var a = 0; a < this.slides.length; a++){
                            this.slides.eq(a).find(".goods").transition(b);
                        }
                        
                    },
                    touchMove: function() {
                        // this.controller.control = .01 > this.progress ? "" : swiperBg
                        
                    },
                    touchEnd: function(e) {
                        // -1515 > this.translate && alert("\u8df3\u8f6c")
                        
                        
                    },
                    slideChangeTransitionEnd: function(){
                        console.log(this.activeIndex%12)
                        // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                        var index=this.activeIndex%12;
                        var text=$('.swiper-slide').eq(index).attr('data-text');
                        var link=$('.swiper-slide').eq(index).attr('data-link');
                        var name=$('.swiper-slide').eq(index).attr('data-name');
                        $('.membershipDetailsContentBox h2').text(name);
                        $('.membershipDetailsContentBox p').text(text);
                        $('.linkBtnBox a').attr('href',link);
                    },

                }
            });
        },
        //获取会员权益详情
        getMembershipDetailsData:function(){
            var that=this;
            var obj=[{
                url: site_url.findBenefitByLevel_api,
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log(json) 
                    var data=json.data;
  
                    generateTemplate(data,that.$e.membershipDetailsSilderBox,that.$e.membershipDetailsList); 
                    var n=0;
                    that.swiperInit(n);               
                },
                callbackFail: function(json) {
                    console.log(json.message)
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj);         
        },
		//注册事件
		events: function(){
			
		}
	};
	somePage.init();
});
