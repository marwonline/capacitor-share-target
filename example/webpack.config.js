const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/appwrapper.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: path.resolve(process.cwd(), 'node_modules')
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: path.resolve(process.cwd(), 'node_modules')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Capacitor Test App',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
