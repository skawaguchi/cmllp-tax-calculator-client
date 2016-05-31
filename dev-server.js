const webpack = require('webpack');
const WebPackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.config');
const port = 3000;

new WebPackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
})
    .listen(port, 'localhost', (error, result) => {
        if (error) {
            console.log(error);
        }

        console.log('Dev Server running at http://localhost:' + port);
    });
