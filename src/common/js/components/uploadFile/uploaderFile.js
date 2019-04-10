/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2018-05-17 16:15:43
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-23 11:05:39
 * @description:财商教育上传图像
 */

var tipAction = require('../tipAction.js');
var splitUrl = require('../splitUrl.js');
//引入根据url获取文件
var getFileObject = require('./urlToBlob.js')

module.exports = function(callback, imgDefault) {

    var windowHref = window.location.href;
    var uploaderInstance = {};


    /****************************初始默认配置******************************/

    var elements = { //uploaderFile配置中需要的参数
        compliance: $('#complianceMaterial'), //合规改造上传图片区域
        upLoadWrap: $('#complianceMaterial'), //财商教育上传图片区域
        uploadBtn: $('#upload_btn'), //财商教育上传图片按钮
        ratio: window.devicePixelRatio || 1, // 优化retina, 在retina下这个值是2
        width: 200, //预览的图片宽高
        height: 100,
    };

    //ajax请求参数
    var ajaxParam = {
        investType: splitUrl()['investType'], // 投资者类型【0.专业投资者；1.普通投资者】
    };

    /*
      在这里对各种上传类型进行配置
      complianceMaterial-合规改造上传图片区域
      allDeploy-这些类型共用的配置
     */
    var uploaderFile = {
        compliance: { //合规改造相关配置
            $Wrap: elements.compliance, //合规改造上传图片的区域
            $queue: elements.compliance.find('.img_wrap'), // 图片选择后显示的位置
            $upload: elements.compliance.find('.save'), //上传按钮
            $select: elements.compliance.find('#complianceSelect'), // 选择按钮
            fileNumLimit: 5, //
            multiple: true,
            errorTip: '只能上传5张照片',
            acceptTitle: 'compliance',
            extensions: 'gif,jpg,jpeg,png,bmp,',
            mimeTypes: 'image/*,Camera/*', // word格式--application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,
            formData: {
                investType: ajaxParam.investType //提交到服务器的参数
            },
            fileSizeLimit: 1024 * 1024 * 5, //5M
            uploadUrl: site_url.applyForClassification_api, //上传路径
        },
        createPlan: { //财商教育
            $Wrap: elements.compliance, //合规改造上传图片的区域
            $queue: elements.upLoadWrap.find('.img_wrap'), // 图片选择后显示的位置
            $upload: elements.uploadBtn, //上传按钮
            $select: elements.upLoadWrap.find('#complianceSelect'), // 选择按钮
            fileNumLimit: 1, //
            multiple: false,
            // errorTip: '只能上传5张照片',
            // acceptTitle: 'compliance',
            extensions: 'gif,jpg,jpeg,png,bmp,',
            mimeTypes: 'image/*,Camera/*', // word格式--application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,
            //可选择的类型
            fileSizeLimit: 1024 * 1024 * 5, //5M
            formData: {
                pictureSource: "10" //提交到服务器的参数-财商教育,由以前的CSJY 改为10
            },
            uploadUrl: site_url.uploadApi, //上传路径
            fileVal: 'file',
            getAjaxImg: true, //是否需要回显图片
            imgDefault: imgDefault,
            // imgUrlList: ['/financialEducation/static/img/amountBg.png']

        },
        allDeploy: { //共用的配置
            fileNumLimit: 1, //
            fileSizeLimit: 1024 * 1024 * 5, //图片大小限制5M
            success: 0, //上传成功的张数，预设为0
            //hasError : false, //是否有上传文件格式不正确的情况，true为有，false为没有
            thumbnailWidth: elements.width * elements.ratio, // 预览图大小，根据上面设置的宽高计算
            thumbnailHeight: elements.height * elements.ratio,
            swfUrl: '/include/js/vendor/webuploader/Uploader.swf', //swf文件路径
        }
    };

    /***************************初始化webuploader************************/

    //构造函数
    var creatUploader = function(source, ele) {
        console.log('初始化webuploader');

        this.source = source; //不同实例的配置信息
        this.$ele = ele; //不同实例的放置区域的DOM元素
        this.uploader = WebUploader.create({ //创建不同的webUploader实例

            pick: { // 选择图片按钮
                id: source.$select,
                multiple: source.multiple // 同时选择多张图片
            },
            accept: { //可接受图片的类型
                title: source.acceptTitle,
                extensions: source.extensions,
                mimeTypes: source.mimeTypes //进行选择时，打开的文件夹只有图片可选择
            },
            thumb: {
                crop: false, //预览时不允许裁剪，否则过长的图片会被截取
                // width: elements.width,
                // height: elements.height,
                // allowMagnify: true
            },
            formData: source.formData, //提交到服务器的参数
            fileVal: source.fileVal, // file,参数
            fileNumLimit: source.fileNumLimit, //只能上传5张
            fileSizeLimit: source.fileSizeLimit, //大小5M
            server: source.uploadUrl, //上传路径
            compress: false, //上传前不进行压缩
            auto: false, //需要手动调用上传
            prepareNextFile: true, //在传输时把下一个文件准备好，节省时间
            swf: uploaderFile.allDeploy.swfUrl, // swf文件路径
            disableGlobalDnd: true, //禁止拖放功能 
            chunked: true,
        })
    };

    creatUploader.prototype = {

        //为每个实例绑定事件
        init: function() {

            var that = this;
            // 回显图片
            that.backDisplay();

            //绑定各事件
            that.uploader.onFileQueued = function(file) {
                that.fileQueued(file, that.$ele, that.source.income);
            };

            that.uploader.onFileDequeued = function(file) { //当文件被移出队列时触发
                that.removeFile(file, that.$ele);
            };

            /*选择图片加入队列发生错误时监听*/
            that.uploader.onError = function(type) {
                that.queuedError(type, that.$ele, that.source.errorTip);
            };

            /*上传错误监听*/
            that.uploader.onUploadError = function(file, reason) {
                that.UploadFail(that.uploader, file, reason);
            };

            /*上传成功监听*/
            that.uploader.onUploadSuccess = function(file, reason) {
                that.UploadSuccess(that.uploader, file, reason);
            };

            that.source.$upload.on('click', function() {
                // 点击上传按钮的时候，判断是否需要上传默认图片,
                // 判断该实例是否需要通过接口获取图片并默认显示
                
                $(this).attr("disabled", true).addClass('disable');
                that.backDisplay(true); // 回显
            });
        },

        //文件添加入队列时触发
        fileQueued: function(file, $source, errorTip) {
            var that = this;
            //校验都通过，进行预览
            that.addFile(file, that.uploader, errorTip, $source);
        },

        //预览图片
        addFile: function(file, uploader, errorTip, $source) {
            var that = this;

            if ($('.filelist li').length == 1) {
                //已经有1张了，把新文件从队列里删除并提示
                tipAction(errorTip)
                uploader.removeFile(file, true);
                return false;
            }

            var $div = $('<div class="iconWrap" id="' + file.id + '">' +
                    '<p class="imgWrap"></p>' +
                    '<span class="iconfont closeIcon">&#xe607;</span>' +
                    '</div>'),
                $btns = $div.find('span.closeIcon'),
                $wrap = $div.find('p.imgWrap');

            $source.find('.queueList #complianceSelect').before($div);

            //调用webuploader的预览函数
            uploader.makeThumb(file, function(error, src) {
                //makeThumb为webuploader的事件，生成缩略图用于预览
                //thumbnailWidth，thumbnailHeight为顶部设置的全局变量中的缩略图大小

                if (error) {
                    //预览出错，显示文件名称
                    $wrap.text(file.name).css({
                        'width': '90px',
                        'height': '90px',
                        'text-align': 'center',
                        'background': '#eaeaea'
                    });
                    //return;
                } else {
                    //预览正常，显示图片
                    var img = $('<img src="' + src + '">');
                    $wrap.empty().append(img); //每次先清空再插入新图片
                }

                //显示预览部分
                $source.find('.queueList').show();

            }, uploaderFile.allDeploy.thumbnailWidth, uploaderFile.allDeploy.thumbnailHeight);

            $btns.on('click', function() {
                //使用webuploader从队列里删除文件的方法，会自动触发onFileDequeued事件
                that.uploader.removeFile(file, true);
                $(that.source.$Wrap).find("input[type='file']").trigger("click");
            });

            // $source.find('.queueList #complianceSelect').before($div);
        },

        //将文件从页面上删除
        removeFile: function(file, $source) {
            //删除对应的Li
            var $li = $('#' + file.id);
            if ($li.length == 0) {
                return false;
            }
            $li.off().find('.file-panel').off();
            $li.remove();
            $source.find('#complianceSelect').show();
        },

        //将文件加入队列的错误发生时
        queuedError: function(type, $source, tip) {
            var that = this;

            if (type == 'Q_EXCEED_SIZE_LIMIT') {
                //上传文件大小超出限制
                tipAction('上传文件不得超出5M，请重新上传')
                return false;
            }
            if (type == 'Q_EXCEED_NUM_LIMIT') {
                //添加的文件数量超出fileNumLimit
                tipAction(tip)
                return false;
            }
            if (type == 'Q_TYPE_DENIED') {
                //格式不正确
                tipAction('上传格式有误，请上传jpg，png格式文件')
            }
            if (type == 'NO_FILE') {
                //
                tipAction('请上传头像')
            }
        },

        //上传失败的处理函数
        UploadFail: function(uploader, file, json) {

            uploader.removeFile(file, true);

            //显示错误信息

            tipAction(json.msg);
        },

        //上传成功后的处理函数
        UploadSuccess: function(uploader, file, json) {
            //判断登录是否失效
            //login(json);
            uploader.removeFile(file, true);

            if (!json || json.status == '1') {
                //上传出现错误
                uploader.onUploadError(file, json);
                return false;
            }

            callback(json)
        },

        /**
         * [backDisplay description] 图片回显逻辑,需要给uploaderlist里面添加返回图片
         * @author songxiaoyu 2018-05-18
         * @param  {Boolean} isSubmit [description] 是只单纯回显，还是提交默认图片,
         *                            为true时，会走upload
         */
        backDisplay: function(isSubmit) {
            var that = this;

            if ($('.queueList .iconWrap').length > 1) { // list里面有图片，直接上传

                that.uploader.upload();
            } else { // 没有默认图片，需要将图片转换，添加到list中
                if (!!that.source.getAjaxImg) {
                    //需要
                    getFileObject(imgDefault, function(fileObject) {
                        var wuFile = new WebUploader.Lib.File(WebUploader.guid('rt_'), fileObject);
                        var file = new WebUploader.File(wuFile);
                        that.uploader.addFiles(file);
                        if (isSubmit) {

                            that.uploader.upload();
                        }
                    })
                }
            }
        }

    };

    if (windowHref.indexOf('/views/createPlan') != -1) { //财商交易
        uploaderInstance = new creatUploader(uploaderFile.createPlan, elements.upLoadWrap); //合规改造

    } else if (windowHref.indexOf('/views/uploadMaterial') != -1) {
        //合规改造--创建实例
        uploaderInstance = new creatUploader(uploaderFile.compliance, elements.compliance); //合规改造
    }
    //初始化实例
    uploaderInstance.init();

    return uploaderInstance;
}