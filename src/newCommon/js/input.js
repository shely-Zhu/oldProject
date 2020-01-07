/** 
 *
 * 集成了表单元素中blur、focus、click等各相关事件及校验，
 * 返回结果已经过$.trim(xssfilter.filter())的处理
 * 
 * 首页/公募这样的页面，只有一个输入框且不需要校验，无需require本文件，
 * 直接引入xssfilter文件，在该页面js中进行$.trim(xssfilter.filter())处理
 *
 * 需要校验的元素，为保证正确使用本插件，需要添加2个属性：needCheck="true"  check="***"
 * 1. needCheck="true"，表示该元素需要校验，不论是input/textarea/select下拉框，只要该元素
 * 是需要校验的，都需要添加此属性，否则不会被本插件获取到，不会对该元素做校验
 * 2. check="***"，唯一标识该元素，与本插件中checkFunc构造函数的checkList属性一一对应，
 * 每一个元素都有不同的属性值，插件会根据这个属性值去寻找到对应的校验配置，做校验并显示错误信息
 *
 * 下拉列表只需要做是否已选择的校验（用户点击选择后改变num值，未做选择时num为空）
 * 其他input/textarea有是否为空、长度判断等校验需求，因此input/textarea和下拉列表的校验会在
 * check()里做类型判断，调用不同的校验函数
 *
 * 下拉列表的check属性值，必须包括'select'这几个字符
 *
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2019-01-03 
 * @description: 添加财商教育页面表单引入json

 * 汇付天下接口整合，职业类型调用 crm 接口
 * @author ping 2018-11-09 

 */


//引入校验配置文件
var inputCheckSetting = require('./components/form/inputCheckSetting.js');


//引入xssFilter及配置
var xssFilter = require('xssfilter');
var xssfilter = new xssFilter({
    matchStyleTag: false,
    matchScriptTag: false,
    removeMatchedTag: false,
    escape: true
});

//引入下拉列表选择器
var popPicker = require('./components/popPicker.js');

//黑色提示条的显示和隐藏
var tipAction = require('./components/tipAction.js');

//刷新图文验证码
var getTwyzm = require('./components/getNewTwyzm.js');

// 离焦事件绑定
var blurEvents = require('@pathCommonJsCom/form/event/blurEvents.js');
var eventsFunc = require('@pathCommonJsCom/form/event/eventsFunc.js');

//当前页面地址
var windowHref = window.location.href;


/****************** 不同页面所需的json/下的文件require *************************/

if (windowHref.indexOf('views/realName/') != -1) {
    //实名认证的页面
    //引入所有省列表
    var bankProvinceList = require('../json/bankProvince.js');
    //引入所有城市区域列表
    var bankCityList = []; // 全局变量暂存
    var getBankCityList = require('../json/getBankCityList.js');
    //银行列表
    var bankSelect = require('../json/bankList.js');
    //支行列表
    var getBranchList = require('../json/branchList.js');
    //通用版证件类型数据
    var idTypeList = require('../json/realNameIdTypeSelect.js');
    //个人投资决策者数据类型
    var investList = require('../json/investList.js');
    //证件有效期类型列表
    var idtimeTypeList = require('../json/idtimeTypeList.js');
    //crm字典接口
    var dataCrmList = require('../json/dicDataCrm.js');
    //性别列表
    var genderList = require('../json/genderList.js');

} else if (windowHref.indexOf('views/bassMessage') != -1) {
    //职业类型数据
    // var vocaList = require('../json/vocationList.js');
    //个人投资决策者数据类型
    var investList = require('../json/investList.js');
    //机构投资决策者数据类型
    var getList = require('../json/getList.js');
    //证件有效期类型列表
    var idtimeTypeList = require('../json/idtimeTypeList.js');
    //crm字典接口
    var dataCrmList = require('../json/dicDataCrm.js');
    //性别列表
    var genderList = require('../json/genderList.js');
} else if (windowHref.indexOf('views/recruit') != -1) {
    //招聘的省份列表
    var provinceList = require('../json/provinceList.js');
} else if (windowHref.indexOf('views/createPlan') != -1) { // 财商教育创建成长计划页面
    var genderList = require('../json/genderList.js');
}

/*if( windowHref.indexOf("questionnaireOrg.html") > 0 ){  
    //机构版
    var idTypeList = require('../json/orgIdTypeSelect.js');
}else if( windowHref.indexOf("questionnairePer.html") > 0 ){  
    //个人
    var idTypeList = require('../json/realNameIdTypeSelect.js');//通用版证件类型数据
}*/



/******************不同页面所需的短信验证码接口请求require *************************/

if (windowHref.indexOf('views/realName/') != -1) {
    //实名认证页面，获取短信验证码的接口-----鉴权第一步
    var pefFirstAuthForSmsCodeAPI = require('./components/form/formAPI/pefFirstAuthForSmsCodeAPI.js');
}

if (windowHref.indexOf('forgetDealForm.html') != -1) {
    // 忘记网站交易密码 重置密码（发送短信验证码)
    var setPasswordForPayFirstAPI = require('./components/form/formAPI/setPasswordForPayFirstAPI.js');
}

//注册、重设联系方式、赎回、忘记登录密码页面，获取短信验证码的接口
if (windowHref.indexOf('register.html') != -1 ||
    windowHref.indexOf('resetLinkPhone.html') != -1 ||
    windowHref.indexOf('prvPayRansomTwo.html') != -1 ||
    windowHref.indexOf('phoneVerify.html') != -1 ||
    windowHref.indexOf('recommendRegister.html') != -1 ||
    windowHref.indexOf('consult.html') != -1 || windowHref.indexOf('plannerSearch.html') != -1) {

    //有语音验证码
    var getVoiceAPI = require('./components/form/formAPI/getVoiceAPI.js');
    var messageCertSendAPI = require('./components/form/formAPI/messageCertSendAPI.js');
}



(function($, window, document, undefined) {

    //所有校验元素可公用的页面上其他元素
    var ele = {
        $body: $('body'), //body元素
        $error_tip: $('.againEnter'), //错误提示
    }

    //声明构造函数
    var checkFunc = function($el) {

        //实名认证第一步，对银行列表数组做一个备份
        this.bankSelectCopy = windowHref.indexOf('realNameStepOne.html') != -1 ? bankSelect : '';

        this.$el = $el; //当前元素
        this.attrCheck = $el.attr('check'); //该元素的check属性值

        //存放该元素的类别，下拉列表为select，input和textarea为inputAndText
        this.type = this.attrCheck.indexOf('select') != -1 || this.attrCheck.indexOf('Select') != -1 ? 'select' : 'inputAndText';

        //存放该元素相关的其他元素
        this.siblingsEl = {
            eye: $el.parent().siblings('.noEye'), //眼睛
            img: ele.$body.find('.twyzm_img'), //图片验证码使用，图片标签
            dx_button: ele.$body.find('.dxyzmBtn'), //短信验证码按钮
            yy_button: ele.$body.find('.noCode'), //语音验证码
        }
    }

    checkFunc.prototype = {

        init: function() {
            var that = this;

            // 绑定统一的blur/focus/click 事件      
            that.bindEvents();

            //绑定其他事件
            that.bindOtherEvents();

            //页面初始化时，需要进行的操作
            that.openWindow();

        },

        //页面初始化时，需要进行的操作
        openWindow: function() {
            var that = this;

            //如果有图文验证码，页面第一次打开时需要请求一次
            if (that.attrCheck == 'twyzm') {
                getTwyzm();
            }

        },

        //绑定统一的blur/focus/click 事件      
        bindEvents: function() {
            var that = this;

            //绑定blur/focus/iconfont  click事件 下拉列表不需要绑定
            if (that.type != 'select') {

                //为绑定输入框的眼睛绑定事件
                that.siblingsEl.eye.on({

                    //click事件
                    click: function(e) {
                        if ($(this).hasClass('open')) {

                            $(this).removeClass('open');
                            //.html('&#xe60d;');
                            $(this).siblings('.mui-input-row').find("input").attr('type', 'password');

                        } else {
                            $(this).addClass('open');
                            //.html('&#xe606;');
                            $(this).siblings('.mui-input-row').find("input").attr('type', 'text');
                        }
                    },

                })
                //身份证号码input绑定失去焦点事件
                $("#idNum").on("blur", function() {
                    if ($('.idTypeSelect [check=idTypeSelect]').html() == '身份证') {
                        if ($("#idNum").val().length == 15 || $("#idNum").val().length == 18) {
                            var year = $("#idNum").val().substring(6, 10),
                                month = $("#idNum").val().substring(10, 12),
                                day = $("#idNum").val().substring(12, 14);
                            $('[check=birthSelect]').addClass('unable hasSelect').html(year + "-" + month + "-" + day).attr("num", 1);

                            if ($("#idNum").val().length == 15) {
                                if ($("#idNum").val().substring(14, 15) % 2 == 0) {
                                    $('[check=genderSelect]').html('女').attr('num', 1).addClass("unable hasSelect");
                                } else {
                                    $('[check=genderSelect]').html('男').attr('num', 0).addClass("unable hasSelect");
                                }
                            } else {
                                if ($("#idNum").val().substring(16, 17) % 2 == 0) {
                                    $('[check=genderSelect]').html('女').attr('num', 1).addClass("unable hasSelect");
                                } else {
                                    $('[check=genderSelect]').html('男').attr('num', 0).addClass("unable hasSelect");
                                }
                            }
                        }
                    }
                });

                //不能输入空格
                if (that.attrCheck != 'name') {
                    that.$el.on('keyup', function(e) {
                        if (e.keyCode == '32') {
                            $(this).val($.util.regList.removeAllSpace($(this).val()));
                        }
                    })
                }
            }
        },

        //为个别元素绑定其他事件
        bindOtherEvents: function() {
            var that = this;

            if (that.attrCheck == 'twyzm') {
                //图文验证码
                that.siblingsEl.img.on('click', function() {
                    getTwyzm();
                })
            }
            if (that.attrCheck == 'dxyzm') {
                //短信验证码的点击
                that.siblingsEl.dx_button.on('click', function() {
                    that.dxButtonPost();
                })

                //收取语音验证码的点击
                that.siblingsEl.yy_button.on('click', function() {
                    getVoiceAPI();
                })

            }
            if (that.attrCheck == 'newDealPassword' || that.attrCheck == 'qrNewDealPassword') {
                //限制输入6位数字
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 6) {
                        //截取6位
                        $(this).val($.trim($(this).val()).substring(0, 6));
                    }
                })
            }
            if (that.attrCheck == 'regAddress' || that.attrCheck == 'doAddress') {
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 101) {
                        //截取6位
                        $(this).val($.trim($(this).val()).substring(0, 100));
                        that.showError("最多可输入 100字", this);
                    }
                })
            }
            if (that.attrCheck == 'busCope') {
                //限制输入6位数字
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 501) {
                        //截取6位
                        $(this).val($.trim($(this).val()).substring(0, 500));
                        that.showError("最多可输入 500字", this);
                    }
                })
            }
            if (that.attrCheck == 'perAddress') {
                //限制输入6位数字
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 101) {
                        //截取6位           
                        $(this).val($.trim($(this).val()).substring(0, 100));
                        that.showError("最多可输入 100字", this);
                    }
                })
            }
            if (that.attrCheck == 'orgAddress') {
                //限制输入6位数字
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 37) {
                        //截取6位
                        $(this).val($.trim($(this).val()).substring(0, 36));
                        that.showError("最多可输入 36字", this);
                    }
                })
            }
            if (that.attrCheck == 'orgAddMessage') {
                //限制输入6位数字
                that.$el.on('keyup', function(e) {
                    if ($(this).val().length >= 201) {
                        //截取6位
                        $(this).val($.trim($(this).val()).substring(0, 200));
                        that.showError("最多可输入200字", this);
                    }
                })
            }
            //实名认证---证件类型的选择
            //点击证件类型下拉列表
            if (that.attrCheck == 'idTypeSelect') {

                mui("body").on('tap', '.idTypeSelect', function() {

                    $('input,textarea').blur();

                    if (!$('[check=idTypeSelect]').hasClass('unable')) {

                        popPicker(1, idTypeList, $('.idTypeSelect a'), function(t) {
                            if ($('.idTypeSelect [check=idTypeSelect]').html() != '身份证') {
                                //如果选择的不是身份证，隐藏浦发银行和邮政储蓄银行
                                bankSelect = that.bankSelectCopy.concat();
                                for (var i = 0; i < bankSelect.length; i++) {
                                    if (bankSelect[i].value == '934' || bankSelect[i].value == '010') {
                                        bankSelect.splice(i, 1);
                                        i--;
                                    }
                                }
                                $('[check=birthSelect]').removeClass("unable hasSelect").html("请选择出生日期").removeAttr('num');
                            } else {
                                bankSelect = that.bankSelectCopy.concat();
                            }
                            //清空已选的发卡银行
                            $('.bankSelect [check=bankSelect]').html($('.bankSelect [check=bankSelect]').attr('errortip')).removeClass('hasSelect').attr({ 'num': '', 'sonDicNo': '' });
                            $('.provinceCitySelect [check=provinceCitySelect]').html($('.provinceCitySelect [check=provinceCitySelect]').attr('errortip')).removeClass('hasSelect').attr('num', '');
                            $('.branchSelect [check=branchSelect]').html($('.branchSelect [check=branchSelect]').attr('errortip')).removeClass('hasSelect').attr('num', '');
                            //t.isScroll = false;
                            if ($('.idTypeSelect [check=idTypeSelect]').html() != '外国护照') {
                                $(".nationSelect [check=nationSelect]").html("中国").attr('num', '156').addClass('unable hasSelect');
                            } else {
                                $(".nationSelect [check=nationSelect]").html("请选择您的国籍").removeAttr('num').removeClass('unable hasSelect');
                            }
                        });

                    }


                })
            }
            //国籍的选择
            if (that.attrCheck == 'nationSelect') {
                window.nationlist = [];
                mui("body").on("tap", '.nationSelect', function() {
                    $('input,textarea').blur();

                    //判断身份证件是否选择--只在实名认证页面判断
                    if (($('.idTypeSelect').find('[check=idTypeSelect]').html() == $('.idTypeSelect').find('[check=idTypeSelect]').attr('errortip')) && windowHref.indexOf('views/realName/') != -1) {
                        // 未选则  进行错误提示
                        that.showError($('.idTypeSelect').find('[check=idTypeSelect]').attr('errortip'));
                    } else { //已选择
                        if (!$('[check=nationSelect]').hasClass('unable')) {
                            console.log($('[check=nationSelect]').html())
                            $(".nationality").show();
                            $(".nationality .listLoading").show();
                            if (window.nationlist.length == 0) {
                                dataCrmList('1005', $('[check=nationSelect]').attr('num'), window.nationlist);
                                var tplmParent = $("#nation-list-templete").html();
                                var templateParent = Handlebars.compile(tplmParent);
                                var htmlParent = templateParent(window.nationlist);
                                $(".nationality .mui-table-view-nation").html(htmlParent);
                            }
                            $(".listLoading").hide();

                        }
                    }
                })
            }
            //性别选择
            if (that.attrCheck == 'genderSelect') {
                mui("body").on("tap", '.genderSelect', function() {
                    $('input,textarea').blur();

                    if ($('.idTypeSelect [check=idTypeSelect]').length != 0) {
                        if ($('.idTypeSelect [check=idTypeSelect]').html() == '身份证') {
                            if ($("#idNum").val().length == 18) {
                                if ($("#idNum").val().substring(16, 17) % 2 == 0) {
                                    $('[check=genderSelect]').html('女').attr('num', 0).addClass("unable hasSelect");
                                } else {
                                    $('[check=genderSelect]').html('男').attr('num', 1).addClass("unable hasSelect");
                                }
                            } else {
                                $('[check=genderSelect]').removeClass("unable hasSelect").html("请选择您的性别").removeAttr("num");
                            }

                        } else {
                            $('[check=genderSelect]').removeClass("unable hasSelect").html("请选择您的性别").removeAttr("num");
                        }
                    }
                    if (!$('[check=genderSelect]').hasClass('unable')) {
                        popPicker(1, genderList, $('.genderSelect a'));
                    }
                })
            }

            //证件有效期选择
            if (that.attrCheck == 'timeTypeSelect') {

                mui("body").on("tap", '.timeTypeSelect', function() {
                    $('input,textarea').blur();

                    if (!$('[check=timeTypeSelect]').hasClass('unable')) {
                        popPicker(1, idtimeTypeList, $('.timeTypeSelect a'), function(t) {
                            if ($('[check=timeTypeSelect]').html() == "长期有效") {
                                $('.timeTypeSelect').addClass('isBor')
                                $(".timeSelect").hide().find('a').attr('needcheck', false);
                                $(".timeSelect").parents('.formBox').hide();
                            } else {
                                $('.timeTypeSelect').removeClass('isBor')
                                $(".timeSelect").show().find('a').attr('needcheck', true);
                                $(".timeSelect").parents('.formBox').show();
                            }
                            if(window.location.href.indexOf("bassPer.html") != -1) { //基本信息页面
                                if($('[check=timeTypeSelect]').html() != "已过期") {
                                    $('[check=timeTypeSelect]').css("color","#333");
                                }
                            }
                            
                        });
                    }
                })
            }
            //证件有效期至
            if (that.attrCheck == 'timeSelect') {
                mui("body").on("tap", ".timeSelect", function(e) {
                    $('input,textarea').blur();

                    if (!$('[check=timeSelect]').hasClass('unable')) {
                        var dtpicker = new mui.DtPicker({
                            type: "date", //设置日历初始视图模式 
                            beginDate: new Date("1901", "00", "01"), //设置开始日期 
                            endDate: new Date('2099', '12', '29'), //设置结束日期 
                            labels: ['年', '月', '日'], //设置默认标签区域提示语 
                        })
                        dtpicker.show(function(selectItems) {
                            $(".timeSelect a").html(selectItems.text).addClass("hasSelect").attr("num", "1");
                            dtpicker.dispose();
                        })
                    }
                });
            }

            //日期选择
            if (that.attrCheck == 'birthSelect') {
                mui("body").on("tap", ".birthSelect", function(e) {
                    $('input,textarea').blur();

                    if ($('[check=birthSelect]').hasClass('unable')) {
                        return;
                    }

                    if ($('.idTypeSelect [check=idTypeSelect]').length != 0) {
                        if ($('.idTypeSelect [check=idTypeSelect]').html() == '身份证') {
                            if ($("#idNum").val().length == 15 || $("#idNum").val().length == 18) {
                                var year = $("#idNum").val().substring(6, 10),
                                    month = $("#idNum").val().substring(10, 12),
                                    day = $("#idNum").val().substring(12, 14);
                                $('[check=birthSelect]').addClass('unable hasSelect').html(year + "-" + month + "-" + day).attr("num", 1);
                            } else {
                                $('[check=birthSelect]').removeClass("unable hasSelect").html("请选择出生日期").removeAttr("num");
                            }
                        } else {
                            $('[check=birthSelect]').removeClass("unable hasSelect").html("请选择出生日期").removeAttr("num");
                        }
                    }

                    if (!$('[check=birthSelect]').hasClass('unable')) {
                        var dtpicker = new mui.DtPicker({
                            type: "date", //设置日历初始视图模式 
                            beginDate: new Date("1901", "00", "01"), //设置开始日期 
                            endDate: new Date(), //设置结束日期 
                            labels: ['年', '月', '日'], //设置默认标签区域提示语 
                        })
                        dtpicker.show(function(selectItems) {
                            $(".birthSelect a").html(selectItems.text).addClass("hasSelect").attr("num", "1");
                            dtpicker.dispose();
                        })
                    }
                });
            }


            //发卡银行
            if (that.attrCheck == 'bankSelect') {
                mui("body").on('tap', '.bankSelect', function() {

                    $('input,textarea').blur();

                    //判断证件类型是否已选
                    if ($('.idTypeSelect').find('[check=idTypeSelect]').html() != $('.idTypeSelect').find('[check=idTypeSelect]').attr('errortip')) {
                        //已选
                        popPicker(1, bankSelect, $('.bankSelect a'), function() {}, 'zz');
                    } else {
                        //进行错误提示
                        that.showError($('.idTypeSelect').find('[check=idTypeSelect]').attr('errortip'));
                    }

                })
            }

            //开户省
            if (that.attrCheck == 'bankProvinceSelect') {
                mui("body").on('tap', '.bankProvinceSelect', function() {

                    $('input,textarea').blur();

                    //判断发卡银行是否已选择
                    if ($('.bankSelect').find('[check=bankSelect]').html() != $('.bankSelect').find('[check=bankSelect]').attr('errortip')) {
                        //已选,请求开户市接口
                        popPicker(1, bankProvinceList, $('.bankProvinceSelect a'), function() {
                            bankCityList = getBankCityList();
                        });
                    } else {
                        //进行错误提示
                        that.showError($('.bankSelect').find('[check=bankSelect]').attr('errortip'));
                    }
                })
            }


            // 开户市
            if (that.attrCheck == 'provinceCitySelect') {
                mui("body").on('tap', '.provinceCitySelect', function() {

                    $('input,textarea').blur();

                    //判断开户省是否已选择
                    if ($('.bankProvinceSelect').find('[check=bankProvinceSelect]').html() != $('.bankProvinceSelect').find('[check=bankProvinceSelect]').attr('errortip')) {
                        //已选，请求开户支行接口
                        popPicker(1, bankCityList, $('.provinceCitySelect a'), getBranchList);
                    } else {
                        //进行错误提示
                        that.showError($('.bankProvinceSelect').find('[check=bankProvinceSelect]').attr('errortip'));
                    }
                })
            }

            //开户支行
            if (that.attrCheck == 'branchSelect') {
                mui("body").on('tap', '.branchSelect', function() {

                    $('input,textarea').blur();

                    //判断发卡银行是否已选择
                    if ($('.bankSelect').find('[check=bankSelect]').html() != $('.bankSelect').find('[check=bankSelect]').attr('errortip')) {
                        //已选，判断开户省市是否已选择
                        if ($('.provinceCitySelect').find('[check=provinceCitySelect]').html() != $('.provinceCitySelect').find('[check=provinceCitySelect]').attr('errortip')) {

                            //切换到支行列表查询区域
                            $('.branchSearchArea').show();

                        } else {
                            //进行错误提示
                            that.showError($('.provinceCitySelect').find('[check=provinceCitySelect]').attr('errortip'));
                        }
                    } else {
                        //进行错误提示
                        that.showError($('.bankSelect').find('[check=bankSelect]').attr('errortip'));
                    }
                })

                $('.branchSearchInput').on('keyup', function(e) {
                    //if(e.keyCode == 13){
                    getBranchList();
                    //}
                });

            }
            //点击职业类型的下拉列表
            if (that.attrCheck == "vocaSelect") {
                window.vocaList = [];
                mui("body").on('tap', '.vocaSelect', function() {
                    $('input,textarea').blur();
                    if (!$('[check=vocaSelect]').hasClass('unable')) {
                        if (window.vocaList.length == 0) {
                            dataCrmList('1020', '', window.vocaList);
                        }

                        popPicker(1, window.vocaList, $('.vocaSelect a'));
                    }

                })
            }

            //机构类型
            if (that.attrCheck == "orgTypeSelect") {
                window.orgTypelist = [];
                mui("body").on('tap', '.orgTypeSelect', function() {
                    if (!$('[check=orgTypeSelect]').hasClass('unable')) {
                        if (window.orgTypelist.length == 0) {
                            dataCrmList('1016', '', window.orgTypelist);
                        }

                        popPicker(1, window.orgTypelist, $('.orgTypeSelect a'));
                    }
                })
            }
            //产品类型
            if (that.attrCheck == "pdTypeSelect") {
                window.pdTypelist = [];
                mui("body").on('tap', '.pdTypeSelect', function() {

                    $('input,textarea').blur();
                    if (!$('[check=pdTypeSelect]').hasClass('unable')) {
                        if (window.pdTypelist.length == 0) {
                            dataCrmList('1017', '', window.pdTypelist);
                        }

                        popPicker(1, window.pdTypelist, $('.pdTypeSelect a'), function(t) {
                            if ($('[check=pdTypeSelect]').html() == "公募产品类型") {
                                $('[check=pofPdTypeSelect]').attr('needcheck', true);
                                $('[check=pofPdTypeSelect]').parents(".formBox").show();
                            } else {
                                $('[check=pofPdTypeSelect]').attr('needcheck', false);
                                $('[check=pofPdTypeSelect]').parents(".formBox").hide();
                            }
                        }, "zz");
                    }
                })
            }
            //公募产品类型
            if (that.attrCheck == "pofPdTypeSelect") {
                window.pofPdTypelist = [];
                mui("body").on('tap', '.pofPdTypeSelect', function() {

                    $('input,textarea').blur();

                    if (!!$('[check=pdTypeSelect]').attr('num')) {
                        if (!$('[check=pofPdTypeSelect]').hasClass('unable')) {

                            dataCrmList($('.pdTypeSelect a').attr('sonDicNo'), '', window.pofPdTypelist);
                            popPicker(1, window.pofPdTypelist, $('.pofPdTypeSelect a'));
                        }
                    } else {
                        //进行错误提示
                        that.showError($('.pdTypeSelect').find('[check=pdTypeSelect]').attr('errortip'));
                    }
                })
            }
            //产品备案机构
            if (that.attrCheck == "filingOrgSelect") {
                window.filingOrglist = [];
                mui("body").on('tap', '.filingOrgSelect', function() {

                    $('input,textarea').blur();

                    if (!$('[check=filingOrgSelect]').hasClass('unable')) {
                        if (window.filingOrglist.length == 0) {
                            dataCrmList('1023', '', window.filingOrglist);
                        }

                        popPicker(1, window.filingOrglist, $('.filingOrgSelect a'));
                    }

                })
            }

            //招聘信息推荐省份
            if (that.attrCheck == 'provinceSelect') {
                mui("body").on("tap", '.provinceSelect', function() {
                    $('input,textarea').blur();

                    if (!$('[check=provinceSelect]').hasClass('unable')) {
                        popPicker(1, provinceList, $('.provinceSelect a'));
                    }
                })
            }
        },

        //下拉列表校验
        selectCheck: function() {
            var that = this;

            var num = that.$el.attr('num') || that.$el.attr('num_0'), //多层选择如省市时，使用num_0判断
                error_tip = that.$el.attr('errortip'); //下拉列表自身的错误提示

            //下拉列表只需校验是否选择
            if (inputCheckSetting.checkFunc.isEmpty.call(that, num)) {
                //不为空，已选
                return num;
            } else {
                //校验不通过，显示错误信息
                that.showError(error_tip);
                return false;
            }
        },

        //input和textarea校验
        inputCheck: function(checkListObj) {
            var that = this,
                str = that.$el.val(), //当前元素输入框的值
                s_result = true; //存放是否所有校验都通过的结果

            //进入到此函数的，都是有配置校验的

            //循环checkListObj，调用对应校验函数
            $.each(checkListObj, function(i, s) {

                var result = ''; //存放校验函数返回的结果

                //调用校验函数
                result = s.type.call(that, str, s.param, that.attrCheck);

                //校验结果的判断  
                if (!!result) {
                    if (result == '') {
                        s_result = result;
                    } else {
                        s_result = str;
                    }

                } else {
                    //未通过校验，显示错误信息
                    if (!s.noTip) {
                        that.showError(s.tip);
                    }
                    s_result = false;
                    return false;
                }
            })

            //返回s_result
            return s_result;
        },


        //显示错误信息
        //下拉列表只把错误信息显示出来，输入框需要显示的同时设置对应的错误提示，这一步需要在
        //inputCheck里完成
        showError: function(tip, bool) {
            var that = this;
            if (bool) {
                $(bool).blur();
            }
            tipAction(tip);
        },

        /*
            判断是否需要调用校验函数
         */
        beforeCheck: function(el) {
            var that = this;

            var r = '',
                obj = el.checkObj, //获取实例
                huiXian = false;

            //在这里调用校验函数
            if (el.checkEl.attr('needCheck') == 'true') {
                //判断校验函数类型并进行分发
                if (that.type == 'select') {
                    //如果是下拉列表
                    r = that.selectCheck();
                } else {
                    //input或textarea
                    var checkEvent = inputCheckSetting.checkList[obj.attrCheck].checkEvent;
                    if (checkEvent && checkEvent.length != 0) {
                        //有校验配置，去做校验
                        r = that.inputCheck(checkEvent);
                    } else {
                        //没有校验配置
                        r = 'noNeedCheck';
                    }
                }
            } else {
                //后期修改成不需要校验（如回显数据）,直接获取
                r = inputCheckSetting.checkFunc.getValue.call(that, el.checkAttr);
                huiXian = true;
                //return true;
            }

            return [r, huiXian];
        },


        //短信验证码按钮点击
        dxButtonPost: function(data) {
            var that = this,
                checkArr;

            //有stopClick，说明正在倒计时中，点击不再执行后面的操作
            if (that.siblingsEl.dx_button.hasClass('stopClick')) {
                return false;
            }

            //有checkTop=true属性，需要校验上面的元素
            if (that.siblingsEl.dx_button.attr('checkTop') == 'true') {

                // 校验验证码之前的表单
                checkArr = eventsFunc.checkBeforeDxzym(allInputArr, dxIndex);


                if (!checkArr) {
                    //未通过校验
                    return false;
                } else {
                    //通过校验，获取表单中填写的手机号码
                    //用于短信验证码的发送
                    $.each(checkArr, function(i, el) {
                        if (el.check == 'phone' || el.check == 'bankPhone' || el.check == 'newLinkPhone') {
                            that.dxRusltPhone = el.result; //获取手机号码value值
                        }
                    })
                }
            } else {

                //不需要校验上面的元素
                //直接设置that.dxRusltPhone
                that.dxRusltPhone = $('[check=phone]').val();
            }

            //通过上面的校验，或不需要校验，直接执行后面的操作，发送ajax请求

            //点击按钮变色
            that.siblingsEl.dx_button.attr('disabled', true).addClass('stopClick');

            if (window.location.href.indexOf('realNameStepOne') != -1) {
                //实名认证页面
                pefFirstAuthForSmsCodeAPI(checkArr);

            } else if (window.location.href.indexOf('forgetDealForm.html') != -1) {
                //忘记网站交易密码页面
                setPasswordForPayFirstAPI();

            } else {
                //其他页面，发送短信验证码
                messageCertSendAPI(that.dxRusltPhone);
            }
        },
    }

    //获取所有需要校验的元素并生成实例
    var allInput = $('[needCheck=true]'), //所有需要校验的元素
        allInputArr = [], //存放所有元素的实例数组
        dxIndex = 0; //存放短信验证码元素的索引

    //循环所有元素
    $.each(allInput, function(i, el) {

        var newCheckInput = new checkFunc($(el)), //生成对应的新实例
            check = $(el).attr('check'); //该元素的check值

        //每生成一个，就添加到allInputArr中
        allInputArr.push({
            checkEl: $(el), //当前元素
            checkAttr: check, //check属性值
            checkIndex: i, //该元素索引
            checkObj: newCheckInput //该元素实例
        });

        //获取短信验证码的索引
        if (check == 'dxyzm') {
            dxIndex = i;
        }

        //调用init事件，初始化对应实例
        newCheckInput.init();
    })

    // 离焦事件绑定
    blurEvents(allInputArr, dxIndex);

    $.extend($, {

        //点击提交按钮时调用
        //parentsDivClass是需要判断的区域div的class，有些页面只需调校验和获取某个区域内的元素
        //如果没有传，该参数为空，则校验所有表单元素
        "checkInput": function(parentsDivClass) {
            var checkArr = []; //存放所有元素的校验结果

            //循环allInputArr，进行校验
            $.each(allInputArr, function(i, el) {

                //元素是否在对应区域内的状态
                var isInArea = false;

                if (!!parentsDivClass) {
                    //需要判断区域
                    if ($(el.checkEl).parents(parentsDivClass).length != 0) {
                        //在这个区域内
                        isInArea = true;
                    }
                } else {
                    //不需要判断区域
                    isInArea = true;
                }

                if (!isInArea) {
                    //isInArea为false，表示当前元素不需要做校验，不执行下面的逻辑
                    return true;
                }

                //需要做校验的情况

                var obj = el.checkObj, //获取实例
                    r = '',
                    huiXian = false;

                //调用对应实例的方法，此时obj是实例
                if (!$(el.checkEl).hasClass("noShow")) { //判断DOM结构是隐藏的还是显示的，隐藏的不做校验，直接通过
                    var b_r = obj.beforeCheck(el);

                    if (!b_r[1]) { //如果不是回显数据
                        if (!!b_r[0]) { //通过校验
                            if (b_r[0] == 'noNeedCheck') {
                                b_r[0] = '';
                            }
                            checkArr.push({ //添加到checkArr中
                                check: obj.attrCheck,
                                result: $.trim(xssfilter.filter(b_r[0]))
                            })
                        } else {
                            checkArr = false;
                            $('span.close').hide();
                            return false;
                        }
                    } else {
                        checkArr.push({ //添加到checkArr中
                            check: obj.attrCheck,
                            result: b_r[0]
                        })
                    }
                }
            })
            return checkArr;
        },
    })

})(Zepto, window, document);