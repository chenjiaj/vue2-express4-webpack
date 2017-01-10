var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 引入基本配置
var webpackConf = require('./webpack.base.conf');
var prodWebpackConf = merge(webpackConf, {
	output: {
		publicPath: '/',
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/[id].[name]_[chunkhash:7].js',
	},
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract('vue-style-loader', 'css'),
			// you can also include <style lang="less"> or other langauges
			less: ExtractTextPlugin.extract('vue-style-loader', 'css!less')
		}
	},
	plugins: [
		new ExtractTextPlugin('static/css/[id].[name]_[chunkhash:7].css', {
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendors',
			filename:'static/js/[id].[name].[hash].js',
			minChunks: function () {
				return true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	]
});

module.exports = prodWebpackConf;
