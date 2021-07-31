const asyncError = require('../middleware/error')
const express = require('express');
const movies = require('../routes/movies')
const users = require('../routes/users')
const auth = require('../routes/auth')
// const { auth } = require('express-openid-connect');
// require('dotenv').config()

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
//     app.use(
//         auth({
//           issuerBaseURL: process.env.ISSUER_BASE_URL,
//           baseURL: process.env.BASE_URL,
//           clientID: process.env.CLIENT_ID,
//           secret: process.env.SECRET,
//           idpLogout: true,
//         })
//       );
 

    app.use('/api/movies', movies)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(asyncError)
}