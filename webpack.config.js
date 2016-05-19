/*
 * @Author: kevin li
 * @Date:   2016-05-18 20:10:22
 * @Last Modified by:   kevin li
 * @Last Modified time: 2016-05-19 16:10:25
 */


var path = require('path'); //引入nodeJs的path模块
var HtmlwebpackPlugin = require('html-webpack-plugin'); //自动生成html的模块

var ROOT_PATH = path.resolve(__dirname);
var INDEX_PATH = path.resolve(ROOT_PATH, 'src');

//path.resolve()为nodeJS的方法，传递一个相对路径
// var _PATH = path.resolve('src');//1.传入一个src的文件目录

module.exports = { //模块接口用于单独的定义，返回数据类型
    // entry: _PATH, //2.entry的值如果是文件名，那么会默认会找index.js (单入口文件)
    entry: ['./src/index.js', './src/main.js'], //多入口文件只打包一个文件
    output: { //输出接口
        path: './build', //输出路径
        filename: 'build.[hash].js' //合并后输出的文件名为build.js [hash]为生成Hash值防止缓存
    },
    devServer: { //实时刷新响应文件
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    module: {
        loaders: [
            {
            // test: /\.css$/,
            // loaders: ['style', 'css'],

            test: /\.scss$/,                    //解析.scss文件
            // loaders: ['style', 'css', 'sass'],  // 从右往左 sass > css > style
            // loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
            loader: 'style!css!autoprefixer?{browsers:["Firefox >= 20","> 5%","last 2 versions"]}'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }
        ],
    },
    plugins: [ //html-webpack-plugin 自定生成.html文件
        new HtmlwebpackPlugin({
            title: 'Hello World'
        })
    ]
};
