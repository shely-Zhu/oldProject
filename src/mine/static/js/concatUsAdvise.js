/**
* 联系我们，意见反馈
* @author chentiancheng 2019-11-14
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonJs/ajaxLoading.js');
// var uploadFile = require('@pathCommonJs/components/uploadFile/uploaderFile.js');
// var uploadFile = require('@pathCommonJs/components/uploadFile/uploaderFile.js');
var uploadFile = require('./uploaderFile.js')

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
    let concatUsAdvise = {
        gD: {
            feedbackType: null,//客户反馈类型
            imgNum: 0, // 需要上传的图片数量
            idArr: [], // 已上传的id数组
            feedbackDesc: null,//客户反馈描述
        },
        init: function () {
            var that = this;
            $(".list").eq(0).hide()
            uploadFile(that.asyncAll, that, 1); //插件初始化
            that.event()
        },
        // 所有图片上传完毕，请求申请投资者分类接口
        asyncAll: function (idJson, idTypeArr) {
            var that = this;
            that.gD.imgNum = $('.uploadMaterial').find('.imgNum').length;
            // that.gD.idArr.push(1);
            that.gD.idArr.push.apply(that.gD.idArr, idJson.data);
            // if (that.gD.idArr.length === that.gD.imgNum) {
            //     that.submitAdvise()
            // }
            // console.log(idJson)
        },
        event: function () {
            var that = this;
            $(".list").on("click", function (e) {
                that.gD.feedbackType = $(this).children("input").val() || 0
            })
            $(".textarea").on('keyup', function () {
                that.gD.feedbackDesc = $(".textarea").val()
                $(".haveMany").text(that.gD.feedbackDesc.length+'/200')
            })

        },
        submitAdvise() {

            var that = this;
            var obj = [{
                url: site_url.insertFeedback_api,
                data: {
                    feedbackType: that.gD.feedbackType,
                    feedbackDesc: that.gD.feedbackDesc,
                    imgIds: that.gD.idArr
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    console.log(json)
                    location.href = "javascript:history.go(-1)";
                },
                callbackFail: function (json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        }
    }
    concatUsAdvise.init()

})