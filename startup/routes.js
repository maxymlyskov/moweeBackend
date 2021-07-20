const asyncError = require('../middleware/error')
const express = require('express');
const movies = require('../routes/movies')
const users = require('../routes/users')
const auth = require('../routes/auth')

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    // app.use(express.static(__dirname + '/uploads'));
    // app.use('/uploads', express.static('uploads'));
 

    app.use('/api/movies', movies)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(asyncError)
}