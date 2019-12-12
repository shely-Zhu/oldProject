/**
 * gulp打包公共路径处理
 * @author yangjinlai 2018-10-19
 *
 * 
 */

var path = require('path');

var pathConfig = require('./pathConfig.js');

var pathVar = pathConfig.commonPathVar,  //旧路径
    smjhDirArr = pathConfig.smjhArr;

//新老公用路径合并
var allPath = Object.assign( {}, pathConfig.commonPathVar, pathConfig.newPathVar);

//此处配置less、html文件的公用路径变量
//从src下面的文件夹开始



function dealPath( obj ){

    var arr = [];
    for (var i in obj) {
        arr.push({
            key: i,
            value: obj[i]
        })
    }

    //将arr按索引长度从长到短排序，防止先替换了短的，长的会出错
    arr = arr.sort(function(a, b) {
        return b.key.length - a.key.length;
    })

    //将pathVar按索引长度从长到短排序，防止先替换了短的，长的会出错
    // arr = arr.sort(function(a, b) {
    //     return a.key.length < b.key.length
    // });
    
    //newPathVar是最后公用路径使用的变量，供老文件使用
    var newPathVar = {};
    for (var j in arr) {
        newPathVar[arr[j].key] = arr[j].value;
    }

    return newPathVar;
}


// console.log(newPathVar);

//老路径的处理
var oldPathVar = dealPath( pathVar );



//新路径处理
var newPathVar = dealPath( allPath );
// console.log( 'newPathVar');
// console.log( newPathVar );

//oldAppVar这个变量给使命计划相关的less、html文件使用
//将原来的路径替换为newInclude和newCommon，使用老配置路径修改
var oldAppVar = {};
for (var m in oldPathVar) {

    if( oldPathVar[m].indexOf('include') != -1 ){
        oldAppVar[m] = oldPathVar[m].replace('/include', '/allServerResources/include');
    }   
    else if( oldPathVar[m].indexOf('common') != -1 ) {
        oldAppVar[m] = oldPathVar[m].replace('/common/', '/newCommon/');
    }
    else{
        oldAppVar[m] = oldPathVar[m];
    }
    
}

// console.log( 'oldAppVar');
// console.log( oldAppVar );


//newPath是webpack打包时，原key和现在key的对应，使用老配置路径修改
var newPath = {};
for (var m in oldPathVar) {

    if( oldPathVar[m].indexOf('include') != -1 ){
        
        newPath[m] = m.replace('Includ', 'NewInclud');

        if( m == '@callback' ){
            newPath[m] = '@NewCallback';
        }
        else if( m == '@deferred' ){
            newPath[m] = '@NewDeferred';
        }
    }   
    else if( oldPathVar[m].indexOf('common') != -1 ){
        newPath[m] = m.replace('Common', 'NewCommon');
    }
}


//处理一下所有路径，用于wealthResources这种既有老文件又有新文件的情况
// var newAppVar = {};
// for (var m in newPathVar) {

//     if( newPathVar[m].indexOf('include') != -1 ){
//         newAppVar[m] = newPathVar[m].replace('/include/', '/allServerResources/include/');
//     }   
//     else if( newPathVar[m].indexOf('common') != -1 ) {
//         newAppVar[m] = newPathVar[m].replace('/common/', '/newCommon/');
//     }
//     else{
//         newAppVar[m] = newPathVar[m];
//     }
    
// }


module.exports = function(file) {

    //console.log('文件：' + file.path);

    //挑出文件中@@include的代码，如果其中有@@pathCommonViews等
    //公用路径变量，替换为相对路径
    var fileCon = file.contents.toString();
        //relativePath为本文件的相对路径
        // relativePath = path.relative(path.dirname(file.path), 'src').replace(/\\/g, '/');

    //开始替换
    if (fileCon.indexOf('@path') != -1) {


        console.log('smjhDirArr: ' + smjhDirArr );

        //判断是否为使命计划相关的文件
        var fileName = smjhDirArr.filter( (value, index) => {

            console.log( 'file.path:' + file.path );

            return file.path.indexOf('\\' + value + '\\') != -1;
        });

        if( file.path.indexOf('.js') != -1 ){

            var relativePath = path.relative(path.dirname(file.path), 'middle\\js').replace(/\\/g, '/');

            //js文件，先替换key
            if( fileName && fileName.length ){

                // console.log( '要替换的文件：' + file.path );

                for (var i in newPath) {
                    var re = new RegExp( i, 'g');

                    // console.log( '要替换的变量：' + i, newPath[i] );

                    fileCon = fileCon.replace( re, newPath[i]);
                }
            }
            
        }
        else{

            var relativePath = path.relative(path.dirname(file.path), 'src').replace(/\\/g, '/');

            // for (var i in oldAppVar) {
            //     var re = new RegExp( i, 'g');
            //     fileCon = fileCon.replace(re, relativePath + oldAppVar[i]);
            // }

            console.log('less文件：' + file.path);

            console.log('fileName: ' + fileName );

            if( fileName && fileName.length ){
                //是使命计划相关文件
                for (var i in oldAppVar) {
                    var re = new RegExp( i, 'g');

                    console.log('替换re' + re );

                    console.log('替换的路径：' + relativePath + oldAppVar[i]);

                    fileCon = fileCon.replace(re, relativePath + oldAppVar[i]);
                }
            }
            else{
                for (var i in newPathVar) {
                    var re = new RegExp(i, 'g');
                    fileCon = fileCon.replace(re, relativePath + newPathVar[i]);
                }
            }
        }

        
    }

    file.contents = new Buffer(fileCon);

    return file;
}


