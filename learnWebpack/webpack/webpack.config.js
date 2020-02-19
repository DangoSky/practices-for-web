const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  mode:'development', // 开发模式
  entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
  output: { // 出口
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'../dist')  // 打包后的目录
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
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'] // 从右向左解析原则。执行时先用 css-loader 将 css 文件转成对象，传递给 style-loader 插入到 head 的 style 中。这样是将css打包到对应的js里面去，所以页面加载的时候会先解析完了js之后再去加载css，会影响用户体验
      // },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader'] // 从右向左解析原则。先解析成css
      // },
      {
        test: /\.css|.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })      
      },

    ]
  }
}
