if (process.env.NODE_ENV === 'production') {
    module.exports = require('./containers/Root');
} else {
    module.exports = require('./containers/Root.dev');
}
