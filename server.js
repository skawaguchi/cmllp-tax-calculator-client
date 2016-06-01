const good = require('good');
const goodFile = require('good-file');
const Hapi = require('hapi');
const inert = require('inert');
const path = require('path');
const pug = require('pug');
const vision = require('vision');

const server = new Hapi.Server();

const port = process.env.PORT || 3000;

server.connection({
    port
});

server.register(vision, (error) => {
    if (error) { throw error; }

    server.views({
        engines: {
            pug: pug
        },
        path: './views/templates',
        relativeTo: __dirname
    });
});

server.register(inert, () => {});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply.redirect('/tax-calculator');
    }
});

server.route({
    method: 'GET',
    path: '/tax-calculator',
    handler: (request, reply) => {
        reply.view('index.pug');
    }
});

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

server.register({
    register: good,
    options: {
        ops: {
            interval: 5000
        },
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            }, {
                module: 'good-console'
            }, 'stdout'],
            file: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson'
            }, {
                module: 'good-file',
                args: ['./test/fixtures/awesome_log']
            }]
        }
    }
}, (error) => {
    if (error) {
        console.error(error);
    } else {
        server.start(() => {
            console.log('Listening on', server.info.uri)
        });
    }
});
