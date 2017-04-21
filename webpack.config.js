const path = require('path');

module.exports = {
    context: __dirname + "/apps/todos/client",

    entry: [
        './app.jsx'
    ],

    output: {
        filename: "app.js",
        path: __dirname + "/public",
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
        ],
    }
};