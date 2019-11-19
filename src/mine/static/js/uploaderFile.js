/*
 * @page: 投资者分类上传
 * @Author: songxiaoyu
 * @Date:   2017-05-24
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2019-6-13
 * @description:
 */

var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');

module.exports = function(callback, preThis, type) {
    /****************************初始默认配置******************************/

    var elements = { //uploaderFile配置中需要的参数
        compliance: $('#complianceMaterial'), //合规改造上传图片区域
        uploadBtn: $('#upload_btn'), //上传图片按钮
        ratio: window.devicePixelRatio || 1, // 优化retina, 在retina下这个值是2
        width: 100, //预览的图片宽高
        height: 100,
    };

    /*
      在这里对各种上传类型进行配置
      complianceMaterial-合规改造上传图片区域
      allDeploy-这些类型共用的配置
     */
    var uploaderFile = {
        compliance: { //合规改造相关配置
            $Wrap: elements.compliance, //合规改造上传图片的区域
            $queue: elements.compliance.find('.queueList'), // 图片选择后显示的位置
            $uploadBtn: elements.uploadBtn, //上传按钮
            $select: elements.compliance.find('#complianceSelect'), // 选择按钮
            fileNumLimit: 9, //
            multiple: true,
            errorTip: '最多只能上传九张照片',
            acceptTitle: 'compliance',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/*,Camera/*', // word格式--application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,
            //可选择的类型
            // investType: ajaxParam.investType, //提交到服务器的参数，投资者类型
            // fileSizeLimit: 1024 * 1024 * 10 * 9, //10M---总文件大小
            fileSingleSizeLimit: 1024 * 1024 * 10, //10M---单张文件大小
            // fileSingleSizeLimit: 1024 * 300, //10M---单张文件大小
        },
        allDeploy: { //共用的配置
            fileNumLimit: 2, //
            fileSizeLimit: 1024 * 1024 * 10, //图片大小限制10M
            success: 0, //上传成功的张数，预设为0
            //hasError : false, //是否有上传文件格式不正确的情况，true为有，false为没有
            uploadUrl:  site_url.upload_api, //insertFeedback_api 上传路径
            thumbnailWidth: elements.width * elements.ratio, // 预览图大小，根据上面设置的宽高计算
            thumbnailHeight: elements.height * elements.ratio,
            swfUrl: '/include/js/vendor/webuploader/Uploader.swf', //swf文件路径
        }
    };

    /***************************初始化webuploader************************/

    //构造函数
    var creatUploader = function(source, ele) {

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
            formData: {
            },
            fileVal: 'file',
            fileNumLimit: source.fileNumLimit, //只能上传5张
            // fileSizeLimit: source.fileSizeLimit, //
            fileSingleSizeLimit: source.fileSingleSizeLimit, //
            server: uploaderFile.allDeploy.uploadUrl, //上传路径
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

            that.source.$uploadBtn.on('click', function(e) {
                var condition = true; 
                var a = $('.uploadMaterial').find('.uploadArea').length; // 上传区域个数
                $('.uploadArea').each(function(i,obj){
                    if($(obj).find('.imgNum').length==0){
                        condition = false;
                        return false;
                    }
                })

                if (condition) {
                    // 如果校验通过，执行上传
                    // $('.listLoading').show();
                    // debugger
                    that.uploader.upload();
                } else {
                    tipAction('请完善认证资料');
                }
                
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

            var $div = $('<div class="mui-col-xs-6 iconWrap imgNum" id="' + file.id + '">' +
                    '<p class="imgWrap"></p>' +
                    '<span class="iconfont closeIcon">&#xe607;</span>' +
                    '</div>'),
                $btns = $div.find('span.closeIcon'),
                $wrap = $div.find('p.imgWrap');

            // $source.find('.queueList #complianceSelect').before($div);
            // that.source.$queue.find('#complianceSelect').before($div);
            that.source.$select.before($div);

            //调用webuploader的预览函数
            uploader.makeThumb(file, function(error, src) {
                //makeThumb为webuploader的事件，生成缩略图用于预览
                //thumbnailWidth，thumbnailHeight为顶部设置的全局变量中的缩略图大小

                if (error) {
                    //预览出错，显示文件名称
                    $wrap.text(file.name).css({
                        'width': '252px',
                        'height': '189px',
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
                // $source.find('.queueList').show();
                // $source.$queue.show();

            }, uploaderFile.allDeploy.thumbnailWidth, uploaderFile.allDeploy.thumbnailHeight);

            $btns.on('click', function() {
                //使用webuploader从队列里删除文件的方法，会自动触发onFileDequeued事件
                that.uploader.removeFile(file, true);
            });

            // $source.find('.queueList #complianceSelect').before($div);
        },

        //将文件从页面上删除
        removeFile: function(file, $source) {
            var that = this;
            //删除对应的Li
            var $li = $('#' + file.id);
            if ($li.length == 0) {
                return false;
            }
            $li.off().find('.file-panel').off();
            $li.remove();
            that.source.$select.show();
        },

        //将文件加入队列的错误发生时
        queuedError: function(type, $source, tip) {
            var that = this;
            /*if (type == 'Q_EXCEED_SIZE_LIMIT') {
                //上传总文件文件大小超出限制
                tipAction('上传总文件不得超出90M，请重新上传')
                return false;
            }*/
            if (type == 'F_EXCEED_SIZE') {
                //上传文件大小超出限制
                tipAction('上传文件不得超出10M，请重新上传')
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
                tipAction('请上传专业投资者审核材料,哈哈哈')
            }
        },

        //上传失败的处理函数
        UploadFail: function(uploader, file, json) {

            // 上传失败也不移除文件
            // uploader.removeFile(file, true);

            //显示错误信息

            tipAction(json.msg);
        },

        //上传成功后的处理函数
        UploadSuccess: function(uploader, file, json) {
            var that = this;
            //判断登录是否失效
            console.log('callback------  ', callback)
            // 上传成功不移除文件
            // uploader.removeFile(file, true);

            if (!json || json.status == '1') {
                //上传出现错误
                uploader.onUploadError(file, json);
                return false;
            }
            debugger
            callback.call(preThis, json)
        },
    };


        var complianceUploader = new creatUploader(uploaderFile.compliance, elements.compliance); //合规改造
        // //初始化
        complianceUploader.init();


}