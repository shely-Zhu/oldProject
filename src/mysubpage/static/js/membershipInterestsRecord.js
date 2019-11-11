require('../../../include/js/vendor/mui/mui.picker.min.js');


$(function(){
    var regulatory = {
        webinit:function(){
			var that = this;

			that.getData();
			//
			// that.events();

        },
            //数据初始化
		getData:function(){
            mui("#mui-progressbar").progressbar({progress:20}).show();

	       


		},
    }
    //调用函数
	regulatory.webinit();
})