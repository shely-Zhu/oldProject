


    // /var httpUrl = "http://192.168.7.155:8080/app/api/app/index/content/h5/h5FindLatestContentByCategory.action";

	var help={

        ajax:function(name){
            $.ajax({
                url: http_url+"/api/app/index/content/h5/h5FindLatestContentByCategory.action",
                data: 
                    JSON.stringify({
                        "hmac":"", //预留的加密信息
                        "params":{//请求的参数信息
                            "category":name,//新手必读 appmustread 注册开户：appregister 投资操作：appinvest
                        }
                    }),
                type: 'POST',
                async : true,
                dataType : "json", 
                contentType: "application/json;charset=utf-8",
                jsonp: "callback",
                jsonpCallback: 'callback',
                crossDomain:true,
                success: function (data) {
                    console.log(JSON.stringify(data));


                    if (data.status == "0") {//成功

                        var result = data.data;

                        //console.log(JSON.stringify(result));

                        $("#" + name).html(result.content);//content

                        if(name="appaboutht"){//如果是关于我们页面，添加title到页面中
                            $("#title").html(result.title);
                        }

                    } else {//失败

                        console.log("接口请求失败status="+data.status+";data.msg="+data.msg);

                    }
                },
                error: function() {
                    console.log("ajax error");//ajax error
                },
                xhrFields: {   
                    withCredentials: true 
                }
            });
        }

	}
	//调用数据



 
