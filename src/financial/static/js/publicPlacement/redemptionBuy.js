/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime: 2019-12-06 11:16:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\redemptionBuy.js
 */
/**  
 * @Page:  普通基金产品详情页_定投
 * @Author: caoqihai  
 * @Date:   2019-11-23
 * 
 */
require('@pathCommonBase/base.js');

require('@pathIncludJs/vendor/mui/mui.picker.min.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//引入复制功能
// var Clipboard = require('clipboard');
var popPicker = require('@pathCommonJsCom/popPicker.js');
var provinceList = require('../../../../common/json/provinceList.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

var payPass = require('@pathCommonJsCom/payPassword.js');

$(function() {

    var regulatory = {

        getElements: {
            accountName: $('#accountName'), //公共账户名称
            name: $('#name'), //公募账户名
            number: $('#number'), //账号
            linenum: $('#linenum'), //行号
            openingBank: $("#openingBank"), //开户行
            topc: $('#topc'), //提示信息
            templateTransferFunds:$("#templateTransferFunds"), //基金列表模板
            TransferFundsContent:$(".transferFundsContent"), //基金列表容器
            iconCheck: $(".item2 .iconfont"), //同意协议选择框
            confirmBtn:$(".confirmeDemptionPay"), // 确定按钮
            maxMoneyContent:$(".maxMoneyContent span"),
        },
        gv:{//全局变量
            transferFunds:"",
            fundCode:"", //现在的基金编号
            targetfundcode:"", //赎回后目前的基金编号
            nowRedempShare:"", //赎回后目前的赎回份额
            maxRedempShare:"", //最大赎回份额
            payType:"",
            maxMoney:"",
            checkImgUrl:"/common/img/account_icon_check@2x.png",
            dataList:"",
            enableSharesMax:"", //最大赎回金额

        },

        webinit: function() {
            var that = this;
             console.log("888",that.gv.dataBox);
             that.gv.dataList = JSON.parse(sessionStorage.getItem("publicFundDetail"));
             that.getElements.maxMoneyContent[0].textContent = that.gv.dataList.enableShares;
             console.log("89898",JSON.parse(sessionStorage.getItem("publicFundDetail")))
            // that.gv.targetfundcode = that.gv.dataList.fundCode;
           //  that.gv.dataList = 
            //
            //that.getData();
            that.initParmes();
            that.events();
            that.initHtml();
           that.initQueryTransferFunds();
        },
        getData:function(){
           
        },
        initHtml:function(){
            var that = this;
            var redemptionBuyTitalHtml ="";
            var onrightLeftOneimgUrl = "";
            var onrightLeftOneName = "";
            var onrightLeftOneCode = "";
            console.log(that.gv.dataList.enableShares)
            $(".redemptionBuyTital span.name").html(that.gv.dataList.fundName);
            $(".redemptionBuyTital span.code").html(that.gv.dataList.fundCode);
            $(".listOneCar img").attr("src",that.gv.dataList.bankThumbnailUrl);
            $(".listOneCar i").html(that.gv.dataList.bankName);
            $(".listOneCar span.carNum").html(that.gv.dataList.bankAccountMask.substr(-4));
            $(".pay span.payTime").html(that.gv.dataList.estimateArrivalDate);
           // $(".msecond input").val(that.gv.dataList.enableShares);
            $(".listSecondCar span.name").html(that.gv.dataList.bankName);
            $(".listSecondCar span.code").html(that.gv.dataList.bankAccountMask.substr(-4));
            $(".popupCarList .bank-img").attr("src",that.gv.dataList.bankThumbnailUrl)
        },
        //查看详情提交
        findMessageCen:function(id){
            var obj = [{
                url: site_url.findMessageCenterById_api,
                 contentTypeSearch: true,
                data: {
                    "id": id,  
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    console.log("json",json);
                    var html = json.data.content;
                    if(json.status == "0000"){
                        $('.elasticLayer.transOutRule').show()
                           $(".elasticContent").html(html);
                       }else{
                         $('.elasticLayer.transOutRule').show()
                         $(".elasticContent").html("规则查询失败");
                       }
                },

            }];
            $.ajaxLoading(obj);
        },
        //初始化右侧展开
        initQueryTransferFunds:function(){
            var that = this;
            var obj = [{
                url : site_url.queryTransferFunds_api,
                needDataEmpty:true,
                data:{
                    type:"2"
                },
                callbackDone : function(json){
                    console.log("88888",json);
                    that.gv.transferFunds = json.data;
                     // 将列表插入到页面上
                     for(var i = 0;i<that.gv.transferFunds.length;i++){
                          var code = that.gv.transferFunds[i].fundCode;
                          var Redata = that.searchNewfundDetails(code)
                     }
                     generateTemplate(that.gv.transferFunds, that.getElements.TransferFundsContent, that.getElements.templateTransferFunds);
                }
            }];
            $.ajaxLoading(obj);
             
        },
        //查询基金七日年化
        searchNewfundDetails: function(code){
            var that = this;
            var obj = [{
                url:site_url.newFundDetails_api,
                needDataEmpty:true,
                data:{
                    fundCode:code
                },
                callbackDone:function(json){
                    return json
                }
    
            }];
            $.ajaxLoading(obj);
        },
        //赎回确认
        cancelOrder:function(password){
            var that = this;
            var param = {
                password: password,
                fundCode:regulatory.gv.dataList.fundCode, //基金代码 
                tradeNo:regulatory.gv.dataList.tradeNo,//交易账号
                redempShare:regulatory.gv.nowRedempShare, //赎回份额
                redempFlag:"0", //赎回标识
                capitalMode:regulatory.gv.dataList.capitalMode, //资金方式
                shareType:regulatory.gv.dataList.shareType, //份额分类
                targetfundcode:regulatory.gv.targetfundcode,//目前基金编号
                channel:"app",//渠道
            };
            var obj = [{
                url:site_url.redemptionPay_api,
                data:param,
                needDataEmpty: true,
                callbackDone:function(res){
                    var data = res.data;
                    if(res.status == '0000'){
                        window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' + 
                        "024"+ "&fundCode=" + regulatory.gv.dataList.fundCode  + '&flag=redemption';
                    }else{
                        $('.elasticLayer.transOutRule').show()
                        $(".elasticContent").html(res.message);
                    }
                }

            }];
            $.ajaxLoading(obj);
        },
        initParmes:function(){
           var that = this;
           var parmesDataList = that.gv.dataList;
           that.gv.fundCode = parmesDataList.fundCode;
           that.gv.nowRedempShare = parmesDataList.enableShares;
           that.gv.maxRedempShare = parmesDataList.enableShares;
             
        },
    
        /*
            绑定事件
         */
        events: function() {
            var that = this;
            $('body').on('mdClick', '.onright', function() {
                $('.popup').css('display', 'block')
            }, {
				htmdEvt: 'redemptionBuy_01'
			})

            $('body').on('mdClick', '.popup-close', function() {
                $('.popup').css('display', 'none')
            }, {
				htmdEvt: 'redemptionBuy_02'
			})

            $('body').on('mdClick', '.popup-mask', function() {
                $('.popup').css('display', 'none')
            }, {
				htmdEvt: 'redemptionBuy_03'
			})

            mui("body").on('mdClick','.findMessageCen',function(){
                var id="79";
                console.log("aaaaa")
                that.findMessageCen(id);
            }, {
				htmdEvt: 'redemptionBuy_04'
			})

             //银行卡与基金形成单选
            $('body').on('mdClick',".radioCheckItem",function(){
                var type = $(this).attr("type");
                if(type == 'car'){
                    //银行
                    $(".transferFundsContent li").attr("checkStatu","off");
                    $(".transferFundsContent li .radioCheckItemImg").attr("src","")
                   
                    $(".listOnefund").css({"display":"none"});
                    $(".listOneCar").css({"display":"flex"});
                    $(".maxMoneyContent").css({"display":"block"});
                    that.gv.targetfundcode = that.gv.dataList.fundCode;
                }
                else if(type == 'fund'){
                    console.log("8888")
                   $(".carContent li").attr("checkStatu","off");
                   $(".carContent li .radioCheckItemImg").attr("src","")
                   $(this).siblings().attr("checkStatu","off");
                   $(this).siblings().find(".radioCheckItemImg").attr("src","");
                   $(".listOnefund").css({"display":"block"});
                    $(".listOneCar").css({"display":"none"});
                    $(".maxMoneyContent").css({"display":"none"});
                    var fundCode = $(this).find("span.fundCode")[0].textContent;
                    var fundName = $(this).find("span.fundName")[0].textContent;
                    var fundMessage = $(this).find("span.fundMessage")[0].textContent;
                    that.gv.targetfundcode = fundCode;
                    console.log(fundCode,fundName);
                    $(".listOnefund .fundName").html(fundName);
                    $(".listOnefund .fundCode").html(fundCode);
                    $(".listOnefund .fundMessage").html(fundMessage);
                }
                $(this).attr("checkStatu","on");
                $(this).find(".radioCheckItemImg").attr("src",that.gv.checkImgUrl);
                
              //  that.confirmCheck();
            }, {
				htmdEvt: 'redemptionBuy_05'
			})

            //点击全部，初始化最大赎回额度
            mui("body").on('mdClick','.forAll',function(){
               $(".msecond .msecond-one")[0].value=that.gv.dataList.enableShares;
            }, {
				htmdEvt: 'redemptionBuy_06'
			})

            // 交易规则
            mui("body").on("mdClick", ".goPofTransactionRules", function (e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + regulatory.gv.dataList.fundCode
            }, {
				htmdEvt: 'redemptionBuy_07'
			});

            //赎回确认
            mui("body").on('mdClick','.confirmeDemptionPay',function(){         
        // $(".confirmeDemptionPay").on('click',function(){
            $("#passwordWrap").show();
            payPass(that.cancelOrder)
        }, {
            htmdEvt: 'redemptionBuy_08'
        })
         $(".msecond input").change(function(){
             that.gv.nowRedempShare = $(this)[0].value;
             if(parseFloat(that.gv.maxRedempShare)< parseFloat (that.gv.nowRedempShare)){
                 $(".checkMessage").css({"display":"block"});
                 $(".checkMessage").html("超出最大赎回份额")
             }else{
                $(".checkMessage").css({"display":"none"});
                if(that.gv.nowRedempShare == ""){
                    $(".checkMessage").css({"display":"block"});
                    $(".checkMessage").html("赎回额度不能位空")
                }
             }
         })

         //点击同意协议
            mui("body").on('mdClick','.item2 .iconfont',function(){ 
			//that.getElements.iconCheck.on('click', function() {
                if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.getElements.confirmBtn.attr('disabled',true)
                } else {
					$(this).addClass("check").html('&#xe669;');
					that.getElements.confirmBtn.removeAttr("disabled");
                }
			}, {
				htmdEvt: 'redemptionBuy_09'
			});
            
            mui('body').on('tap','.elasticLayer.transOutRule .elasticButtons',function(){
				$('.elasticLayer.transOutRule').hide()
			}) 
            

        },



    };
    //调用函数
    regulatory.webinit();

})