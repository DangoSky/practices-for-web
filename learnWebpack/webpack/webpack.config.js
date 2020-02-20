const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  mode:'development', // 开发模式
  entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
  output: { // 出口
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'../dist'),  // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("css/style.css"),
  ],
  module: {
    rules: [
      {
        test: /\.css|.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', { 
            loader: 'postcss-loader', 
              options: {
                plugins: [
                  require('autoprefixer') ({
                    // 要适配的浏览器
                    overrideBrowserslist: [
                      "defaults",
                      "not ie < 11",
                      "last 2 versions",
                      "> 1%",
                      "iOS 7",
                      "last 3 iOS versions"
                    ]
                  })
                ]
              }
            },
            'less-loader'
          ]
        })      
      }, 
      // {
      //   test: /\.(jpeg|jpg|png|gif)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[hash:8].[ext]',
      //     publicPath: '../images/',
      //     outputPath: 'images/'
      //   }
      // },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 200000,
          name: '[name].[hash:8].[ext]',
          publicPath: '../images/',
          outputPath: 'images/'
        }
      },

  

      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'html-loader',
      //     options: {
      //       // minimize: true // 是否压缩打包后的 HTML 文件，true 的话则 HTML 文件会丢失空格和换行
      //     }
      //   }],
      // }
    ]
  }
}
