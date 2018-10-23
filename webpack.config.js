var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	name: "production",
	entry: {
		index: "./src/index.js",
		//添加要打包在vendors里面的库
		// vendor: ['react', 'react-dom', 'react-router', "antd"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			cache: true
		})
	],
	//配置;打包之后的文件信息
	output: {
		path: __dirname + "/dist/",
		filename: "[name].js",
		publicPath: '',
		chunkFilename: "[name].js",
	},
	//配置source-map
	devtool: "source-map",

	//配置loader
	module: {
		loaders: [
			//配置哪些文件需要通过babel来进行转换
			{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules|server|dao|routes/,
				loader: "babel-loader"
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}, {
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			}, {　　　　
				test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
				　　　　loader: 'url-loader?limit=8192'　　　
			}
		]
	},
	devServer:{
		// host:'192.168.123.120',
		// host:'172.20.10.6',
		host:'172.20.10.4',
		port:8080,
		disableHostCheck:true
	}
};