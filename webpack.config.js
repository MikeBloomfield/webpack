const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}



module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        bundle: './scripts/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: '[path][hash][ext][query]',
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
    ],
    optimization: {
        minimizer: [
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
              },
            },
          }),
        ],
      },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    (mode === 'development') ? 'style-loader': MiniCssExtractPlugin.loader,
                     'css-loader', 
                     'postcss-loader', 
                     'sass-loader']
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            filename: '[path][name].[ext]',
                        },
                    }
                ]
            },
        ]
    }
}
