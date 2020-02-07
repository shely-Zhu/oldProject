/**
* 视频医生
* @author yanruiting 2020-02-06
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	var somePage = {
		//获取页面元素
		$e:{
			
		},
		//页面初始化函数
		init:function(){  
            // 判断客户等级是否满足条件（是否开通和缓服务，是否过期）  
            this.judgeCustomerCondition()     
            this.events();
        },
        showViewCase: function() {
        	$(".rightBtn").html("查看病例")
        	$(".rightBtn").show()
        },
        // 获取用户是否开通和缓服务
        judgeCustomerCondition:function() {
            var that = this;
        	var that=this;
            var obj=[{
                url: site_url.checkVideoDoctor_api,
                data:{},
                needLogin: true, //需要判断登录是否过期
                callbackDone: function(json) {
                    var isConform = json.data.isConform // 1:满足，2：不满足，3：已过期
                    if(isConform == 1) {
                        //显示标题栏右上角查看病例按钮
                        that.showViewCase()
                        $(".callDoctor").removeClass('hide')
                    } else if (isConform == 2) {
                        $(".noDredgeDesc").removeClass('hide')
                        $(".noDredgeDesc>.toCustomer").html("很抱歉，您还没有开通此服务")
                        $(".noDredgeDesc>.linkFinancialer").html("可联系您的理财师咨询开通方式")
                    } else if (isConform == 3) {
                        $(".noDredgeDesc").removeClass('hide')
                        $(".noDredgeDesc>.toCustomer").html("很抱歉，您的视频医生服务已过期")
                        $(".noDredgeDesc>.linkFinancialer").html("可联系您的理财师咨询继续服务方式")
                    }             
                }
            }];                        
            $.ajaxLoading(obj); 
        },
        events:function() {
            var that = this;
            // 点击查看病例按钮app拦截调取第三方
            mui("body").on('mdClick', '.rightBtn' , function(){
                window.location.href = site_url.caseList_url;
            },{
                'htmdEvt': 'videoDoctor_01'
            });
            // 点击呼叫医生app拦截调取第三方
            mui("body").on('mdClick', '.callDoctor' , function(){
                window.location.href = site_url.callDoctor_url;
            },{
                'htmdEvt': 'videoDoctor_02'
            });
        }
	};
	somePage.init();
});