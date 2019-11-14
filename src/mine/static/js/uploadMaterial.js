// /*
//  * @page: 合规改造上传页
//  * @Author: songxiaoyu
//  * @Date:   2017-05-24
//  * @Last Modified by:   songxiaoyu
//  * @Last Modified time: 2019.6.12
//  * @description:
//  *      17.5 from-资料模板需要----1:个人申请专业，2：个人普通转专业， 3：机构申请普通，4：机构申请专业，5：机构普通转专业
//  *      18.7 投资者分类公私募合并，合格投资者功能添加
//  *      19.6 合规需求更改
//  */
// require('../../../include/js/vendor/config.js');
// //zepto模块
// require('../../../include/js/vendor/zepto/callback.js');
// require('../../../include/js/vendor/zepto/deferred.js');
// require('../../../common/js/ajaxLoading.js');
// require('../../../common/js/components/elasticLayer.js');
// require('../../../common/js/components/elasticLayerTypeTwo.js');
// //提示弹层
// require('../../../common/js/components/elasticLayer.js');
// var splitUrl = require('../../../common/js/components/splitUrl.js')();
// var tipAction = require('../../../common/js/components/tipAction.js'); //黑色提示条的显示和隐藏
// var uploadFile = require('./uploaderFile.js')
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

// $(function() {
//     var uploadMaterial = {
//         $e: {
//             noData: $('.noData'), //没有数据的结构
//             listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
//             title: $('.title_wrap .title'), //上传提示
//             txt: $('.title_wrap .title .title_txt'), //上传提示
//             uploadBtn: $('#upload_btn'), //提交认证,需要上传材料
//             contentWrap: $('.content_wrap'), //内容展示
//             contentTemp: $('#content-temp'), // 内容展示模板
//         },
//         gD: {
//             custType: '', // 用户，0机构，1个人
//             investType: '', // 申请投资者类型，认证免审业务参数【0.普通投资者申请；1.专业投资者申请; 2:普通转专业; 3专转普】
//             imgNum: 0, // 需要上传的图片数量
//             agreementId: 0, // 协议id
//             idArr: [], // 已上传的id数组
//             idTypeArr: [], // 所上传资料类型，与id按顺序对应
//             accessorys: null, // 资料模板arr
//         },
//         init: function() {
//             var that = this,
//                 url = '',
//                 data = '';
//             that.events();
//         },
//         getData: function(callback) {
//             var that = this;
//             var obj = [{
//                 url: site_url.auditFreeCheck_api, // 认证描述
//                 data: {
//                     hmac: "", //预留的加密信息
//                     params: { //请求的参数信息
//                         auditType: "2", //审核业务类型 1合格投资者 2投资者分类
//                         businessType: "2", // ，只有普转专需要请求这个接口，0普通投资者申请 1 专业投资者申请 2 普通转专业申请 3专业转普通申请
//                     }
//                 },
//                 // async: false,
//                 needLogin: true,
//                 // needDataEmpty: true,
//                 callbackDone: function(json) {
//                     callback(that, json.data)
//                 },
//                 callbackFail: function(json) {
//                     tipAction(json.msg);
//                 }
//             }];
//             $.ajaxLoading(obj);
//         },
//         /**
//          * [initUploadFile 初始化页面，初始化上传插件]
//          * @author songxiaoyu 2019-06-13
//          * @param  {[type]} da            [控制页面展示字段]
//          * @param  {[type]} needTemp      [是否展示资料模板,如果展示，需要等模板接口返回才能渲染页面]
//          * 页面根据个人，机构会区分不同的上传区域，type,
//          * 个人最多有2个上传区域
//          * 机构最多有3个上传区域
//          * 因为互斥关系，最多实例化3个上传区域就好
//          */
//         initPageTemp: function(da, needTemp) {
//             var that = this;
//             var timer = null;

//             if (needTemp) { // 需要资料模板
//                 var timerFunc = function() {
//                     if (that.gD.accessorys) { // 模板接口请求回
//                         clearInterval(timer);
//                         da.accessorys = that.gD.accessorys;
//                         generateTemplate(da, that.$e.contentWrap, that.$e.contentTemp);
//                         that.initUploadFile(da);
//                         $('.needMaterial').show();
//                     }
//                 };
//                 timer = setInterval(timerFunc, 50);
//                 timerFunc();

//             } else {
//                 generateTemplate(da, that.$e.contentWrap, that.$e.contentTemp);
//                 that.initUploadFile(da);
//                 $('.needMaterial').show();
//             }

//             // 防止页面闪动，在模板渲染完之后，再显示按钮
//             $("#loading").hide();
            
//         },
//         initUploadFile:function(da){
//             var that = this;
//             if (da.finance || da.businessLicense || da.finaStatements) {
//                 uploadFile(that.asyncAll, that, 1); //插件初始化
//             }


//         },
//         // 1.个人申请专业
//         perToPFunc: function() {
//             var that = this,
//                 da = {};

//             da.finance = true; // 金融资产证明上传
//             da.investment = true; // 投资经历上传
//             that.initPageTemp(da, true);
//         },
//         // 2.个人普通转专业
//         perOToPFunc: function(that, da) {
//             var tag = true; // 是否需要展示下载模板；

//             da.isOrdinary = true; // 当前是普通投资者

//             if (da.auditFreeStatus == '0000') { // 2种免审
//                 da.submitBtn = true;
//                 $('.needMaterial').remove(); // 删除需要上传材料的btn
//                 tag = false; // 免审不需要展示下载

//             } else if (da.auditFreeStatus == 'LT301') { // 持仓<300W，投资经历<1年
//                 da.finance = true; // 金融资产证明上传
//                 da.investment = true; // 投资经历上传

//             } else if (da.auditFreeStatus == 'LT300') { // 持仓<300W，投资经历>=1年
//                 da.finance = true; // 金融资产证明上传

//             } else if (da.auditFreeStatus == 'LT1') { //持仓>=300W，投资经历<1年
//                 da.investment = true; // 投资经历上传
//             }

//             that.initPageTemp(da, tag);
//         },
//         // 3：机构申请普通
//         orgToOFunc: function() {
//             var that = this,
//                 da = {};

//             da.organisation = true; // 机构区域
//             da.businessLicense = true; // 营业执照

//             that.initPageTemp(da);
//         },
//         // 4.机构申请专业
//         orgToPFunc: function() {
//             var that = this,
//                 da = {};

//             da.organisation = true; // 机构区域
//             da.finaStatements = true; // 财务报表
//             da.investExperience = true; // 投资经历
//             da.finaAssets = true; // 金融资产证明

//             that.initPageTemp(da, true);
//         },
//         // 5.机构普通转专业
//         orgOToPFunc: function(that, da) {

//             da.isOrdinary = true; // 当前是普通投资者
//             da.organisation = true; // 机构区域

//             if (da.auditFreeStatus == 'ORG1501' ) { //不是资管合格投资者
//                 da.finaStatements = true; // 财务报表
//                 da.investExperience = true; // 投资经历
//                 da.finaAssets = true; // 金融资产证明

//             } else if (da.auditFreeStatus == 'ORG501') { // 已完成资管合格投资者
//                 da.investExperience = true; // 投资经历
//                 da.finaAssets = true; // 金融资产证明
//             }

//             that.initPageTemp(da, true);
//         },
//         // 获取资料模板
//         getProtocolTempFunc: function(id) {
//             var that = this;
//             var obj = [{
//                 url: site_url.queryProtocols_api,
//                 data: {
//                     hmac: "", //预留的加密信息     
//                     params: { //请求的参数信息    
//                         ids: id
//                     }
//                 },
//                 // async: false,
//                 needLogin: true,
//                 needDataEmpty: false,
//                 callbackDone: function(json) {
//                     that.gD.accessorys = json.data[0] && json.data[0].accessorys;
//                 },
//             }];
//             $.ajaxLoading(obj);

//         },
//         // 处理返回到哪个页面  暂时不用
//         dealBack: function() {
//             var that = this;

//             window.history.pushState('', '', '');

//             if (that.gD.pageName == 'questionnaire') {

//                 window.addEventListener('popstate', function(e) {
//                     window.history.go(-2);
//                 });
//             } else {
//                 window.addEventListener('popstate', function(e) {
//                     window.history.go(-1);
//                 });
//             }
//         },
//         /**
//          * [getClassificationData 投资者分类申请接口请求]
//          * @author songxiaoyu 2019-06-10
//          * @param  {[type]} needMaterial [是否需要提交材料]
//          * @param  {[type]} arr          [图片id]
//          * @param  {[type]} typeArr      [图片所属类型]
//          */
//         getClassificationData: function(needMaterial, idArr, idTypeArr) {
//             var that = this;
//             var params = {
//                 "investType": that.gD.investType, // 投资转换类型： 0普通投资者申请  1 专业投资者申请  2普转专  3专转普
//             };

//             if (needMaterial) { // 非免审，需要提交材料
//                 params = {
//                     "investType": that.gD.investType, // 投资转换类型： 0普通投资者申请  1 专业投资者申请  2普转专  3专转普
//                     "attacmentsId": idArr, // 所有附件id 
//                     "attacmentsType": idTypeArr, // 所上传资料类型，与id按顺序对应，
//                 };
//             }
            
//             var obj = [{
//                 url: site_url.applyForClassification_api,
//                 data: {
//                     hmac: "", //预留的加密信息
//                     params: params,
//                 },
//                 //async: false,
//                 needLogin: true,
//                 needDataEmpty: false,
//                 callbackDone: function(json) {
//                     that.$e.listLoading.hide();
//                     window.location.href = site_url.certificationResult_url;
//                 },
//                 callbackFail: function(json) {
//                     that.$e.listLoading.hide();
//                     tipAction(json.msg);
//                 }
//             }];
//             $.ajaxLoading(obj);
//         },
//         // 绑定事件
//         events: function() {
//             var that = this;

//             // 多个上传组件区分
//             mui("body").on('click', '.filePicker', function() {
//                 console.log(1);
//                 $(".webUpload_current").removeClass("webUpload_current"); //先全部移除
//                 $(this).parent().addClass("webUpload_current"); //添加当前标识
//             })

//             // 需要哪些条件--资料模板页
//             mui("body").on('tap', '.title_wrap .title', function() {
//                 window.location.href = site_url.agreementModel_url + "?id=" + that.gD.agreementId;
//             })

//             // 提交申请，不需要上传材料,需要上传材料的在uploaderfile里
//             mui("body").on('tap', '.submitBtn', function() {
//                 that.getClassificationData(false);
//             })

//             mui("body").on('tap', '.mui-radio', function() {
//                 $(this).siblings().find('label').removeClass('yellow');
//                 $(this).find('label').addClass('yellow');
//             })
//         }
//     };
//     uploadMaterial.init()
// })