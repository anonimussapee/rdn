const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const CopyPlugin=require('copy-webpack-plugin');
const DotenvWebpack=require('dotenv-webpack');

module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    mode:'development',
    watch:true,
    resolve:{
        extensions:['.js'],
        alias:{
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@images':path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module:{
         rules: [
              {
                  test:/\.m?js$/i,
                 exclude:/node_modules/,
                  use:{
                     loader:'babel-loader',
                    }
            },
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,'css-loader',
                ]
            },
            {
                test:/\.(png|jpeg|jpg)$/i,
                type:'asset/resource',
            },
            {
                test:/\.(woff|woff2)$/i,
                type:"asset/resource",
                generator:{
                    filename:"assets/fonts/[name].[contenthash].[ext]"
                }
            }
         ]
     },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:'./public/index.html',
            filename:'./index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"src","assets/images"),
                    to:"assets/images",
                }
            ]
        }),
        new DotenvWebpack({
            path:'.env'
        }),
    ],
}