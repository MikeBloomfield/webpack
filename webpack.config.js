const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


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
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
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
        })
    ],
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
            // {
            //     test: /\.(jpg|jpeg|png|svg|gif)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[path][name].[ext]',
            //     },
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[path][name].[ext]',
            //             },
            //         }
            //     ]
            // },
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
