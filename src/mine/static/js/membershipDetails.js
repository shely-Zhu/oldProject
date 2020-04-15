/**
 * 会员权益详情
 * @author liuhongyu 2019-11-12
 * 
 * updata caoqihai 2020-1-10  修改显示了解详情
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js')();

var swiperSizeMap = require('@pathCommonJs/components/swiper/swiperSizeMap.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {
    var somePage = {
        //获取页面元素
        $e: {
            membershipDetailsSilderBox: $('.membershipDetailsSilderBox'), //swiper会员权益盒子
            membershipDetailsListTemplateId: $('#membershipDetailsList-template'), //swiper会员权益模板Id
        },
        //全局变量
        gV: {
            index: splitUrl['index']?splitUrl['index']:0, // 用户点击的第几个icon，从0开始
        },
        //页面初始化函数
        init: function() {
            var that = this;
            that.events();
            that.getMembershipDetailsData();
        },
        //滑动初始化
        swiperInit:function(n, num) {
            //获取滑动图片的起始位置
            var xPX = 100 * ($('body').width() / 750) * 0.5;
            //获取每个滑动图片的外边距
            var marW = 100 * ($('body').width() / 750) * 0.56;
            swiperShow = new Swiper(".show-swiper", {
                slidesPerView: "auto", //
                watchSlidesProgress: !0,
                slidesOffsetBefore: xPX,
                spaceBetween: marW,
                resistanceRatio: 1,
                initialSlide: n, //图片滑动到第几个未开始位置
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: true, //是否循环
                on: {
                    progress: function(b) {
                        // for(i = 0; i < this.slides.length; i++){
                        //     slide = this.slides.eq(i);
                        //     slideProgress = this.slides[i].progress;
                        //     prevIndent = 4 == i ? .3228 : .0898;
                        //     scale = 1 > Math.abs(slideProgress + prevIndent) ? .4 * (1 - Math.abs(slideProgress + prevIndent)) + 1 : 1;
                        //     slide.find(".goods").transform("scale3d(" +scale + "," + scale + ",1)");                            
                        // }        
                        swiperSizeMap(this.slides, 'goods')
                    },
                    //滑动中
                    setTransition: function(b) {
                        for (var a = 0; a < this.slides.length; a++) {
                            this.slides.eq(a).find(".goods").transition(b);
                        }
                    },
                    //滑动结束赋值
                    slideChangeTransitionEnd: function() {
                        $(".lazyload").lazyload()
                        var index = this.activeIndex % num;
                        var text = $('.swiper-slide').eq(index).attr('data-text');
                        var link = $('.swiper-slide').eq(index).attr('data-link');
                        var name = $('.swiper-slide').eq(index).attr('data-name');
                        $('.membershipDetailsContentBox h2').text(name);
                        $('.membershipDetailsContentBox p').html(text);
                        $(".tel").attr("href", "tel:" + commonSetting.serverPhone).html(commonSetting.serverPhone)
                        if(link){
                            $('.linkBtnBox').show()
                            $('.linkBtnBox a').attr('onclick','setGoUrl( "'+link+'", "detailsUnderstandingDetails_01", this)')
                        }else{
                            $('.linkBtnBox').hide()
                        }
                       
                    },
                }
            });
        },
        //获取会员权益详情
        getMembershipDetailsData: function() {
            var that = this;
            var obj = [{
                url: site_url.findBenefitByLevel_api,
                data: {
                    level: '7' // 传最高就行，可以固定写死，拿所有的权益
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data;
                    generateTemplate(data, that.$e.membershipDetailsSilderBox, that.$e.membershipDetailsListTemplateId);
                    that.swiperInit(parseInt(that.gV.index), json.data.length);
                    // $(".lazyload").lazyload()
                },
                callbackNoData: function(json) {
                    console.log(json)
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