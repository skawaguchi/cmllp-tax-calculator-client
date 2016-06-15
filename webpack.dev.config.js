const autoprefixer = require('autoprefixer');
const path = require('path');
const pkg = require('./package.json');
const precss = require('precss');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        filename: pkg.name + '.js',
        libraryTarget: 'umd',
        path: path.join(__dirname, '/build'),
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass', 'postcss']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: [autoprefixer({browsers: ['last 2 versions']}), precss],
    resolve: {
        extensions: ['', '.js']
    },
    bail: true
};
