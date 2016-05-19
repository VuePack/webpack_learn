/*
 * @Author: kevin li
 * @Date:   2016-05-18 20:10:22
 * @Last Modified by:   kevin li
 * @Last Modified time: 2016-05-19 22:55:42
 */

var webpack = require('webpack');//引入webpack
var path = require('path'); //引入nodeJs的path模块
var HtmlwebpackPlugin = require('html-webpack-plugin'); //自动生成html的模块
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");//提取多个页面之间的公共模块
var ExtractTextPlugin = require("extract-text-webpack-plugin");//单独打包css模块


var ROOT_PATH = path.resolve(__dirname);
var INDEX_PATH = path.resolve(ROOT_PATH, 'src');

//path.resolve()为nodeJS的方法，传递一个相对路径
// var _PATH = path.resolve('src');//1.传入一个src的文件目录

module.exports = { //模块接口用于单独的定义，返回数据类型
    entry: {
        index: './src/component/index',//单入口 (默认会找index.js)
        about: ['./src/component/about/a.js', './src/component/about/b.js'], //多入口文件只打包一个文件（支持数组形式）
        header: './src/component/header',//定义可复用的模块header
        footer: './src/component/footer',//定义可复用的模块footer
    },
    output: { //输出接口
        path: './build', //输出路径
        filename: '[name].[hash].js' //合并后输出的文件名为build.js （[hash]为生成Hash值防止缓存）
    },
    devServer: { //实时刷新响应文件
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    module: {
        loaders: [
            // 样式动态插入html style标签里
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 和autoprefixer 兼容css后缀 来编译处理
            // { test: /\.scss$/, loader: 'style!css!autoprefixer?{browsers:["Firefox >= 20","> 5%","last 2 versions"]}'},
            //图片文件使用 url-loader 来处理，小于40kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=40000'},


            // ExtractTextPlugin.extract()动态输出Link标签
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass!autoprefixer?{browsers:["Firefox >= 20","> 5%","last 2 versions"]}') }
        ]
    },
    plugins: [ //plugins是个插件项
        new HtmlwebpackPlugin({//html-webpack-plugin 自定生成.html文件
            title: 'Hello World'
        }),
        new CommonsChunkPlugin("common.js", ["header", "footer"]),//自定义公共模块提取,并将该模块打包为 common.js
        new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        //查找module的话从这里开始查找
        root: ROOT_PATH, //相对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss','.vue'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            pageIndex : 'component/index/index.js',//后续直接 require('pageIndex') 就可以引用该模块
            topBar : 'component/header/index.js'
        }
    }
};
