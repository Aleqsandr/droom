const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    devtool: 'cheap-module-source-map',

    entry: [
        './main.js',
        './assets/scss/main.scss',
    ],

    context: resolve(__dirname, 'app'),

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
            },
            comments: false,
        }),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([{ from: './vendors', to: 'vendors' }]),
    ],

    node: {
        fs: "empty",
        child_process: 'empty'
    },

    module: {
        loaders: [
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
                test: /\.js?$/,
                exclude: [/node_modules/, resolve(__dirname,'/app/assets/modules/MIDI.js')],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        { loader: 'sass-loader', query: { sourceMap: false } },
                    ],
                }),
            },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        ]
    },
};

externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}],

module.exports = config;
