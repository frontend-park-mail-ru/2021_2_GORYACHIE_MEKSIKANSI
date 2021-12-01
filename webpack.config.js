'use strict';
const debug = process.env.DEBUG === 'true';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src/'),
    dist: path.resolve(__dirname, './dist/')
}

module.exports = {
    resolve: {
        alias: {
            Assets: path.resolve('src/assets'),
            Components: path.resolve('src/components'),
            Controllers: path.resolve('src/controllers'),
            Events: path.resolve('src/events'),
            Models: path.resolve('src/models'),
            Modules: path.resolve('src/modules'),
            Views: path.resolve('src/views'),
        },
        extensions: ['.js'],
    },
    mode: debug ? 'development' : 'production',
    entry: path.resolve('./src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                // exclude: /(node_modules)/,
                include: [
                  path.resolve(__dirname, 'node_modules/hme-design-system/src'),
                  path.resolve(__dirname, 'src/'),
                ],
                options: {
                    partialDirs: [
                        path.join(__dirname, './src/partials'),
                    ],
                    helperDirs: path.join(__dirname, 'node_modules/hme-design-system/src/helpers'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(svg|png|jpg|jpeg|woff|woff2|eot|ttf)$/,
                use: 'file-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/index.html'),
            favicon: path.resolve('src/favicon.ico'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets', 'images'),
                    to: path.resolve(__dirname, 'dist', 'static', 'img')
                }
            ]
        }),
        new webpack.DefinePlugin({
            DEBUG: debug,
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        hot: debug,
        inline: debug,
        clientLogLevel: debug ? 'debug' : 'silent',
        writeToDisk: true,
        disableHostCheck: true,
        publicPath: '/',
        contentBase: path.resolve('src'),
        port: 3000,
        historyApiFallback: true,
        compress: false
    },

}