const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./src/config/db');

const userRoutes = require('./src/routes/user');
const authorRoutes = require('./src/routes/author');
const bookRoutes = require('./src/routes/book');

mongoose.connect(config.DB, {
    useNewUrlParser: true
})
    .then(
        () => {console.log('Database is connected')},
        err => {console.log('Database is not connected' + err)}
    )

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET')
        return res.status(200).json({});
    }
    next();
})

app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/author', authorRoutes);

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Response Success'
    })
})

app.use((req, res, next) => {
    const error = new Error('page not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;