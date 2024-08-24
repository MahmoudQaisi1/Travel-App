const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [  MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, 
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]',
                },
            },
            
          
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new FaviconsWebpackPlugin({
            logo: './src/client/assets/icons/favicon.svg',
            mode: 'auto',
            devMode: 'webapp',
            favicons: {
              appName: 'Travel App',
              appDescription: 'Follow Your favorite destinations',
              developerName: 'Mahmoud Qaisi',
              developerURL: null,
              background: '#ddd',
              theme_color: '#333',
            },
          }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})],
    },
}
