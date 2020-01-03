// run different ports for website and api server
const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use (
        proxy('/api/', {
            target: 'http://localhost:5000/'
        })
    );
};
