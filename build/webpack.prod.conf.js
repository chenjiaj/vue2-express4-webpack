var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

// 引入基本配置
var webpackConf = require('./webpack.base.conf');
var prodWebpackConf = merge(webpackConf,{
	output:{
		publicPath:'/',
		filename: 'static/js/[name].[hash].js'
	},
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract("css"),
			// you can also include <style lang="less"> or other langauges
			less: ExtractTextPlugin.extract("css!less")
		}
	},
	plugins:[
		new ExtractTextPlugin("static/css/style.css"),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
});

module.exports = prodWebpackConf;
