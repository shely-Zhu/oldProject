'use strict';

/**
 * 企金项目，本地访问ip为3000，mock端口号为3089
 *
 * 金服：4000--股份、5000--明泽，mock端口号为4589
 *
 * wap: 8000，mock端口号为8089
 *
 * app: 8008 mock是8088
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),

    webpackConfig = require('./webpack.config.js'),
    webpackList = require('./src/common/js/webpackList.js'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    //删除文件
    del = require('del'), //删除旧版本文件
    through = require('through2'),
    path = require('path'),
    fs = require('fs'),
    os = require('os'),
    minimist = require('minimist'), //命令行替换变量   
    //其他所需文件
    erudaFile = fs.readFileSync('conf/eruda.js', 'utf-8'), //读取eruda.js内容
    CustomEventIeFile = fs.readFileSync('conf/CustomEventIE.js', 'utf-8'), //读取CustomEventIE.js文件内容
    changeLocalHistoryFile = fs.readFileSync('conf/changeLocalHistory.js', 'utf-8'), //读取changeLocalHistory.js内容
    pathVar = require('./conf/pathVar.js'); //打包公用路径配置

// Environment setup 环境设置

/*
*env----代表环境变量
*启动gulp命令的几种方式
*gulp----执行默认操作（gulp --env 0）
*0和1都打包到了dist中，目前1还没有太大的区别，之所有设立1这个变量是为了以后联调环境可能调整的情况下预设的。
*开发人员直接执行gulp命令就行
*运维人员部署需要执行  测试/预生产/生产 三个环境的打包命令 分别是：
*gulp --env 2-----测试
*gulp --env 3-----预生产
*gulp --env 4-----生产

*执行gulp则默认执行  gulp --env 0

* 添加了明泽/股份的默认root.js中envOrigin的打包
* envOrigin， 默认为1，表示股份
*
* 因此环境命令使用变为： 
* * gulp ，此时打包本地股份代码
* * gulp --envOrigin 0, 打包本地明泽代码
* * gulp --env 1, 打包联调股份代码
* * gulp --env 1 --envOrigin 0， 打包联调明泽代码
* * gulp --env 2，打包测试股份代码
* * gulp --env 2 --envOrigin 0， 打包测试明泽代码
* ………………………………类推预生产和生产环境……………………………………………………………………


*/



var knownOptions = {
    string: 'env', //设置环境变量
    default: {
        env: process.env.NODE_ENV || '0', //默认开发环境
        envOrigin: 0 //默认股份 
    }
};

var options = minimist(process.argv.slice(2), knownOptions);

//var options = require('./conf/env.js');

console.log(options.env);

// if( options.env == '0' || options.env == '1'){
if( options.env == '0' ){
    //明泽或股份
    console.log("当前是" + (options.envOrigin == '0' ? '明泽' : '股份'));
}


//获取当前电脑的ip
var localIp = getLocalIp();

function getLocalIp() {
    var osNet = os.networkInterfaces();
    for (var devName in osNet) {
        var iface = osNet[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && (devName == '本地连接' || devName == '以太网')) {
                console.log('当前本地ip：' + alias.address);
                return alias.address;
            }
        }
    }
}



//web本地服务器配置
var host = {
    path: "/dist", //打包文件输出路径目录也是服务器访问的文件目录
    zip_name: "", //用于zip包的压缩文件名
    port: {
        wap: 8008,
        mock: 8088
    }, //端口号配置入口
    ip: localIp, //本地ip
    // ip: '172.16.191.168', //本地ip
    middle: 'middle/',
    //middleCssPath: 'middle/middleCss/' , //打包css文件的备份
    middleHtmlPath: 'middle/middleHtml/', //打包html文件的备份
    middleHtmlPathRev: 'middle/middleHtmlRev/', //打包html文件的备份2
};
//通过环境变量给host.path赋值
if (options.env === '0') {
    //开发环境和联调环境的包进dist
    host.path = 'dist/';

} else if (options.env === '1') {
    //测试环境的包进ht_test
    host.path = 'ht_local/';
    host.zip_name = 'ht_local';

}else if (options.env === '2') {
    //测试环境的包进ht_test
    host.path = 'ht_test/';
    host.zip_name = 'ht_test';

} else if (options.env === '3') {
    //预生产的包进ht_pre_production
    host.path = 'ht_pre_production/';
    host.zip_name = 'ht_pre_production';

} else if (options.env === '4') {
    //生产的包进ht_production
    host.path = 'ht_production/';
    host.zip_name = 'ht_production';
}else if (options.env === '5') {
    //生产的包进ht_production
    host.path = 'dist/';
}


//gulp服务器
gulp.task('connect', function() {
    plugins.connect.server({
        root: host.path,
        port: host.port.wap,
        livereload: true
    });
});


//gulp-mock-server   mock模拟假数据

gulp.task('mock', function() {
    gulp.src('.')
        .pipe(plugins.mockServer({
            //livereload: false,
            host: host.ip,
            directoryListing: true,
            port: host.port.mock,
            open: false,
            //https: true,
            allowCrossOrigin: true
        }));
});

gulp.task('proxyTask', function() {
    plugins.connect.server({
        root: host.path,
        port: host.port.wap,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/wap/pef',  {
                    target: 'http://172.16.191.122:8080',
                    changeOrigin:true,
                    secure: false,
                }),
                proxy('/wap/pof',  {
                    target: 'http://172.16.191.210:8080',
                    changeOrigin:true,
                    secure: false,
                }),
            ]
        }
    });
})

gulp.task('mockProxy', function() {
    plugins.connect.server({
        root: host.path,
        port: host.port.wap,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/wap',  {
                    target: localIp + ':8088',
                    changeOrigin:true,
                    secure: false,
                }),
            ]
        }
    });
})



//zip做服务器部署的时候讲我们打包出的文件压缩成一个zip包
gulp.task('zip', ['initialTask'], function() {
    return gulp.src(host.path + '**')
        .pipe(plugins.zip(host.zip_name + '.zip'))
        .pipe(gulp.dest(host.path));
});

//默认任务  
// if (options.env === '0' || options.env === '1') { //当开发环境的时候构建命令执行mock服务
if (options.env === '0' ) { //当开发环境的时候构建命令执行mock服务

    console.log("开发环境执行mock模拟数据服务器");

    gulp.task('default', ['initialTask','mock', 'mockProxy'])

} else if (options.env === '5'){
    gulp.task('default', ['initialTask', 'proxyTask'])

} else {
    console.log("不启动服务器，做运维环境部署打包用");

    gulp.task('default', ['zip'])

}

/**此任务默认执行，gulp启动时，先将所有文件打包一次**/
gulp.task('initialTask', function(cb) {
    plugins.sequence('clean', 'images', 'font', 'includeJs', 'includeCss', 'cssToHost', 'webpack', 'bfRev', 'html', 'rev', 'rootEnv', cb);
});



/*********************一些默认变量设置******************************/


//因为在监听js\css文件的修改时，有只打包当前修改的文件的处理，
//打包方式相同，只有路径不同
//因此在这里先配置一个默认的路径
//此处配置的都是打包全部文件的
//jsIncludeSrcStatic--include下的不需要webpack打包的js文件
//revChangeSrcStatic_1--html打包替换版本号的路径
//revChangeSrcStatic_2--js/css打包替换版本号的路径
//includeCssSrcStatic--include下的css文件
//webpackConfig.entry--webpack.config.js里的entry入口文件，默认为webpackList的内容，即
//所有需要webpack打包的文件
var jsIncludeSrcStatic = ['src/include/**/*.js', '!src/include/js/vendor/buriedPoint/**/*.js'],
    revChangeSrcStatic_1 = [host.middle + 'rev/**/*.json', host.middleHtmlPathRev + '**/*.html'],
    revChangeSrcStatic_2 = [host.path + 'rev/**/*.json', host.path + '**/*.html'],
    includeCssSrcStatic = 'src/**/*.css';
webpackConfig.entry = webpackList;


//这里设置三个变量，用于后面监听文件时的打包路径修改
//默认都设置为上面的static默认路径
//revChangeSrc需要默认设置为打包html时的路径
var jsIncludeSrc = jsIncludeSrcStatic,
    revChangeSrc = revChangeSrcStatic_1,
    includeCssSrc = includeCssSrcStatic;


//该变量用于标识是否是watch任务监听的打包
//因为替换html中的版本号时，如果不用这个变量控制，会导致gulp刚启动时的默认打包所有文件的任务
//中替换全部版本号，浏览器一直在不停刷新
//所以这里用此变量控制
//默认为false---不是watch的监听
//在watch任务中，如果进了该任务，会将此变量重置为true
//替换版本号时，如果此变量为true时，才会重启浏览器，达到控制的目的
var isWatch = false;


/*********************一些默认变量设置  end******************************/




/***************************watch监听打包任务******************************/
if (options.env === '0' || options.env === '5') { //当开发环境的时候执行监听打包，上线部署的时候只执行一次打包
// if (options.env === '0') { //当开发环境的时候执行监听打包，上线部署的时候只执行一次打包
    gulp.watch('src/**/*', function(event) {


        //监听到的修改的文件
        var filePath = event.path;

        //将此变量设置为true，表示进入watch监听状态
        isWatch = true;

        console.log('当前修改文件：' + filePath);

        //判断是html/js/less文件
        if (filePath.indexOf('.html') != -1) {
            //是html，打包所有html文件
            console.log('打包所有html文件：');

            revChangeSrc = revChangeSrcStatic_1;
            plugins.sequence('cleanHtmlMiddleRev', 'html', 'rev', function() {});
        } else if (filePath.indexOf('.js') != -1 && filePath.indexOf('.json') == -1) {

            revChangeSrc = revChangeSrcStatic_2;

            // 因include里面有业务js，故先判断webpackList中
            if (filePath.indexOf('\\include\\') != -1) {
                //include下的
                var file = filePath.substring(filePath.indexOf('src\\') + 4, filePath.lastIndexOf('.')).replace(/\\/g, '/');

                if (file.indexOf('modelPage') != -1) {
                    //include中的业务js走webpack任务
                    file = "./" + file;
                    webpackConfig.entry = webpackList[file]
                    plugins.sequence('cleanRev', 'webpack', 'rev', function() {});
                } else {
                    // 非业务js走includeJs任务
                    jsIncludeSrc = 'src/include/**/*' + filePath.substring(filePath.lastIndexOf('\\') + 1);
                    plugins.sequence('cleanRev', 'includeJs', 'rev', function() {});
                }
            } else {
                //其他情况，先判断是否在webpackList中
                var hasFile = false,
                    file = filePath.substring(filePath.indexOf('src\\') + 4, filePath.lastIndexOf('.')).replace(/\\/g, '/');

                for (var i in webpackList) {
                    if (i.indexOf(file) != -1) {
                        //在webpackList中，只打包该文件
                        hasFile = true;
                        webpackConfig.entry = {};
                        webpackConfig.entry[i] = webpackList[i];

                        console.log('打包js文件：' + webpackList[i]);
                        plugins.sequence('cleanRev', 'webpack', 'rev', function() {});
                    }
                }
                if (!hasFile) {
                    //不在webpackList中
                    webpackConfig.entry = webpackList;
                    console.log('打包所有js文件');
                    plugins.sequence('cleanRev', 'webpack', 'rev', function() {});
                }
            }
        } else if (filePath.indexOf('.less') != -1) {
            //打包所有less文件
            console.log('打包所有less文件');

            revChangeSrc = revChangeSrcStatic_2;
            plugins.sequence('cleanRev', 'cssToHost', 'rev', function() {});
        } else if (filePath.indexOf('.css') != -1) {
            //打包所有css文件
            //includeCssSrc = filePath.substring( filePath.indexOf('src') ).replace(/\\/g, '/');
            //console.log( '打包css文件：' + includeCssSrc);

            gulp.run('includeCss');
        } else if (filePath.indexOf('\\img\\') != -1) {
            //打包所有图片
            console.log('打包所有图片');
            gulp.run('images');
        }

    })
}
/***************************watch监听打包任务  end******************************/



/*******************************清除打包文件***********************************/
//清空打包后的文件
gulp.task('clean', function() {
    return del.sync([host.path + '*', host.middle + '*']);
});

//清空css\js版本号文件
gulp.task('cleanRev', function() {
    return del.sync(host.path + 'rev/');
});

//清空Html打版本号的备份文件
gulp.task('cleanHtmlMiddleRev', function() {
    return del.sync(host.middleHtmlPathRev + '*');
});
/*******************************清除打包文件  end***********************************/


/**
 * 版本号文件的备份
 * 第一次打包时，需要打包css\js文件的rev文件备份，用于后期修改html文件时添加版本号
 */
gulp.task('bfRev', function() {
    return gulp.src([host.path + 'rev/**/*.json'])
        .pipe(gulp.dest(host.middle + 'rev/'))
})
/*******************************版本号文件的备份 end****************************/







/*******************************各种打包任务***********************************/



//图片打包任务，全部打包和单独打包可共用
gulp.task('images', function() {
    return gulp.src('src/**/img/**/*')
        .pipe(gulp.dest(host.path));
});

//mui所需的font文件夹打包
gulp.task('font', function() {
    return gulp.src('src/include/fonts/*')
        .pipe(gulp.dest(host.path + 'include/fonts'));
})


//css文件打包，先经过Less处理，然后比对文件，修改的文件会打包到host.dest中
//并且生成版本号文件
gulp.task("cssToHost", function() {

    //测试环境
    return gulp.src(['src/**/*.less', '!src/common/**/*.less'])

        //通过through处理相对路径
        .pipe(
            through.obj(function(file, enc, cb) {
                file = pathVar.changePathVar(file);
                this.push(file);
                cb()
            })
        )

        .pipe(plugins.less())

        //预上线/线上环境时，压缩css
        //设置这两个参数，防止去掉浏览器前缀和z-index值的变化
        .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.cssnano({ autoprefixer: false, zindex: false })))

        //修改当前文件的路径，将less替换为css
        .pipe(
            through.obj(function(file, enc, cb) {
                //修改当前文件的路径到host.path下，且替换路径中的less为css
                file.path = file.path.replace('less', 'css');
                this.push(file);
                cb()
            })
        )

        //与host.path中的内容做比对
        .pipe(plugins.changed(host.path, { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(plugins.debug({ title: 'css-有变动的文件:' }))

        //修改当前文件的路径，将less替换为css
        .pipe(
            through.obj(function(file, enc, cb) {
                //修改当前文件的路径到host.path下，且替换路径中的less为css
                file.path = file.path.replace('less', 'css');
                this.push(file);
                cb()
            })
        )
        .pipe(gulp.dest(host.path))

        //打版本号
        .pipe(plugins.rev())
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(host.path + 'rev/css/'))
})

//include css文件打包
gulp.task("includeCss", function() {
    return gulp.src(includeCssSrc)
        //也加上压缩处理
        .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.cssnano({ autoprefixer: false, zindex: false })))
        .pipe(gulp.dest(host.path))
})


gulp.task("htmd", function() {

    return gulp.src(['src/include/js/vendor/buriedPoint/**/*.js'])
        .pipe(gulp.dest(host.path + 'include/js/vendor/buriedPoint/'))

}) 

//不使用webpack的 js文件打包
gulp.task("includeJs", ['htmd'], function() {
    return gulp.src(jsIncludeSrc)
        //与host.path中的内容做比对
        .pipe(plugins.changed(host.path, { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(plugins.debug({ title: 'js-有变动的文件:' }))

        .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.uglify({ //压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: false, //类型：Boolean 默认：true 是否完全压缩
            output: {
                beautify: true //只去注释，不压缩成一行
            }
        })))

        //对root.js做一些修改
        .pipe(
            through.obj(function(file, enc, cb) {
                if (file.path.indexOf('root.js') != -1 && (options.env == '0' || options.env == "5")) {
                // if (file.path.indexOf('root.js') != -1 && (options.env == '0')) {
                    //如果是本地或联调环境，修改env和envOrigin的值
                    //且替换root.js里的本地ip
                    //因测试、预生产、生产环境的root需运维在发版时在对应环境上修改
                    //此处不处理
                    var fileCon = file.contents.toString();

                    fileCon = fileCon.replace(/localIp/g, localIp);

                    fileCon = 'var env = ' + options.env + ';\n' + 'var envOrigin = ' +
                        options.envOrigin + ';\n' + fileCon.substring(fileCon.indexOf('//'));

                    file.contents = new Buffer(fileCon);
                }
                this.push(file);
                cb()
            })
        )

        .pipe(gulp.dest(host.path + 'include/'))

        //root.js需要打版本号
        .pipe(
            through.obj(function(file, enc, cb) {
                if (file.path.indexOf('root.js') != -1) {
                    this.push(file);
                }
                cb()
            })
        )
        .pipe(plugins.rev())
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(host.path + 'rev/include/js'));
})


//非include文件夹下的js文件打包
gulp.task("webpack", function() {

    //测试环境
    return gulp.src(['src/*'])
        .pipe(plugins.webpack(webpackConfig))

        //添加changeLocalHistory、eruda和CustomEventIeFile的文件内容
        .pipe(
            through.obj(function(file, enc, cb) {
                var fileCon = file.contents.toString();
                fileCon = changeLocalHistoryFile + fileCon + erudaFile + CustomEventIeFile;
                file.contents = new Buffer(fileCon);
                this.push(file);
                cb()
            })
        )

        //预上线环境时，去掉Log并压缩
        .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.removelogs()))
        .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.uglify({ //压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: false
        })))

        //与host.path中的内容做比对
        .pipe(plugins.changed(host.path, { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(plugins.debug({ title: 'js-有变动的文件:' }))

        .pipe(gulp.dest(host.path))

        .pipe(plugins.rev())
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(host.path + 'rev/js'))
});

//html文件打包
gulp.task('html', function() {

    return gulp.src(['src/**/views/**/*.html', '!src/common/views/**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件

        //处理公共路径变量
        .pipe(
            through.obj(function(file, enc, cb) {
                file = pathVar.changePathVar(file);
                this.push(file);
                cb()
            })
        )

        .pipe(plugins.advancedFileInclude({ //头尾公共部分添加
            prefix: '@@',
            //basepath: '@file',
            context: {
                textarea: 'textarea',
                select: 'select',
            },
        }))
        .pipe(plugins.htmlmin({
            removeComments: true, //清除HTML注释
        }))

        //与host.middleHtmlPath中的内容做比对
        .pipe(plugins.changed(host.middleHtmlPath, { hasChanged: plugins.changed.compareSha1Digest }))
        .pipe(plugins.debug({ title: 'html-有变动的文件:' }))

        //输出到middleHtmlPath文件夹，用于再次修改时比对，此时还没有加版本号
        .pipe(gulp.dest(host.middleHtmlPath))

        //输出到host.middleHtmlPathRev文件夹
        .pipe(gulp.dest(host.middleHtmlPathRev))

        //先打出一份来
        .pipe(gulp.dest(host.path))
})


//打包CSS、JS时的版本号替换，只替换rev文件夹里版本号文件中的版本号
//并输出到 host.path
gulp.task('rev', function() {

    return gulp.src(revChangeSrc) //- 读取 rev-manifest.json 文件


        .pipe(plugins.revCollector()) //- 执行html内版本号的替换
        .pipe(plugins.debug({ title: '替换版本号的文件' }))

        //替换后的文件输出的目录
        .pipe(gulp.dest(host.path))

        //如果是监听文件修改的，重启connect
        .pipe(plugins.if(isWatch, plugins.connect.reload()))
});


gulp.task('getFileNum', function() {

    var fileNum = 0;

    gulp.src(['src/**/*.html', '!src/common/**/*.html'])

        .pipe(
            //操作文件
            through.obj(function (file, enc, cb) {

                //beginId加1
                fileNum++;
                console.log( '文件数量' + fileNum );
                cb()
            })
        )

})

//循环项目里所有html页面，配上id，作为埋点的evtList数据
//title和info暂时写空，后期再配置
gulp.task('dataFile', function() {

    //文件路径
    var filePath = 'src/include/js/vendor/buriedPoint/evt/H5EvtList.js';

    //向该文件写入开头部分
    fs.writeFileSync( filePath , 'var evtList = {');

    //id从0开始计算
    var beginId = 0,
        contentArr = [];

    gulp.src(['src/**/*.html', '!src/common/**/*.html'])

        .pipe(
            //操作文件
            through.obj(function (file, enc, cb) {

                var fp = file.path;

                fp = fp.substring( fp.indexOf('src\\')+4 ).replace(/\\/g, '/');

                //获得当前文件路径，作为key    
                //if( contentArr.length == 0){
                    //第一条时前面不加,
                    contentArr.push('\n\"' + fp + '\" : \"{ evtid: \'' + beginId + '\'\, topic: \'页面加载\'\, info: \'\'}\" ');
                //}
                //else {
                    //contentArr.push('\n\"' + fp + '\" : \"{ evtid: \'' + beginId + '\'\, topic: \'页面加载\'\, info: \'\'}\" ');
                //}

                //beginId加1
                beginId++;

                console.log( beginId );

                if( 157 == beginId){
                    //所有文件
                    //去掉最后一个,
                    contentArr = contentArr.join();

                    //将contentArr写入文件并收尾
                    fs.appendFileSync( filePath , contentArr + '\n}', 'utf8'); 
                }
            
                //this.push(file);
                cb()
            })
        )
});



//联调/测试/预生产/生产环境，把root打出对应的环境的四个文件（财富，明泽，中岩，融泽），红硕直接复制
gulp.task('rootEnv', function() {

    if (options.env != '0' ) {
        //按照索引，0-明泽，1-股份，2-中岩，3-融泽，与root.js中的envOrigin参数对应
        var rootName = ['chtfund', 'chtwm' , 'cathayrock', 'rongze'];

        for( var i = 0; i < rootName.length; i++){

            (function(i){
                gulp.src(['src/include/js/vendor/root.js']) //- 读取 rev-manifest.json 文件
                    .pipe(
                        through.obj(function(file, enc, cb) {
                            //if (options.env != '0' ) {
                                //非本地环境时
                                var fileCon = file.contents.toString();
                                
                                //替换真正的env和envOrigin变量，是根据root.js文件中第一行注释的//截取内容的，所以
                                //root.js中，envOrigin那一句后面，一定要有//的注释。。。。。
                                fileCon = 'var env = ' + options.env + ';\n' + 'var envOrigin = ' + i + ';\n' 
                                            + fileCon.substring( fileCon.indexOf('//'));

                                file.contents = new Buffer(fileCon);
                            //}
                            this.push(file);
                            cb()
                        })
                    )

                    .pipe( plugins.rename(function(path){
                        console.log( rootName[i] );
                        //如果图片是common中的
                        path.basename = path.basename + '_' + rootName[i]; 

                        console.log(path);
                    }))

                    //如果是预生产/生产环境，需要去注释
                    .pipe(plugins.if(options.env === '3' || options.env === '4', plugins.uglify({ //压缩
                        mangle: false, //类型：Boolean 默认：true 是否修改变量名
                        compress: false, //类型：Boolean 默认：true 是否完全压缩
                        output: {
                            beautify: true //只去注释，不压缩成一行
                        }
                    })))


                    //替换后的文件修改文件名，打出到middle/root文件夹中
                    .pipe(gulp.dest(host.middle + 'root'))
            })(i)
            
        }
    }
});