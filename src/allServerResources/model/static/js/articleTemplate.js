


/**
* 模板页面
* @author 田俊国 2019-11-19
* @author purpleZhao js补充
* 路径中携带参数须知id为后台配置对应id，如果是一个列表。则传对应的id，因为一个articleBelong也就是归属对应多个无法区分。只需穿id即可，articleBelong传上也没事最好是只传id。
* 如果articleBelong也就是归属只有一个。那么只需要传articleBelong即可。id为空也可以。有值传过来也可以。
* articleBelong为后台配置该条信息对应的articleBelong
* applyType不需要传
* updater chentiancheng
* 2020年4月24日10:36:18
* 删除公募详情入参fundType  
*/

require('@pathCommonBase/base.js');
//黑色提示条
//var tipAction = require('@pathCommonJs/components/tipAction.js');
//var tipAction = require('@pathCommonJsCom/tipAction.js');
require('@pathCommonJsCom/utils.js');
// require('@pathCommonJsCom/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js')();

var playVideo = require('@pathCommonJsCom/playVideo/playVideo.js');

var playAudio = require('@pathCommonCom/audio/audio.js');


$(function () {
    var templatePage = {
        //获取页面元素
        $e: {
            contentWrap: $('#contentWrap'),
            HeadBarpathName: $("#HeadBarpathName"),
            btnButton: $(".btnButton"),
            btnHref: $(".btnHref"),
            artHeaderCont: $(".artHeaderCont"),
            artImg: $(".artImg"),
            artTitle: $('.artTitle'),
            control: $("#control"),
            audioPlayIcon: $('.audioPlayIcon'),
            audioArea: $(".audioArea"),
            aud: $("#aud"),
            audioDisc: $(".audioDisc"),
            audioTime: $(".audioTime"),
            videoButton: $(".videoButton"),

        },
        gV: { // 全局变量

            recomTypes: "", //按钮跳转链接
            fundCode: '',//基金代码
            //videoExternalUrl:"",//视频路劲

        },
        //页面初始化函数
        init: function () {
            this.getTypeNet();
            this.getTemplateData();
            this.events()
        },
        // 获取消息getnoticeItemData中心列表
        getTemplateData: function() {
            var that = this;
            var obj = [{
                url: site_url.getArticle_api,
                data: {
                    id: splitUrl['id'] || "",
                    articleBelong: splitUrl['articleBelong'] || "",
                    applyType: "0",//h5是0
                },
                needDataEmpty: true,
                callbackDone: function (json) {
                    var resData = json.data;
                    if (!!resData.h5Title) {//标题
                        that.$e.HeadBarpathName.text(resData.h5Title);
                    }
                    //设置边距
                    that.$e.contentWrap.css({
                        "padding":".5rem .5rem 0",
                        "line-height" : "0.54rem",
                        "font-size" : "0.28rem",
                        "color" : "#4E4E4E"
                    })
                    if (splitUrl['articleBelong'] == 30 && splitUrl['applyType'] == 0) {
                        $('#video_wrapper').hide()
                    }

                    //富文本内容
                    that.$e.contentWrap.html(resData.content);

                    that.$e.artImg.find("img").attr("src", resData.imageAttachUrl);//头部图片


                    //如果视频路径不为空的话则显示播放按钮，给图片赋值视频地址
                    if (resData.videoExternalUrl.length != 0) {

                        //隐藏视频播放按钮
                        //
                        that.$e.videoButton.show();

                        //视频路径
                        that.gV.videoExternalUrl = resData.videoExternalUrl;
                    }
                    if (resData.h5Type == "1") {//标题 h5模板类型 1图片 2文章 3产品推荐

                        //内容去边距不留白
                        that.$e.contentWrap.css({

                            "padding": "0"
                        })
                        if (splitUrl['articleBelong'] == 30) {
                            that.$e.contentWrap.css({
                                "padding":".5rem .5rem 0",
                                "line-height" : "0.54rem",
                                "font-size" : "0.28rem",
                                "color" : "#4E4E4E"
                            })
                        }

                    }else if(resData.h5Type == "2") {
                        // 含有标题时才展示该区域
                        if(resData.title) {
                            that.$e.artTitle.removeClass("hide")
                            that.$e.artTitle.find("p").html(resData.title);//文章title
                        }

                        //如果音频路径不为空的话则隐藏音频dom元素
                        if (resData.voiceAttachUrl.length != 0) {

                            that.$e.audioArea.show();
                            that.$e.audioDisc.html(resData.voiceAttachName);
                            that.$e.audioTime.find("span").eq(1).html(resData.fileSize);
                            that.$e.aud.attr("src", resData.voiceAttachUrl);//音频路径
                            //调用音频方法
                            playAudio(resData.voiceAttachUrl,resData.voiceAttachName,resData.fileSize);
                        }

                    
                    }else if (resData.h5Type == "3") {//产品推荐
                        //内容去边距不留白
                        if(resData.buttonLabel){
                            that.$e.contentWrap.css({
                                "padding": "0",
                                "marginBottom": ".98rem"
                            })
                            //给底部按钮加文字和跳转链接
                            that.$e.btnButton.show();
                            that.$e.btnHref.html(resData.buttonLabel).show();

                            that.gV.fundCode = resData.recomCodes;

                            that.recomTypes = resData.recomTypes;
                        }
                        
                        if (splitUrl['articleBelong'] == 30) {
                            that.$e.contentWrap.css({
                                "padding":".5rem .5rem 0",
                                "line-height" : "0.54rem",
                                "font-size" : "0.28rem",
                                "color" : "#4E4E4E"
                            })
                        }
                        
                        
                    }

                },
                callbackFail: function (json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        },

        getTypeNet: function() {
            var strCode = navigator.userAgent;
            console.log(navigator.userAgent.NetType);
            console.dir(navigator.userAgent);
            // alert(navigator.userAgent.toString());
            // alert(navigator.userAgent.NetType.toString());
            // var stringNet= strCode .match(/NetType/\w+/) ? strCode .match(/NetType/\w+/)[0] : 'NetType/other';
            // var networkType= stringNet.toLowerCase().replace('nettype/', '');
            // if(networkType==='wifi'){
            // console.log('当前网络为wifi')
            // }else if(networkType==='4g'){
            // console.log("当前网络为4g")
            // }else if(networkType==="3g"){
            // console.log("当前网络为3g")
            // }else if(networkType==="2g"){
            // console.log("当前网络为2g")
            // }else {
            // console.log("当前为有线网络")
            // }
        },

        events: function() {
            var that = this;

            mui("body").on('mdClick', '.btnHref', function() {
                //1-超级现金宝;2-货币型普通基金;3-私募基金;4-超宝产品列表;5-私募产品列表；6-非货币型普通基金
                //后续找小宇确认跳转逻辑和连接
                if (that.recomTypes == "1") {//1-超级现金宝

                    window.location.href = site_url.superStreasureDetail_url + '?fundCode=' + that.gV.fundCode;

                } else if (that.recomTypes == "2") {

                    window.location.href = site_url.pofPublicDetail_url + "?fundCode=" + that.gV.fundCode;//货币型普通基金

                } else if (that.recomTypes == "3") {//私募产品详情页

                    window.location.href = site_url.privatePlacementDetail_url + "?projectId=" + that.gV.fundCode;

                } else if (that.recomTypes == "4") {//超宝产品列表

                    window.location.href = site_url.cashManagement_url;

                } else if (that.recomTypes == "5") {//私募产品列表

                    $('body').append('<iframe src="appHref://privateList" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');

                } else if (that.recomTypes == "6") {

                    window.location.href = site_url.pofPublicDetail_url + "?fundCode=" + that.gV.fundCode + "&fundType";//非货币型普通基金
                }
            },{
                'htmdEvt': 'articleTemplate_01'
            });


            //调用视频播放
            mui("body").on('mdClick', '.artImg', function() {
                playVideo(that.gV.videoExternalUrl,"video_wrapper");
            },{
                'htmdEvt': 'articleTemplate_02'
            });
        },
    };
    templatePage.init();
});