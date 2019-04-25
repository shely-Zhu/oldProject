/**
 * 私募产品列表
 * @author  zhangweipeng 2017-03-08

 *修改：判断客户已有的私募理财师是否持证
 *@author zhangyanping 2018-05-25
 *
 * 修改：投资者分类查询和投资者分类申请接口替换
 * @author ping 2018-07-25
 *
 * 修改：售前告知书按客户65岁进行区分展示换
 * @author songxiaoyu 2018-11-21 
 */

require('@pathIncludJs/vendor/config.js');
//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
var arg = require('@pathCommonJsCom/splitUrl.js')();
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/elasticLayer.js');
require('@pathCommonJsCom/elasticLayerTypeTwo.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
//设置客服电话
require('@pathCommonJsCom/setTelHref.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
require('@pathCommonJs/userCheck.js');
//判断是否为APP
require('@pathCommonJsCom/app/ifApp.js');
//echarts图表
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('zrender/lib/vml/vml');
// 账户冻结提示
var frozenAccount = require('@pathCommonJsCom/frozenAccount.js');

var prvDetail = {
    contact: false, //是否联系理财师状态 false--不联系
    goRisk: false, //风险评测是否符合
    goRisk1: false, //风测过期  是否可以风测
    goRealName: null, //是否实名认证
    /*cancel:false,  //是否可以取消预约*/
    incomeMode: null, //存放受益类型
    drawArr: [], //保存画图数据
    xArr: [],
    dataArr: [],
    // investFavour: '', //投资者偏好
    endurePri:'', //投资偏好
    investFavour: '', //投资者分类
    unitNetValue: '', //产品净值（单位：元）
    netValueDate: '', //净值日期【yyyy-MM-dd】
    projectDownTime:'', //产品募集截止日期
    productName:'', //产品名称
    timer:'', //定时器
    getElements: {
        clickBtn: $(".bg .btn"), //可点击状态按钮
        noBtn: $(".over"), //不可点击按钮
        help: $(".bg .help"), //咨询按钮
        down: $(".elasticLayerFour .close"), //关闭弹框按钮
        $reservation: $('.reservation'), //已预约状态
        $detail: $('.reservation .detail'), //查看明细
        $tipIcon: $(".invFloat .tipIcon"), //净值披露信息
    },
    status: {
        ordinary: 0,
        professional: 0,
        newcomer: '', //是否是新手用户【0.否 1.是
        isNewcomer: '', //是否新手专享产品【0.否 1.是】
        isElecContract: 0, //是否适用于电子合同【0.否 1.是】
        fundCode: arg['fundCode'],
        unitNetValueDes: '每周五更新上周净值',
    },
    init: function() {
        var that = this;
        //检查是否登录及风险测评
        // $.userCheck(true, function() {
            
        // });
        that.getData();
        
        that.events();
    },
    getData: function() {
        var that = this;

        $(".invMartical").attr("href", "/productPrivate/views/PrvMarticial.html?fundCode=" + arg["fundCode"]);
        var obj = [{
            url: site_url.prvDetail_api, // queryProductDetail
            data: {
                 projectId: arg["fundCode"] // 产品代码
            },
            async: false,
            contentTypeSearch: true,
            needLogin: true,
            callbackDone: function(data) {
                var json = data.data,
                    businessCompareReferenceMin = json.businessCompareReferenceMin,
                    businessCompareReferenceMax = json.businessCompareReferenceMax,
                    isNewcomer = json.isNewcomer,
                    isElecContract = json.isElecContract;

                that.unitNetValue = json.unitNetValue;
                that.netValueDate = json.netValueDate;
                that.incomeMode = json.incomeMode; //存放受益类型  0代表类固收，其它代表浮收
                // that.reserveId = json.reserveId;
                that.isNewcomer = (isNewcomer == "1") ? 1 : 0; // 新手产品
                that.isElecContract = (isElecContract == "1") ? 1 : 0;

                // that.getUserInfo() //新客判断

                $(".invStart").html(json.investStart);
                $(".invDate").html(json.projectTerm); //获取产品的投资期限或者封闭期
                $(".blackoutPeriod span").html(json.projectTermUnit); //"月",//产品期限单位
                //0 债权投资;1 证券投资（二级市场）;2 股权投资;3 海外投资;4 其他
                if(json.investDirect == "0" || json.investDirect == "2" || json.investDirect == "4") { // 债权投资、股权投资、其他服务不展示
                    that.getElements.$tipIcon.hide();
                } else if(json.investDirect == "1" || json.investDirect == "3"){ // 海外投资  二级市场展示
                    that.getElements.$tipIcon.show();
                };
                if (json.incomeMode == "0") { //固收类产品
                    $(".invSolid").show();
                    if (Number(businessCompareReferenceMax) <= Number(businessCompareReferenceMin)) {
                        $(".invSolid .invCore").html(businessCompareReferenceMin + "%");
                    } else {
                        $(".invSolid .invCore").html(businessCompareReferenceMin + "%~" + businessCompareReferenceMax + "%");
                    }
                } else {
                    $(".invFloat").show();
                }
                var lightStar = Number(json.productRiskLevel); //获取黄星星的个数
                for (var i = 0; i < lightStar; i++) { //根据风险等级渲染星星颜色
                    $($(".risk i")[i]).addClass("on");
                }
                $(".risk span").html(json.productRiskLevelDesc); //获取产品风险等级
                $(".office").html(json.projectIssuer); //获取管理机构
                $(".size").html(json.issuanceSize + "万"); //获取产品规模
                $(".getDate").html(json.projectUpTime + "~" + json.projectDownTime); //获取产品募集日期
                that.projectDownTime = json.projectDownTime;
                $(".prdInfo .head").html(json.productName); //获取产品名称
                that.productName = json.productName;
                $(".fundName").html(json.productName);
                $(".prdInfo .prdNum").html(arg["fundCode"]); //获取产品代码

                // that.goRealName = json.isCertification; //存储是否实名认证
                // that.customerType = json.customerType; //存储个人或机构投资
                if (json.isInvestClassifyRequired == 1) { //是否需要判断投资者分类标签【1.不需要 2.需要（私募或资管）】
                    that.isInvest = false;
                } else if (json.isInvestClassifyRequired == 2) {
                    that.isInvest = true;
                }
                switch (json.productStatus) {
                    case "1": //尚未预约，可以预约
                        $(".bg").show().find(".btn").html("立即预约");
                        $(".over").hide();
                        // that.checkNewPorduct(); //新客页面展示
                        that.timer=setInterval(that.checkNewPorduct(),10) ;//新客页面展示
                        break;
                    case "2": //可以预约，但是会告知要联系理财师
                        $(".bg").show().find(".btn").html("立即预约");
                        $(".over").hide();
                        that.contact = true;
                        break;
                    case "3": //可以预约，但是需要重新风险测评
                        $(".bg").show().find(".btn").html("立即预约");
                        $(".over").hide();
                        that.goRisk = true;
                        break;
                    case "4": //产品已售罄
                        $(".over").show().html("已售罄");
                        $(".bg").hide();
                        break;
                    case "5": //产品已成立
                        $(".over").show().html("已成立");
                        $(".bg").hide();
                        break;
                    case "6": //已预约   产品处于可取消预约状态
                        that.getElements.$reservation.show();
                        $(".bg").hide();
                        that.cancel = true;
                        break;
                    case "7": //产品未开始
                        $(".over").show().html("未开始");
                        $(".bg").hide();
                        break;
                    case "9": //可以预约，风测过期但是需要重新风险测评
                        $(".bg").show().find(".btn").html("立即预约");
                        $(".over").hide();
                        that.goRisk1 = true;
                        break;
                }

            },
            callbackFail: function(data) {
                tipAction(data.message);
            }
        },{
            url: site_url.user_api,
            data: {
            },
            needLogin: true,
            // async: false,
            needDataEmpty: false, //需要判断data是否为空
            callbackDone: function(json) {
                var jsonData = json.data,
                    isPerfect = jsonData.isPerfect, //基本信息是否完善
                    newcomer = jsonData.newComer;
                that.goRealName = jsonData.idnoCheckflag; //存储是否实名认证   0-否 1-是
                that.customerType = jsonData.accountType; //存储个人或机构投资  1-个人  0-机构
                that.endurePri = jsonData.endurePri; // 投资偏好
                that.investFavour = jsonData.investFavour; // 投资者分类
                that.newcomer = (newcomer == "1") ? 1 : 0; // 是否是新手客户 0否1是
                that.age = jsonData.age; // 客户年龄

                if (isPerfect == 0) { //基本信息是否完善  不完善     0否1是
                    that.isPerfect = true;
                } else if (isPerfect == 1) { //完善 
                    that.isPerfect = false;
                }
            },
            callbackFail: function(data) {
                tipAction(data.message);
            }
        },{
            url: site_url.custBro_api,
            data: {
                empNo: "", //工号    
                fundType: "0",
                isPass: "Y", //是否通过基金从业考试 Y：通过 N：未通过（新增）
            },
            needLogin: true,
            needEmptyData:true,
            callbackDone: function(data) {
                var json = data.data;

                if (json.existMain == "1" && !$.util.objIsEmpty(json.advisor)) {
                    $.each(json.advisor, function(i, el) {
                        if (el.isMain == "1") {
                            $(".existMain").show().find(".main .tel").attr("href", "tel:" + el.mobileTel).html(el.mobileTel);
                            $(".existMain .name").html(el.codeName);
                            $(".existMain .main").show();
                        }
                    })
                } else if (json.existMain == "0") {
                    var tplm = $("#finacialMore").html();
                    var template = Handlebars.compile(tplm);
                    $('.noMain').show().find(".finacial").html(template(json.advisor));
                }
            },
            callbackFail: function(data) {
                tipAction(data.message);
            },
            callbackNoData:function(){
                $(".existMain").show();
                $(".existMain .server").show().find(".tel").attr("href", "tel:" + commonSetting.serverPhone).html(commonSetting.serverPhone);
            }
        }, {
            url: site_url.prvLight_api, //queryProductImage
            data: {
                projectId: arg["fundCode"], // 产品代码
                limitNum: "1" // 限制数（只显示N张）
            },
            needLogin: true,
            //needEmptyData:true,
            callbackDone: function(data) {
                var json = data.data[0];

                if (!json.imgPath) {
                    if (json.features) {
                        $(".card-foot.noPic").show().find(".lightText").html(json.features);
                    } else {
                        return false;
                    }
                } else {
                    $(".card-foot.Pic").show().find("a").attr("href", "/productPrivate/views/prvPic.html?src=" + json.imgPath);
                }
            },
            callbackFail: function(data) {
                tipAction(data.message);
            }
        }]
        $.ajaxLoading(obj);

        // 后台自己处理不需要前端请求
        // var msgObj = [{
        //     url: site_url.message_api,
        //     data: {
        //         hmac: "", //预留的加密信息     
        //         params: {
        //             proCode: arg["fundCode"], //产品代码 
        //             proName: that.productName
        //         }
        //     },
        //     needLogin: true,
        //     needDataEmpty: false, //需要判断data是否为空
        //     callbackDone: function(data) {

        //     },
        //     callbackFail: function(data) {
        //         tipAction(data.message);
        //     }
        // }];
        // $.ajaxLoading(msgObj);
        if (that.incomeMode == "0") {   //代表类固收
            var objSolid = [{
                url: site_url.prvLevel_api,
                data: {
                    projectId: arg["fundCode"] // 产品代码
                },
                needLogin: true,
                contentTypeSearch: true,
                callbackDone: function(data) {
                    var json = data.data;

                    $.each(json, function(i, el) {
                        if (el.benifitUpperLimit == "0" || !el.benifitUpperLimit) {
                            el.bool = false;
                        } else {
                            el.bool = true;
                        }
                    })
                    $('.invSolid').show();
                    var tplm = $("#prvLevel").html();
                    var template = Handlebars.compile(tplm);
                    $(".levelBox").html(template(json));

                },
                callbackFail: function(data) {
                    tipAction(data.message);
                }
            }]
            $.ajaxLoading(objSolid);
        } else{
            if (that.unitNetValue) {
                that.ifDraw = true;
                $(".invDraw").show();
                $(".invFloat .invCore").html(that.unitNetValue + "<span>(" + that.netValueDate.substr(that.netValueDate.indexOf("-") + 1, ) + ")</span>");
                $(".invFloat .applyBuy").html("单位净值(元)");
                that.getDrawData(180);
            } else {
                $(".invFloat .invCore").addClass("float").html(that.projectDownTime.replace(/\//g, "-"));
                $(".invFloat .applyBuy").html("募集截止日");
                $(".invFloat .tipIcon").hide()
                that.ifDraw = false;
            }
            var objFloat = [{
                url: site_url.prvLight_api, //queryProductImage
                data: {
                    projectId: that.status.fundCode, // 产品代码
                    productModule: "netValueCycleAPP",
                    limitNum: "1", // 
                },
                needLogin: true,
                callbackDone: function(data) {
                    var json = data.data[0],
                        features = json.features;

                    if (features) {
                        that.status.unitNetValueDes = features;
                    }
                },
                callbackFail: function(data) {
                    tipAction(data.message);
                }
            }];
            $.ajaxLoading(objFloat);

            // if (that.ifDraw) {
            //     var objDraw = [];
            //     //添加画图接口，参数为1/3/6/12
            //     objDraw.push(that.getDrawData(180));
            //     objDraw.push(that.getDrawData(360));
            //     objDraw.push(that.getDrawData(""));
            //     $.ajaxLoading(objDraw);
            // }
        }
    },
    //请求画图接口
    getDrawData: function(num) { //num为传进来的数据范围
        var that = this;
        if(num=='9999'){
            num=''
        }
        var obj = [{ //画图
            url: site_url.prvHisValue_api,
            data: {
                projectId: arg["fundCode"], // 基金代码
                days: num, // 数据范围  //默认开始是30天
                // unitNetValueBeginDate: "", // 查询起始日期
                // unitNetValueEndDate: "" // 查询结束日期   
            },
            needDataEmpty: true,
            contentTypeSearch: true,
            needLoading: true,
            // async: false,
            callbackDone: function(json) {
                //请求成功
                //画图
                if(num==''){
                    that.draw(json.data.pageList, 9999);
                }else{
                    that.draw(json.data.pageList, num);
                }
                

                // 有且只有第一个接口返回时，画第一个图
                if (num == 180) {
                    that.drawAction(180);
                }
                if(num==''){
                    that.drawAction(9999);
                }
            },
            callbackFail: function(json) {
                tipAction(json.message);
            },
            callbackNoData: function(json) {

            }
        }];
        $.ajaxLoading(obj);
        return obj;
        
    },
    draw: function(jsonData, num) {
        var that = this;

        that.drawArr[num] = {
            unitNavArr: [], //累计净值
            xArr: [] //x轴数据
        };

        //处理jsonData
        $.each(jsonData, function(i, el) {

            that.drawArr[num].unitNavArr.push(el.unitNetValue);

            //x轴数据
            that.drawArr[num].xArr.push({
                value: el.netValueDate,
                textStyle: { fontSize: 10 }
            })

        })

        that.xArr[num] = that.drawArr[num].xArr.reverse();
        that.dataArr[num] = that.drawArr[num].unitNavArr.reverse();
    },
    drawAction: function(num) {
        var that = this;

        var xArr = that.xArr[num];
        var data = that.dataArr[num];

        var name = '单位净值';

        // 基于准备好的dom，初始化echarts实例 
        var myChart = echarts.init($('.lineWrapper')[0]);

        var option = {

            tooltip: {
                trigger: 'axis',
                formatter: "日期：{b} <br/>{a}：{c}",
                backgroundColor: 'rgba(229,229,229,0.6)',
                confine: true,
                padding: 8,
                textStyle: {
                    color: '#7d7c7d'
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#f4cf5c'
                    }
                }
            },
            title: {
                show: false,
            },
            grid: {
                show: true,
                left: 0,
                right: "12%",
                top: 50,
                containLabel: true,
            },
            xAxis: [{
                //position:'bottom',
                type: 'category',
                data: xArr,
                axisLabel: {
                    //show: false,
                    interval: that.drawArr[num].xArr.length - 2,
                    margin: 14,
                    textStyle: {
                        color: '#7d7c7d'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    interval: Math.ceil(that.drawArr[num].xArr.length / 6),
                    lineStyle: {
                        color: '#e5e5e5'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#e5e5e5'
                    }
                },
            }],

            yAxis: {
                type: 'value',
                precision: 4,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#e5e5e5'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#e5e5e5'
                    }
                },
                min: 'dataMin',
                axisLabel: {
                    textStyle: {
                        color: '#7d7c7d'
                    },
                    formatter: function(value, index) {
                        if (value == 0) {
                            return value;
                        }
                        return value.toFixed(4);
                    }
                }
            },
            series: [{
                name: name,
                type: 'line',
                smooth: true,
                data: data,
                //clipOverflow: false,
                lineStyle: {
                    normal: {
                        color: '#f4cf5c'
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#f4cf5c',

                    },
                }
            }]
        };

        myChart.setOption(option);
    },
    checkNewPorduct: function() {
        var that = this;
        if(that.newcomer!=''){
            if (that.isNewcomer && that.newcomer) { // 是新用户，并且是新手产品
                that.getElements.clickBtn.html("新客专享 立即预约").addClass('newcomer');
            } else if (that.isNewcomer && !that.newcomer) { // 是新手产品不是新用户
                that.getElements.clickBtn.html("新客专享").addClass('stop');
            }
            clearInterval(that.timer);
        }
    },
    getUserInfo: function() {
        var that = this;
        var obj = [{
            url: site_url.user_api,
            data: {
            },
            needLogin: true,
            async: false,
            needDataEmpty: false, //需要判断data是否为空
            callbackDone: function(json) {
                var jsonData = json.data,
                    isPerfect = jsonData.isPerfect, //基本信息是否完善
                    newcomer = jsonData.newComer;
                that.goRealName = jsonData.idnoCheckflag; //存储是否实名认证   0-否 1-是
                that.customerType = jsonData.accountType; //存储个人或机构投资  1-个人  0-机构
                that.endurePri = jsonData.endurePri; // 投资偏好
                that.investFavour = jsonData.investFavour; // 投资者分类
                that.newcomer = (newcomer == "1") ? 1 : 0; // 是否是新手客户 0否1是
                that.age = jsonData.age; // 客户年龄

                if (isPerfect == 0) { //基本信息是否完善  不完善     0否1是
                    that.isPerfect = true;
                } else if (isPerfect == 1) { //完善 
                    that.isPerfect = false;
                }
            },
            callbackFail: function(data) {
                tipAction(data.message);
            }
        }];
        $.ajaxLoading(obj);
    },
    showNewComerTip: function() {
        var obj = {
            id: "newcomer",
            title: '温馨提示', //如果不传默认为'尊敬的用户'
            p: '本产品为新客专享，仅供在恒天未成交私募及定融/定投产品的客户投资。邀请新的朋友和恒天相识，您和您的朋友均可获得积分好礼',
            yesTxt: '立即邀请',
            celTxt: '我知道了',
            zIndex: 60,
            callbackCel: $.noop,
            yesButtonPosition: 'right',
            callback: function() {
                window.location.href = site_url.newcomer_url;
            }
        };
        $.elasticLayer(obj);
    },
    events: function() {
        var that = this;

        // 立即预约或取消预约按钮点击
        that.getElements.clickBtn.on("click tap", function(e) {
            var $this = $(this);

            // 冻结账户弹窗提示
            var result = frozenAccount("buyFreeze", window.location.href, false);
            if (!!result) {
                return false;
            };

            if (that.isNewcomer) { // 新产品，老用户，弹窗

                if (!that.newcomer) {
                    that.showNewComerTip()
                    return;
                } else {
                    $this.addClass("stop");
                    // that.getUserInfo();

                    if (!that.newcomer) {
                        $.elasticLayer(obj)
                        return;
                    } else {
                        $this.removeClass("stop");
                    }
                }
            }
            if (that.isElecContract) { // 电子合同
                $.elasticLayerTypeTwo({
                    id: "isElecContractTip",
                    title: '提示', //如果不传默认为'尊敬的用户'
                    p: '该产品为电子合同产品，请您前往恒天财富网站或App进行产品预约',
                    buttonTxt: '知道了',
                    zIndex: 60
                });
                return;
            }
            if ($this.hasClass("stop")) {
                return false;
            } else { // 逻辑判断
                $this.addClass("stop");

                if (that.contact) { // 联系了理财师
                    $.elasticLayer({
                        id: "contact",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '检测到您指定的理财师为恒天中岩员工，暂不可线上预约产品，请线下联系您的理财师，预约该产品。',
                        yesTxt: '继续查看',
                        celTxt: '取消',
                        zIndex: 60,
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function() {
                            window.location.href = '/productPrivate/views/prdPrvLists.html';
                        }
                    })
                    $this.removeClass("stop");
                } else if (that.goRisk) { // 风险不匹配
                    $.elasticLayer({
                        id: "goRisk",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '您选择的产品与您的风险承受能力不匹配，请重新进行风险测评。',
                        yesTxt: '重新测评',
                        celTxt: '取消',
                        zIndex: 60,
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function() {

                            if (that.customerType == "1") {
                                window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(window.location.href);
                            } else {
                                window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(window.location.href);
                            }
                        }
                    })
                    $this.removeClass("stop");
                } else if (that.goRisk1) { // 风测过期
                    $.elasticLayer({
                        id: "goRisk",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '您风险测评的结果已经过期，请重新测评后购买产品。',
                        yesTxt: '重新测评',
                        celTxt: '取消',
                        zIndex: 60,
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function() {

                            if (that.customerType == "1") {
                                window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(window.location.href);
                            } else {
                                window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(window.location.href);
                            }
                        }
                    })
                    $this.removeClass("stop");
                } else if (that.goRealName == "0") { // 去实名
                    $.elasticLayer({
                        id: "goRisk",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '预约产品前，请进行实名认证。',
                        yesTxt: '立即认证',
                        celTxt: '暂不认证',
                        zIndex: 60,
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function() {
                            $this.removeClass("stop");
                            window.location.href = '/user/views/realName/realNameStepOne.html?originUrl=' + new Base64().encode(window.location.href);
                        }
                    })
                    $this.removeClass("stop");
                } else if (that.goRealName == "1" && that.isPerfect) { // 信息补全

                    $.elasticLayer({
                        id: "goMsg",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '根据《证券期货投资者适当性管理办法》，您目前的基本信息不完整，需补充完整基本信息才可预约私募产品。',
                        yesTxt: '确定',
                        celTxt: '取消',
                        zIndex: 60,
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function() {
                            if (that.customerType == "0" || that.customerType == "2") {
                                $this.removeClass("stop");
                                window.location.href = site_url.orgBass_url + '?originUrl=' + new Base64().encode(window.location.href);
                            } else if (that.customerType == "1") {
                                $this.removeClass("stop");
                                window.location.href = site_url.perBass_url + '?originUrl=' + new Base64().encode(window.location.href);
                            }
                        }
                    });
                    $this.removeClass("stop");
                } else if (that.isInvest) { // 需要判断投资者分类标签
                    if (that.investFavour == "1") { // 专业投资者
                        $this.removeClass("stop");
                        window.location.href = site_url.prdPrvSure_url + '?fundCode=' + arg["fundCode"];
                    } else if (that.investFavour == "0") { // 普通投资者
                        // 售前告知书按客户65岁进行区分展示
                        var fileType = '10', // 售前告知书 没有年龄的，使用普通
                            fileName = ''; // 告知书名称

                        if (that.customerType == '1') { // 自然人，判断年龄65
                            if (that.age) { // 19  产品售前风险告知书65岁及以上; 20 产品售前风险告知书65岁及以下,传2个参数目的是，产品无65岁以上或以下版本时，展示普通
                                fileType = (Number(that.age) > 64) ? '19,10' : '20,10';
                            }
                        }

                        // 普通投资者请求资料接口
                        var riskMarObj = [{
                            url: site_url.prvReource_api, // 产品材料接口 queryReourceList
                            data: {
                                projectId: arg["fundCode"], // 产品代码
                                fileType: fileType    
                            },
                            needLogin: true,
                            contentTypeSearch: true,
                            async: false,
                            needDataEmpty: false, //需要判断data是否为空
                            callbackDone: function(data) {
                                if (!!data.data) {
                                    var json = data.data[0];

                                    if (!$.util.objIsEmpty(json)) {
                                        if (json.fileName.indexOf(".pdf") != -1) { //在线预览
                                            that.marUrl = site_url.download_api + "?filePath=" + json.fileUrl + "&fileName=" + new Base64().encode(json.fileName) + "&groupName=" + json.groupName + "&show=1";
                                        } else { //下载
                                            that.marUrl = site_url.download_api + "?filePath=" + json.fileUrl + "&fileName=" + new Base64().encode(json.fileName) + "&groupName=" + json.groupName;
                                        }
                                        // 产品材料名称
                                        fileName = json.fileName;
                                    } else {
                                        throw '售前告知书为空，需配置';
                                        return false;
                                    }
                                }

                            },
                            callbackFail: function(data) {
                                tipAction(data.message, function() {
                                    $this.removeClass("stop");
                                });
                            }
                        }];
                        $.ajaxLoading(riskMarObj);


                        $.elasticLayer({
                            id: "msgTip",
                            title: '提示', //如果不传默认为'尊敬的用户'
                            p: '当前的投资者类型为普通投资者，普通投资者在信息告知、风险警示、适当性匹配等方面享有特殊保护，请您认真阅读<a class="tipTxt" href="javaScript:;" target="_blank">' + fileName + '</a>，确认后继续预约产品。',
                            yesTxt: '去阅读',
                            celTxt: '取消',
                            zIndex: 60,
                            yesButtonPosition: 'right',
                            callbackCel: $.noop,
                            callback: function() {
                                
                                // $this.removeClass("stop");
                                // window.location.href = site_url.prdPrvSure_url + '?fundCode=' + arg["fundCode"];
                                window.location.href = site_url.openPdf_url + '?fundCode=' + arg["fundCode"] + '&marUrl=' + new Base64().encode(that.marUrl);
                            }
                        });
                        $this.removeClass("stop");
                    } else { // 当前没有投资者类型
                        var investObj = [{
                            url: site_url.queryClassification_api, //investor/queryClassification.action
                            data: {
                            
                            },
                            needLogin: true,
                            async: false,
                            needDataEmpty: false, //需要判断data是否为空
                            callbackDone: function(data) {
                                var json = data.data;
                                if (json.auditStatus == "0") { //待审核--审核中
                                    if (that.customerType == "1") { //自然人投资者
                                        $.elasticLayerTypeTwo({
                                            id: "applyTip",
                                            title: '提示', //如果不传默认为'尊敬的用户'
                                            p: '您已申请专业投资者，目前正在审核中，需审核通过后方可预约产品。审核结果将以短信通知您，请耐心等待',
                                            buttonTxt: '知道了',
                                            zIndex: 60
                                        });
                                    } else if (that.customerType == "0" || that.customerType == "2") { //机构投资者
                                        if (json.investType == "1") { //申请专业投资者
                                            $.elasticLayerTypeTwo({
                                                id: "applyTip",
                                                title: '提示', //如果不传默认为'尊敬的用户'
                                                p: '您已申请专业投资者，目前正在审核中，需审核通过后方可购买产品。审核结果将以短信形式通知您，请耐心等待',
                                                buttonTxt: '知道了',
                                                zIndex: 60
                                            });
                                        } else if (json.investType == "0") { //申请普通投资者
                                            $.elasticLayerTypeTwo({
                                                id: "applyTip",
                                                title: '提示', //如果不传默认为'尊敬的用户'
                                                p: '您已申请普通投资者，目前正在审核中，需审核通过后方可购买产品。审核结果将以短信形式通知您，请耐心等待',
                                                buttonTxt: '我知道了',
                                                zIndex: 60
                                            });
                                        }
                                    }
                                    $this.removeClass("stop");
                                } else {
                                    //todo 出现普通投资者和专业投资者弹框
                                    $(".elasticLayerFour").show();
                                    if (that.customerType == "0" || that.customerType == "2") {
                                        $(".elasticLayerFour .material .org").show();
                                    } else {
                                        $(".elasticLayerFour .material .praPer").show();
                                    }
                                    $this.removeClass("stop");
                                    return false;
                                }
                            },
                            callbackFail: function(data) {
                                tipAction(data.message, function() {
                                    $this.removeClass("stop");
                                })
                            }
                        }]
                        $.ajaxLoading(investObj);
                        $this.removeClass("stop");
                    }
                } else { // 跳转私募预约页面
                    $this.removeClass("stop");
                    window.location.href = site_url.prdPrvSure_url + '?fundCode=' + arg["fundCode"];
                }
            }
        });

        // 咨询按钮
        that.getElements.help.on("click tap", function(e) {
            //that.getElements.help.on("tap",function(e){
            $(".mask").addClass("in");
            $("body").css({
                "position": "fixed",
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
            });
        });

        // 折线图时间按钮
        $('.timeBtn').on('click tap', function() {
            var time = $(this).attr('time');
            //画图,已经有数据的不再请求
            if (typeof(that.drawArr[time]) == 'object') {
                that.drawAction(time);
            } else { 
                that.getDrawData(Number(time)); 
            }
            //画图
            // that.drawAction(time);

            //改变对应的颜色
            $(this).siblings('.timeBtn').removeClass('active');
            $(this).addClass('active');
        })

        // 历史净值
        $('.beforeValue').on('click', function() {
            window.location.href = "/productPrivate/views/hisValue.html?fundCode=" + arg["fundCode"];
        })

        $('.mask').on('click tap', function(e) {
            if (e.srcElement == $(".mask")[0] || e.target == $(".mask")[0]) {
                $(this).removeClass("in");
                $("body").css("position", "");
            }
        });

        // 产品材料
        $('.invMartical').on('tap', function() {
            window.location.href = $(this).attr("href");
        });

        function averageWrapFun() { // 普通
            var other = this;
            if ($(other).hasClass("nokick")) {
                return false;
            } else {
                $(other).addClass("nokick");
                if (that.customerType == "0" || that.customerType == "2") { //机构用户
                    $(other).removeClass("nokick");
                    window.location.href = site_url.uploadMaterial_url + "?from=3&investType=1";
                } else {
                    var applyObj = [{
                        url: site_url.applyForClassification_api,
                        data: {
                            investType: "0", //投资转换类型： 0普通投资者申请  1 专业投资者申请  2普转专  3专转普 
                            attacmentsId: [], //所有附件id 
                        },
                        async: false,
                        needLogin: true,
                        needDataEmpty: false,
                        callbackDone: function(data) {
                            elasticLayerFourHide();
                            tipAction("您已成功申请成为普通投资者，可购买私募产品", function() {
                                $(other).removeClass("nokick");
                                location.reload();
                            });
                        },
                        callbackFail: function(data) {
                            elasticLayerFourHide();
                            $('.elasticLayerFour .sureBtn').removeAttr('disabled').removeClass('disable');
                            tipAction(data.message, function() {
                                $(other).removeClass("nokick");
                            });
                        }
                    }]
                    $.ajaxLoading(applyObj);
                }
            }
        };

        function professionalWrapFun() {
            if (that.customerType == "0" || that.customerType == "2") {
                window.location.href = site_url.uploadMaterial_url + "?from=4&investType=0";
            } else {
                window.location.href = site_url.uploadMaterial_url + "?from=1&investType=0";
            }
        };

        function elasticLayerFourHide() {
            $(".elasticLayerFour").hide();
            $('.elasticLayerFour .btnWrap').find('.iconfont').removeClass('highlight');
        };

        // 投资者分类弹窗--取消
        $('.elasticLayerFour .close,.elasticLayerFour .cancleBtn').on('click tap', function() {
            elasticLayerFourHide();
        })

        // 投资者分类弹窗--专业投资者
        $('.elasticLayerFour .averageWrap,.elasticLayerFour .professionalWrap').on('click tap', function() {
            var $this = $(this);
            $('.btnWrap').find('.iconfont').removeClass('highlight');
            $this.children().eq(0).addClass('highlight');
            if ($this.hasClass('averageWrap')) {
                that.status.ordinary = 1;
                that.status.professional = 0;
            } else {
                that.status.ordinary = 0;
                that.status.professional = 1;
            }
        })

        // 投资者分类弹窗--确定
        $('.elasticLayerFour .sureBtn').on('click tap', function() {
            if (that.status.ordinary) { //普通
                $(this).attr("disabled", true).addClass('disable');
                averageWrapFun()
            } else if (that.status.professional) {
                $(this).attr("disabled", true).addClass('disable');
                professionalWrapFun();
            } else {
                $('.againEnter').css("z-index", "10000");
                tipAction('请选择投资者类型', function() {
                    $('.againEnter').css("z-index", "1000");
                });
            }
        })

        // 查看明细
        that.getElements.$detail.on('click tap', function() {
            window.location.href = site_url.orderDetail_url;
        })

        that.getElements.$tipIcon.on('click tap', function() {
            $.elasticLayerTypeTwo({
                id: "unitNetValueDesTip",
                title: '帮助', //如果不传默认为'尊敬的用户'
                p: that.status.unitNetValueDes,
                buttonTxt: '知道了',
                zIndex: 60
            });
        })
    }
}
prvDetail.init();