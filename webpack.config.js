const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')






module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {                                                    
        bundle:'./index.js',
    },    
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')    
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        })
    ],
    module: {
        rules: [
            // {
            //     test:/\.html$/,
            //     use: ['html-loader']
            // },
            {
                test:/\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(jpg|jpeg|png|svg|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
        ]
    }
}  
