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
        maxLength: 50,
    },
    Liked: {
        type: Boolean,
        default: true
    },
    Poster:{
        type: String,
        required: true,
        maxLength: 200
    },
    imdbRating: {
        type: String,
        required: true,
        maxLength: 50
    },
    Plot: {
        type: String,
        required: true,
        maxLength: 10000
    },
    Released: {
        type: String,
        required: true,
        maxLength: 50
    },
    Runtime: {
        type: String,
        required: true,
        maxLength: 50
    },
    Genre: {
        type: String,
        required: true,
        maxLength: 300
    },
    Language: {
        type: String,
        required: true,
        maxLength: 100
    },
    Country: {
        type: String,
        required: true,
        maxLength: 200
    },
    Director: {
        type: String,
        required: true,
        maxLength: 1000
    },
    Year: {
        type: String,   
        required: true,
        maxLength: 50
    },
    Writer: {
        type: String,
        required: true,
        maxLength: 1000
    },
    Actors: {
        type: String,
        required: true,
        maxLength: 1000
    },
    Production: {
        type: String,
        required: true,
        maxLength: 1000
    },
    Awards: {
        type: String,
        required: true,
        maxLength: 1000
    },
    Rating:{
        type: Number,
        max: 5,
        default: 0
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const MovieLiked = mongoose.model("MovieLiked",movieSchema)


function validateObjectLiked(result){
    const schema =Joi.object({
        Title: Joi.string().min(3).required(),
        imdbRating: Joi.string().required(),
        Plot: Joi.string().required(),
        Released: Joi.string().required(),
        Runtime: Joi.string().required(),
        Genre: Joi.string().required(),
        Language: Joi.string().required(),
        Country: Joi.string().required(),
        Director: Joi.string().required(),
        Writer: Joi.string().required(),
        Actors: Joi.string().required(),
        Production: Joi.string().required(),
        Awards: Joi.string().required(),
        Year: Joi.string().required(),
        Poster: Joi.string().required(),
        imdbID: Joi.string().required(),
        Rating: Joi.number(),
        Liked: Joi.boolean()
    } )
    return schema.validate(result)
    
}

exports.movieSchema = movieSchema;
exports.MovieLiked = MovieLiked;
exports.validateObjectLiked = validateObjectLiked;