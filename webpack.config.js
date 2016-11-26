var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'core-js/es6/promise',
		'core-js/es6/symbol',
		'whatwg-fetch',
		'./src/index.tsx'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist'
	},

	devtool: 'source-map',

	resolve: {
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader?{"silent":true}',
				include: /src/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', [
					'css-loader?{"modules":true}',
					'postcss-loader',
					'sass-loader?{"sourceMap":true}'
				]),
				include: /src/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', [
					'css-loader?{"modules":false}',
					'postcss-loader'
				]),
				include: /node_modules/
			}
		],
		preLoaders: [
			{ test: /\.js$/, loader: 'source-map-loader' }
		]
	},

	postcss: [autoprefixer({
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
	})],

	plugins: [
		new ExtractTextPlugin('style.css')
	]
};
