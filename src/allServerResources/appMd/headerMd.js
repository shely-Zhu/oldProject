

	
	//引入本项目所需的其他文件
	var mdPathList = require('./evt/path/H5PathList.js');
	var mdClickList = require('./evt/click/H5ClickList.js');
	var mdInfo = require('./evt/info/h5Info.js');
	var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
	
	

	//环境变量和埋点域名的对应 
	var mdDomain = '',
		min = false,
		ssoDomain = "";
	if( window.env == '0'){
		mdDomain = "http://localhost:9099";
		ssoDomain = 'localhost:8008';
	}
	else if(window.env == '2' || window.env == '2_b' || window.env == '1' || window.env == '5'){
		mdDomain = "https://dc.qasa.chtwm.com";
		ssoDomain = 'https://sso.chtwmtest.com';
	}
	else if(window.env == 3 || window.env == '3_b'){
		min = true;
		mdDomain =  "https://dc.uata.haomalljf.com";
		ssoDomain = 'https://sso.haomalljf.com';
	}
	else{
		min = true;
		mdDomain = "https://dc.chtwm.com";
		ssoDomain = 'https://sso.chtwm.com';
	}

	if( window.location.href.indexOf('account/views/productFiles.html') != -1){
			$('#HeadBarpathName').html('开始引入');
		}
	
	
	//引入埋点文件
	if( !document.getElementsByClassName('mdScript').length ){
		var k = document.createElement("script");
		k.src =  min ? mdDomain + "/htmd/min/baseMd.min.js" : mdDomain + "/htmd/js/baseMd.js";
		k.id = 'htmdScript';
		k.className = 'mdScript';
		var m = document.getElementsByTagName("body")[0];
		m.appendChild(k);

		if( window.location.href.indexOf('account/views/productFiles.html') != -1){
   			$('#HeadBarpathName').html('引入埋点文件');
   		}
	
		k.onload = k.onreadystatechange = function(){
		   	if( !this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
		   		

                var mdObj = {
		   			pf: 1, //pf参数，表示当前项目
		   			type: "app",  //pc/app/wap
	 	   			envMd: window.env, //当前环境变量
		   			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
		   			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
		   			mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
		   			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
        	   		// otherParams: pcParam
		   		}

		   		if( window.location.href.indexOf('account/views/productFiles.html') != -1){

		   			$('#HeadBarpathName').html('埋点文件加载完毕');

		   			alert( window.htmd );
		   			window._htmd(mdObj);
		   		}
		
				







		   		//金服pc端需要的除底层文件中写的其他参数
				// var pcParam = {
				// 	cn: '', //客户编号（sso接口返回，前端保存到cookie中）
				// }
		  //  		var tmType = "";
   	// 	        if(window.location.href.indexOf('/user/views/register.html') != -1) {
				// 	tmType = "wap";
				// 	$.ajax({
    //                 	contentType:'application/json; charset=UTF-8',
    //                     type: "GET",
    //                     url:ssoDomain + '/checkUserInfo.action',
    //                     dataType:"jsonp",
    //                     async: false,
    //                     jsonp: "callback",
    //                     crossDomain: true,
    //                     //这段代码不能注释，否则跨域时cookie带不过去
    //                     xhrFields: {
    //                         withCredentials: window.env != 0 ? true : false
    //                     },
    //                     headers: {
    //                         "X-Requested-With": 'XMLHttpRequest',
    //                     },
    //                     success: function(json){

    //                         pcParam.cn = json.data && json.data.customerNo ? json.data.customerNo : '';
    //                         var mdObj = {
				// 	   			pf: 1, //pf参数，表示当前项目
				// 	   			type: tmType,  //pc/app/wap
				//  	   			envMd: window.env, //当前环境变量
				// 	   			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
				// 	   			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
				// 	   			mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
				// 	   			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
			 //        	   		otherParams: pcParam
				// 	   		}
		   		
		  //  					window._htmd(mdObj);
                            
    //                     },
    //                     fail: function(json){
    //                         pcParam.cn = '';
    //                         var mdObj = {
				// 	   			pf: 1, //pf参数，表示当前项目
				// 	   			type: tmType,  //pc/app/wap
				//  	   			envMd: window.env, //当前环境变量
				// 	   			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
				// 	   			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
				// 	   			mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
				// 	   			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
			 //        	   		otherParams: pcParam
				// 	   		}
		   		
		  //  					window._htmd(mdObj);
                            
    //                     }
    //                 });
					
					
	   // 			} else if(window.location.href.indexOf('appId') != -1) {
	   // 				tmType = "app";
	   // 				pcParam.cn = splitUrl['cn'] ? splitUrl['cn'] : '';
	   // 				var mdObj = {
			 //   			pf: 1, //pf参数，表示当前项目
			 //   			type: tmType,  //pc/app/wap
		 	//    			envMd: window.env, //当前环境变量
			 //   			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
			 //   			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
			 //   			mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
			 //   			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
	   //      	   		otherParams: pcParam
			 //   		}
		   		
		  //  			window._htmd(mdObj);
	   				
	   // 			}  

	

	
				//当前就是PC项目，不需要判断环境，直接请求sso接口请求客户编号
//		   		$.ajax({
//				    type: "GET",
//				    url:   site_url.checkUserInfo_api,
//					async: false,
//				    success: function(json){
//				        
//				        pcParam.cn = json.data && json.data.customerNo ? json.data.customerNo : '';
//				        var tmType = "";
//
//      	   			if(window.location.href.indexOf('/user/views/register.html') != -1) {
//							tmType = "wap"
//      	   			} else if(window.location.href.indexOf('appId') != -1) {
//      	   				tmType = "app"
//      	   			}
//	
//	        	   		//调用埋点底层方法
//	        	   		var mdObj = {
//	        	   			//pf参数，表示当前项目，必传
//	        	   			pf: 1, 
//	        	   			//pc/app/wap，必传
//	        	   			type: tmType,  
//	        	   			//页面路径对应id配置，用于页面进入离开的埋点请求，必传
//	        	   			mdPathList : mdPathList ,  
//	
//	        	   			//当前环境变量，不传时默认为window.env
//	         	   			envMd: window.env, 
//	        	   			//点击事件的id配置，用于点击事件时的埋点请求，如无点击埋点需求时，可不传
//	        	   			//不传的话，不会监听点击事件的埋点
//	        	   			mdClickList: mdClickList,  
//	        	   			//页面进入/离开/点击埋点时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里，如没有可不传
//	        	   			//不传的话，evt里参数info永远为''
//	        	   			mdInfo: mdInfo, 
//	        	   			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
//	        	   			otherParams: pcParam
//	        	   		}
//
//	        	   		window._htmd(mdObj);	  
//
//	        	   	},
//  	   			error: function(json) {//调用埋点底层方法
//  	   				var tmType = "";
//
//      	   			if(window.location.href.indexOf('/user/views/register.html') != -1) {
//							tmType = "wap"
//      	   			} else if(window.location.href.indexOf('appId') != -1) {
//      	   				tmType = "app"
//      	   			}  
//	    		   		var mdObj = {
//	    		   			pf: 1, //pf参数，表示当前项目
//	    		   			type: tmType,  //pc/app/wap
//	    	 	   			envMd: window.env, //当前环境变量
//	    		   			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
//	    		   			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
//	    		   			mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
//	    		   			otherParams: pcParam   //除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去
//	    		   		}
//	    		   		
//	    		   		window._htmd(mdObj);
//	
//			    	}
//				});
		   	}
		   	k.onload = k.onreadystatechange=null;
		}
	} 
