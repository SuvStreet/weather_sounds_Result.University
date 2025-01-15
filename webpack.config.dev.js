const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const commonConfig = require('./webpack.config.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 8080,
    hot: true,
  },
  plugins: [
    new ESLintPlugin({
      context: './src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
})
