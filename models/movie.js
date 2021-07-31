const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose');

const movieSchema =  new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        maxLength: 50
    },
    imdbID: {
        type: String,
        required: true,
        maxLength: 50
    },
    Year: {
        type: String,
        required: true,
        maxLength: 50
    },
    Poster:{
        type: String,
        required: true,
        maxLength: 200
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Movie = mongoose.model("Movie",movieSchema)


function validateObject(result){
    const schema =Joi.object({
        Title: Joi.string().min(3).required(),        
        Year: Joi.string().required(),
        Poster: Joi.string().required(),
        imdbID: Joi.string().required()
    } )
    return schema.validate(result)
    
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateObject = validateObject;