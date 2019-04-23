/*
 * @page: 财商教育表单页
 * @Author: songxiaoyu
 * @Date:   2018-05-10 10:48:29
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-20 10:22:09
 * @description:
 */

require('../../../include/js/vendor/mui/mui.picker.min.js');
require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/input.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var autoTextarea = require('../../../common/js/components/autoTextarea.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
var getBranchList = require('../../../common/json/branchList.js');
// require('../../../common/js/components/elasticLayer.js');
var uploadFile = require('../../../common/js/components/uploadFile/uploaderFile.js');

$(function() {

    var somePage = {
        imgUpload: {},
        imgUrl: '',
        ele: {
            createBtn: $('.container .create_btn'), // 创建按钮
        },
        init: function() {
            var that = this;

            that.findApi();
            that.events();

        },
        findApi: function(json) {
            var that = this;
            /*
             *在页面初始化时，需要首先查询财商教育记录,返显数据
             */

            var obj = [{
                url: site_url.findApi,
                data: {
                    hmac: "", //预留的加密信息
                    params: {} //请求的参数信息        
                },
                needLogin: true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data,
                        imgDefault;

                    if (data.imgUrl) { // 再次编辑


                        that.imgUrl = data.imgUrl; // 回显图片地址

                        // 先下载图片，再回显
                        imgDefault = that.getDownImg();

                        /*----------------------------表单回显 start-------------------*/
                        // 上传图片初始化,并且返现图片
                        that.imgUpload = uploadFile(that.getUpdateApi, imgDefault);
                        
                        if (!!data.planName) { //项目名称
                            $('[check=planName]').html(data.planName);
                        }
                        if (!!data.kidName) { //孩子姓名
                            $('[check=kidName]').html(data.kidName);
                        }
                        if (!!data.kidGender) { //性别
                            if (data.kidGender == '0') {
                                $('[check=genderSelect]').html('女').attr("num", data.kidGender).addClass('hasSelect');
                            } else {
                                $('[check=genderSelect]').html('男').attr("num", data.kidGender).addClass('hasSelect');
                            }
                        }
                        if (!!data.kidBirthday) { //出生日期  ---
                            $('[check=birthSelect]')
                                .html(data.kidBirthday.substring(0, 4) + "-" + data.kidBirthday.substring(4, 6) + "-" + data.kidBirthday.substring(6, 8))
                                .attr("num", 1).addClass('hasSelect');
                        }
                        if (!!data.kidMessage) { //成长寄语
                            $('[check=name]').val($.trim(data.kidMessage));
                        }
                        autoTextarea($("textarea")[2]);
                        /*------------------------------表单回显 end-------------------*/
                    } else { //初次进入
                        imgDefault = '/financialEducation/static/img/default_kid.jpg';
                        uploadFile(that.getUpdateApi, imgDefault);

                        autoTextarea($("textarea")[2]);//初次进入要调用一次textarea，自动获取高度
                    }
                },
                callbackNoData: function() { //没有初始化过页面
                    window.location.href = site_url.guidePageUrl;
                },
                     
            }];
            $.ajaxLoading(obj);
        },
        getDownImg: function() { // 下载图片
            var that = this,
                imgDefault = site_url.downloadApi + '?fileName=' + that.imgUrl;

            return imgDefault;
        },
        /**
         * 1.请求更新图片接口
         * 2.请求删除之前图片接口
         */
        getUpdateApi: function(json) {
            var that = this;

            var obj = [{
                url: site_url.updateApi,
                data: {
                    hmac: "", //预留的加密信息
                    //请求的参数信息
                    imgUrl: json.data.fileName || that.imgUrl, // 封面图片
                    planName: $("[check=planName]").val(), // 项目名称
                    kidName: $("[check=kidName]").val(), // 孩子名称
                    kidGender: $('[check=genderSelect]').attr('num'), // 性别
                    kidBirthday: $("[check=birthSelect]").html().replace(/[-]/g, ""), //出生日期 8位19900505
                    kidMessage: $("[check=name]").val() || '请填写', // 成长寄语
                },
                //async: false,
                needLogin: true,
                needDataEmpty: false,
                callbackDone: function(json) {
                    // 跳转计划详情页面
                    window.location.href = site_url.growthPlanUrl;
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                    
                    that.ele.createBtn.removeAttr("disabled").removeClass('disable');
                }
            }, {
                url: site_url.removeApi,
                data: {
                    hmac: "", //预留的加密信息
                    //请求的参数信息
                    fileName: that.imgUrl,
                },
                //async: false,
                needLogin: true,
                needDataEmpty: true,
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
            /*
             *创建按钮逻辑
             * 1.校验必填字段
             * 2.请求上传图片接口，上传默认图片
             * 3.请求更新记录接口，将返回图片地址和所有字段上传
             */
            that.ele.createBtn.on('tap', function() {
                var $this = $(this);

                result = $.checkInput();

                if (!result) {
                    //校验未通过
                    return false;
                }

                // 如果校验通过，会执行上传操作，在uploadfile.js中请求上传接口，
                // 成功之后，走getUpdateApi接口
            })
        },
    };
    somePage.init();
});