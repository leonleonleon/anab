const webpack = require( 'webpack' );  // eslint-disable-line
const path    = require( 'path' );     // eslint-disable-line
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );  // eslint-disable-line

const BUILD_DIR = path.resolve( __dirname, 'prod' );
const APP_DIR   = path.resolve( __dirname, 'app' );

const extractCSS = new ExtractTextPlugin( 'css/app.css' );

const config = {
    entry :
    [
        path.resolve( APP_DIR, 'Index.jsx' ),
    ],
    output :
    {
        path     : BUILD_DIR,
        filename : 'js/app.min.js',
    },
    module :
    {
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
    plugins :
    [
        extractCSS,

        new webpack.DefinePlugin(
            {
                'process.env' : {
                    'NODE_ENV' : JSON.stringify( 'production' ),
                },
            }
        ),

        // Uglify options used when webpack is run with `-p` flag.
        new webpack.optimize.UglifyJsPlugin(
            {
                mangle   : true,
                compress :
                {
                    warnings     : false,
                    sequences    : true,
                    dead_code    : true, // eslint-disable-line
                    conditionals : true,
                    booleans     : true,
                    unused       : true,
                    if_return    : true, // eslint-disable-line
                    join_vars    : true, // eslint-disable-line
                    drop_console : true // eslint-disable-line
                },
            }
        ),
    ],
};

module.exports = config;
