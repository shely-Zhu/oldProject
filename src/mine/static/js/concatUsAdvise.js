/**
* 联系我们，意见反馈
* @author chentiancheng 2019-11-14
update 2020-01-08  chentiancheng
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
// require('@pathCommonJs/components/headBarConfig.js');
var uploadFile = require('@pathCommonCom/uplaoderFile/concatUsAdviseUploaderFile.js')
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
    var concatUsAdvise = {
        gD: {
            feedbackType: null,//客户反馈类型
            imgNum: 0, // 需要上传的图片数量
            idArr: [], // 已上传的id数组
            feedbackDesc: null,//客户反馈描述
        },
        init: function () {
            var that = this;
            $(".list").eq(0).hide()
            $('.listLoading').hide()
            uploadFile(that.asyncAll, that, 1); //插件初始化
            if(splitUrl['hairHeight']){
                $(".ishair").show()
            }
            that.event()
            //初始化时隐藏加载
        },
        // 所有图片上传完毕，请求申请投资者分类接口
        asyncAll: function (idJson, idTypeArr) {
            var that = this;
            if(idJson.status=='0000'){
                that.gD.idArr.push.apply(that.gD.idArr, idJson.data);
            }else{
                tipAction(idJson.message); 
            }

            // that.gD.imgNum = $('.uploadMaterial').find('.imgNum').length;
        },
        event: function () {
            var that = this;
            //点击事件，点击获取值
            mui("body").on('mdClick','.list', function(){
                that.gD.feedbackType = $(this).children("input").val() || 0
            },{
                'htmdEvt': 'concatUsAdvise_01'
            })
            //文本事件
            mui("body").on('input','.textarea', function(){
                that.gD.feedbackDesc = $(".textarea").val()
                $(".haveMany").text(that.gD.feedbackDesc.length+'/200')
            })
        },
        //提交
        submitAdvise:function(){
            var that = this;
            $(".blueBgButton").addClass("disable")
            var obj = [{
                url: site_url.insertFeedback_api,
                data: {
                    feedbackType: Number(that.gD.feedbackType),
                    feedbackDesc: $(".textarea").val(),
                    imgIds: that.gD.idArr
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    $(".blueBgButton").removeClass("disable")
                    tipAction("  意见提交成功,感谢您的反馈")
                    setTimeout(function(){
                        if (window.isAndroid) {
                            //这个是安卓操作系统
                            window.jsObj.backNative();
                        }
                        if (window.isIOS) {
                            //这个是ios操作系统
                            window.webkit.messageHandlers.backNative.postMessage('backNative');
                        }
                    },2000)
                    
                },
                callbackFail: function(json) {
                    $(".blueBgButton").removeClass("disable")
                    tipAction(json.message);
                }
                
            }];
            $.ajaxLoading(obj);
        },
    }
    concatUsAdvise.init()

})