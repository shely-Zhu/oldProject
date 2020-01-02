// JavaScript Document
function butelVideoPlayerInit( divName, paramObject ){
	var p = navigator.platform;	
	paramObjectForReset = paramObject;
	
	/*开发网汇报地址*/
	//paramObject.playerReportUrl="http://103.25.23.117:8088/reportFlashMsg";
	
	/*现网汇报地址 */
	paramObject.playerReportUrl="http://stat.homecdn.com:8088/reportFlashMsg";
	
	if( p.indexOf("Win") == 0 || p.indexOf("Mac") == 0 || p == "X11" ){//PC
		butelVideoPCPlayerInit( divName, paramObject );
	}
	else{
		butelVideoH5PlayerInit( divName, paramObject );
	}
}
function butelVideoPCPlayerInit( divName, paramObject ){
	var params = { allowfullscreen: "true",allowscriptaccess: "always", wmode: "opaque" };
	var swfwidth = paramObject.width;
	var swfheight = paramObject.height;
	var divForPlayer = document.getElementById( divName );
	if( !divForPlayer )return;

	//如果传入的不是div 替换为div
	if((divForPlayer.tagName).toLowerCase() != 'div'){
		try{
			divForPlayer.src = "";
		}catch(e){
			
		}
		
		var parent = divForPlayer.parentNode;
		var div = document.createElement("div");
		div.id = divName;
		parent.insertBefore(div, divForPlayer);
		parent.removeChild(divForPlayer);
		divForPlayer = div;
	}


	divForPlayer.innerHTML = '<div id="liveStream"><a href="https://get.adobe.com/flashplayer/?loc=cn"><img src="http://103.25.23.86/butelnetphone/live/play.png"/></a></div>';
	if( paramObject.SD )paramObject.SD = paramObject.SD.replace( "&", "$$$$" );
	if( paramObject.HD )paramObject.HD = paramObject.HD.replace( "&", "$$$$" );
	if( paramObject.LD )paramObject.LD = paramObject.LD.replace( "&", "$$$$" );
	if( paramObject.AD )paramObject.AD = paramObject.AD.replace( "&", "$$$$" );
	if( paramObject.setrecordfragments )paramObject.setrecordfragments = paramObject.setrecordfragments.replace( "&", "$$$$" );
	
	var _path = butelUtil.getScriptPath(["butelVideoPlayer"]);   //  butelVideoPlayer为 网页引用js文件的名称 ,_path为此js文件的路径
	paramObject._swfPath = _path + 'playerModule';               // swf模块文件的路径
	swfobject.embedSWF(_path + 'VideoPlayer7.2.17.1.swf', "liveStream", swfwidth, swfheight, "11.2.0", "expressInstall.swf", paramObject, params); //swf入口文件的路径
	
	butelPlayerName = divName;
}
var butelPlayerName;
var butelPoster; //从标签里提取出来的poster
function butelVideoPlayerBarrage( txt ){
	liveStream.barrageText( txt );
}

var butelPlayerVersion = "6.4.17.1";
showLog( "butelPlayerVersion:" + butelPlayerVersion );

 


var isDebugMode = true;//调试模式

var butelPlayerLoadTime = new Date();

function butelVideoH5PlayerInit( divName, paramObject ){
	var playerContainer = document.getElementById( divName );
	if( !playerContainer )return;
	butelPlayerName = divName;

	//从标签里取poster
	var poster = playerContainer.attributes['poster'];
	if(poster){
		butelPoster = poster['nodeValue'];
	}

	//如果传入的不是div 替换为div
	if((playerContainer.tagName).toLowerCase() != 'div'){
		try{
			playerContainer.src = "";
		}catch(e){
			
		}
		var parent = playerContainer.parentNode;
		var div = document.createElement("div");
		div.id = divName;
		parent.insertBefore(div, playerContainer);
		parent.removeChild(playerContainer);
	}


	setAttributes( paramObject );
	initPlayerDiv( paramObject.width, paramObject.height );
	

	
	
	if( paramObject.playerReportUrl ){//创建汇报工具
		addReportImg();
	}
	
	try{
		if( paramObject.playerReportUrl )reportLoad( paramObject );
	}
	catch( e ){
		showLog( "汇报加载事件异常" );
	}
	playMovie();
}

function addReportImg(){
	if(document.getElementById( 'reportImg' )){
		return;
	}
	var img = document.createElement("img");
	img.id = 'reportImg';
	img.src = '';
	img.setAttribute('style', "display:none");
	
	document.body.appendChild(img);
	
}

function butelVideoResetSource( url ){
	
	//汇报相关状态重置
	butelPlayerLoadTime = new Date();
	reportLogCount = 0;
	isPaused = false;
	firsDataComeTime = null;
	seekPlayTime = null;
	isSeeking = null;
	playingTimeBeforeSeek = null;
	
	playingReportTimes = 0;
	firstPlayTime = 0;
	lockTimes = [];
	seek_count = 0;
	lock_count = 0;
	
	var video = document.getElementById( 'liveStream' );
	if(video){
		video.src = '';
		video = null;
	}
	var img = document.getElementById( 'reportImg' );
	if(img){
		img.src = '';
		img = null;
	}

	var playerContainer = document.getElementById( butelPlayerName );
	if(playerContainer){
		playerContainer.innerHTML = "";
	}
	paramObjectForReset.HD = null;
	delete paramObjectForReset.HD;
	paramObjectForReset.LD = null;
	delete paramObjectForReset.LD;
	paramObjectForReset.SD = url
	butelVideoSettings = {};
	butelVideoPlayerInit( butelPlayerName, paramObjectForReset );
}

var butelVideoSettings = {};
var isM3u8;
var paramObjectForReset;

function initPlayerDiv( videowidth, videoheight ){
	var divForPlayer = document.getElementById( butelPlayerName );
	
	if( !videowidth ){
		showLog( "必填参数缺损" );
		return;
	}
	var str = '<video id="liveStream" style="background-color:#000000;" ';
	if(  ( typeof( videowidth ) == "string" ) ){
		str += 'width="' + videowidth + '" ';
		str += 'height="' + videoheight + '" ';
	}
	else{
		str += 'width="' + videowidth + 'px" ';
		str += 'height="' + videoheight + 'px" ';
	}

    var mediaUrl = butelVideoSettings.usingUrl;
    if(mediaUrl.indexOf( "?" ) >= 0){
        mediaUrl+= '&';
    }else{
        mediaUrl+= '?';
    }
    mediaUrl += 'from=' +  Browser.client.openType + "&os=" + Browser.client.OSType + '&phonetype=' + Browser.client.deviceTypeName;


    str += 'src = "' + mediaUrl + '" ';
	isM3u8 = butelVideoSettings.usingUrl.toLocaleLowerCase().indexOf( ".m3u8" ) >= 0;
	if( isM3u8 ){
		str += 'type="application/x-mpegURL" ';
	}
	else{
		str += 'type="video/mp4" webkit-playsinline ';
	}
	if( butelVideoSettings.autoplay )str += 'autoplay ';

	//设置poster 参数传入的优先
	if(butelVideoSettings.poster){
		str += ' poster=" ' + butelVideoSettings.poster + ' " ';
	}else{
		if(butelPoster){
			str += ' poster=" ' + butelPoster + ' " ';
		}
	}

	str += 'controls onprogress="dataCome()" onseeking="seekStart()" onseeked="seekEnd()" onplaying="playingBegin()" onpause="onVideoPause()" onplay="onVideoPlay()" ontimeupdate="onTimeUpDate()" onemptied="onMediaError()" onerror="onPlayError()"></video>';
	divForPlayer.innerHTML = str;
}

function haveIsTrue( value, defaultValue ){//根据传入值，得到一个符合要求的布尔值
	if( value === true || value == "true" )return true;
	else if( value === false || value == "false" )return false;
	else if( defaultValue === true )return true;
	return false;
}

function showLog( str ){
	console.log( str );
}

function setAttributes( obj ){
	butelVideoSettings.width = obj.width;
	
	butelVideoSettings.fsButton = haveIsTrue( obj.fsButton, true );
	butelVideoSettings.logoButel = haveIsTrue( obj.logoButel, true );
	butelVideoSettings.dbClick = haveIsTrue( obj.dbClick );
	
	if( obj.AD ){//广告
		butelVideoSettings.AD = obj.AD;
		butelVideoSettings.adTime = 30;
		if( obj.adTime > 0 )butelVideoSettings.adTime = obj.adTime;
		butelVideoSettings.allowSkipAD = haveIsTrue( obj.allowSkipAD );
	}
	
	butelVideoSettings.HD = obj.HD;
	butelVideoSettings.SD = obj.SD;
	butelVideoSettings.LD = obj.LD;
	
	butelVideoSettings.firstChoise = 0;
	if( obj.firstChoise == 1 || obj.firstChoise == 2 ) butelVideoSettings.firstChoise = obj.firstChoise;
	
	butelVideoSettings.ctype = 3;
	if( obj.ctype == 1 || obj.ctype == 2 )butelVideoSettings.ctype = obj.ctype;
	
	butelVideoSettings.autoplay = haveIsTrue( obj.autoplay, true );
	butelVideoSettings.loop = haveIsTrue( obj.loop );
	
	butelVideoSettings.waterMark = obj.waterMark;
	
	butelVideoSettings.playerReportUrl = obj.playerReportUrl;	
	if( obj.reportCurrentTime )butelVideoSettings.reportCurrentTime = obj.reportCurrentTime;
	
	butelVideoSettings.businessID = obj.businessID;
	butelVideoSettings.userName = obj.userName;
	//butelVideoSettings.openType = obj.openType;

	butelVideoSettings.poster = obj.poster;

	chooseUsingUrl();
	if( isDebugMode )showLogAll( obj );
}

function showLogAll( obj ){
	showLog( "打印配置项：" );
	showLog( "width：传入值＝" + obj.width );
	showLog( "height：传入值＝" + obj.height );
	showLog( "AD：传入值＝" + obj.AD + ",生效值＝" + butelVideoSettings.AD );
	showLog( "adTime：传入值＝" + obj.adTime + ",生效值＝" + butelVideoSettings.adTime );
	showLog( "allowSkipAD：传入值 = " + obj.allowSkipAD + ",生效值＝" + butelVideoSettings.allowSkipAD );
	showLog( "SD：传入值＝" + obj.SD + ",生效值＝" + butelVideoSettings.SD );
	showLog( "HD：传入值＝" + obj.HD + ",生效值＝" + butelVideoSettings.HD );
	showLog( "LD：传入值＝" + obj.LD + ",生效值＝" + butelVideoSettings.LD );
	showLog( "firstChoise：传入值＝" + obj.firstChoise + ",生效值＝" + butelVideoSettings.firstChoise );
	showLog( "ctype：传入值＝" + obj.ctype + ",生效值＝" + butelVideoSettings.ctype );
	showLog( "autoplay：传入值＝" + obj.autoplay + ",生效值＝" + butelVideoSettings.autoplay );
	showLog( "loop：传入值＝" + obj.loop + ",生效值＝" + butelVideoSettings.loop );
	showLog( "dbClick：传入值＝" + obj.dbClick + ",生效值＝" + butelVideoSettings.dbClick );
	showLog( "fsButton：传入值＝" + obj.fsButton + ",生效值＝" + butelVideoSettings.fsButton );
	showLog( "logoButel：传入值＝" + obj.logoButel + ",生效值＝" + butelVideoSettings.logoButel );
	showLog( "renderAccelerate：传入值＝" + obj.renderAccelerate + ",生效值＝" + butelVideoSettings.renderAccelerate );
	showLog( "waterMark：传入值＝" + obj.waterMark + ",生效值＝" + butelVideoSettings.waterMark );
	showLog( "playerName：传入值＝" + obj.playerName + ",生效值＝" + butelVideoSettings.playerName );
	showLog( "playerReportUrl：传入值＝" + obj.playerReportUrl + ",生效值＝" + butelVideoSettings.playerReportUrl );
	showLog( "retryStream：传入值＝" + obj.retryStream + ",生效值＝" + butelVideoSettings.retryStream );
	showLog( "reportCurrentTime：传入值＝" + obj.reportCurrentTime + ",生效值＝" + butelVideoSettings.reportCurrentTime );
	showLog( "businessID：传入值＝" + obj.businessID + ",生效值＝" + butelVideoSettings.businessID );
	showLog( "userName：传入值＝" + obj.userName + ",生效值＝" + butelVideoSettings.userName );
	//showLog( "openType：传入值＝" + obj.openType + ",生效值＝" + butelVideoSettings.openType );
	showLog( "***********************************" );
}

function chooseUsingUrl(){
	var urlCount;
	if( butelVideoSettings.SD ){
		urlCount ++;
		butelVideoSettings.usingUrl = butelVideoSettings.SD;
	}
	if( butelVideoSettings.HD ){
		urlCount ++;
		if( !butelVideoSettings.usingUrl )butelVideoSettings.usingUrl = butelVideoSettings.HD;
	}
	if( butelVideoSettings.LD ){
		urlCount ++;
		if( !butelVideoSettings.usingUrl )butelVideoSettings.usingUrl = butelVideoSettings.LD;
	}
	if( urlCount == 1 ){
		butelVideoSettings.hasOnlyUrl = true;
		return;
	}

	if( butelVideoSettings.firstChoise == 0 && butelVideoSettings.SD ) butelVideoSettings.usingUrl = butelVideoSettings.SD;
	else if( butelVideoSettings.firstChoise == 1 && butelVideoSettings.HD ) butelVideoSettings.usingUrl = butelVideoSettings.HD;
	else if( butelVideoSettings.firstChoise == 2 && butelVideoSettings.LD ) butelVideoSettings.usingUrl = butelVideoSettings.LD;
	
	//对于传了两个地址用逗号拼接的情况，在手机上优先选m3u8
	if( butelVideoSettings.usingUrl.indexOf( "," ) >= 0 ){
		var urlsArray = butelVideoSettings.usingUrl.split( "," );
		for( var i = 0; i < urlsArray.length; i++ ){
			if( urlsArray[i].toLowerCase().indexOf( ".mp4" ) > 0 ){
				butelVideoSettings.usingUrl = urlsArray[i];
			}
			else if( urlsArray[i].toLowerCase().indexOf( ".m3u8" ) > 0 ){
				butelVideoSettings.usingUrl = urlsArray[i];
				break;
			}
		}
	}
}

function playMovie(){
	if( butelVideoSettings.autoplay ){
		beginPlayTime = new Date();
	}
}

function onTimeUpDate(){	
	if( butelVideoSettings.playerReportUrl ){
		countLock();
		if( !playHasStarted ){
			
			try{
				reportPlayStart();
				startPlayingReport();
				playHasStarted = true;
			}
			catch(e){
				playHasStarted = false;
				showLog( "汇报开始事件异常" );
			}
		}
	}
}

function listStreams(list, container) {
	for(var i=0; i<list.length; i++) { var entry = document.createElement("li");
		entry.innerHTML = "<a href='#' onclick='return loadStream(\""+list[i].file+"\")'>"+list[i].title+"</a>";
		document.getElementById(container).appendChild(entry);
	}
}
function userSubmit() {
   loadStream(document.getElementById('userInput').value);
}
function loadStream(url) {
	$('video')[0].player.setSrc(url);
	$('video')[0].player.play();
}

function onMediaError(){
	console.log( "haha" );
	onPlayError();
}

function onPlayError(){
	console.log( "hehe" );
//	var divForPlayer = document.getElementById( butelPlayerName );
//	var str = '<div style="align-content:center;color:#888;width:' + butelVideoSettings.width + 'px;height:' + butelVideoSettings.height + 'px"></div>';
//	divForPlayer.innerHTML = str;
}
/**************************************************************************************************************************************/
//以下，为统计汇报相关
var OperationGUID;
var butelPlayerUid;
var playerReportUrl;
var playHasStarted;
var reportLogCount = 0;
var xmlHead = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<flash>\n<version>1</version>\n<type>2</type>\n<flashMsg>";
var xmlEnd = "\n</flashMsg>\n</flash>";
function reportLoad( paramObject ){
	playerReportUrl = paramObject.playerReportUrl;
	OperationGUID = "" + new Date().getTime() + Math.floor( Math.random() * 89999 + 10000 );
	butelPlayerUid = getCookie( "butelPlayerUid" );
	if( !butelPlayerUid  ){
		butelPlayerUid = OperationGUID;
		setCookie( "butelPlayerUid", butelPlayerUid );
	}
	var obj = reportHead();
	obj.businessID = butelVideoSettings.businessID;
	obj.userName = butelVideoSettings.userName;
	obj.openType = Browser.client.openType;
	obj.startTime = getTimeFormatString( butelPlayerLoadTime );
	obj.loadDuration = new Date().getTime() - butelPlayerLoadTime.getTime();
	
	//var osString = Browser.client.OS;
	obj.OSType = Browser.client.OSType;//osString.substr( 0, osString.indexOf( " " ) );
	obj.OSVersion = Browser.client.OSVersion;//osString.split( " " ).join( "_" );
	obj.playerSDKType = "H5";
	obj.playerSDKVersion = butelPlayerVersion;
	obj.browserVersion = Browser.client.name + "_" + Browser.client.version;
	obj.deviceTypeName = Browser.client.deviceTypeName;
	obj.networkType = navigator.connection ? navigator.connection.type : "unknown";
	
	obj.time = reportTimeStringify();
	reportToServer( "LoadPlayer", obj );
}
function setCookie(name, value){var expdate = new Date();expdate.setTime(expdate.getTime() + 365 * 24 * 3600 * 1000);	document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";}
function getCookie(c_name){if (document.cookie.length>0){c_start=document.cookie.indexOf(c_name + "=");if (c_start!=-1){ c_start=c_start + c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if (c_end==-1) c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));}};return "";}
function getTimeFormatString( date ){
	if( !date )date = new Date;
	return "" + date.getFullYear() + timeStringAddZero( date.getMonth() + 1, 2 ) + timeStringAddZero( date.getDate(), 2 ) + timeStringAddZero( date.getHours(), 2 ) + timeStringAddZero( date.getMinutes(), 2 ) + timeStringAddZero( date.getSeconds(), 2 );
}
function reportTimeStringify(){
	var date = new Date;
	return "" + date.getFullYear() + "-" + timeStringAddZero( date.getMonth() + 1, 2 ) + "-" + timeStringAddZero( date.getDate(), 2 ) + "-" + timeStringAddZero( date.getHours(), 2 ) + ":" + timeStringAddZero( date.getMinutes(), 2 ) + ":" + timeStringAddZero( date.getSeconds(), 2 ) + ":" + timeStringAddZero( date.getMilliseconds(), 3 );
}
function timeStringAddZero( num, stringNumbers ){
	var numString = "" + num;
	while( numString.length < stringNumbers )numString = "0" + numString;
	return numString;
}
function reportHead( subType ){
	var obj = {};
	obj.subType = subType ? subType : "c_s";
	obj.uid = butelPlayerUid;
	obj.operationGUID = OperationGUID;
	obj.logIndex = reportLogCount++;
	return obj;
}
function reportPlayStart( offset ){
	var obj = reportHead( offset ? "seek" : "start" );
	obj.ctype = butelVideoSettings.ctype;
	obj.url = butelVideoSettings.usingUrl;
	if( offset ){
		obj.startTime = playingTimeBeforeSeek ? Math.round( playingTimeBeforeSeek * 1000 ) : 0;
		obj.playTime = Math.round( seekPlayTime * 1000 );
		obj.firstPicDuration = new Date().getTime() - beginPlayTime.getTime();
		obj.fisrtDataDuration = ( firsDataComeTime ? firsDataComeTime.getTime() : new Date().getTime() ) - beginPlayTime.getTime();
		obj.offset = document.getElementById( "liveStream" ).currentTime + "s";
	}
	else{
		obj.startTime = 0;
		obj.playTime = 0;
		obj.firstPicDuration = new Date().getTime() - beginPlayTime.getTime();
		obj.fisrtDataDuration = ( firsDataComeTime ? firsDataComeTime.getTime() : new Date().getTime() ) - beginPlayTime.getTime();
		obj.offset = 0 + "s";
	}
	obj.result = 0;	
	obj.businessID = butelVideoSettings.businessID;
	obj.time = reportTimeStringify();
	reportToServer( "play", obj );
}

var isPaused = false;
var pauseStartTimeOut;
function onVideoPause(){
	pauseStartTimeOut = setTimeout( delayForPause, 50 );
}

function delayForPause(){
	reportTogoPause( true );
}

function onVideoPlay(){
	if( isPaused )reportTogoPause( false );
}

function reportTogoPause( isPause ){
	if( !butelVideoSettings.playerReportUrl )return;
	isPaused = isPause;
	var obj = reportHead( isPause ? "pause" : "start" );
	obj.ctype = butelVideoSettings.ctype;
	obj.url = butelVideoSettings.usingUrl;
	
	var currentTime = document.getElementById( "liveStream" ).currentTime;
	obj.startTime = Math.round( currentTime * 1000 );
	obj.playTime = obj.startTime;
	obj.firstPicDuration = 0;
	obj.fisrtDataDuration = 0;
	obj.offset = currentTime + "s";
	
	obj.result = 0;	
	obj.businessID = butelVideoSettings.businessID;
	obj.time = reportTimeStringify();
	reportToServer( "play", obj );
}

var beginPlayTime;
var firsDataComeTime;
var seekStartTime;
var seekPlayTime;
var isSeeking;
var playingTimeBeforeSeek;
function dataCome(){
	if( firsDataComeTime )return;
	firsDataComeTime = new Date();
}
function seekStart(){
	beginPlayTime = new Date();
	firsDataComeTime = null;
	isSeeking = true;
	clearTimeout( pauseStartTimeOut );//如果之前有pause事件发生，则阻止pause事件汇报
}
function seekEnd(){
	seek_count++;
	try{
		lastPlayingTime = NaN;
		lastTimeStamp = NaN;
		seekPlayTime = document.getElementById( "liveStream" ).currentTime;
		if( playerReportUrl )reportPlayStart( true );
	}
	catch(e){
		showLog( "汇报拖动事件异常" );
	}
	isSeeking = false;
}
function reportToServer( eventString, obj ){	
	var str = xmlHead;
	str += "[" + eventString + "]";
	str += stringify( obj );
	str += xmlEnd;
	
	document.getElementById( "reportImg" ).src = playerReportUrl + "?" + str;
	
	if( isDebugMode )showLog( "向服务器汇报统计数据" + str );
}
var xmlHead = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<flash>\n<version>1</version>\n<type>2</type>\n<flashMsg>";
var xmlEnd = "\n</flashMsg>\n</flash>";
function stringify( obj ){
	var str = "[subType=" + obj.subType;
	delete obj.subType;
	for( var objItem in obj ){
		str += " " + objItem + "=" + obj[objItem];
	}
	str += "]";
	return str;
}
function state_Change(e){
	if(e.currentTarget.readyState == 4){
		if( isDebugMode )showLog( "接口返回：" + e.currentTarget.responseText );
	}
}
var lastPlayingTime,lastTimeStamp;
function countLock(){
	var nowPlayingTime = document.getElementById( "liveStream" ).currentTime;
	var nowTimeStamp = new Date().getTime();
	if( nowTimeStamp - lastTimeStamp > 500 ){//相邻两次发生视频帧频事件的时间，间隔大于500毫秒
		var tampLockTime = Math.abs( nowTimeStamp - lastTimeStamp - ( parseFloat(nowPlayingTime) - parseFloat( lastPlayingTime ) ) * 1000 );
		if( tampLockTime > 200 ){//且两次视频帧频事件的间隔时间，减去两帧视频的时间，差值大于200毫秒，则可以判定为发生了卡顿
			if( isDebugMode )showLog( "卡顿，时长(毫秒)：" + Math.floor( tampLockTime ) );
			var ar = [];
			ar[0] = lastPlayingTime;
			ar[1] = tampLockTime;
			ar[2] = getTimeFormatString( new Date() );
			lockTimes.push( ar );
		}
	}
	if( !isSeeking )playingTimeBeforeSeek = lastPlayingTime ? lastPlayingTime : playingTimeBeforeSeek;//如果不在seek中，则记录时间，之后作为seek动作的startTime
	lastPlayingTime = nowPlayingTime;
	lastTimeStamp = nowTimeStamp;
}
function playingBegin(){
	lastPlayingTime = NaN;
	lastTimeStamp = NaN;
	beginPlayTime = new Date();
}
var playingReportTimes = 0;
var playingReportTimeoutId;
var firstPlayTime;
var lockTimes = [];
function startPlayingReport(){
	playingReportTimeoutId = setTimeout( reportPlaying, 10000 );
	firstPlayTime = new Date().getTime();
}
var seek_count = 0;
var lock_count = 0;
function reportPlaying(){
	playingReportTimes++;
	clearTimeout( playingReportTimeoutId );
	var timeoutDeley;
	if( playingReportTimes <= 6 )timeoutDeley = 10000;
	//else if( playingReportTimes <= 10 )timeoutDeley = 60000;
	else timeoutDeley = 60000;
	playingReportTimeoutId = setTimeout( reportPlaying, timeoutDeley );
	//asdasd
	var obj = reportHead();
	obj.ctype = butelVideoSettings.ctype;
	obj.url = butelVideoSettings.usingUrl;
	var lockInfoString = "";
	for( var i = 0; i<lockTimes.length; i++ ){
		lockInfoString += lockTimes[i][0] + "_" + lockTimes[i][1] + "_" + lockTimes[i][2] + ( i == lockTimes.length - 1 ? "" : "," );
	}
	obj.lockCountInner = lockTimes.length;
	obj.lockInfo = lockInfoString;
	obj.duration = ( new Date().getTime() - firstPlayTime ) / 1000;
	lock_count += lockTimes.length;
	obj.seekCount = seek_count;
	obj.lockCount = lock_count;
	obj.time = reportTimeStringify();
	obj.businessID = butelVideoSettings.businessID;
	reportToServer( "playlock", obj );
	if( isDebugMode )showLog( "卡顿次数" + lockTimes.length );
	lockTimes = [];
}

/***************************************************************************************************************************************/
//以下为常用工具类
var butelUtil = butelUtil || (function(){
	
	util = {};
	//获取标签的路径
	util.getScriptPath = function(scriptNames) {
		var
			i = 0,
			j,
			codePath = '',
			testname = '',
			slashPos,
			filenamePos,
			scriptUrl,
			scriptPath,			
			scriptFilename,
			scripts = document.getElementsByTagName('script'),
			il = scripts.length,
			jl = scriptNames.length;
			
		// go through all <script> tags
		for (; i < il; i++) {
			scriptUrl = scripts[i].src;
			slashPos = scriptUrl.lastIndexOf('/');
			if (slashPos > -1) {
				scriptFilename = scriptUrl.substring(slashPos + 1);
				scriptPath = scriptUrl.substring(0, slashPos + 1);
			} else {
				scriptFilename = scriptUrl;
				scriptPath = '';			
			}
			
			// see if any <script> tags have a file name that matches the 
			for (j = 0; j < jl; j++) {
				testname = scriptNames[j];
				filenamePos = scriptFilename.indexOf(testname);
				if (filenamePos > -1) {
					codePath = scriptPath;
					break;
				}
			}
			
			// if we found a path, then break and return it
			if (codePath !== '') {
				break;
			}
		}
		
		// send the best path back
		return codePath;
	};
	
	return util;
})();

/***************************************************************************************************************************************/
//以下为浏览器检测工具
var Browser = Browser || (function (window) {
    var document = window.document,
            navigator = window.navigator,
            agent = navigator.userAgent.toLowerCase();
    System = {};

    System.agent = agent;

    //系统类型
    System.OSType = "unknown";
    //系统版本
    System.OSVersion = "unknown";
    //设备名字
    System.deviceTypeName = "unknown";
    //是否为PC
    System.isPC = true;
    //打开的环境
    System.openType = 'browser';
	
    //系统检测
    System.checkOS = function(){

        //windows
        if(agent.indexOf("windows nt") > 0){
            var index = agent.indexOf("windows nt");
            var str = agent.slice(index, index+20);
            var arr = str.split(";");
            var os = arr[0];

            System.OSVersion = os.split(" ").join( "_" );
            System.OSType = "windows";
            return;
        }

        //Android
        if(agent.indexOf("android") > 0){
            var index = agent.indexOf("android");
            var str = agent.slice(index, index+20);
            var arr = str.split(";");
            var os = arr[0];
            System.OSVersion = os.split(" ").join( "_" );
            System.OSType = "android";
            return;
        }

        // ios
        if(agent.indexOf("like mac os x") > 0){
            //ios
            var regStr_saf = /os [\d._]*/gi ;
            var verinfo = agent.match(regStr_saf) ;
            var version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
            System.OSVersion = "ios_"+version;
            System.OSType = "ios";
            return
        }

        //mac os
        if(agent.indexOf("mac os") > 0){
            var index = agent.indexOf("mac os");
            var str = agent.slice(index, index+20);
            var arr = str.split(")");
            var os = arr[0];

            System.OSVersion = os.split(" ").join( "_" );
            System.OSType = "mac_os";
            return;
        }

    };

    //设备名称检测
    System.checkDevice = function(){

        //iphone
        if(agent.indexOf("iphone") > 0){

            System.deviceTypeName = "iphone";
            return;
        }

        //ipad
        if(agent.indexOf("ipad") > 0){
            System.deviceTypeName = "ipad";
            return;
        }

        //Android系统各种手机
        if(agent.indexOf("build") > 0){
            var index = agent.indexOf("build");
            var str = agent.slice(0, index);
            var arr = str.split(";");

            var deviceTypeName = arr[arr.length-1];

            var temp = deviceTypeName.split(" ").join( "" );

            if(temp){
                System.deviceTypeName = deviceTypeName.split(" ").join( "" );

            }else{
                var temp2 = arr[arr.length-2];
                if(temp2){
                    System.deviceTypeName = temp2.split(" ").join( "" );
                    return;
                }
            }
            return;
        }
    };

    //检测是否为PC
    System.checkIsPC = function(){
        if(agent.indexOf("mobile") > 0){
            System.isPC = false;
        }
    };

    //匹配 获得版本号
    System.matchVersion = function (str) {
        var arr = agent.match(new RegExp(str + "([\\d.]+)")); // 正则里带变量 斜杠 反斜杠需要转义
        if (arr) {
            return arr[1];
        }
        return null;
    };

    //检测浏览器名字和版本号
    System.check = function () {
        //首先判断国产壳

        //QQ浏览器 PC 和 mobile
        if (agent.indexOf("qqbrowser") > 0) {
            //System.version = agent.matchVersion(/qqbrowser\/([\d.]+)/)[1];
            System.version = System.matchVersion("qqbrowser/");
            System.name = "QQ浏览器";
            return;
        }

        //遨游浏览器  PC 和 mobile
        if (agent.indexOf("maxthon") > 0 || agent.indexOf("mxbrowser") > 0 ) {
            //System.version = agent.matchVersion(/maxthon\/([\d.]+)/)[1];
            System.version = System.matchVersion("maxthon/") || System.matchVersion("mxbrowser/");
            System.name = "傲游浏览器";
            return;
        }
        //世界之窗浏览器
        if (agent.indexOf("theworld") > 0) {
            //System.version = agent.matchVersion(/theworld ([\d.]+)/)[1];
            System.version = System.matchVersion("theworld ");
            System.name = "世界之窗浏览器";
            return;
        }

        //搜狗浏览器 PC 和 mobile
        if (agent.indexOf("se 2.x") > 0 || agent.indexOf("sogoumobilebrowser") > 0 ) {
            System.version = System.matchVersion("sogoumobilebrowser/") || "unknown";
            System.name = "搜狗浏览器";
            return;
        }


        //百度浏览器 PC 和 mobile
        if (agent.indexOf("bidubrowser") > 0 || agent.indexOf("baidubrowser") > 0) {
           // System.version = agent.matchVersion(/bidubrowser\/([\d.]+)/)[1]; //|| agent.matchVersion(/baidubrowser\/([\d.]+)/)[1];
            System.version = System.matchVersion("bidubrowser/") || System.matchVersion("baidubrowser/");
            System.name = "百度浏览器";
            return;
        }

        //UC浏览器 PC 和 mobile
        if ( agent.indexOf("ubrowser") > 0  || agent.indexOf("ucbrowser") > 0 ) {
           //System.version = agent.matchVersion(/ubrowser\/([\d.]+)/)[1] || agent.matchVersion(/ucbrowser\/([\d.]+)/)[1];
            System.version = System.matchVersion("ubrowser/") || System.matchVersion("ucbrowser/");
            System.name = "UC浏览器";
            return;
        }

        //2345加速浏览器 PC 和 mobile
        if (agent.indexOf("2345explorer") > 0 || agent.indexOf("mb2345browser") > 0) {
            //System.version = agent.matchVersion(/2345explorer\/([\d.]+)/)[1];
            System.version = System.matchVersion("2345explorer/") || System.matchVersion("mb2345browser/");
            System.name = "2345浏览器";
            return;
        }


        //猎豹浏览器 PC 和 mobile
        if (agent.indexOf("lbbrowser") > 0 || agent.indexOf("liebaofast") > 0) {
            System.version = System.matchVersion("liebaofast/") || "unknown";
            System.name = "猎豹浏览器";
            return;
        }

        //FireFox PC 和 mobile
        if (agent.indexOf("firefox") > 0) {
            //System.version = agent.matchVersion(/firefox\/([\d.]+)/)[1];
            System.version = System.matchVersion("firefox/");
            System.name = "FireFox";
            return;
        }

        //Opera PC 和 mobile
        if (agent.indexOf("opr") > 0 || agent.indexOf("opera.") > 0) {
            System.version = System.matchVersion("firefox");
            //System.version = agent.matchVersion(/opr\/([\d.]+)/)[1] || agent.matchVersion(/opera.([\d.]+)/)[1];
            System.version = System.matchVersion("opr/") || System.matchVersion("opera.");
            System.name = "Opera";
            return;
        }

        //然后判断IE

        //先判断Edge
        //Edge浏览器
        if (agent.indexOf("edge") > 0) {
            //System.version = agent.matchVersion(/edge\/([\d.]+)/)[1];
            System.version = System.matchVersion("edge/");
            System.name = "Edge浏览器";
            return;
        }

        //IE8+支持.返回浏览器渲染当前文档所用的模式
        //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
        //IE10:10(兼容模式7||8||9)
        IEMode = document.documentMode;

        if (IEMode) {
            System.version = IEMode.toString();
            System.name = "IE浏览器";
            return;
        } else {
            //低版本IE判断

            if(agent.indexOf("msie") > 0){
                System.version = System.matchVersion("msie ");
                System.name = "IE浏览器";
            }

        }

        //Safari PC 和 mobile
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") == -1) {
            //System.version = agent.matchVersion(/safari\/([\d.]+)/)[1];
            System.version = System.matchVersion("safari/");
            System.name = "Safari";
            return;
        }

        //Chrome PC 和 mobile
        if (agent.indexOf("chrome") > 0 && agent.indexOf("safari") > 0) {
            //System.version = agent.matchVersion(/chrome\/([\d.]+)/)[1];
            System.version = System.matchVersion("chrome/");
            System.name = "Chrome";
            return;
        }
    };

    //检测打开的环境
	System.checkOpenType = function(){
		if(agent.indexOf("mobile") > 0){
			if (agent.indexOf("micromessenger") > 0){
               //在微信中打开
			    System.openType = "wechat";
             }
            if (agent.indexOf("weibo") > 0) {
               //在新浪微博客户端打开
			   System.openType = "weibo";
            }
		}
	}
	
    System.check();
    System.checkOS();
    System.checkDevice();
    System.checkIsPC();
	System.checkOpenType();

    return {
        client: System
    };

})(window);