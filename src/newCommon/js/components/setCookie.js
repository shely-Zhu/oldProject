/*module.exports = function setCookie(name, value){
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 365 * 24 * 3600 * 1000);   
	document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
}*/
module.exports = function setCookie(c_name, value, expiredays){
	var exdate = new Date();                   
    exdate.setDate(exdate.getDate() + expiredays);                   
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/";
}