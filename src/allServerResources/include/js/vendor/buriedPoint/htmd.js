/**
	前端埋点js

	参数在加载js后便获取
	但发送请求需在所有dom结构修改完毕之后调用
	防止title是js设置的，页面一开始时获取不到

**/

;(function(){
	window._htmd = function( tm, pf, envMd){

	var md = {}, 
		//存放埋点过程中的各种数据
		param = {
			time : {
				nTime: 0, //newTime，进入页面的时间
				rTime: 0 //removeTime，离开时间
			}, //用来存放进入页面的时间和离开时间，计算页面停留时长
			tm: '', //存放外部传进来的tm参数
			pf: '', //存放外部传进来的pf参数
			//domain : '', //存放cookie设置时的平台对应的域名 
			url : '', //存放接口路径
			data : {}, //data用来存放给接口提供的所有参数
			scout : 0 , //同一个session会话期内访问的次数，请求一次日志scount加1
		},
		//存放最后提交给接口的数据
		fData = {};
		

	//提交给接口的数据
	md.json = {};
	//提交给接口的数据（不同端的公共参数）默认配置
	md.json.common = {
		evt : {}, //事件相关
		st: 0, //页面停留时长
		scroll: 0, //页面滚动次数
		uvid: '', //用户访问id（需前端创建）
		ds: '', //屏幕分辨率
		cn: '', //客户编号（sso接口返回，前端保存到cookie中）
		tm: '', //终端类型，1.PC 2.WAP 3.APP 4.微信
		pf: '', //平台，1.金服 2.理顾宝 3.新app
		sf: '',//上一个页面pid
		
	};
	//pc/wap/微信共用
	md.json.browser = {
		sstat: '', //会话状态
		tt: '', //页面title
		cl: '', //颜色质量
		ln: '', //网页字符集
		v : '1.0.0', //前端埋点版本号
		ck: '', //是否启用cookie，0-否，1-是
		ja: '', //是否支持Java，0-否，1-是
		fv: '', //浏览器支持的flash版本，0-无，其他-版本号
		lst: '', //是否支持localStorage, 0-不支持，1-支持
		rv: '', //随机数 
	};
	//app使用
	md.json.app = {
		pid: window.location.href, //混合app里传当前地址
		ls: '', //是否登录，0-否，1-是
		nt: '', //wifi/流量，0-网络异常；1-wifi；2-2G；3-3G；4-4G；5-5G
		mno: '', //电信运营商，1. 中国移动 2.中国联通 3.中国电信 4.其他
		mb: '', //设备品牌
		mt: '', //设备型号
		sv: '', //当前设备操作系统版本
		v: '', //当前APP应用版本号
	};
	var htmdWeb,
		htmdWeb;

	//数据处理
	md.util = {};
	md.util.domainUrl = function(){

		if(param.env == 1 || param.env ==2 || param.env == 0){ //开发环境和测试环境
			htmdWeb = "https://dc.chtwmtest.com/dc.gif"; //web接口
			htmdApp = "https://dc.chtwmtest.com/mdc.gif"; //app接口
			
		}
		else if (param.env == 3){ // 预生产环境
			htmdWeb = "https://dc.uata.haomalljf.com/dc.gif"; //web接口
			htmdApp = "https://dc.uata.haomalljf.com/mdc.gif"; //app接口
		}
		else if (param.env == 4){ // 生产环境
			htmdWeb = "https://dc.chtwm.com/dc.gif"; //web接口
			htmdApp = "https://dc.chtwm.com/mdc.gif"; //app接口
		}
	};
	// else {

	// }
	md.util.getType = function( obj ){

		if( Object.prototype.toString.call(obj) === '[object Number]' ){
			//数字
			return 'Number';
		}
		else if (Object.prototype.toString.call(obj) === '[object String]') {
			//字符串
			return 'String';
		}
		else if( Object.prototype.toString.call(obj) === '[object Array]' ){
			//数组
			return 'Array'
		}
		else if( Object.prototype.toString.call(obj) === "[object Function]") {
			//函数
			return 'Function';
		}
		else if( Object.prototype.toString.call(obj) === "[object Boolean]" ){
			//Boolean
			return 'Boolean';
		}
		else if( Object.prototype.toString.call(obj) === "[object Null]" ){
			//Null
			return 'Null';
		}
		else if( Object.prototype.toString.call(obj) === "[object Object]" ){
			//Object
			return 'Object';
		}
		else if( Object.prototype.toString.call(obj) === "[object Undefined]" ){
			//Undefined
			return 'Undefined';
		}
	};
	//对象clone
	md.util.clone = function( obj ){
		var dataCopy = md.util.getType(obj)  == 'Array' ? [] : {};
		for (var item in obj) {
			dataCopy[item] = typeof obj[item] === 'object' ? md.util.clone(obj[item]) : obj[item];
		}
		return dataCopy;  
	};
	//两个对象合并，data_2复制到data_1上
	md.util.objCombine = function( obj_1, obj_2){
		var d_1 = md.util.clone( obj_1 ),
			d_2 = md.util.clone( obj_2 );

		for(var key in d_2){
			if( !d_1.hasOwnProperty(key) || (d_1[key] != d_2[key])){
			d_1[key] = d_2[key]
		　　}
		}
		return d_1;
	};
	//将obj转化为get请求可以直接拼的参数
	md.util.objToUrl = function( data ){
		var params = '?';
		for ( var i in data ){
			var t;
			//if( md.util.getType(data[i]) == 'Object' ){
				//如果是对象，需要再转一次
				//t = md.util.objToUrl( data[i]);
			//}
			//else{
				//t = md.util.isChinese(data[i]) ? encodeURIComponent(data[i]) : data[i];
				t =  encodeURIComponent(data[i]);
			//}
			params += i + '=' + t + '&';
		}
		//循环后将最后一个&去掉
		params = params.substr(0, params.length-1);
		return params;
	};
	//判断字符串是否含有中文
	md.util.isChinese = function( str ){
		if(/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
			return true;
		}
		return false;
	};

	//埋点请求相关
	md.log = {};
	//发送埋点请求的方法
	md.log.commit = function() {

		var tm = param.tm;
		var pf = param.pf;
		var data = md.util.objToUrl(fData);

		var img = new Image();
			img.onload = img.onerror = img.onabort = function() {
				img = img.onload = img.onerror = img.onabort = null;
				param.scout++;
			};
		if (pf == '2'){ //平台为理顾宝

            if(tm == '2'){
                img.src = htmdWeb + data;
            }else{
                img.src = htmdApp + data;
            }
            
        }else if(pf == '1'){ //平台为金服
            //在wap端，需先请求sso接口；
            if(tm == '2'){

                if( window.htmd_get){
                    img.src = htmdWeb + data;
                }else{
                	var ssoDomain;
                	if(param.env == 1){
                		ssoDomain = 'https://sso.chtwmlocal.com';
                	}
                	else if(param.env == 2){
                		ssoDomain = 'https://sso.chtwmtest.com';
                	}
                	else if(param.env == 3){
                		ssoDomain = 'https://sso.haomalljf.com';
                	}
                	else if(param.env == 4){
                		ssoDomain = 'https://sso.chtwm.com';
                	}
                    $.ajax({
                    	contentType:'application/json; charset=UTF-8',
                        type: "GET",
                        url:ssoDomain + '/checkUserInfo.action',
                        dataType:"jsonp",
                        async: false,
                        jsonp: "callback",
                        crossDomain: true,
                        //这段代码不能注释，否则跨域时cookie带不过去
                        xhrFields: {
                            withCredentials: env != 0 ? true : false
                        },
                        headers: {
                            "X-Requested-With": 'XMLHttpRequest',
                        },
                        success: function(json){

                            fData.cn = json.data && json.data.customerNo ? json.data.customerNo : '';
                            //window.htmd_cn = fData.cn;
                            //表示已经请求过了
                            window.htmd_get = true;

                            data = md.util.objToUrl(fData);
                            img.src = htmdWeb + data;
                        },
                        fail: function(json){
                            fData.cn = '';
                            img.src = htmdWeb + data;
                        }
                    });
                }
            }
            //终端为PC、微信
            if( tm == '1' || tm == '4'){
                img.src = htmdWeb + data;
            }
            else if( tm == '3'){ //终端为APP
                (fData.cn === '') && (fData.cn = md.log.getQueryString("cn"));
                img.src = htmdApp + data;

            }
        }

	};
	md.log.getData = function(){
		//设置此处可以直接取到的参数的值
		//公共参数(除evt，st和scroll之外的)
		fData.tm = param.tm;
		fData.pf = param.pf;
		fData.ds = (window.screen.width || 0) + "x" + (window.screen.height || 0);
		//fData.cn = md.log.getQueryString("cn");
		if( fData.tm == '3' && fData.pf == '1'){
			fData.uvid = md.log.getQueryString("uvid");
		}else{
			fData.uvid = md.cookie.get('uvid');
		}
		
		//browser参数
		(fData.tt === '') && (fData.tt = (document.title ? document.title : '') );
		(fData.cl === '') && (fData.cl = (window.screen.colorDepth || 0) );
		(fData.ln === '') && (fData.ln = (navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "" ));
		(fData.ck === '') && (fData.ck = (navigator.cookieEnabled ? 1 : 0));
		(fData.ja === '') && (fData.ja = (navigator.javaEnabled() ? 1 : 0));
		(fData.fv === '') && (fData.fv = (function() {
			var a = "";
			if (navigator.plugins && navigator.mimeTypes.length) {
				var b = navigator.plugins["Shockwave Flash"];
				b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
			} else if (window.ActiveXObject) try {
				if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
			} catch(d) {}
			if( !a ){
				a=0;
			}
			return a;
		})());
		(fData.lst === '') && (fData.lst = (function (){
			var ls = ('localStorage' in window && window['localStorage'] !== null) ? 1 : 0;
			return ls; 
		})());
		(fData.rv === '') && (fData.rv = md.num.getRandom());
		
		// if( fData.tm == '3'){
		// 	(fData.sf === '') && (fData.sf = md.log.getQueryString("sf"));
		// }else{
		// 	(fData.sf === '') && (fData.sf = encodeURIComponent(document.referrer));
		// }

		//先取document.referrer，app里默认也是传这个
		//如果从原生打开的话，是没有这个的，所以判断sf，
		//如果sf也没有的话，getQueryString方法会直接返回空
		document.referrer ? ((fData.sf === '') && (fData.sf = encodeURIComponent(document.referrer))) : ((fData.sf === '') && (fData.sf = md.log.getQueryString("sf")));

		//app参数
		//拿到app传给H5参数的方式，需要和app约定
		//(fData.pid === '') && (fData.pid = md.log.getQueryString("pid"));
		(fData.ls === '') && (fData.ls = md.log.getQueryString("ls"));
		(fData.nt === '') && (fData.nt = md.log.getQueryString("nt"));
		(fData.mno === '') && (fData.mno = md.log.getQueryString("mno"));
		(fData.mb === '') && (fData.mb = md.log.getQueryString("mb"));
		(fData.mt === '') && (fData.mt = md.log.getQueryString("mt"));
		(fData.sv === '') && (fData.sv = md.log.getQueryString("sv"));
		(fData.v === '') && (fData.v = md.log.getQueryString("v"));
		//(fData.sf === '') && (fData.sf = md.log.getQueryString("sf"));
	};
	//获取地址栏参数
	md.log.getQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return '';
	};

	md.log.base64 = function(){
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
	    // public method for encoding  
	    var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
	};
	md.log.splitUrl = function(configString){

		var arg = [],
			url = [],
			path = configString || window.location.href;

		//如果path中没有?，获取url会报错，所以要先判断一下
		if(path.indexOf('?') != -1){
			//有?的情况
			var s = path.substring(path.indexOf('?') + 1);

			var ss = s.split('&');
			
			for( var i = 0; i< ss.length; i++){

				var index = ss[i].indexOf('=');
				
				if( index != -1 ){
					
					if( !arg[ ss[i].substring(0, index) ] ){
						//地址栏url上可能有经过base64加密的参数，此处不处理
						arg[ ss[i].substring(0, index) ] = ss[i].substring( index+1 );
					}
				}


			}

		}

		return arg;

	  	
	};

	//数字
	md.num = {};
	//获取8位随机数
	md.num.getRandom = function(){
		return parseInt( Math.random() * (99999999-10000000) + 10000000 );
	};

	//时间相关
	md.time = {};
	//获取当前时间戳
	md.time.getTime = function(){
		return new Date().getTime();
	};
	(function(){
		//设置当前时间，用于后面计算页面停留时长
		param.time.nTime = md.time.getTime();
	})();


	//判断不同终端，进行参数和接口路径的不同处理
	md.tm = {};
	//判断终端，返回提交数据的接口路径
	//app内嵌H5的路径与其他不同
 //    md.tm.commitUrl = function( ){
 //    	var tm = param.tm;
	// 	if( tm == 'pc' || tm == 'wap' || tm == 'wx'){
	// 		param.url = 'https://dc.baidu.com/dc.gif';
	// 	}
	// 	else if( tm == 'app'){
	// 		param.url = 'https://dc.baidu.com/mdc';
	// 	}
	// }
	//判断不同端，设置不同参数
	md.tm.getData = function( tm ){

		var bData = md.json.browser,
			aData = md.json.app;

		if( tm == '3'){
			//合并md.json.common与md.json.app
			fData = md.util.clone( md.util.objCombine( md.json.common, md.json.app ));
		}
		else{
			//合并md.json.common与md.json.browser
			fData = md.util.clone( md.util.objCombine( md.json.common, md.json.browser ));
		}
	};

	//平台相关
	md.pf = {};
	//判断平台，设置当前cookie存放的域名
	md.pf.domain = function(pf){	
		// if( pf == 'htjf_pc' || pf == 'htjf_wap' || pf == 'htjf_wx' || pf == 'htjf_app'){
			// param.domain = 'chtwm.com' 
		// }
		// else if( pf == 'lgb_app'){
			// param.domain = '';
		// }
		param.domain = document.domain;
	};

	//cookie相关
	md.cookie = {};
	//设置cookie
	md.cookie.set = function(name, value){
		//设置cookie过期时间，默认10年
		var expires = new Date(); 
		expires.setTime(param.time.nTime + 10*365*24*60*60*1000);

		//过期时间为10年，且为secure
		document.cookie = name + "=" + value + (param.domain ? "; domain=" + param.domain: "; domain=" + document.domain) 
			+ "; path=/; expires=" + expires.toGMTString()
			// + "; secure";
	};
	//获取cookie
	md.cookie.get = function( name ){
		var strcookie = document.cookie, //获取cookie字符串
			arrcookie = strcookie.split("; ");//分割
		//遍历匹配
		for ( var i = 0; i < arrcookie.length; i++) {
			var arr = arrcookie[i].split("=");
			if (arr[0] == name){
				return arr[1];
			}
		}
		return ""; 
	};


	//获取外部文件（所有evt参数列表、app页面id列表）
	md.file = {};
	md.file.get = function( tm, pf){
		//引入所有evt参数列表
		if( pf == 1){  //金服
			if( tm == 3 || tm == 2){
				var k = document.createElement("script");
				k.src = '/include/js/vendor/buriedPoint/evt/path/H5PathList.js';
				var m = document.getElementsByTagName("script")[0];
				m.parentNode.insertBefore(k, m);
			}
			if( tm == 3 || tm == 2){
				var k = document.createElement("script");
				k.src = '/include/js/vendor/buriedPoint/evt/click/H5ClickList.js';
				var m = document.getElementsByTagName("script")[0];
				m.parentNode.insertBefore(k, m);
			}
			if( tm == 2 || tm == 3 || tm == 4){
				var k = document.createElement("script");
				k.src = '/include/js/vendor/buriedPoint/evt/info/h5Info.js';
				var m = document.getElementsByTagName("script")[0];
				m.parentNode.insertBefore(k, m);
			}
		}
		else if ( pf == 2){  //理顾宝
			var k = document.createElement("script");
				k.src = '/include/js/vendor/buriedPoint/evt/path/LgbPathList.js';
				var m = document.getElementsByTagName("script")[0];
				m.parentNode.insertBefore(k, m);
		}
		

	};
	(function(){

		//设置发送埋点请求前获得的数据
		function commit( type , htmdEvt){

			var href = window.location.href;

			if( type == 'click'){
				fData.evt = clickList[ htmdEvt ];   
				fData.evt.type = '3';
				fData.evt.ctime = md.time.getTime(); 
				fData.st = fData.evt.ctime - param.time.nTime;
			}
			else{

				var pList = md.util.clone( pathList ),
					hrefPath;
				//找到当前页面在pathList中的那一条
				if( href == 'wap.chtfund.com'){
					hrefPath = pList['index/views/index.html'];
				}
				else if( href == 'wap.chtwm.com'){
					hrefPath = pList['/mobilePage/views/homePage.html'];
				}
				else{
					hrefPath = pList[window.location.pathname];
				}

				//添加当前时间戳
				hrefPath.ctime = md.time.getTime(); 

				if( type == 'onload'){

					//分别设置事件type
					hrefPath.type = '1';

					hrefPath.topic = "进入" + hrefPath.topic;
					
					//fData.evt = evtList['load'];
					//fData.evt.ctime = md.time.getTime();
					fData.st = 0; //初次进入页面，st为0
				}
				else if( type == 'onbeforeunload'){

					//分别设置事件type
					hrefPath.type = '2';
					hrefPath.topic = "离开" + hrefPath.topic;
					//fData.evt = evtList['beforeunload'];
					//fData.evt.ctime = md.time.getTime();
					fData.st = hrefPath.ctime - param.time.nTime;
				}
				fData.evt = hrefPath;
			}

			//app或wap时
			if( param.tm == 3 || param.tm == 2){
				fData.evt.info = h5Info(href,htmdEvt,type);
			}
			// fData.evt = hrefPath;
			
			(fData.sstat === '') && ( fData.sstat = md.cookie.get('uvid') + '_' + md.time.getTime() + '_' + param.scout );
			fData.scroll = md.json.common.scroll;

			fData.evt = JSON.stringify(fData.evt);
			//发送请求
			md.log.commit();
		}

		window.onload = function () {
			//所有dom结构处理完毕,发送一次请求
			(md.json.common.scroll != 0) && (md.json.common.scroll = 0);
			commit( 'onload' );
		};

		window.onbeforeunload = function () {
			//离开页面，获取当前时间，得到页面停留时长
			commit( 'onbeforeunload' );
		};


		window.onscroll = function () {
			//页面滚动，滚动次数+1
			md.json.common.scroll++;
		};

		function getParentTag(startTag, parentTagList = []) {
		// 传入标签是否是DOM对象
			if (!(startTag instanceof HTMLElement)) return console.error('receive only HTMLElement');
			// 父级标签是否是body,是着停止返回集合,反之继续
				if ('BODY' !== startTag.parentElement.nodeName) {
					// 放入集合
					parentTagList.push(startTag.parentElement)
				// 再上一层寻找
				return getParentTag(startTag.parentElement, parentTagList)
			}
			// 返回集合,结束
			else return parentTagList;
		}

		function clickEvent( event ){

			event = event || window.event; 
			var target = event.target || event.srcElement; 
			// 获取目标元素，如果有htmdEvt属性，拿到evt列表中对应的数据，并提交一次埋点请求
			var htmdEvt = target.getAttribute('htmdEvt'); 
			// event.stopPropagation()
			// if(!htmdEvt){
			// 	target = target.parentNode;
			// 	htmdEvt = target.getAttribute('htmdEvt');
			// }
			if(!htmdEvt){
				var parentTagList = getParentTag(target);
				for(i = 0; i < parentTagList.length; i++){
					if(!!parentTagList[i].getAttribute('htmdEvt')){
						htmdEvt = parentTagList[i].getAttribute('htmdEvt');
					}
					
				}
				
			}
			if( !!htmdEvt ){
				commit( 'click', htmdEvt);
			}
		}

		//点击事件监听，使用事件代理的方式绑定到body上

		var body = document.getElementsByTagName("body")[0]; 

		if( window.Zepto || window.jQuery ){
			$('body').on("tap", '[htmdEvt]', function(event) {
				clickEvent(event);
			});
		}
		else if( window.mui){
			mui('body').on("tap", '[htmdEvt]', function(event) {
				clickEvent(event);
			});
		}
		else{
			body.addEventListener('click', function (event) { 
				clickEvent(event);
			}) 
		}
		
		
	})();

	//_htmd方法为外部调用
	//需传参tm-终端，pf-平台
	// window._htmd = function( tm, pf, envMd){

		param.tm = tm;
		param.pf = pf;
		param.env = !!envMd ? envMd : window.env;

		md.util.domainUrl();

		//执行pf.domain方法，设置cookie需要的域名
		md.pf.domain( pf );

		//设置uvid
		var uvid = md.num.getRandom();
		//如果cookie里没有uvid，重新设置一个
		if(!md.cookie.get('uvid') ){
			md.cookie.set( 'uvid', uvid );
		}

		//获取其他埋点文件
		md.file.get( tm , pf);
		//判断当前终端所需要提供的所有参数，设置给fData
		md.tm.getData( tm );
		//获取此处可以直接设置的参数值
		md.log.getData();
		

	}

})();



