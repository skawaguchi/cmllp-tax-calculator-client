const autoprefixer = require('autoprefixer');
const path = require('path');
const pkg = require('./package.json');
const precss = require('precss');
const webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    entry: [
        './src/index'
    ],
    output: {
        filename: pkg.name + '.js',
        libraryTarget: 'umd',
        path: path.join(__dirname, './public'),
        publicPath: '/public/'

    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass', 'postcss']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    postcss: [autoprefixer({browsers: ['last 2 versions']}), precss],
    resolve: {
        extensions: ['', '.js']
    },
    bail: true
};
