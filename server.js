const webpack = require('webpack');
const WebPackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');

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

        console.log('Listening at http://localhost:' + port);
    });
