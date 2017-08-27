const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const sassConfig = {
	sourceMap: true
};

function cssConfig(modules) {
	return {
		localIdentName: '[name]_[local]_[hash:base64:3]',
		modules
	};
}

const postCssOptions = {
	sourceMap: true,
	plugins: () => [
		autoprefixer({
			browsers: [
				'Android 2.3',
				'Android >= 4',
				'Chrome >= 35',
				'Firefox >= 31',
				'Explorer >= 10',
				'iOS >= 7',
				'Opera >= 12',
				'Safari >= 7.1'
			]
		})
	]
};

module.exports = {
	entry: [
		'core-js/es6/promise',
		'core-js/es6/symbol',
		'whatwg-fetch',
		'./src/index.tsx'
	],

	output: {
		filename: 'bundle.js',
		path: __dirname + '/web'
	},

	devtool: 'source-map',

	stats: {
		chlidren: false
	},

	resolve: {
		alias: {
			'~': path.join(__dirname, 'src')
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'source-map-loader'
			},
			{
				test: /\.tsx?$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: {
					typeCheck: true
				},
				include: /src/
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				include: /src/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: `css-loader?${JSON.stringify(cssConfig(true))}`
					}, {
						loader: 'postcss-loader',
						options: postCssOptions
					}, {
						loader: `sass-loader?${JSON.stringify(sassConfig)}`
					}]
				}),
				include: /src/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: `css-loader?${JSON.stringify(cssConfig(false))}`
					}, {
						loader: 'postcss-loader',
						options: postCssOptions
					}]
				}),
				include: /node_modules/
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('style.css')
	]
};
