

	
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

			$('#HeadBarpathName').html('埋点文件加载了');
		   	
		   	if( !this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
		   		
		   		$('#HeadBarpathName').html('埋点文件加载成功');

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

		   	}
		   	else{

		   		$('#HeadBarpathName').html('失败' + this.readyState );
		   	}

		   	k.onload = k.onreadystatechange=null;
		}
	} 
