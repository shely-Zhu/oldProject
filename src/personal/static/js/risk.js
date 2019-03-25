/**
 * 风险评测js文件
 * @author purpleZhao 2017-02-15
 */

require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');

var splitUrl = require('../../../common/js/components/splitUrl.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');

$(function() {
    //风险评估测试题 ，测试完成点击提交显示测试结果
    var risk = {

            testType: '',
			
			typeObj:{},
			
            getElements: {
                errorTip: $(".againEnter"), //错误提示
                reUrl: $('.risk .location'), //重新测评的按钮
                prUrl: $('.risk .product'), //返回首页按钮
            },
            //初始化 
            webinit: function() {
                var that = this;

                //设置重新测试的链接
                that.setReUrl();

                that.getData();
            },
            //获取个人/机构参数，设置重新设置链接
			
            setReUrl: function() {
                var that = this;

                var num = splitUrl();

                if (decodeURIComponent(num['src']) == "per") { // 个人
                    if( envOrigin ==1 ){
                        that.getElements.reUrl.on("click",function(){
                            window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(site_url.mine_url);
                        })
                        that.getElements.prUrl.on("click",function(){
                            window.location.href = site_url.cft_index_url;
                        })
                    }else{
                        that.getElements.reUrl.attr('href', site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(site_url.mine_url));
                        that.getElements.prUrl.attr('href', site_url.cft_index_url);
                    }
                    that.testType = "per";

                } else if (decodeURIComponent(num['src']) == "org") { // 机构
                    if( envOrigin ==1 ){
                        that.getElements.reUrl.on("click",function(){
                            window.location.href=site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(site_url.mine_url);
                        })
                        that.getElements.prUrl.on("click",function(){
                            window.location.href=site_url.cft_index_url;
                        })
                    }else{
                        that.getElements.reUrl.attr('href', site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(site_url.mine_url));
                        that.getElements.prUrl.attr('href', site_url.cft_index_url);
                    }
                    //个人
                    that.testType = "org";

                }
            },
            //数据初始化
            getData: function() { //事件 
                var that = this;

                //请求入参
                var param = {
                    hmac: "", //预留的加密信息     
                    params: {} //请求的参数信息 

                };

                var obj = [{
                    //如果检测到pub公募的东西则走公募的成绩查询接口
                    url: site_url.test_result_api, //风测结果
                    data: param,
                    needLogin: true, //需要判断是否登陆
                    //needDataEmpty: false,//不需要判断data是否为空
                    callbackDone: function(json) { //成功后执行的函数

                        var jsonData = json.data;       	
                        if (!!jsonData.optionScore) {
                            $("#lader").html(jsonData.grade);
                            
                            that.typeSelect(that.testType,jsonData.grade)
                           
                            $("#text").html('依据本公司的投资者与产品、服务等级匹配规则，'+that.typeObj.name+'的风险承受能力等级与本公司'+that.typeObj.typePd+'产品、服务相匹配。详阅<a class="tipLink" href="'+site_url.riskTip_url+'">《投资者风险匹配告知书及确认函》。</a>');

                        } else {
                            $("#text").html('尊敬的投资者，根据《证券期货投资者适当性管理办法》的要求，我们重新调整了风险测评问卷，您原来的风险测评结果已经过期，请您重新进行测评。');
                        }
                        $(".reminder_txt .day").html(jsonData.validDate);
                        if(jsonData.isRiskExpired  == 1) {
                            $(".reminder_txt .time_out2").show();
                        } else{
                            $(".reminder_txt .time_out1").show();
                        }
    
                    },
                    callbackFail: function(json) { //失败后执行的函数

                        tipAction(json.msg);

                    }
                }];
                $.ajaxLoading(obj);
            },
            typeSelect:function(type,num){
            	var that=this;
            	var gradeArr = ['保守型','稳健型','平衡型','成长型','进取型'];
            	if(type=="org"){//机构
            		that.typeObj.name='贵机构';
            	}else{
            		that.typeObj.name='您';
            	}
            	switch (gradeArr.indexOf(num)){
            		case 0:
            			that.typeObj.typePd='保守型';
            			break;
            		case 1:
            		    that.typeObj.typePd='(保守型，稳健型)';
            		    break;
            		case 2:
            		    that.typeObj.typePd='(保守型，稳健型，平衡型)';
            		    break;
            		case 3:   
            			that.typeObj.typePd='(保守型，稳健型，平衡型，成长型)';
            		    break;
        		    case 4:   
	        			that.typeObj.typePd='(保守型，稳健型，平衡型，成长型，进取型)';
	        		    break;
            	}
            	return that.typeObj
            }
        }
        //调用
    risk.webinit();
})
