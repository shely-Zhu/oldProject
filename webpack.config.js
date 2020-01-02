/**
 * 由于使用了gulp-webpack，当前项目的webpack版本是1.x的，配置项与3.x，4.x的都不同
 * 修改时需注意
 */

var webpack = require('webpack'),
    path = require("path"),
    //assign  = require('object-assign'),
    //公用路径变量配置
    pathVar = require('./conf/pathConfig.js');

var pathObj = {};
for( var i in pathVar.commonPathVar){
    pathObj[i] = pathVar.commonPathVar[i];
}

for( var j in pathVar.newPathVar){
    pathObj[j] = pathVar.newPathVar[j];
}


var arr = []
for (var i in pathObj) {
    arr.push({
        key: i,
        value: pathObj[i]
    })
}
//将pathVar按索引长度从长到短排序，防止先替换了短的，长的会出错
arr = arr.sort(function(a, b) {
    return a.key.length < b.key.length
});
//arr = arr.reverse();
// console.log(arr);

var newPathVar = {};
for (var j in arr) {
    newPathVar[arr[j].key] = arr[j].value;
}


//公用变量合辑
var aliasVar = {};
for( var i in newPathVar){
    aliasVar[i] = path.join(__dirname, 'middle\\js' + newPathVar[i]).replace(/\\/g, '/')  ;
}

module.exports = {
    //devtool: "source-map",  //生成sourcemap,便于开发调试
    entry: {},
    output: {
        path: path.join(__dirname, "dist/"), //文件输出目录
        //publicPath: "test/js/",     //html引用路径，在这里是本地地
        filename: "[name].js",      //根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
           { test: /\.js$/, loader: 'babel-loader' },
       ]


        // rules: [
        //   { test: /\.js$/, 
        //     //loader: 'babel', 
        //     exclude: /node_modules/ ,
        //     // use: {
        //     //     loader: 'babel-loader', // 对符合上面约束条件的文件 使用的 loader
        //     //     options: {
        //     //         presets: ['env'],
        //     //         plugins: ['transform-runtime']
        //     //     }
        //     // },
            
        //     loader: {
        //         loader: 'babel-loader',
        //     },
        //     // query: {
        //     //     "presets": [
        //     //         "env"
        //     //     ],
        //     //     plugins: ['transform-runtime']
        //     // }

        //     //query: {compact: false},

        //     },
        //     {// 转译html文件
        //         test: /\.html$/,
        //         use: [
        //           'html-loader'
        //         ]
        //     }, 
        //   // {test: /\.less$/, loader: 'style-loader!css-loader?minimize&-autoprefixer!postcss-loader!less-loader'}
        // ]
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径，
        //@callback和@deferred是webpack独有的，用于js中引用zepto的库，因此不写到pathVar.js中
        //需要在这里合并一下
        alias: aliasVar,
        extensions: ['', '.js', '.html'],
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        /*new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            // nie: "nie"
        }),*/
        //将公共代码抽离出来合并为一个文件
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        //new CommonsChunkPlugin("common.js", ["page1", "page2"]),
        //new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"]),
        //js文件的压缩
        /*new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
};

/*function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    return files;
}*/
