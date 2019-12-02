


/**
* 模板页面
* @author 田俊国 2019-11-19
*/
require('@pathIncludJs/vendor/config.js');

//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//黑色提示条
//var tipAction = require('@pathCommonJs/components/tipAction.js');
//var tipAction = require('@pathCommonJsCom/tipAction.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

var playVideo = require('@pathCommonJs/components/playVideo/playVideo.js');


$(function(){
    let templatePage = {
        //获取页面元素
        $e:{
            contentWrap:$('#contentWrap'),
            HeadBarpathName:$("#HeadBarpathName"),
            btnButton:$(".btnButton"),
            btnHref:$(".btnHref"),
            artHeaderCont:$(".artHeaderCont"),
            artImg:$(".artImg"),
            artTitle:$('.artTitle'),
            control:$("#control"),
            audioPlayIcon:$('.audioPlayIcon'),
            audioArea:$(".audioArea"),
            aud:document.getElementById("aud"),
            //videoArea:$(".videoArea"),
            videoButton:$(".videoButton"),

        },
        gV: { // 全局变量

            recomTypes: "", //按钮跳转链接
            //videoExternalUrl:"",//视频路劲

        },
        //页面初始化函数
        init:function(){
            this.getTemplateData();
            this.events()
        },
        // 获取消息getnoticeItemData中心列表
        getTemplateData() {
            var that=this;
            var obj=[{
                url: site_url.getArticle_api,
                data:{
                    id : splitUrl['id'],
                    articleBelong:splitUrl['articleBelong'],
                    applyType:splitUrl['applyType']*1,
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var resData = json.data;
                    if(!!resData.h5Title){//标题
                        that.$e.HeadBarpathName.text(resData.h5Title);
                    }

                    that.$e.contentWrap.css({
//                          "margin":"1rem 0 0",
                        "padding":".5rem .5rem 0"
                    })

                    that.$e.contentWrap.html(resData.content);

                    if(resData.h5Type == "1"){//1图片



                    }else if(resData.h5Type == "2") { //标题 h5模板类型 1图片 2文章 3产品推荐

                        that.$e.artHeaderCont.show();
                        that.$e.artImg.attr("src",resData.imageAttachUrl);//头部图片
                        that.$e.artTitle.find("p").html(resData.title);//文章title

                        //如果音频路径为空的话则隐藏音频dom元素
                        if(resData.voiceAttachUrl.length ==0){

                            that.$e.audioArea.hide();

                        }else{
                            //that.$e.audio.attr("src",resData.voiceAttachUrl);//音频路径
                            $("#aud").attr("src",resData.voiceAttachUrl);//音频路径


                        }

                        //如果视频路径不为空的话则显示播放按钮，给图片赋值视频地址
                        if(resData.videoExternalUrl.length !=0){

                            //隐藏视频播放按钮
                            //
                            that.$e.videoButton.show();

                            that.gV.videoExternalUrl = resData.videoExternalUrl;//视频路径
                        }


                    }else if(resData.h5Type == "3"){//产品推荐

                        //给底部按钮加文字和跳转链接
                        that.$e.btnButton.html(resData.buttonLabel).show();

                        that.recomTypes = resData.recomTypes;
                    }

                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        },

        events() {
            var that = this;

            that.$e.btnHref.on('tap', function() {

                //1-超级现金宝;2-普通基金;3-私募基金;4-超宝产品列表;5-私募产品列表
                //后续找小宇确认跳转逻辑和连接
                if(that.recomTypes == "")
                window.location.href = "";
            });



            mui("body").on('tap', '.artImg', function() {
                playVideo(that.gV.videoExternalUrl,"video_wrapper");
            })

        },
    };
    templatePage.init();
});