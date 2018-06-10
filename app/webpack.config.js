const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = {
  entry: ['babel-polyfill', path.join(process.cwd(), 'app/index.js')],
  output: { // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  }, // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000',
    }],
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'resolve-url-loader',
        }],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        oneOf: [
          { test: /html-webpack-plugin/, use: 'null-loader' },
          {
            use: extractSass.extract({
              use: [{
                loader: 'css-loader',
                options: { sourceMap: true },
              }, {
                loader: 'resolve-url-loader',
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true },
              }, {
                loader: 'sass-loader',
                options: { sourceMap: true },
              }],
              fallback: 'style-loader',
            }),
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'node-static.js',
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    extractSass,

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),

    new webpack.NamedModulesPlugin(),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
  ],
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
  node: {
    fs: 'empty',
  },
  externals: [{
    './cptable': 'var cptable',
  }],
}
