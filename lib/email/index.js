const fs = require('fs');
const path = require('path');

const models = {}

// read all models and import them into the "db" object
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var name = file.replace('.js', '');
        models[name] = require('./models/' + file);
    })

module.exports.models = models;
