/**
* 会员权益详情
* @author liuhongyu 2019-11-12
*/
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			
		},
		//全局变量
		gV:{},
		//页面初始化函数
		init:function(){
            var that=this;
            that.events();
		},
		//注册事件
		events: function(){
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
                        console.log(this.activeIndex%5);//切换结束时，告诉我现在是第几个slide
                        console.log($('.swiper-slide').eq(this.activeIndex%5).attr('data-text'));
                        // $('.membershipDetailsContentBox').text($('.swiper-slide').eq(this.activeIndex%5).attr('data-text'))

                    },

                }
            });
		}
	};
	somePage.init();
});
