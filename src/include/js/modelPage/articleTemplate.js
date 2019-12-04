


/**
* 模板页面
* @author 田俊国 2019-11-19
*
* @author purpleZhao js补充
*/

require('@pathCommonBase/base.js');
//黑色提示条
//var tipAction = require('@pathCommonJs/components/tipAction.js');
//var tipAction = require('@pathCommonJsCom/tipAction.js');
require('@pathCommonJsCom/utils.js');
require('@pathCommonJsCom/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js')();

var playVideo = require('@pathCommonJsCom/playVideo/playVideo.js');

var playAudio = require('@pathCommonCom/audio/audio.js');


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
            aud:$("#aud"),
            audioDisc:$(".audioDisc"),
            audioTime:$(".audioTime"),
            videoButton:$(".videoButton"),

        },
        gV: { // 全局变量

            recomTypes: "", //按钮跳转链接
            fundCode:'',//基金代码
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

                    //设置边距
                    that.$e.contentWrap.css({

                        "padding":".5rem .5rem 0"
                    })

                    //富文本内容
                    that.$e.contentWrap.html(resData.content);

                    //头部图片
                    that.$e.artImg.find("img").attr("src",resData.imageAttachUrl);
                    //文章title
                    that.$e.artTitle.find("p").html(resData.title);

                    //如果音频路径不为空的话则显示音频dom元素
                    if(resData.voiceAttachUrl.length !=0){

                        that.$e.audioArea.show();

                        //调用音频方法
                        playAudio(resData.voiceAttachUrl,resData.voiceAttachName,resData.fileSize);

                    }

                    //如果视频路径不为空的话则显示播放按钮，给图片赋值视频地址
                    if(resData.videoExternalUrl.length !=0){

                        //隐藏视频播放按钮
                        //
                        that.$e.videoButton.show();

                        //视频路径
                        that.gV.videoExternalUrl = resData.videoExternalUrl;
                    }
                    if(resData.h5Type == "1"){//标题 h5模板类型 1图片 2文章 3产品推荐

                        //内容去边距不留白
                        that.$e.contentWrap.css({

                            "padding":"0"
                        })

                    }else if(resData.h5Type == "3"){//产品推荐

                        //给底部按钮加文字和跳转链接
                        that.$e.btnButton.html(resData.buttonLabel).show();

                        that.gV.fundCode = resData.recomCodes;

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

                //1-超级现金宝;2-货币型普通基金;3-私募基金;4-超宝产品列表;5-私募产品列表；6-非货币型普通基金
                //后续找小宇确认跳转逻辑和连接
                if(that.recomTypes == "1"){//1-超级现金宝

                    window.location.href = site_url.superStreasureDetail_url;

                }else if(that.recomTypes == "2"){

                    window.location.href = site_url.pofPublicDetail_url + "?fundCode="+that.gV.fundCode + "&fundType=10300";//货币型普通基金

                }else if(that.recomTypes == "3"){//私募产品详情页

                    window.location.href = site_url.privatePlacementDetail_url + "?projectId="+that.gV.fundCode;

                }else if(that.recomTypes == "4"){//超宝产品列表

                    window.location.href = site_url.cashManagement_url;

                }else if(that.recomTypes == "5"){//私募产品列表

                    $('body').append('<iframe src="appHref://privateList" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');

                }else if(that.recomTypes == "6"){

                    window.location.href = site_url.pofPublicDetail_url + "?fundCode="+that.gV.fundCode + "&fundType";//非货币型普通基金
                }
            });


            //调用视频播放
            mui("body").on('tap', '.artImg', function() {
                playVideo(that.gV.videoExternalUrl,"video_wrapper");
            });


        },
    };
    templatePage.init();
});