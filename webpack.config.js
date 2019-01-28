const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': ['./src/main.ts', './src/styles.css']
    },

    resolve: {
		extensions: ['.ts', '.js', '.css'],
		modules: [
			'./node_modules'
		]
    },

    mode: 'production',
	devServer: {
		contentBase: './dist',
		hot: false,
		port: 8080,
		watchContentBase: true,
		historyApiFallback: true
    },
    
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        publicPath: '/',
		chunkFilename: '[id].chunk.js'
    },
    
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: path.resolve('./src/app'),//For src/styles.css
                use: [
                    //Use to-string-loader as ExtractTextPlugin in not compatible with webpack 4 and
                    //MiniCssExtractPlugin is giving Error: Expected 'styles' to be an array of strings
                    //'to-string-loader',//Now no error so commenting it
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve('./src/app'),//For src/app/**/*.css
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new WebpackCleanupPlugin(),
		new ngToolsWebpack.AngularCompilerPlugin({
			tsConfigPath: 'tsconfig.json',
			mainPath: 'src/main.ts',
            entryModule: 'src/app/app.module#AppModule',
            skipCodeGeneration: false
		}),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/vendor-manifest.json')
        }),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
        new AddAssetHtmlPlugin({
            filepath: path.resolve('./dll/vendor.dll.js')
        })
	]
}