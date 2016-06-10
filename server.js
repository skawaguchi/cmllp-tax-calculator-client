const good = require('good');
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
        reply.redirect('/tax-calculator/on');
    }
});

server.route({
    handler: (request, reply) => {
        reply.file('./public/cmllp-tax-calculator-client.' + request.params.ext);
    },
    method: 'GET',
    path: '/tax-calculator/cmllp-tax-calculator-client.{ext}'
});

server.route({
    method: 'GET',
    path: '/tax-calculator/{province}',
    handler: (request, reply) => {
        reply.view('index.pug');
    }
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
                args: ['./logs/activity.log']
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
