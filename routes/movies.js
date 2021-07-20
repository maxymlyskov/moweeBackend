const express = require('express')
const route = express.Router()
const {Movie, validateObject} = require('../models/movie')
const multer = require('multer');
const config = require('config')
// const moviesMapper = require('../mappers/movies')
// const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// const upload = multer({  
//     dest: "uploads/",
//     limits: { fieldSize: 25 * 1024 * 1024 },
//   });



route.get('/', async (req,res)=>{
    const movies = await Movie.find().sort('Title');

    // const resources = movies.map(moviesMapper)
    res.send(movies)
})


route.get('/:id',async (req,res)=>{
    const movie = await Movie.findById(req.params.id)
    if(!movie)  return res.status(404).send('This page is not found!')
    res.send(movie)
})
 
route.post('/', upload.single('Poster'), async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)  

    
        const movie = new Movie({
            Title: req.body.Title,
            Year: req.body.Year,
            imdbRating: req.body.imdbRating,
            Plot: req.body.Plot,
            Released: req.body.Released,
            Runtime: req.body.Runtime,
            Genre: req.body.Genre,
            Language: req.body.Language,
            Country: req.body.Country,
            Director: req.body.Director,
            Writer: req.body.Writer,
            Actors: req.body.Actors,
            Production: req.body.Production,
            Awards: req.body.Awards,
            Poster: req.body.Poster
        })
        try{
        await movie.save()
        return res.send(movie)

        
    } catch (error) {
        res.send(error)
    }
    

})

route.delete('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id)

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})

route.delete('/', async (req,res)=>{
    const movie = await Movie.deleteMany({})

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})
module.exports = route