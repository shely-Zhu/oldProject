//function getNoticeId(name){

	//var contentId = name;
    var splitUrl = function(){

        var arg = [],
                url = [],
                path = window.location.href;

        //如果path中没有?，获取url会报错，所以要先判断一下
        if(path.indexOf('?') != -1){
            //有?的情况
            url = path.split("?")[1].split("&");
        }

        //循环url，设置arg
        for(var i = 0; i < url.length; i++){
           arg[url[i].split("=")[0]] = url[i].split("=")[1];
        }

        return arg;

    };

	var notice = {

        contentId:"",//入参获取

        getData:function(){
        	var that=this;

            var num = splitUrl();

            that.contentId = decodeURIComponent(num['id']);

            if(decodeURIComponent(num['type']) == "app"){

                $(".app").hide();

            }
            else{
                $(".app").show();
            }

    		$.ajax({
    		    url: http_url + "/api/app/ginkgo/RRById.action",
                
    		    data: 
    		    	JSON.stringify({
					    "hmac":"", //预留的加密信息
					    "params":{//请求的参数信息
							"id":that.contentId,//内容ID
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

    		    	if (data.status == "0") {//成功

    		    		var result = data.data;

    		    		//console.log(JSON.stringify(result));

    		    		$(".title").html(result.title);//title
                        $("#time").html(result.releaseDateString);//releaseDate
                        $("#resource").html(result.source);//source
    		    		$(".content").html(result.content);//内容区

    		    	} else {//失败

    		    		console.log("接口请求失败status=1");

    		    	}
    		    },
    		    error: function() {
    		    	console.log("ajax error");//ajax error
    		    },
	 			xhrFields: {   
				    withCredentials: true 
			    }
    		});

        },

	}
	//调用数据
	notice.getData();


//}