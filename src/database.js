const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const {
    mongodb
} = require('./config');

mongoose.connect(mongodb.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('Database is connected'))
        .catch(err => {
            console.log("La base de datos no esta tenta");
            console.error(err)
        });
        console.error(err)
    });