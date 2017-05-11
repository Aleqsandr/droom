const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js',
        './assets/scss/main.scss',
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    context: resolve(__dirname, 'app'),

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    node: {
        fs: "empty",
        child_process: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',

            },
            {
                test: /\.jsx?$/, // react files
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react',
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: [/node_modules/, resolve(__dirname,'/app/assets/modules/MIDI.js')],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                }),
            },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
        ]
    },

    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],

    plugins: [
        new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = config;
