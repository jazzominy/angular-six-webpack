const path = require('path');
const webpack = require('webpack');

module.exports = {
    //devtool: 'checp-eval-source-map',
    context: process.cwd(),
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        modules: [__dirname, 'node_modules']
    },

    entry: {
        "vendor": [
            //'./node_modules/zone.js/dist/zone.js',
            '@angular/platform-browser',
            './node_modules/@angular/platform-browser/fesm5/animations.js',
            '@angular/platform-browser-dynamic',
            '@angular/compiler',
            '@angular/core',
            '@angular/common',
            '@angular/http',
            '@angular/forms',
            '@angular/animations',
            './node_modules/@angular/animations/fesm5/browser.js',
            '@angular/router'
        ]
    },

    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dll'),
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: './dll/[name]-manifest.json'
        })
    ]
}