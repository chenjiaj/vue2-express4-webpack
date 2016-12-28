var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var config = require('./config/config');

// 创建一个express实例
var app = express();

var options = {
	target: config.service.httpOpenApi.url, // target host
	pathRewrite: function (path) {
		return path.replace(/^\/api\/(\w)*/, '/')
	},
	logLevel: 'debug',
	changeOrigin: true               // needed for virtual hosted sites
};

app.use(history({verbose: true}));

app.use('/api/:path', proxy(options));//设置api代理

if (app.get('env') == 'development') {
	var webpack = require('webpack');
	var webpackConfig = require('./build/webpack.dev.conf');
	// 调用webpack并把配置传递过去
	var compiler = webpack(webpackConfig);
	
	// 使用 webpack-dev-middleware 中间件
	var devMiddleware = require('webpack-dev-middleware')(compiler, {
		publicPath: '/',
		stats: {
			colors: true,
			chunks: false
		}
	});
	
	app.use(devMiddleware);
	app.use(require("webpack-hot-middleware")(compiler));
	
} else {
	
	app.use(express.static(path.join(__dirname, 'output')));
	
}


module.exports = app;