const Hapi = require('hapi');
const inert = require('inert');
const path = require('path');

const server = new Hapi.Server();

const port = process.env.port || 3000;

server.connection({
    host: 'localhost',
    port
});

server.register(inert, () => {});

server.route({
    handler: {
        directory: {
            index: true,
            listing: false,
            path: './public'
        }
    },
    method: 'GET',
    path: '/{path*}'
});

server.start(() => {
   console.log('Listening on', server.info.uri)
});
