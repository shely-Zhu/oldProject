/*
 * @Author: your name
 * @Date: 2019-12-09 15:53:31
 * @LastEditTime: 2019-12-17 18:28:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\fundAccountDiagnosisResult.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js'); 


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box") //诊断结论
        },
        gV: {
              dataPickData:"", //基金代码
              fundCode:"", //购买日期
              buyMoney:"",   //购买金额
        },
        init: function() {
            var that = this;
            $(".listLoading").hide()
            that.events();
        },
       
       events:function(){
            var that = this;
            var dtPicker = new mui.DtPicker({
                type:'date'
            }); 
            // 购买日期选择
            mui("body").on("mdClick",".mui-icon-arrowright",function(){
                var type = $(this).attr("type");
                $('.popup').css('display', 'block')
			// 监听日期选择点击事件
				dtPicker.show(function (selectItems) { 
                    that.gV.dataPickData=selectItems.value;
                    $('.popup').css('display', 'none')
                })
            },{
                'htmdEvt': 'addAccountDiagnosisResult_01'
            })
            dtPicker.hide(function (selectItems) { 
                that.gV.dataPickData=selectItems.value;
                $('.popup').css('display', 'none')
            })
            //弹出框取消按钮
            mui("body").on("mdClick",".mui-dtpicker-header .mui-btn",function(){
                $('.popup').css('display', 'none')
                console.log(that.gV.dataPickData)
                $(".dataPick")[0].textContent = that.gV.dataPickData
            },{
                'htmdEvt': 'addAccountDiagnosisResult_02'
            })
            //确认按钮
            mui("body").on("mdClick",".comfirmButtom .mui-btn-warning",function(){
                var fundCode = $(".fundCode_input").val();
                var dataPick = $(".dataPick")[0].textContent;
                var money = $(".money_input").val();
                var arr =[];
                var obj = {
                    "fundCode":fundCode,
                    "purchaseDate":new Date(dataPick).getTime(),
                    "purchaseDateStr":dataPick,
                    "purchaseAmount":money,
                    "purchaseSourceType": 2
                }
                if(fundCode!=""&&dataPick!=""&&money!=""){
                    if(sessionStorage.getItem("addAccountDiagnosisResultList")){
                         var list = JSON.parse(sessionStorage.getItem("addAccountDiagnosisResultList"));
                         //list.push(obj);
                         if(list){
                            list.forEach(function(item){
                                arr.push(item)
                            })
                         }
                         
                         arr.push(obj)
                         sessionStorage.setItem("addAccountDiagnosisResultList",JSON.stringify(arr))
                    }else{
                        arr.push(obj)
                        sessionStorage.setItem("addAccountDiagnosisResultList",JSON.stringify(arr))
                    } 
                    $(".warmMessage").hide();
                    window.location.href = site_url.fundAccountDiagnosisResult_url+"?type=add"
                }else{
                    $(".warmMessage").show()
                }
            },{
                'htmdEvt': 'addAccountDiagnosisResult_03'
            })
         
       },
      
     
      
    };
    fundAccountDiagnosisResult.init();
});