/* eslint-disable no-undef */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, '../servidor/publico'),
    filename: '[name].[contenthash].bundle.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        title: 'UFSC - CTC - INE - INE5646 :: App Músicas',
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        }
      }),
    new webpack.HashedModuleIdsPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5000000,
      runtimeCaching: [
        {
          urlPattern: /https:\/\/assets.fanart.tv\/fanart\/music\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'imagens',
            expiration: {
              maxEntries: 10
            }
          }
        },
        {
          urlPattern: /topArtistas/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'artistas',
            expiration: {
              maxEntries: 10
            }
          }
        },
        
      ]
    })    
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        use: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.css$/, 
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}

module.exports = config
