
const webpack           = require( 'webpack' ); // eslint-disable-line
const path              = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const BUILD_DIR = path.resolve( __dirname, 'build/' );
const APP_DIR   = path.resolve( __dirname, 'app/' );
const DEV_PORT  = 8080;

const extractCSS = new ExtractTextPlugin( 'css/app.css' );

const config = {
    context : __dirname,
    entry   : [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://127.0.0.1:${DEV_PORT}`,
        'webpack/hot/only-dev-server',
        'whatwg-fetch',
        path.resolve( 'app/Index.jsx' ),
    ],
    output : {
        path       : BUILD_DIR,
        publicPath : '',
        filename   : 'js/app.js',
    },
    devtool     : 'eval-source-map',
    devServer   : {
        inline              : true,
        hot                 : true,
        port                : DEV_PORT,
        contentBase         : 'build',
        historyApiFallback  : true,
        filename            : 'app.js',
        publicPath          : '/',
        clientLogLevel      : 'info',
    },
    module : {
        rules : [
            {
                test    : /\.jsx?/,
                use     : [
                    {
                        loader : 'babel-loader',
                    },
                ],
                include : APP_DIR,
            },
            {
                test    : /\.gif$/,
                use     : [ { loader : 'file-loader?name=../img/[name].[ext]' } ],
            },
            {
                test    : /\.jpg$/,
                use     : [ { loader : 'file-loader?name=../img/[name].[ext]' } ],
            },
            {
                test    : /\.(cur|ani)$/,
                use     : [ { loader : 'file-loader?name=../img/[name].[ext]' } ],
            },
            {
                test    : /\.scss$/i,
                include : APP_DIR,
                use     : extractCSS.extract( [ 'css-loader', 'sass-loader' ] ),
            },
            {
                test    : /\.json$/,
                use     : 'json-loader',
            },
        ],
    },
    resolve : {
        modules     : [
            path.resolve( __dirname, 'app/components' ),
            path.resolve( __dirname, 'app' ),
            'node_modules',
        ],
        extensions  : [ '.js', '.jsx' ],
    },
    plugins : [
        extractCSS,

        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
};

module.exports = config;
