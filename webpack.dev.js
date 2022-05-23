const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
module.exports = {
    entry: [
          './src/client/index.js',
           ],
    mode: 'development',
    
    devServer: {
        contentBase: './dist',
        proxy: [
            {
              context: [
              '/geonameLocations',
              '/weatherbitForecast',
              '/pixabaymages',
              '/saveTrip',
              '/getTrips',
              '/deleteTrip',
              '/saveResult',
              '/getResult'],
              target: 'http://localhost:8081',
            },
          ],
        },
 
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
            },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                   outputPath: 'images',
                   name: '[name].[ext]',
                   publicPath: 'assets',
              },
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
               'file-loader',
              ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WriteFilePlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/client/icons', to: 'icons' },
                { from: 'src/client/images', to: 'images' },
                      ],
        }),
        new Dotenv(),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        
    ]
}
    
