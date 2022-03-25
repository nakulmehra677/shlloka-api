const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


mongoose.connect('mongodb://localhost/shlloka')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))



const models = {}

// read all models and import them into the "db" object
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        // const Model = client.import(path.join(__dirname, '/models', file))
        // models[Model.name] = new Model()
        var name = file.replace('.js', '');
        models[name] = require('./models/' + file);
    })

module.exports.models = models;
