// nodejs 中的path模块
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
	entry: {
		index: [
			path.resolve(__dirname, '../src/main.js')
		]
	},
	// 输出配置
	output: {
		// 输出路径是 myProject/output/static
		path: path.resolve(__dirname, '../output'),
		publicPath:'/',
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		loaders: [
			// 使用vue-loader 加载 .vue 结尾的文件
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.png$|\.jpg$|\.gif$|\.ico$/,
				loader: "file?name=static/img/[name].[hash].[ext]",
				exclude: /node_modules/
			}
		]
	},
	vue: {
		loaders: {
			js: 'babel'
		},
		postcss: [require('autoprefixer')()]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../index.html'),
			inject: true
		})
	]
}