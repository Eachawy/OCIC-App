const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');
const packageJson = require('./../package.json');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    './src/main/webapp/app/index'
  ],
  output: {
    path: utils.root('build/resources/main/static/'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: { implementation: sass }
        }
        ]
      }
    ]
  },
  devServer: {
    stats: options.stats,
    hot: true,
    contentBase: './build/resources/main/static/',
    proxy: [{
      context: [
        '/api',
        '/services',
        '/management',
        '/swagger-resources',
        '/v2/api-docs',
        '/h2-console',
        '/auth'
      ],
      target: `http${options.tls ? 's' : ''}://localhost:8080`,
      secure: false,
      changeOrigin: options.tls
    }],
    watchOptions: {
      ignored: /node_modules/
    },
    https: options.tls,
    historyApiFallback: true
  },
  stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        VERSION: `'${packageJson.version}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        SERVER_API_URL: JSON.stringify('http://localhost:8080/'),
        API_KEY: JSON.stringify('Y%k_Y9JSx7V^he^%NuQf9H$D%%L+X?z%5cEEB@GUJczUkM%jE?'),
        ENCRYPTION_PUBLIC_KEY: JSON.stringify(''),
        DECRYPTION_PRIVATE_KEY: JSON.stringify('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'),
        IS_REQUEST_ENCRYPTION_ENABLED: JSON.stringify('false'),
        IS_RECAPTCHA_ENABLED: JSON.stringify('true'),
        CRYPTO_SECRET_KEY: JSON.stringify('d0wtOGt4czVXSCohcjY8OA=='),
        SUB_DOMAIN: JSON.stringify('/#/'),
        GOOGLE_RECAPTCHA_SITE_KEY: JSON.stringify('6LcnAMYUAAAAAI9equ9vXDe5DB458OVi97GzC41W')
      },
    }),
    process.env.JHI_DISABLE_WEBPACK_LOGS
      ? null
      : new SimpleProgressWebpackPlugin({
        format: options.stats === 'minimal' ? 'compact' : 'expanded'
      }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      https: options.tls,
      host: 'localhost',
      port: 9000,
      proxy: {
        target: `http${options.tls ? 's' : ''}://localhost:9060`,
        proxyOptions: {
          changeOrigin: false  //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
        }
      },
      socket: {
        clients: {
          heartbeatTimeout: 60000
        }
      }
      /*
      ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
        clicks: false,
        location: false,
        forms: false,
        scroll: false
      } */
    }, {
      reload: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ])
    /*,
new WebpackNotifierPlugin({
title: 'JHipster',
contentImage: path.join(__dirname, 'logo-jhipster.png')
})*/
  ].filter(Boolean),
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }

});
