/*
 * 控制弹出的单选选择及情况说明
 */
var tipAction = require('./tipAction.js');  

module.exports=function(that,shipIntro,shipName,valArray,length){
	var htmlShip='<section class="positionShip"><div class="shipIntro">'+shipIntro+'</div><div class="mui-card shipSec"><div class="shipInput">';
			
			for(var i=0;i<valArray.length;i++){
				if(valArray[i]==$('.'+shipName+' .value').html()){
					htmlShip+=('<div class="mui-input-row mui-radio mui-right define_input shipUtil"><label>'+valArray[i]+'</label><input name="'
					+shipName+'" type="radio" value="'+valArray[i]+'" checked></div>')
				}else{
					htmlShip+=('<div class="mui-input-row mui-radio mui-right define_input shipUtil"><label>'+valArray[i]+'</label><input name="'
					+shipName+'" type="radio" value="'+valArray[i]+'"></div>')
				}
			}
			htmlShip += '</div><div class="areaParent"><div><textarea rows="2" placeholder="请说明"></textarea></div></div>';
			htmlShip += '</div><div class="btnButton"><button type="button" class="mui-btn shipBtn">确定</button></div></section>';
	$("body").append(htmlShip);
	
	if($('input[name='+shipName+']:checked').length == "0"){
		$('input[name='+shipName+']').eq(0).attr('checked','checked');
	}
	if(($('.'+shipName+' .value').html()== "是")  || ($('.'+shipName+' .value').html()== "其他主体") ){
		if(shipName=="investSelect"){
			$(".areaParent textarea").val(that.investSelect);
		}else if(shipName=="shipSelect"){
			$(".areaParent textarea").val(that.shipSelect);
		}else if(shipName=="badCoreSelect"){
			$(".areaParent textarea").val(that.badCoreSelect);
		}
		$(".areaParent").show();
	}
	$("input[name='"+shipName+"']").change(function(e){
		if(e.target.value=="是" || e.target.value=="其他主体"){
			$(".areaParent").show();
		}else{
			if(shipName=="investSelect"){
				that.investSelect='';
			}else if(shipName=="shipSelect"){
				that.shipSelect='';
			}else if(shipName=="badCoreSelect"){
				that.badCoreSelect='';
			}
			$(".areaParent textarea").val('');
			$(".areaParent").hide();
		}
	});
	$(".shipBtn").click(function(){
		if(($("input[type='radio']:checked").val()=="是") || ($("input[type='radio']:checked").val()=="其他主体")){
			if($(".areaParent textarea").val()){
				if($(".areaParent textarea").val().length>length){
					tipAction('说明内容请控制在'+length+'字内')
					return
				}else{
					if(shipName=="investSelect"){
						that.investSelect=$(".areaParent textarea").val();
					}else if(shipName=="shipSelect"){
						that.shipSelect=$(".areaParent textarea").val();
					}else if(shipName=="badCoreSelect"){
						that.badCoreSelect=$(".areaParent textarea").val();
					}
					$("a[check='"+shipName+"']").attr('num',1).addClass('hasSelect');
				}
			}else{
				tipAction('请您填写说明内容，'+length+"字内");
				return
			}
		}else{
			$("a[check='"+shipName+"']").attr('num',0).addClass('hasSelect');
		}
		$("a[check='"+shipName+"'] .value").html($("input[type='radio']:checked").val());
		$(".positionShip").remove();
	})
}
