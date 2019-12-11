/*
 * @page: 老带新----推荐有礼
 * 
 * @Author: yangjinlai
 * @Date:   2017-10-27 10:48:29
 *  @description: js可以更换版本，但是html是分享出去的链接，不能变;
 *                 关闭弹层按钮，fixed定位在ios，app中会随着屏幕滚动，所以提出来
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-30 15:38:48
 * @description: 推荐有礼大改版
 */



require('../../../include/js/vendor/config.js');

//zepto模块 
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../include/js/vendor/mui/mui.picker.min.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayerTypeTwo.js');

var tipAction = require('../../../common/js/components/tipAction.js');
var popPicker = require('../../../common/js/components/popPicker.js');

$(function() {
    var recommend = {
        getElements: {
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            manager_choose_wrap: $('.manager_choose_wrap'), // 选择理财师区域
            manager_show_wrap: $('.manager_show_wrap'), // 唯一理财师展示区域
            qrcode_wrap: $('.qrcode_wrap'), // 二维码区域
            inviting_friend_wrap: $('.inviting_friend_wrap'), // 邀请好友区域
        },
        setting: {
            ajaxArr: [], // 请求ajax的数组
            count: 0, // 计数
            num: 3, // 需等待异步执行接口完成数量，（鉴权，分享内容，分享链接）3个接口
            weixinConf: {}, // 微信分享内容对象
            title: '', // 微信分享title设置
            imageUrl: '', // 微信分享图片设置
            introduction: '', // 微信分享简介设置
        },
        list: [], // 存放接口里获取的理财师数据
        phone: '', // 存放用户信息接口里取出来的脱敏手机号
        isWeiXin: true, // 标志是否在微信内打开，默认为true--是
        customerNo:'',
        // 各图片的标志位类型
        // 按顺序为：老带新首页，老带新积分有礼，老带新规则说明，老带新二维码
        init: function() {
            var that = this;

            that.getUserInfor();

            // 页面所处位置判断，逻辑处理
            that.judgePageLocation();

            //初始化mui
            mui.init();

            // 是否实名认证判断
            that.checkRealName();

            //绑定事件
            that.events();
        },
        // 先请求接口，获取客户比那好
        getUserInfor:function(){
            var that = this;
            var userObj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {
                    hmac: "", //预留的加密信息     
                    params: { //请求的参数信息
                    }
                },
                async: false,
                needLogin: true,
                callbackDone: function(json) {
                    
                    var jsonData = json.data;
                    that.customerNo = jsonData.customerNo;
                },
                 
            }]
            $.ajaxLoading(userObj);

        },
        /**
         * [judgePageLocation 页面所处位置判断--微信，app中对应逻辑处理]
         * @author songxiaoyu 2018-07-18
         */
        judgePageLocation: function() {
            var that = this;
            //判断是否是微信浏览器
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) != "micromessenger") {
                //不是微信浏览器，隐藏微信分享按钮
                that.isWeiXin = false;
                // 二维码下的提示文案，只有普通浏览器显示，微信和app内都不显示
                $('.qrcode_wrap .code_tip').show();
            }

            //如果是app，在页面上添加iframe
            //用来设置分享链接给app
            //因ios和安卓拦截到的ldxShare为小写，这里同步改为ldxshare
            if (window.currentIsApp) {
                $('body').append('<iframe src="ldxshare://" id="ldx_share" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');
                // 二维码下的提示文案，只有普通浏览器显示，微信和app内都不显示
                $('.qrcode_wrap .code_tip').hide();
            }
        },
        // 是否实名认证判断
        checkRealName: function() {
            var that = this;

            var obj = [{ // 判断是否已认证
                url: site_url.oldRecommendNew_api,
                data: {
                    empNo: '' //理财师工号
                },
                needLogin: true,
                // needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.data.recommendable == 1) {
                        // 未实名认证
                        tipAction('完成实名认证后才可以推荐好友哦', function() {
                            window.location.href = site_url.mine_url;
                        })
                    } else {
                        // 已实名认证，初始化页面
                        that.initialPage()
                    }
                },
            }];
            $.ajaxLoading(obj);
        },
        // 初始页面请求
        initialPage: function() {
            console.log('initialPage')
            var that = this;
            // 理财师接口传参
            var custBroData = {
                empNo: "", //工号    
                fundType: "0", // 只掉私募接口  0：私募  1： 公募
                isPass: '', //是否通过基金从业考试 Y：通过 N：未通过
            };
            // 微信sdk所需数据的接口参数
            var shareData = {
                url: window.location.href
            };
            // 查看规则接口参数
            var ruleData = {
                category: "appRuleOldAndNew",
                groupType: '',
                curPage: "1",
                pageSize: "1"
            };
            // 微信分享接口参数
            var wxData = {
                category: "appShareOldAndNew",
                groupType: '',
                curPage: "1",
                pageSize: "1"
            };

            // 如果是微信浏览器
            if (that.isWeiXin) {
                // 为性能，提前请求鉴权接口，分享内容接口，

                // 请求微信鉴权接口
                that.generateAjaxObj(site_url.share_api, shareData, function(data) {
                    //  微信config设置
                    that.dealWeiXinSet(data);
                })

                // 请求微信分享内容接口
                that.generateAjaxObj(site_url.findContentByCategory_api, wxData, function(data) {
                    // 将数据存储起来，待一会生成链接使用，为性能，提前请求接口
                    var data = data.pageList[0];

                    that.setting.weixinConf = Object.assign(that.setting.weixinConf, Object(data));
                    // 确保3个接口（鉴权，分享内容，分享链接）都请求成功，再设置分享链接
                    that.asyncAll();
                }, function() {}, function(){}, true)
            }

            // 获取理财师的接口
            that.generateAjaxObj(site_url.custBro_api, custBroData, function(data) {
                console.log('获取理财师的接口callback')
                // 根据理财师处理页面逻辑
                that.dealManagerLogic(data);
            }, function() {
                //设置立即邀请好友的按钮状态为不可点
                $('.btnButton .txt').addClass('disable').attr('disabled', 'disabled');
            },function(){
                // 没有理财师，生成包含客户信息的二维码
                // 同步请求加密接口，拿到加密信息,通知app,生成二维码
                that.generateShareLink();
            })

            // 规则说明
            that.generateAjaxObj(site_url.findContentByCategory_api, ruleData, function(data) {

                if (data.pageList[0]) {
                    $('.rule_des_wrap').show();
                    $('.rule_des_cont').html(data.pageList[0].content);
                }
            }, function() {},function(){}, true)

            that.getData();
        },
        // 有数据返回的   根据理财师处理页面逻辑
        dealManagerLogic: function(data) {
            var that = this,
                shareUrl = '', // 分享出去链接
                existMain = data.existMain,
                advisor = data.advisor;
            if (existMain == 0 && advisor.length > 1) {
                //无专属且理财师多于1位

                //显示理财师选择
                that.getElements.manager_choose_wrap.show();
                // that.getElements.qrcode_wrap.hide();
                $('.lcs').css('visibility', 'visible');

                //循环数据
                $.each(advisor, function(i, el) {
                    that.list.push({
                        text: '<span>' + el.codeName + '</span><span>' + el.empNo + '</span>',
                        value: el.empNo
                    })
                })
            } else {
                // 有专属理财师或者只有一位普通理财师
                $('.manager_show_wrap .manager_show').html(advisor[0].codeName + advisor[0].empNo)
                that.getElements.manager_show_wrap.show();
                that.generateShareLink(advisor[0].empNo);
            }
        },

        /**
         * [queryAesEncrypt  同步请求加密接口，拿到加密信息,通知app,生成二维码]
         * @author songxiaoyu 2018-07-18
         */
        generateShareLink: function(num) {
            console.log('generateShareLink')
            var that = this,
                aesEncrypt = ''; // 加密信息

            that.setting.ajaxArr.push({
                url: site_url.oldRecommendNew_api,
                data: {
                    empNo: num || '' //理财师工号
                },
                async: false, // 同步请求
                needLogin: true,
                needDataEmpty: false,
                callbackDone: function(json) {

                    if (json.data.recommendable == 1) {
                        // 未实名认证
                        tipAction('完成实名认证后才可以推荐好友哦', function() {
                            window.location.href = site_url.realNameStepOne_url;
                        })
                    } else {
                        // 已实名认证
                        aesEncrypt = json.data.aesEncrypt;
                        //拼分享出去的链接
                        
                        // shareUrl = 'https://wx.chtwm.com/api/brand/index.html?activityId=pWhA5xJTKF4Zfst%2B9ycHqQ%3D%3D&channel=3&shareCustomerNo=' + that.customerNo;
                        shareUrl = site_url.marketCampaign_url + '&shareCustomerNo=' + that.customerNo + '&shareEmpCode=' + num;

                        // 生成二维码
                        that.generateQrcode(shareUrl)

                        //如果是微信内打开--处理微信分享
                        if (that.isWeiXin) {
                            var obj = { "shareUrl": shareUrl };
                            // 设置分享url
                            that.setting.weixinConf = Object.assign(that.setting.weixinConf, obj)
                            // 确保3个接口（鉴权，分享内容，分享链接）都请求成功，再设置分享链接
                            that.getElements.inviting_friend_wrap.show();
                            that.asyncAll();
                        }

                        //如果是app--设置ldxShare的值--- 需要拼凑对应的链接
                        if (window.currentIsApp) {
                            $('#ldx_share').attr('src', 'ldxShare://' + shareUrl);
                            // ios里显示了邀请按钮，做下隐藏
                            that.getElements.inviting_friend_wrap.hide();
                        }
                    }
                },
                callbackFail: function(json) {
                    $this.removeClass('disable').removeAttr('disabled');
                    tipAction(json.message);
                }
            })
            that.getData();
        },
        // 微信鉴权设置
        dealWeiXinSet: function(data) {
            var that = this;

            wx.config({
                // debug: true,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    //'checkJsApi',
                    'hideMenuItems',
                    'showMenuItems',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    // 'onMenuShareQQ',
                    // 'onMenuShareWeibo',
                    // 'onMenuShareQZone'
                ]
            });

            //设置分享到微信
            wx.ready(function() {
                //隐藏其他分享
                wx.hideMenuItems({
                    menuList: [
                        //'menuItem:share:timeline',
                        'menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:share:facebook',
                        'menuItem:share:QZone',
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline'
                    ],
                    success: function(res) {},
                    // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
                that.asyncAll()
            });

            wx.error(function(res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res)
            });
        },
        //微信分享
        /**
         * [weixinShare 微信分享设置]
         * @author songxiaoyu 2018-07-27
         * @description  that.setting.weixinConf在（鉴权，分享内容，分享链接）3个接口中集成
         */
        weixinShare: function() {
            var that = this;

            wx.showMenuItems({
                menuList: [
                    'menuItem:share:appMessage',
                    'menuItem:share:timeline'
                ],
                success: function(res) {},
                // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: that.setting.weixinConf.title, // 分享标题
                desc: that.setting.weixinConf.introduction, // 分享描述
                link: that.setting.weixinConf.shareUrl, // 分享链接
                imgUrl: that.setting.weixinConf.imageUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    //隐藏分享提示浮层
                    $('.tipMask').hide();
                },
                fail: function() {
                    $('.tipMask').hide();
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    //隐藏分享提示浮层
                    $('.tipMask').hide();
                }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: that.setting.weixinConf.title, // 分享标题
                link: that.setting.weixinConf.shareUrl, // 分享链接
                imgUrl: that.setting.weixinConf.imageUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    //隐藏分享提示浮层
                    $('.tipMask').hide();
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    //隐藏分享提示浮层
                    $('.tipMask').hide();
                }
            });
        },
        /**
         * [generateQrcode ]
         * @author songxiaoyu 2018-07-18
         * @param  {[type]} shareUrl [description]
         * @return {[type]}          [description]
         */
        generateQrcode: function(shareUrl) {
            var that = this;

            // 清楚已有二维码
            $('#code').html("");

            //计算二维码的宽高
            var w = $('#code').width();

            //调用生成二维码组件
            jQuery("#code").qrcode({
                //render: "table", //table方式 
                render: 'image',
                width: w,
                height: w,
                text: shareUrl //任意内容 
            });

            that.getElements.qrcode_wrap.show();

        },
        events: function() {
            var that = this;

            //点击选择理财师
            mui("body").on('tap', '.mui-navigate-right', function() {
                //出现选择器
                popPicker(1, that.list, $('.mui-table-view a'));
            })

            //点击--生成专属二维码
            mui("body").on('tap', '.generate_btn', function() {

                //判断理财师是否已选择 
                if (!$('.mui-table-view .mui-navigate-right').hasClass('hasSelect') && that.list.length) {
                    tipAction('请选择您的理财师');
                    return false;
                }

                //获取选中的理财师工号
                var num = $('.mui-table-view a').attr('num');

                //按钮变色
                var $this = $(this).find('.txt');
                $this.addClass('disable').attr('disabled', 'disabled');

                // 清楚原有二维码
                // jQuery("#code").qrcode.clear();
                // 生成新的二维码
                that.generateShareLink(num)
                // 二维码显示
                // that.getElements.qrcode_wrap.show();
            })

            //点击隐藏弹层
            // $('.shareMask').on('click', function(e) {
            //     if (!$(e.target).hasClass('shareWrap')) {
            //         $('.shareMask').removeClass('show');
            //         $('.closeElastic').show();
            //         $('.btnButton .txt').removeClass('disable').removeAttr('disabled');
            //     }
            // })

            // 关闭所有弹层
            $('.closeElastic').on('click', function(e) {
                $(e.target).hide();
                $('.tipMask').hide();
            })

            // 点击--邀请好友
            mui("body").on('tap', '.inviting_friend_wrap', function() {
                //显示分享提示弹层
                $('.tipMask').show();
                $('.closeElastic').show();
            })
        },
        /*-----------------------------------公共方法------------------------------*/
        /**
         * [generateAjaxObj 生成ajax对象，并添加到ajaxArr中,异步请求]
         * @author songxiaoyu 2018-07-12
         * @param  {[type]}   url        [接口--请求url]
         * @param  {[type]}   data       [接口--请求参数]
         * @param  {[type]}   sync       [同步请求]
         * @param  {Function} callback   [回掉函数--处理数据]
         */
        generateAjaxObj: function(url, data, callback, callbackFail, callbackNoData, contentTypeSearch) {
            var that = this;

            that.setting.ajaxArr.push({
                url: url,
                data: data,
                // async: false,
                needLogin: true,
                needDataEmpty: true,
                contentTypeSearch: contentTypeSearch,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    //隐藏loading
                    // that.getElements.listLoading.hide();
                    callback(jsonData);
                },
                callbackFail: function(json) {
                    // that.getElements.listLoading.hide();
                    tipAction(json.message);
                    callbackFail && callbackFail();
                },
                callbackNoData:function(){
                    callbackNoData(); 
                }
            });
        },
        /**
         * [getTemplate 解析模板]
         * @author songxiaoyu 2018-07-12
         * @param  {[type]} ele  [添加到ele元素中]
         * @param  {[type]} json [待解析的数据]
         */
        getTemplate: function(ele, template, json) {
            // 模板
            var that = this,
                source = template.html(),
                template = Handlebars.compile(source),
                html = template(json);

            ele.append(html);
        },
        /**
         * [getData 执行ajaxLoading]
         * @author songxiaoyu 2018-07-12
         */
        getData: function() {
            var that = this;
            //显示loading
            // that.getElements.listLoading.show();

            $.ajaxLoading(that.setting.ajaxArr);
            that.setting.ajaxArr = [];
        },
        // 确保3个接口（鉴权，分享内容，分享链接）都请求成功，再设置分享链接
        /**
         * [asyncAll 确保3个接口（鉴权，分享内容，分享链接）都请求成功，再设置分享链接]
         * @author songxiaoyu 2018-07-27
         */
        asyncAll: function() {
            var that = this;
            console.log(that.setting.num);
            if (++that.setting.count === that.setting.num) {
                that.weixinShare();
            }
        },
    };
    recommend.init();
})