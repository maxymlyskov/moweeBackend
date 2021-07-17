const mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')

module.exports = function(){
    const db = config.get('db')
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>{
        console.log(`Connected to ${db}...`)
        winston.info(`Connected to ${db}...`)
    } )}
