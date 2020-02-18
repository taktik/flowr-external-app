/* webpack.config.js */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: ['./src/index.ts'],
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "script.js"
	},
	resolve: {
		extensions: ['.ts', '.js', '.html'],
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.ejs$/,
				exclude: /node_modules/,
				use: [
					'html-loader'
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname),
		port: 9000
	},
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};
