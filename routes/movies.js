const express = require('express')
const route = express.Router()
const {Movie, validateObject} = require('../models/movie')
const {MovieLiked,validateObjectLiked} = require('../models/movieLiked')
const multer = require('multer');
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })




route.get('/',auth, async (req,res)=>{
    const movies = await Movie.find({owner: req.user._id}).sort([['Rating', -1]]);
    res.send(movies)
})

route.get('/liked',auth, async (req,res)=>{
    const movies = await MovieLiked.find({owner: req.user._id}).sort([['Rating', -1]]);
    res.send(movies)
})


route.get('/:id',async (req,res)=>{
    const movie = await Movie.findById(req.params.id)
    if(!movie)  return res.status(404).send('This page is not found!')
    res.send(movie)
})
 
route.post('/', upload.single('Poster'), auth, async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)  

    
        const movie = new Movie({
            Title: req.body.Title,
            Genre: req.body.Genre,
            Year: req.body.Year,
            Poster: req.body.Poster,
            imdbID: req.body.imdbID,
            owner: req.user._id
        })
        try{
        await movie.save()
        return res.send(movie)

        
    } catch (error) {
        res.send(error)
    }
    

})
route.post('/liked', upload.single('Poster'), auth, async (req, res)=>{
    const {error} = validateObjectLiked(req.body)
    if(error) return res.status(400).send(error.details[0].message)  

    
        const movie = new MovieLiked({
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
            Poster: req.body.Poster,
            Rating: req.body.Rating,
            imdbID: req.body.imdbID,
            Liked: req.body.Liked,
            owner: req.user._id
        })
        try{
        await movie.save()
        return res.send(movie)

        
    } catch (error) {
        res.send(error)
    }
    

})

route.put('/liked/:id', async (req, res)=>{
    const {error} = validateObjectLiked(req.body)
    if(error) return res.status(400).send(error.details[0].message) 

    const movie = await MovieLiked.findByIdAndUpdate(req.params.id, 
        {Title: req.body.Title,
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
        Poster: req.body.Poster,
        Rating: req.body.Rating,
        imdbID: req.body.imdbID,
        Liked: true
            },{new:true})

    if(!movie) return res.status(404).send('This page is not found!')
        
    res.send(movie)
})

route.delete('/:id', auth, async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id)

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})

route.delete('/liked', async (req,res)=>{
    const {error} = validateObjectLiked(req.body)
    if(error) return res.status(400).send(error.details[0].message) 
    const movie = await MovieLiked.deleteMany({})

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})
route.delete('/', async (req,res)=>{
    const movie = await Movie.deleteMany({})

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})

route.delete('/liked/:id',auth,  async (req,res)=>{
    const movie = await MovieLiked.findByIdAndRemove(req.params.id)

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})

module.exports = route
