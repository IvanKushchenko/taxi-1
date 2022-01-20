const fs = require("fs");
const paths = require("./paths");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlTemplates = [];
const srcHtmlFiles = fs.readdirSync(paths.src);
srcHtmlFiles.forEach((s) => s.endsWith(".html") && htmlTemplates.push(s));

module.exports = {
	entry: ["@babel/polyfill", `${paths.src}/js/index.js`],
	output: {
		path: paths.build,
		filename: "js/[name].js",
		clean: true,
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: `${paths.src}/img`,
					to: `${paths.build}/img`,
					globOptions: {
						ignore: ["backgrounds/*.*"],
					},
				},
			],
		}),
		...htmlTemplates.map((file) => {
			return new HtmlWebpackPlugin({
				template: `${paths.src}/${file}`,
				filename: file,
				inject: "body",
			});
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg?)$/i,
				exclude: /(node_modules|bower_components)/,
				type: "asset",
				generator: {
					filename: "img/backgrounds/[name][ext]",
				},
			},
		],
	},
};
